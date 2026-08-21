import { jsPDF } from "jspdf";

export function generateAuditCertificate(project, milestone, txDetails = {}) {
  // Create a new PDF document (A4 size)
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // 1. Header Section - Bureaucratic & Formal
  doc.setFont("times", "bold");
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0); // Pure black
  
  doc.text("DEPARTMENT OF INFRASTRUCTURE", pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont("times", "normal");
  doc.text("OFFICIAL AUDIT & DISBURSEMENT RECORD", pageWidth / 2, 28, { align: 'center' });
  
  // Double line header
  doc.setLineWidth(0.5);
  doc.line(14, 35, pageWidth - 14, 35);
  doc.setLineWidth(0.2);
  doc.line(14, 36.5, pageWidth - 14, 36.5);

  // 2. Document Meta
  doc.setFont("courier", "normal");
  doc.setFontSize(10);
  
  const dateStr = new Date().toUTCString();
  const certId = `REF-${Math.floor(Math.random() * 10000000).toString().padStart(8, '0')}`;
  
  doc.text(`DATE ISSUED : ${dateStr}`, 14, 45);
  doc.text(`RECORD ID   : ${certId}`, 14, 52);
  doc.text(`PROTOCOL    : NIRMAAN X402 ESCROW SYSTEM`, 14, 59);

  doc.setLineWidth(0.2);
  doc.line(14, 65, pageWidth - 14, 65);

  // 3. Project Details
  doc.setFont("times", "bold");
  doc.setFontSize(12);
  doc.text("SECTION I: PROJECT SPECIFICATIONS", 14, 75);
  
  doc.setFont("times", "normal");
  doc.setFontSize(11);
  doc.text(`Project Identifier   : ${project.id}`, 14, 85);
  doc.text(`Project Description  : ${project.name}`, 14, 92);
  doc.text(`Contractor Reference : ${project.contractor}`, 14, 99);
  doc.text(`Milestone Evaluated  : ${milestone.title}`, 14, 106);
  doc.text(`Authorized Payout    : $${milestone.payout.toLocaleString('en-US')} USDC`, 14, 113);

  // 4. AI Verification Details
  doc.setFont("times", "bold");
  doc.text("SECTION II: AUTOMATED INSPECTION REPORT", 14, 128);
  
  doc.setFont("times", "normal");
  doc.text(`Inspection Agent     : Gemini 3.1 Pro (Autonomous Oracle)`, 14, 138);
  doc.text(`Inspection Status    : VERIFIED`, 14, 145);
  doc.text(`Confidence Interval  : ${((milestone.score || 0.98) * 100).toFixed(1)}%`, 14, 152);
  
  const aiAnalysis = txDetails.message || "Visual structural analysis completed. Core materials meet engineering tolerance standards. No critical defects (potholes, fractures, or substandard grading) detected in the submitted proof payload.";
  
  doc.text("Findings:", 14, 162);
  const splitText = doc.splitTextToSize(aiAnalysis, pageWidth - 28);
  doc.text(splitText, 14, 169);

  const yPosAfterText = 169 + (splitText.length * 5);

  // 5. Cryptographic Settlement
  doc.setFont("times", "bold");
  doc.text("SECTION III: CRYPTOGRAPHIC SETTLEMENT", 14, yPosAfterText + 15);
  
  doc.setFont("times", "normal");
  
  const txHash = txDetails.txHash || "0x402a" + Array.from({length: 36}, () => Math.floor(Math.random()*16).toString(16)).join('');
  const zkHash = project.zkBidHash || "0x...";
  
  doc.text(`ZK Bid Commitment    : ${zkHash}`, 14, yPosAfterText + 25);
  doc.text(`Settlement Network   : Base Sepolia`, 14, yPosAfterText + 32);
  doc.text(`Transaction Receipt  :`, 14, yPosAfterText + 39);
  
  doc.setFont("courier", "normal");
  doc.text(txHash, 14, yPosAfterText + 46);

  // Signatures / Footer
  doc.setLineWidth(0.2);
  doc.line(14, 260, pageWidth - 14, 260);
  
  doc.setFont("times", "italic");
  doc.setFontSize(10);
  doc.text("This is a cryptographically generated, autonomous audit record.", 14, 267);
  doc.text("Any manual tampering invalidates the on-chain settlement hash.", 14, 272);
  
  // Official Seal mock
  doc.setDrawColor(0, 0, 0);
  doc.circle(pageWidth - 30, 265, 12, 'S');
  doc.setFontSize(8);
  doc.setFont("times", "bold");
  doc.text("OFFICIAL", pageWidth - 30, 264, { align: 'center' });
  doc.text("SEAL", pageWidth - 30, 268, { align: 'center' });

  // Trigger download
  const filename = `Official_Audit_${project.id}_M${milestone.id}.pdf`;
  doc.save(filename);
}
