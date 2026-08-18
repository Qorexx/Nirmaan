import { ethers } from 'ethers';

// We can use Human-Readable ABIs with ethers.js to avoid needing the full JSON artifact!
export const CONTRACT_ABI = [
  "constructor(address _aiOracle)",
  "function createProject(uint256 _projectId, address _contractor) external payable",
  "function releaseFunds(uint256 _projectId) external",
  "function governmentAdmin() public view returns (address)",
  "function aiOracle() public view returns (address)",
  "function projects(uint256) public view returns (address contractor, uint256 totalFunds, bool isCompleted)",
  "event ProjectCreated(uint256 indexed projectId, address contractor, uint256 funds)",
  "event FundsReleased(uint256 indexed projectId, address contractor, uint256 amount)"
];

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000";

export function getEscrowContract(providerOrSigner) {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, providerOrSigner);
}

export async function createProject(signer, projectId, contractorAddr, amountInEth) {
  const contract = getEscrowContract(signer);
  const amount = ethers.parseEther(amountInEth.toString());
  const tx = await contract.createProject(projectId, contractorAddr, { value: amount });
  return await tx.wait(); // Wait for confirmation
}

export async function releaseFunds(signer, projectId) {
  const contract = getEscrowContract(signer);
  const tx = await contract.releaseFunds(projectId);
  return await tx.wait(); // Wait for confirmation
}
