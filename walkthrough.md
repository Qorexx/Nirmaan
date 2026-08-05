# Walkthrough - AI Verification Simulation (Oracle Endpoint)

We have successfully initialized the Next.js workspace and implemented Chapter 4's Oracle AI verification endpoint along with a premium developer dashboard to simulate structural inspection milestones.

---

## 🛠️ Changes Implemented

### 1. Oracle API Endpoint
- **Path**: [route.js](file:///c:/Users/Admin/OneDrive/Desktop/Nexora/app/api/verify-milestone/route.js)
- **Features**:
  - Validates POST parameters (`projectId`, `milestoneId`, `proofType`, `proofPayload`).
  - Implements a simulated 3-second delay (`setTimeout`) to demonstrate loader states.
  - Generates realistic confidence scores (95-99% on success, 88-98% on failure).
  - Triggers failure when the payload contains specified keywords: `pothole`, `crack`, `defect`, `substandard`, `bribe`, `fail`, `damage`.

### 2. Developer Dashboard UI
- **Path**: [page.js](file:///c:/Users/Admin/OneDrive/Desktop/Nexora/app/page.js)
- **Features**:
  - Interactive form fields to customize input payloads.
  - Four simulation preset buttons to test specific successful and failing states instantly.
  - Dynamic scanning lines, loader indicators, and a progress bar showing confidence scores.
  - Glassmorphic card styling and responsive dark mode in [globals.css](file:///c:/Users/Admin/OneDrive/Desktop/Nexora/app/globals.css).

---

## 🧪 Verification Results

We verified the local Next.js development server running on port `3000` with the following simulated payloads:

### Test Case 1: Standard Road Layer (Success)
- **Request**:
  ```json
  {
    "projectId": "12345",
    "milestoneId": 1,
    "proofType": "image",
    "proofPayload": "https://example.com/uploaded-road-image.jpg"
  }
  ```
- **Response**:
  ```json
  {
    "verified": true,
    "confidenceScore": 0.96,
    "message": "AI visual analysis complete. Structural integrity verified. No defects or anomalies detected.",
    "timestamp": "2026-08-05T13:34:41.123Z"
  }
  ```

### Test Case 2: Pothole Detected (Failure)
- **Request**:
  ```json
  {
    "projectId": "12345",
    "milestoneId": 1,
    "proofType": "image",
    "proofPayload": "https://example.com/road-pavement-pothole-segment-b.jpg"
  }
  ```
- **Response**:
  ```json
  {
    "verified": false,
    "confidenceScore": 0.91,
    "message": "AI analysis completed. Structural defect identified: 'pothole' detected in the submitted proof payload. Rejecting milestone.",
    "timestamp": "2026-08-05T13:34:55.990Z"
  }
  ```

---

## 🚀 Next Steps

- **Add Remote**: If you have a remote Git repository (e.g. GitHub/GitLab), you can hook it up and push the branch using:
  ```bash
  git remote add origin <your-git-repo-url>
  git push -u origin DC-lab
  ```
- **Integrating real AI**: Replace the mock logic inside the `runAIVerification` helper in `route.js` with calls to the official `@google/generative-ai` SDK using a Gemini key.
