import hre from "hardhat";

async function main() {
  // ── Configuration ──────────────────────────────────────────────────────────
  // Placeholder AI Oracle address — swap this with your Chapter 4 teammate's
  // real deployed AI Oracle address when their work is ready.
  const AI_ORACLE_ADDRESS = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  🏗️  NIRMAAN ESCROW — Deployment Script");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  // ── Step 1: Get the deployer account ───────────────────────────────────────
  const [deployer] = await hre.ethers.getSigners();
  console.log(`\n  📋 Deployer (Government Admin): ${deployer.address}`);
  console.log(`  🤖 AI Oracle Address:           ${AI_ORACLE_ADDRESS}`);

  // ── Step 2: Deploy the contract ────────────────────────────────────────────
  console.log("\n  ⏳ Deploying NirmaanEscrow...");
  const NirmaanEscrow = await hre.ethers.getContractFactory("NirmaanEscrow");
  const escrow = await NirmaanEscrow.deploy(AI_ORACLE_ADDRESS);
  await escrow.waitForDeployment();

  const contractAddress = await escrow.getAddress();

  // ── Step 3: Confirm ────────────────────────────────────────────────────────
  console.log(`  ✅ NirmaanEscrow deployed to:   ${contractAddress}`);
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  📌 Share this address with the frontend team (Chapter 5)");
  console.log("  📌 Update AI_ORACLE_ADDRESS when Chapter 4 is ready");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
