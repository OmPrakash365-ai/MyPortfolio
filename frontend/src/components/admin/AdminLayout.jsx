import React, { useState } from 'react';
import {
  Shield,
  LayoutDashboard,
  User,
  Briefcase,
  Layers,
  Cpu,
  GraduationCap,
  Award,
  Trophy,
  Share2,
  FileText,
  Mail,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLayout = ({ activeTab, onTabChange, unreadCount = 0, children }) => {
  const { user, logout } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile & About', icon: <User className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <Layers className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills & Arsenal', icon: <Cpu className="w-4 h-4" /> },
    { id: 'experience', label: 'Work Experience', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'certifications', label: 'Certifications', icon: <Award className="w-4 h-4" /> },
    { id: 'achievements', label: 'Achievements', icon: <Trophy className="w-4 h-4" /> },
    { id: 'socials', label: 'Social Media Links', icon: <Share2 className="w-4 h-4" /> },
    { id: 'resume', label: 'Resume Management', icon: <FileText className="w-4 h-4" /> },
    {
      id: 'messages',
      label: 'Contact Messages',
      icon: <Mail className="w-4 h-4" />,
      badge: unreadCount > 0 ? unreadCount : null,
    },
  ];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col md:flex-row">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-800 bg-slate-950/90 shrink-0 sticky top-0 h-screen overflow-y-auto">
        {/* Brand */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center">
                <Shield className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="font-bold text-white text-sm tracking-tight">Admin Console</span>
              <span className="block text-[10px] font-mono text-cyan-400">SOC // Dashboard</span>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 p-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 shadow-sm shadow-cyan-950'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User bar & Logout */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
            <div className="truncate">
              <span className="text-slate-500 block text-[10px] uppercase font-mono">Logged in as</span>
              <span className="font-semibold text-slate-200">{user?.username || 'Admin'}</span>
            </div>
            <a
              href="/"
              className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="View Public Site"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-rose-950/40 hover:border-rose-500/40 hover:text-rose-300 text-xs font-semibold text-slate-300 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800 sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-cyan-400" />
          <span className="font-bold text-white text-sm">Portfolio Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/"
            className="p-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-300"
            title="View Public Site"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-300"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium ${
                activeTab === item.id
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/40'
                  : 'text-slate-400 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500 text-white">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2.5 mt-2 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs font-semibold text-rose-300"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
        {children}
      </main>

    </div>
  );
};
