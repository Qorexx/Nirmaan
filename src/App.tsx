import React, { useEffect } from 'react';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { LandingPage } from './pages/LandingPage';
import { ArchitectureShowcasePage } from './pages/ArchitectureShowcasePage';
import { GovernmentCommandCenterPage } from './pages/GovernmentCommandCenterPage';
import { ProjectExplorerPage } from './pages/ProjectExplorerPage';
import { ContractorWorkspacePage } from './pages/ContractorWorkspacePage';
import { MissionControlPage } from './pages/MissionControlPage';
import { EscrowTreasuryPage } from './pages/EscrowTreasuryPage';
import { TrustExplorerPage } from './pages/TrustExplorerPage';
import { AnalyticsSuitePage } from './pages/AnalyticsSuitePage';
import { ComplianceDashboardPage } from './pages/ComplianceDashboardPage';
import { SettingsPage } from './pages/SettingsPage';
import { useEscrowStore } from './store/useEscrowStore';
import { LoginModal } from './components/auth/LoginModal';

export default function App() {
  const { currentPage, theme, setTheme } = useEscrowStore();

  useEffect(() => {
    // Initialize theme on mount
    setTheme(theme);
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        setTheme('system');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, setTheme]);

  const renderPage = () => {
    switch (currentPage) {
      case 'landing': return <LandingPage />;
      case 'architecture': return <ArchitectureShowcasePage />;
      case 'command-center': return <GovernmentCommandCenterPage />;
      case 'projects': return <ProjectExplorerPage />;
      case 'workspace': return <ContractorWorkspacePage />;
      case 'mission-control': return <MissionControlPage />;
      case 'treasury': return <EscrowTreasuryPage />;
      case 'explorer': return <TrustExplorerPage />;
      case 'analytics': return <AnalyticsSuitePage />;
      case 'compliance': return <ComplianceDashboardPage />;
      case 'settings': return <SettingsPage />;
      default: return <LandingPage />;
    }
  };

  return (
    <>
      <DashboardLayout>
        {renderPage()}
      </DashboardLayout>
      <LoginModal />
    </>
  );
}
