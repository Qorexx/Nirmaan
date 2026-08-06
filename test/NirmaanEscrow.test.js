import { expect } from "chai";
import hre from "hardhat";

describe("NirmaanEscrow", function () {
  // ---------------------------------------------------------------------------
  // Shared setup — runs before every single test so each test starts fresh
  // ---------------------------------------------------------------------------
  let escrow;            // the deployed contract instance
  let government;        // Wallet #1 — deploys the contract, acts as government admin
  let aiOracle;          // Wallet #2 — the authorized AI Oracle
  let contractor;        // Wallet #3 — the contractor who receives funds
  let unauthorized;      // Wallet #4 — a random unauthorized person

  beforeEach(async function () {
    // Grab 4 wallets from Hardhat's local fake blockchain
    [government, aiOracle, contractor, unauthorized] = await hre.ethers.getSigners();

    // Deploy a fresh NirmaanEscrow contract before each test.
    // `government` is the deployer, so msg.sender = government => governmentAdmin = government
    const NirmaanEscrow = await hre.ethers.getContractFactory("NirmaanEscrow");
    escrow = await NirmaanEscrow.deploy(aiOracle.address);
    await escrow.waitForDeployment();
  });

  // ---------------------------------------------------------------------------
  // TEST 1: Deployment
  // ---------------------------------------------------------------------------
  describe("1. Deployment", function () {
    it("should set the correct government admin", async function () {
      expect(await escrow.governmentAdmin()).to.equal(government.address);
    });

    it("should set the correct AI Oracle address", async function () {
      expect(await escrow.aiOracle()).to.equal(aiOracle.address);
    });
  });

  // ---------------------------------------------------------------------------
  // TEST 2: Project Creation (Happy Path)
  // ---------------------------------------------------------------------------
  describe("2. Project Creation", function () {
    const PROJECT_ID = 101;
    const DEPOSIT_AMOUNT = hre.ethers.parseEther("5.0"); // 5 ETH

    it("should allow government to create a project with locked funds", async function () {
      // Government creates a project, depositing 5 ETH
      await escrow.connect(government).createProject(PROJECT_ID, contractor.address, {
        value: DEPOSIT_AMOUNT,
      });

      // Verify the project data stored on-chain
      const project = await escrow.projects(PROJECT_ID);
      expect(project.contractor).to.equal(contractor.address);
      expect(project.totalFunds).to.equal(DEPOSIT_AMOUNT);
      expect(project.isCompleted).to.equal(false);
    });

    it("should hold the deposited funds inside the contract", async function () {
      await escrow.connect(government).createProject(PROJECT_ID, contractor.address, {
        value: DEPOSIT_AMOUNT,
      });

      // The contract's balance should equal the deposit amount
      const contractBalance = await hre.ethers.provider.getBalance(
        await escrow.getAddress()
      );
      expect(contractBalance).to.equal(DEPOSIT_AMOUNT);
    });

    it("should emit a ProjectCreated event", async function () {
      await expect(
        escrow.connect(government).createProject(PROJECT_ID, contractor.address, {
          value: DEPOSIT_AMOUNT,
        })
      )
        .to.emit(escrow, "ProjectCreated")
        .withArgs(PROJECT_ID, contractor.address, DEPOSIT_AMOUNT);
    });
  });

  // ---------------------------------------------------------------------------
  // TEST 3: Unauthorized Project Creation
  // ---------------------------------------------------------------------------
  describe("3. Unauthorized Project Creation", function () {
    it("should reject project creation by a non-government address", async function () {
      await expect(
        escrow.connect(unauthorized).createProject(202, contractor.address, {
          value: hre.ethers.parseEther("1.0"),
        })
      ).to.be.revertedWith("Only government can create projects");
    });
  });

  // ---------------------------------------------------------------------------
  // TEST 4: AI Oracle Releases Funds (Happy Path)
  // ---------------------------------------------------------------------------
  describe("4. AI Oracle Releases Funds", function () {
    const PROJECT_ID = 301;
    const DEPOSIT_AMOUNT = hre.ethers.parseEther("10.0"); // 10 ETH

    it("should transfer the exact locked amount to the contractor", async function () {
      // Step 1: Government creates the project
      await escrow.connect(government).createProject(PROJECT_ID, contractor.address, {
        value: DEPOSIT_AMOUNT,
      });

      // Step 2: Record the contractor's balance before the release
      const balanceBefore = await hre.ethers.provider.getBalance(contractor.address);

      // Step 3: AI Oracle releases the funds
      await escrow.connect(aiOracle).releaseFunds(PROJECT_ID);

      // Step 4: Verify the contractor received exactly 10 ETH more
      const balanceAfter = await hre.ethers.provider.getBalance(contractor.address);
      expect(balanceAfter - balanceBefore).to.equal(DEPOSIT_AMOUNT);
    });

    it("should mark the project as completed", async function () {
      await escrow.connect(government).createProject(PROJECT_ID, contractor.address, {
        value: DEPOSIT_AMOUNT,
      });

      await escrow.connect(aiOracle).releaseFunds(PROJECT_ID);

      const project = await escrow.projects(PROJECT_ID);
      expect(project.isCompleted).to.equal(true);
    });

    it("should emit a FundsReleased event", async function () {
      await escrow.connect(government).createProject(PROJECT_ID, contractor.address, {
        value: DEPOSIT_AMOUNT,
      });

      await expect(escrow.connect(aiOracle).releaseFunds(PROJECT_ID))
        .to.emit(escrow, "FundsReleased")
        .withArgs(PROJECT_ID, contractor.address, DEPOSIT_AMOUNT);
    });

    it("should not allow releasing funds twice for the same project", async function () {
      await escrow.connect(government).createProject(PROJECT_ID, contractor.address, {
        value: DEPOSIT_AMOUNT,
      });

      await escrow.connect(aiOracle).releaseFunds(PROJECT_ID);

      // Second release should fail
      await expect(
        escrow.connect(aiOracle).releaseFunds(PROJECT_ID)
      ).to.be.revertedWith("Funds already released");
    });
  });

  // ---------------------------------------------------------------------------
  // TEST 5: Unauthorized Fund Release (Anti-Corruption Lock)
  // ---------------------------------------------------------------------------
  describe("5. Unauthorized Fund Release", function () {
    const PROJECT_ID = 401;

    it("should reject fund release by the government admin (not the oracle)", async function () {
      await escrow.connect(government).createProject(PROJECT_ID, contractor.address, {
        value: hre.ethers.parseEther("3.0"),
      });

      await expect(
        escrow.connect(government).releaseFunds(PROJECT_ID)
      ).to.be.revertedWith("Only the AI Oracle can release funds!");
    });

    it("should reject fund release by a random unauthorized address", async function () {
      await escrow.connect(government).createProject(PROJECT_ID, contractor.address, {
        value: hre.ethers.parseEther("3.0"),
      });

      await expect(
        escrow.connect(unauthorized).releaseFunds(PROJECT_ID)
      ).to.be.revertedWith("Only the AI Oracle can release funds!");
    });

    it("should reject fund release by the contractor themselves", async function () {
      await escrow.connect(government).createProject(PROJECT_ID, contractor.address, {
        value: hre.ethers.parseEther("3.0"),
      });

      await expect(
        escrow.connect(contractor).releaseFunds(PROJECT_ID)
      ).to.be.revertedWith("Only the AI Oracle can release funds!");
    });
  });

  // ---------------------------------------------------------------------------
  // TEST 6: Duplicate Project ID Prevention
  // ---------------------------------------------------------------------------
  describe("6. Duplicate Project ID", function () {
    const PROJECT_ID = 101;

    it("should reject creating a project with an already-used ID", async function () {
      // Create project #101 for the first time
      await escrow.connect(government).createProject(PROJECT_ID, contractor.address, {
        value: hre.ethers.parseEther("2.0"),
      });

      // Try to create project #101 again — should fail
      await expect(
        escrow.connect(government).createProject(PROJECT_ID, contractor.address, {
          value: hre.ethers.parseEther("5.0"),
        })
      ).to.be.revertedWith("Project ID already exists");
    });
  });
});
