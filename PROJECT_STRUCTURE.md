# Nirmaan x402 - Project Structure Guide

This document explains where each team member should work. Please do not modify folders assigned to other chapters unless necessary and communicate before making cross-module changes.

---

# Folder Structure

```
nirmaan-x402/

│

├── app/
│   ├── api/
│   ├── government/
│   ├── contractor/
│   ├── layout.tsx
│   ├── globals.css
│   └── page.tsx
│
├── components/
├── constants/
├── hooks/
├── lib/
├── services/
├── styles/
├── types/
├── utils/
├── public/
```

---

# Chapter Responsibilities

## Chapter 1 – Core Setup (Completed)

Responsible for:

- Next.js setup
- Project architecture
- Global styling
- Folder structure
- Shared layout
- Placeholder API routes
- Reusable components

Main folders:

```
app/
components/
styles/
constants/
```

---

## Chapter 2 – Escrow Logic & Smart Contract

Responsible for:

- Smart Contract
- Escrow logic
- Web3 integration
- Contract deployment
- Blockchain state management

Main folders:

```
contracts/
lib/
services/
types/
```

Suggested additions:

```
contracts/
artifacts/
```

---

## Chapter 3 – x402 Protocol

Responsible for:

- Machine-to-machine payment flow
- Wallet integration
- API payment verification
- x402 implementation

Main folders:

```
app/api/
services/
lib/
```

Expected APIs:

```
app/api/inspect-milestone/
app/api/payment/
```

---

## Chapter 4 – AI Verification

Responsible for:

- AI verification service
- Image analysis
- Verification result
- Oracle simulation

Main folders:

```
app/api/verify-milestone/
services/
utils/
```

Do not modify frontend pages.

---

## Chapter 5 – Dashboard UI

Responsible for:

- Government Dashboard
- Contractor Portal
- Live Activity Logs
- Dashboard components

Main folders:

```
app/government/
app/contractor/
components/
```

Should reuse shared components instead of creating duplicates.

---

## Data Simulator

Responsible for:

- Fake IoT data generation
- Truck telemetry
- Live sensor simulation
- Corruption simulation

Main folders:

```
app/api/simulator/
services/
types/
utils/
```

Suggested APIs:

```
GET /api/simulator

POST /api/simulator/start

POST /api/simulator/stop

POST /api/simulator/scenario
```

---

# Shared Components

All reusable UI components should be created here.

```
components/

Navbar

Sidebar

Button

Card

Modal

Loader

Badge
```

---

# Shared Types

Interfaces and types used by multiple modules.

```
types/

project.ts

truck.ts

verification.ts
```

---

# Shared Utilities

Utility functions.

```
utils/

format.ts

random.ts

helpers.ts
```

---

# Services

Business logic that can be reused.

```
services/

simulator.ts

verification.ts

wallet.ts
```

---

# Rules

✅ Keep components reusable.

✅ Do not duplicate code.

✅ Create a separate Git branch for your feature.

✅ Open a Pull Request before merging.

✅ Do not push directly to `main` unless agreed by the team.

✅ Keep commits small and descriptive.

Example:

```
feat: add simulator API

fix: navbar responsive layout

docs: update project structure
```

---

Happy Coding 🚀