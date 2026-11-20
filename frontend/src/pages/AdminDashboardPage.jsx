import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { AdminLogin } from '../components/admin/AdminLogin';
import { AdminLayout } from '../components/admin/AdminLayout';
import { AdminOverview } from '../components/admin/AdminOverview';
import { AdminProfile } from '../components/admin/AdminProfile';
import { AdminProjects } from '../components/admin/AdminProjects';
import { AdminSkills } from '../components/admin/AdminSkills';
import { AdminExperience } from '../components/admin/AdminExperience';
import { AdminEducation } from '../components/admin/AdminEducation';
import { AdminCertifications } from '../components/admin/AdminCertifications';
import { AdminAchievements } from '../components/admin/AdminAchievements';
import { AdminSocialLinks } from '../components/admin/AdminSocialLinks';
import { AdminResume } from '../components/admin/AdminResume';
import { AdminMessages } from '../components/admin/AdminMessages';
import { getAdminDashboardStats } from '../services/api';

export const AdminDashboardPage = ({ showToast }) => {
  const { isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = async () => {
    if (!isAuthenticated) return;
    try {
      const stats = await getAdminDashboardStats();
      setUnreadCount(stats?.counts?.unread_messages || 0);
    } catch (err) {
      console.error('Failed to query unread messages:', err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUnreadCount();
    }
  }, [isAuthenticated, activeTab]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080c14] flex items-center justify-center font-mono text-cyan-400 text-sm">
        Authenticating session token...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onSuccess={() => setActiveTab('overview')} showToast={showToast} />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverview onNavigate={setActiveTab} showToast={showToast} />;
      case 'profile':
        return <AdminProfile showToast={showToast} />;
      case 'projects':
        return <AdminProjects showToast={showToast} />;
      case 'skills':
        return <AdminSkills showToast={showToast} />;
      case 'experience':
        return <AdminExperience showToast={showToast} />;
      case 'education':
        return <AdminEducation showToast={showToast} />;
      case 'certifications':
        return <AdminCertifications showToast={showToast} />;
      case 'achievements':
        return <AdminAchievements showToast={showToast} />;
      case 'socials':
        return <AdminSocialLinks showToast={showToast} />;
      case 'resume':
        return <AdminResume showToast={showToast} />;
      case 'messages':
        return <AdminMessages showToast={showToast} onRefreshStats={fetchUnreadCount} />;
      default:
        return <AdminOverview onNavigate={setActiveTab} showToast={showToast} />;
    }
  };

  return (
    <AdminLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      unreadCount={unreadCount}
    >
      {renderTabContent()}
    </AdminLayout>
  );
};
