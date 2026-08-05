# 🏗️ Nirmaan Protocol — Chapter 4
## AI Verification Simulation (The Oracle Endpoint)
### Built by: DC Lab Team

---

## 📌 What is the Nirmaan Protocol?

The **Nirmaan Protocol** is an anti-corruption infrastructure verification system.
It uses blockchain, AI, and cryptographic payments to ensure that government construction projects (roads, bridges, buildings) are completed honestly — without corruption or fake milestone approvals.

---

## 🎯 Our Role — Chapter 4

> **"We are the Brain of the Nirmaan Protocol."**

Our job was to build the **AI Oracle Endpoint** — an independent AI verification service that:
- Receives **proof of construction work** (photo, sensor data, or documents)
- Analyzes it for **defects, corruption, or incomplete work**
- Returns a **verified ✅ or rejected ❌ decision** with a confidence score
- This decision is then used by the **Smart Contract** to release or hold funds in escrow

Without our endpoint, **no money moves**. We are the gatekeeper.

---

## 🔧 What We Built

### 1. 🧠 Oracle AI API Endpoint
**File:** `app/api/verify-milestone/route.js`

This is the core of our work. It is a **REST API endpoint** that:

| Feature | Description |
|---|---|
| **Method** | `POST` |
| **URL** | `/api/verify-milestone` |
| **Input** | Project ID, Milestone ID, Proof Type, Proof Payload (image URL etc.) |
| **Output** | Verified status, Confidence Score (0-100%), Message, Timestamp |
| **Delay** | 3-second simulated AI processing delay |
| **Smart Detection** | Rejects proofs containing keywords like `pothole`, `crack`, `defect`, `damage`, `bribe`, `corrupt`, etc. |

---

### 2. 🖥️ Interactive Developer Dashboard
**File:** `app/page.js`

A beautiful **web dashboard** at `http://localhost:3000` that lets anyone:
- Submit verification requests with custom inputs
- Use **preset test cases** (passing and failing scenarios)
- See the AI result live with a confidence score bar
- View the raw JSON output (for developers and integration testing)

---

## 📋 The API Contract (Interface)

This is what other teams send us, and what we send back.

### ➡️ They Send Us (Request):
```json
{
  "projectId": "12345",
  "milestoneId": 1,
  "proofType": "image",
  "proofPayload": "https://example.com/road-construction-photo.jpg"
}
```

### ⬅️ We Send Back (Response):
```json
{
  "verified": true,
  "confidenceScore": 0.97,
  "message": "AI image analysis complete. No structural defects detected. Milestone approved. Smart contract escrow is authorized to release funds.",
  "timestamp": "2026-08-05T13:45:00.000Z"
}
```

---

## 🛡️ How the Verification Logic Works

```
Proof Payload Received
        ↓
Does it contain bad keywords?
(pothole / crack / defect / damage / bribe / corrupt / incomplete...)
        ↓
   YES → ❌ REJECTED  (confidenceScore: 88–97%)
    NO → ✅ VERIFIED  (confidenceScore: 95–99%)
        ↓
Response sent back to Frontend + Smart Contract
```

**Examples:**
| Proof Payload | Result |
|---|---|
| `https://site.com/concrete-slab-complete.jpg` | ✅ PASS |
| `https://site.com/road-pothole-section-b.jpg` | ❌ FAIL (pothole) |
| `https://site.com/substandard-material-report.pdf` | ❌ FAIL (substandard) |
| `https://drive.google.com/file/abc123` | ✅ PASS |

---

## 🏗️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js (App Router)** | Framework for building the API and Dashboard |
| **Node.js / JavaScript** | Backend language for the endpoint |
| **React** | Frontend dashboard UI |
| **CSS (Custom Dark Theme)** | Glassmorphism design with animations |
| **Git / DC-lab branch** | Version control and code management |

---

## 🔗 How Our Part Connects to the Full System

```
┌─────────────────┐      POST Request       ┌──────────────────────────┐
│  Chapter 1      │ ──────────────────────► │  Chapter 4 (US)          │
│  Frontend UI    │                         │  Oracle AI Endpoint      │
│  (Next.js)      │ ◄────────────────────── │  /api/verify-milestone   │
└─────────────────┘   verified + score      └──────────────────────────┘
                                                        │
                                              x402 Payment Gate
                                            (Chapter 3 wraps us)
                                                        │
                                                        ▼
                                          ┌─────────────────────────┐
                                          │  Smart Contract Escrow  │
                                          │  Release / Hold Funds   │
                                          └─────────────────────────┘
```

---

## 🔮 Future-Proofing (Ready for Real AI)

Our code is designed so that plugging in a **real AI model (Gemini / OpenAI)** requires changing **only ONE function** — `runAIVerification()` in `route.js`.

Everything else (the API contract, error handling, CORS, validation) stays the same.

---

## ✅ What Makes Our Endpoint Strong

| Feature | Status |
|---|---|
| Strict input validation | ✅ Done |
| Safe JSON error handling | ✅ Done |
| CORS headers (for frontend + x402 team) | ✅ Done |
| OPTIONS preflight support | ✅ Done |
| 3-second processing simulation | ✅ Done |
| Realistic confidence scores | ✅ Done |
| Expandable keyword detection | ✅ Done |
| Future AI swap-in ready | ✅ Done |
| Committed to DC-lab Git branch | ✅ Done |

---

## 🚀 How to Run It

1. Make sure you're inside the `Nexora` folder
2. Run the server:
   ```bash
   npm run dev
   ```
3. Open your browser at:
   **`http://localhost:3000`**

---

## 👨‍💻 Team

**Branch:** `DC-lab`
**Workspace:** `Nexora`
**Chapter:** 4 — AI Verification Simulation (The Oracle Endpoint)

---

*Built during the Nirmaan Protocol Hackathon · DC Lab*
