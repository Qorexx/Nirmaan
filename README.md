# 🏗️ Nirmaan x402

**Nirmaan x402** is a decentralized, AI-driven Escrow Protocol designed to eliminate corruption in public infrastructure projects. By removing humans from the verification and payment release loop, Nirmaan ensures that government funds are only disbursed when mathematically and physically proven work has been completed.

Built for the **Brainwave Hackathon**.

---

## 🚨 The Problem: Infrastructure Corruption
Governments spend billions on public infrastructure (roads, bridges, hospitals), but a massive percentage is lost to corruption. Contractors cut corners, use substandard materials, or abandon projects entirely. They still get paid because human inspectors can be bribed, and physical evidence can be forged or "lost."

## 💡 The Solution: Autonomous Anti-Corruption Escrow
Nirmaan locks project funds in an immutable smart contract vault. The money is **only** released when an unbiased AI Vision Oracle (Google Gemini) and IoT sensors independently verify that the physical milestone was completed perfectly.

**Zero human verification = Zero bribery bottlenecks.**

---

## ⚙️ Core Architecture (The 5-Step Flow)

1. **The Smart Vault:** The government deposits the project funds (e.g., $10M) into the blockchain smart contract.
2. **Data Capture:** The contractor completes a milestone (e.g., "5km of road paved") and uploads cryptographic, geo-tagged proof via the Contractor Portal.
3. **The x402 Gateway:** The system intercepts the request using the **HTTP 402 (Payment Required)** protocol, paying a micro-fee to access the AI Oracle.
4. **The Multi-Oracle Consensus:** 
   - **Vision AI:** Google Gemini analyzes the images for structural defects (cracks, potholes, poor grading).
   - **IoT Telemetry:** The system checks heavy machinery engine hours and automated material weighbridges.
5. **Autonomous Payout:** If the Oracles reach consensus, the smart contract automatically executes the payout. The decision is permanently logged to a Supabase ledger, and a tamper-proof PDF audit certificate is generated.

---

## 🛡️ Regulatory Compliance: The "Twin-Ledger" Approach

**Q: How can government funds move through crypto wallets?**
In our production architecture, we use a **Twin-Ledger** system. 
The blockchain does *not* hold real fiat currency. It acts purely as an **Immutable Logic Engine**, holding the undeniable cryptographic proof that work was done. Once the AI approves the milestone, the blockchain state changes to `APPROVED`, firing a secure API webhook to the government's existing **Public Financial Management System (PFMS)**. 

The *actual* financial payout happens in INR via traditional, heavily regulated Aadhaar-linked DBT or NEFT rails. 
*(Note: For this 24-hour hackathon MVP, we mocked the final settlement using USDC on the Base testnet to demonstrate the automated logic).*

---

## 💻 Tech Stack

*   **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS
*   **AI Oracle:** Google GenAI SDK (`gemini-3.6-flash` for high-speed, cost-effective vision analysis)
*   **Blockchain/Web3:** Ethers.js, Coinbase Developer Platform (CDP), Base Sepolia Testnet
*   **Database & Logging:** Supabase (PostgreSQL) for immutable action logging
*   **PDF Generation:** `jspdf` and `html2canvas` for autonomous audit certificates

---

## 🚀 Running the Project Locally

### Prerequisites
*   Node.js (v18+)
*   A Google Gemini API Key
*   A Supabase Project URL & Anon Key
*   CDP API Keys (for Wallet generation)

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory and add your keys:
   ```env
   GEMINI_API_KEY="your_api_key"
   NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your_anon_key"
   # ... other required keys
   ```
4. Start the development server (Note: API routes making external network calls may require sandbox bypass depending on your environment):
   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000` in your browser.

---

*Built with ❤️ for a corruption-free future.*
