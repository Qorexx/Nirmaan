"use client";

import { useState } from "react";
import { ethers } from "ethers";

export default function WalletConnect() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask or Coinbase Wallet to use Nirmaan Escrow.");
      return;
    }
    
    try {
      // Connect to the injected Ethereum provider (MetaMask/Coinbase)
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // Request access
      await provider.send("eth_requestAccounts", []);
      
      // Get the signed-in user's wallet
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();
      setAddress(addr);

      // Fetch their ETH balance
      const bal = await provider.getBalance(addr);
      setBalance(ethers.formatEther(bal).substring(0, 6) + " ETH");
      
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  };

  if (address) {
    return (
      <div className="flex items-center space-x-2 bg-green-900/40 border border-green-500/50 px-4 py-2 rounded-full text-sm font-mono text-green-300">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        <span>{address.substring(0, 6)}...{address.substring(38)}</span>
        <span className="border-l border-green-500/50 pl-2">{balance}</span>
      </div>
    );
  }

  return (
    <button 
      onClick={connectWallet}
      className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-full transition-colors flex items-center space-x-2 shadow-lg shadow-blue-900/20"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
      </svg>
      <span>Connect Wallet</span>
    </button>
  );
}
