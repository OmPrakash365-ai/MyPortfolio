import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioPage } from './pages/PortfolioPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { Toast } from './components/common/Toast';
import { NotFound } from './components/common/NotFound';

export function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const renderRoute = () => {
    if (currentPath === '/' || currentPath === '' || currentPath.startsWith('/project/')) {
      return <PortfolioPage showToast={showToast} />;
    }
    if (currentPath.startsWith('/admin') || currentPath.startsWith('/login')) {
      return <AdminDashboardPage showToast={showToast} />;
    }
    return <NotFound />;
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-[#061224] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-300">
          {renderRoute()}
          {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
