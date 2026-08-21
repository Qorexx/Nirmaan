'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PROJECTS, INITIAL_LEDGER, executeX402VerificationWorkflow } from './nirmaanState';

const NirmaanContext = createContext(null);

export function NirmaanProvider({ children }) {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [ledger, setLedger] = useState(INITIAL_LEDGER);

  // Poll the server every 1 second to sync state across all 3 devices
  useEffect(() => {
    const fetchState = async () => {
      try {
        const res = await fetch('/api/sync-state');
        const data = await res.json();
        if (data.projects) setProjects(data.projects);
      } catch (err) {
        console.error("Sync error:", err);
      }
    };
    fetchState();
    const interval = setInterval(fetchState, 1000);
    return () => clearInterval(interval);
  }, []);

  // Helper to push state changes to the server so other devices see it
  const broadcastState = async (newProjects) => {
    setProjects(newProjects);
    try {
      await fetch('/api/sync-state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projects: newProjects })
      });
    } catch (err) {
      console.error("Failed to broadcast state:", err);
    }
  };

  const updateMilestone = (projectId, milestoneId, updates) => {
    const newProjects = projects.map(p => {
      if (p.id !== projectId) return p;
      return {
        ...p,
        milestones: p.milestones.map(m => m.id === milestoneId ? { ...m, ...updates } : m)
      };
    });
    broadcastState(newProjects);
  };

  const updateProjectStatus = (projectId, status) => {
    const newProjects = projects.map(p => p.id === projectId ? { ...p, status } : p);
    broadcastState(newProjects);
  };

  const processContractorSubmission = async (projectId, milestoneId, proofPayload, iotPayload, eWayBillHash, exifPayload, logCallback) => {
    const result = await executeX402VerificationWorkflow({
      projectId,
      milestoneId,
      proofPayload,
      iotPayload,
      eWayBillHash,
      exifPayload,
      onStepChange: () => {}, // Handled locally in UI usually
      onLogMessage: logCallback,
    });

    if (result.success) {
      const newProjects = projects.map(p => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          status: result.status,
          milestones: p.milestones.map(m => m.id === milestoneId ? {
            ...m,
            status: result.status,
            proof: proofPayload,
            iotTelemetry: iotPayload,
            eWayBillHash: eWayBillHash,
            exifPayload: exifPayload,
            timeLockExpiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
          } : m)
        };
      });
      broadcastState(newProjects);
    }
    return result;
  };

  const stakeCitizenDispute = (projectId, citizenPhoto) => {
    // Mock IPFS CID generation
    const ipfsCID = 'ipfs://Qm' + Array.from({ length: 44 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    
    const newProjects = projects.map(p => {
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
    });
    
    broadcastState(newProjects);
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
