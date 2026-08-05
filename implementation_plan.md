# Implementation Plan - AI Verification Simulation (Oracle Endpoint)

We will build a Mock AI Verification Endpoint that simulates construction milestone analysis. The endpoint will support customizable fail conditions (e.g., detecting keywords like "pothole" or "defect" in the payload) and a simulated 3-second network latency to support loading indicators on the frontend. 

To make it interactive and easily testable, we will initialize a Next.js application in the current directory and build a **Developer Dashboard UI** at `/` to let users trigger successful and failing verification requests.

---

## Proposed Changes

### [Next.js App Core]
We will initialize a Next.js project with an App Router using Javascript and basic configurations.

#### [NEW] [route.js](file:///c:/Users/Admin/OneDrive/Desktop/Nexora/app/api/verify-milestone/route.js)
Contains the POST handler that adheres to the Chapter 4 contract:
- Parses the JSON body for `projectId`, `milestoneId`, `proofType`, and `proofPayload`.
- Runs a modular `runAIVerification` helper.
- Simulates a 3-second delay.
- Returns the standard JSON format response.

#### [NEW] [page.js](file:///c:/Users/Admin/OneDrive/Desktop/Nexora/app/page.js)
An interactive developer testing dashboard showing:
- Input forms for `projectId`, `milestoneId`, `proofType`, and `proofPayload`.
- Standard presets (e.g., "Perfect Road", "Road with Potholes", "Damaged Asphalt").
- Real-time simulation showing the 3-second loading spinner and JSON responses.

#### [NEW] [globals.css](file:///c:/Users/Admin/OneDrive/Desktop/Nexora/app/globals.css)
Theme files for glassmorphism, gradients, and custom animations for a premium dark mode layout.

---

## Verification Plan

### Automated Verification
We will run the Next.js development server and verify the API using `curl` or PowerShell `Invoke-RestMethod`:

```powershell
# Run the local Next.js server
npm run dev

# Test passing case
Invoke-RestMethod -Uri "http://localhost:3000/api/verify-milestone" -Method POST -ContentType "application/json" -Body '{"projectId": "12345", "milestoneId": 1, "proofType": "image", "proofPayload": "https://example.com/perfect-road.jpg"}'

# Test failing case
Invoke-RestMethod -Uri "http://localhost:3000/api/verify-milestone" -Method POST -ContentType "application/json" -Body '{"projectId": "12345", "milestoneId": 1, "proofType": "image", "proofPayload": "https://example.com/road-with-pothole.jpg"}'
```

### Manual Verification
- Launch the UI dashboard on `http://localhost:3000`.
- Verify that presets trigger different API behaviors (pass / fail).
- Verify the 3-second visual loader.
