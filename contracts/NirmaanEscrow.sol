// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title NirmaanEscrow
 * @dev A smart contract that holds government funds and only releases them
 *      when the AI Oracle verifies the construction milestone.
 */
contract NirmaanEscrow {
    // 1. ROLES (Who is allowed to do what)
    address public governmentAdmin;
    address public aiOracle;

    // 2. DATA STRUCTURE (How we store a project)
    struct Project {
        address contractor;
        uint256 totalFunds;
        bool isCompleted;
    }

    // This creates a database mapping a Project ID (e.g., 101) to the Project details
    mapping(uint256 => Project) public projects;

    // 3. EVENTS (Broadcasts messages to the frontend when something happens)
    event ProjectCreated(uint256 indexed projectId, address contractor, uint256 funds);
    event FundsReleased(uint256 indexed projectId, address contractor, uint256 amount);

    // 4. SETUP (Runs exactly once when the contract is deployed)
    constructor(address _aiOracle) {
        governmentAdmin = msg.sender; // The person deploying this is the government
        aiOracle = _aiOracle;         // We set the authorized AI Oracle address
    }

    // 5. DEPOSIT FUNDS (Government locks money into the contract)
    function createProject(uint256 _projectId, address _contractor) external payable {
        require(msg.sender == governmentAdmin, "Only government can create projects");
        require(projects[_projectId].contractor == address(0), "Project ID already exists");
        require(msg.value > 0, "Must deposit funds");

        projects[_projectId] = Project({
            contractor: _contractor,
            totalFunds: msg.value,
            isCompleted: false
        });

        emit ProjectCreated(_projectId, _contractor, msg.value);
    }

    // 6. RELEASE FUNDS (Only the AI Oracle can trigger this)
    function releaseFunds(uint256 _projectId) external {
        require(msg.sender == aiOracle, "Only the AI Oracle can release funds!");
        
        Project storage project = projects[_projectId];
        
        require(project.contractor != address(0), "Project does not exist");
        require(!project.isCompleted, "Funds already released");

        project.isCompleted = true;
        uint256 amountToPay = project.totalFunds;

        // Transfer the crypto to the contractor
        (bool success, ) = project.contractor.call{value: amountToPay}("");
        require(success, "Transfer failed");

        emit FundsReleased(_projectId, project.contractor, amountToPay);
    }
}
