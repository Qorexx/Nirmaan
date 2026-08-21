'use client';

import React, { createContext, useContext, useState } from 'react';
import { INITIAL_PROJECTS, INITIAL_LEDGER, executeX402VerificationWorkflow } from './nirmaanState';

const NirmaanContext = createContext(null);

export function NirmaanProvider({ children }) {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [ledger, setLedger] = useState(INITIAL_LEDGER);

  const updateMilestone = (projectId, milestoneId, updates) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      return {
        ...p,
        milestones: p.milestones.map(m => m.id === milestoneId ? { ...m, ...updates } : m)
      };
    }));
  };

  const updateProjectStatus = (projectId, status) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, status } : p));
  };

  const processContractorSubmission = async (projectId, milestoneId, proofPayload, iotPayload, eWayBillHash, exifPayload, logCallback) => {
    const result = await executeX402VerificationWorkflow({
      projectId,
      milestoneId,
      proofPayload,
      iotPayload,
      eWayBillHash,
      exifPayload,
      onStepChange: () => {}, // Handled locally in UI usually, but context manages it here
      onLogMessage: logCallback,
    });

    if (result.success) {
      updateMilestone(projectId, milestoneId, {
        status: result.status, // 'TIME_LOCKED' or 'DISPUTED'
        proof: proofPayload,
        iotTelemetry: iotPayload,
        eWayBillHash: eWayBillHash,
        exifPayload: exifPayload,
        timeLockExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      });
      updateProjectStatus(projectId, result.status);
    }
    return result;
  };

  const stakeCitizenDispute = (projectId, citizenPhoto) => {
    // Mock IPFS CID generation
    const ipfsCID = 'ipfs://Qm' + Array.from({ length: 44 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      return {
        ...p,
        status: 'DISPUTED',
        // Update the active time-locked milestone with dispute data
        milestones: p.milestones.map(m => m.status === 'TIME_LOCKED' ? {
          ...m,
          status: 'DISPUTED',
          ipfsCID: ipfsCID,
          stakedAmount: 500,
          citizenEvidence: citizenPhoto
        } : m)
      };
    }));
    return ipfsCID;
  };

  const settleViaPFMS = (projectId) => {
    updateProjectStatus(projectId, 'PFMS_SETTLED');
    // In a real app, we'd add to the ledger here too
  };

  return (
    <NirmaanContext.Provider value={{
      projects,
      ledger,
      processContractorSubmission,
      stakeCitizenDispute,
      settleViaPFMS
    }}>
      {children}
    </NirmaanContext.Provider>
  );
}

export function useNirmaan() {
  const context = useContext(NirmaanContext);
  if (!context) throw new Error('useNirmaan must be used within a NirmaanProvider');
  return context;
}
