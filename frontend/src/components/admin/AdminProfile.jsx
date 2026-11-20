import React, { useState, useEffect } from 'react';
import { User, Save, Upload, Plus, X, Loader2, CheckCircle2 } from 'lucide-react';
import { getAdminProfile, updateAdminProfile } from '../../services/api';

export const AdminProfile = ({ showToast }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  const fetchProfile = async () => {
    try {
      const data = await getAdminProfile();
      setProfile(data);
      if (data.avatar) {
        setAvatarPreview(data.avatar);
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleAddTitle = () => {
    if (!newTitle.trim()) return;
    const currentTitles = Array.isArray(profile.typing_titles) ? [...profile.typing_titles] : [];
    currentTitles.push(newTitle.trim());
    setProfile({ ...profile, typing_titles: currentTitles });
    setNewTitle('');
  };

  const handleRemoveTitle = (index) => {
    const currentTitles = [...profile.typing_titles];
    currentTitles.splice(index, 1);
    setProfile({ ...profile, typing_titles: currentTitles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();
      Object.keys(profile).forEach((key) => {
        if (key === 'avatar') return;
        if (key === 'typing_titles') {
          formData.append(key, JSON.stringify(profile[key]));
        } else if (profile[key] !== null && profile[key] !== undefined) {
          formData.append(key, profile[key]);
        }
      });

      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      const updated = await updateAdminProfile(formData);
      setProfile(updated);
      if (showToast) showToast('Profile details updated successfully! Live site reflects new data.', 'success');
    } catch (err) {
      console.error('Failed to update profile:', err);
      if (showToast) showToast('Failed to save profile changes.', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center font-mono text-cyan-400 animate-pulse text-sm">
        Loading profile telemetry...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Profile & Biography Configuration
          </h1>
          <p className="text-xs font-mono text-cyan-400 mt-1">
            MANAGE HERO IDENTITY, RESUME DATA & MISSION STATEMENTS
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save Changes</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Basic Identity & Avatar */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="text-sm font-bold text-white uppercase font-mono text-cyan-400">
            01 // Primary Identity & Visuals
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Avatar Preview & Upload */}
            <div className="md:col-span-4 flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950 flex items-center justify-center overflow-hidden mb-3 relative group">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-slate-600" />
                )}
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity text-white text-xs font-mono">
                  <Upload className="w-5 h-5 mb-1" />
                  <span>Change Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Recommended: Square PNG/JPG (400x400)
              </span>
            </div>

            {/* Core Fields */}
            <div className="md:col-span-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profile?.name || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Professional Tagline
                  </label>
                  <input
                    type="text"
                    name="tagline"
                    value={profile?.tagline || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Animated Typing Titles */}
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Animated Hero Typing Titles
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {Array.isArray(profile?.typing_titles) &&
                    profile.typing_titles.map((title, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 flex items-center gap-1.5"
                      >
                        <span>{title}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTitle(idx)}
                          className="hover:text-rose-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Penetration Tester"
                    className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddTitle}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-medium flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Title</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Short Intro */}
          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
              Hero Section Introduction (Short)
            </label>
            <textarea
              name="short_intro"
              rows={2}
              value={profile?.short_intro || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
            ></textarea>
          </div>
        </div>

        {/* Detailed Statements & Biography */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="text-sm font-bold text-white uppercase font-mono text-cyan-400">
            02 // About Me, Statements & Goals
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Full Biography (About Me section)
              </label>
              <textarea
                name="about_biography"
                rows={4}
                value={profile?.about_biography || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Professional Summary
                </label>
                <textarea
                  name="professional_summary"
                  rows={3}
                  value={profile?.professional_summary || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Career Objectives
                </label>
                <textarea
                  name="career_objectives"
                  rows={3}
                  value={profile?.career_objectives || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
                ></textarea>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Personal Interests & CTF
                </label>
                <textarea
                  name="personal_interests"
                  rows={3}
                  value={profile?.personal_interests || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Long-Term Career Goals
                </label>
                <textarea
                  name="career_goals"
                  rows={3}
                  value={profile?.career_goals || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info & Stats */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="text-sm font-bold text-white uppercase font-mono text-cyan-400">
            03 // Contact Details & Hero Metrics
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Contact Email
              </label>
              <input
                type="email"
                name="email"
                value={profile?.email || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={profile?.phone || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={profile?.location || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Years Exp.
              </label>
              <input
                type="number"
                name="years_of_experience"
                value={profile?.years_of_experience || 0}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Projects Completed
              </label>
              <input
                type="number"
                name="projects_completed"
                value={profile?.projects_completed || 0}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Tech Mastered
              </label>
              <input
                type="number"
                name="technologies_mastered"
                value={profile?.technologies_mastered || 0}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Security Audits
              </label>
              <input
                type="number"
                name="security_assessments"
                value={profile?.security_assessments || 0}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Open to Work Toggle */}
          <div className="pt-2">
            <label className="inline-flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="open_to_work"
                checked={profile?.open_to_work || false}
                onChange={handleChange}
                className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-cyan-500"
              />
              <span className="text-sm font-medium text-slate-200">
                Mark profile as "Open to High-Impact Opportunities"
              </span>
            </label>
          </div>
        </div>

      </form>
    </div>
  );
};
