import React, { useState, useEffect } from 'react';
import {
  Layers,
  Cpu,
  Award,
  Briefcase,
  Mail,
  User,
  Plus,
  ArrowRight,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { getAdminDashboardStats, messagesService } from '../../services/api';

export const AdminOverview = ({ onNavigate, showToast }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await getAdminDashboardStats();
      setStats(res);
    } catch (err) {
      console.error('Failed to load stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleMarkAsRead = async (messageId) => {
    try {
      await messagesService.partialUpdate(messageId, { is_read: true });
      fetchStats();
      if (showToast) showToast('Message marked as read', 'success');
    } catch (err) {
      console.error('Failed to update message:', err);
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center font-mono text-cyan-400 animate-pulse text-sm">
        Querying portfolio database statistics...
      </div>
    );
  }

  const counts = stats?.counts || {};

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Security Operations & Content Console
          </h1>
          <p className="text-xs font-mono text-cyan-400 mt-1">
            ALL SYSTEMS NOMINAL // DATABASE REAL-TIME SYNC
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
          >
            <span>Live Portfolio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => onNavigate('projects')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Project</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Projects */}
        <div
          onClick={() => onNavigate('projects')}
          className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400 uppercase">Projects</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">
            {counts.projects || 0}
          </div>
          <div className="text-[11px] font-mono text-cyan-400">
            {counts.featured_projects || 0} Featured projects
          </div>
        </div>

        {/* Skills */}
        <div
          onClick={() => onNavigate('skills')}
          className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-purple-500/40 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400 uppercase">Arsenal Skills</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">
            {counts.skills || 0}
          </div>
          <div className="text-[11px] font-mono text-purple-400">
            Categorized technical skills
          </div>
        </div>

        {/* Certifications */}
        <div
          onClick={() => onNavigate('certifications')}
          className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400 uppercase">Certifications</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">
            {counts.certifications || 0}
          </div>
          <div className="text-[11px] font-mono text-emerald-400">
            Industry verified credentials
          </div>
        </div>

        {/* Contact Messages */}
        <div
          onClick={() => onNavigate('messages')}
          className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-rose-500/40 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400 uppercase">Inbox Messages</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 group-hover:scale-110 transition-transform">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">
            {counts.messages || 0}
          </div>
          <div className="text-[11px] font-mono text-rose-400 font-bold">
            {counts.unread_messages || 0} Unread inquiries
          </div>
        </div>
      </div>

      {/* Quick Action Hub */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-4 text-cyan-400">
          Fast Config Controls
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => onNavigate('profile')}
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-left transition-all group"
          >
            <User className="w-5 h-5 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-white">Edit Bio & Intro</div>
            <div className="text-[10px] text-slate-400">Titles & Personal Info</div>
          </button>

          <button
            onClick={() => onNavigate('projects')}
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-left transition-all group"
          >
            <Layers className="w-5 h-5 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-white">Manage Projects</div>
            <div className="text-[10px] text-slate-400">Add, edit, delete work</div>
          </button>

          <button
            onClick={() => onNavigate('skills')}
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-left transition-all group"
          >
            <Cpu className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-white">Update Skills</div>
            <div className="text-[10px] text-slate-400">Proficiencies & Categories</div>
          </button>

          <button
            onClick={() => onNavigate('resume')}
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-left transition-all group"
          >
            <Award className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-white">Upload Resume</div>
            <div className="text-[10px] text-slate-400">Publish latest PDF copy</div>
          </button>
        </div>
      </div>

      {/* Recent Contact Inquiries */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Recent Inquiries & Transmissions
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Inbound messages sent via the public portfolio contact form.
            </p>
          </div>
          <button
            onClick={() => onNavigate('messages')}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>View All ({counts.messages || 0})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {stats?.recent_messages?.length === 0 ? (
          <div className="text-center py-8 text-xs font-mono text-slate-500">
            No contact submissions received yet.
          </div>
        ) : (
          <div className="divide-y divide-slate-800/80">
            {stats?.recent_messages?.map((msg) => (
              <div key={msg.id} className="py-3 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-white">{msg.name}</span>
                    <span className="text-xs font-mono text-slate-400">({msg.email})</span>
                    {!msg.is_read && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-rose-500/20 text-rose-400 border border-rose-500/30">
                        NEW
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-cyan-400 mb-1">{msg.subject}</div>
                  <p className="text-xs text-slate-400 line-clamp-1">{msg.message}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {!msg.is_read && (
                    <button
                      onClick={() => handleMarkAsRead(msg.id)}
                      className="text-xs font-mono text-slate-400 hover:text-emerald-400 p-1"
                      title="Mark as read"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white"
                  >
                    Reply
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
