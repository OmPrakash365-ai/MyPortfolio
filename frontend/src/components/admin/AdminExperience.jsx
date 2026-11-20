import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  MapPin,
  CheckCircle2,
  X,
  Loader2,
} from 'lucide-react';
import { experiencesService } from '../../services/api';
import { Modal } from '../common/Modal';
import { ConfirmDialog } from '../common/ConfirmDialog';

export const AdminExperience = ({ showToast }) => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    company: '',
    job_title: '',
    employment_type: 'Full-time',
    location: '',
    start_date: '',
    end_date: '',
    is_current: false,
    responsibilities: [],
    achievements: [],
    technologies: [],
    order: 0,
  });

  const [respInput, setRespInput] = useState('');
  const [achInput, setAchInput] = useState('');
  const [techInput, setTechInput] = useState('');

  // Delete State
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, exp: null });

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const data = await experiencesService.list();
      setExperiences(data);
    } catch (err) {
      console.error('Failed to load experiences:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleOpenModal = (exp = null) => {
    if (exp) {
      setEditingExp(exp);
      setFormData({
        company: exp.company,
        job_title: exp.job_title,
        employment_type: exp.employment_type || 'Full-time',
        location: exp.location || '',
        start_date: exp.start_date || '',
        end_date: exp.end_date || '',
        is_current: exp.is_current || false,
        responsibilities: Array.isArray(exp.responsibilities) ? [...exp.responsibilities] : [],
        achievements: Array.isArray(exp.achievements) ? [...exp.achievements] : [],
        technologies: Array.isArray(exp.technologies) ? [...exp.technologies] : [],
        order: exp.order || 0,
      });
    } else {
      setEditingExp(null);
      setFormData({
        company: '',
        job_title: '',
        employment_type: 'Full-time',
        location: 'Remote',
        start_date: '',
        end_date: '',
        is_current: false,
        responsibilities: [],
        achievements: [],
        technologies: [],
        order: 0,
      });
    }
    setRespInput('');
    setAchInput('');
    setTechInput('');
    setIsModalOpen(true);
  };

  const handleAddResp = () => {
    if (!respInput.trim()) return;
    setFormData({ ...formData, responsibilities: [...formData.responsibilities, respInput.trim()] });
    setRespInput('');
  };

  const handleRemoveResp = (idx) => {
    const updated = [...formData.responsibilities];
    updated.splice(idx, 1);
    setFormData({ ...formData, responsibilities: updated });
  };

  const handleAddAch = () => {
    if (!achInput.trim()) return;
    setFormData({ ...formData, achievements: [...formData.achievements, achInput.trim()] });
    setAchInput('');
  };

  const handleRemoveAch = (idx) => {
    const updated = [...formData.achievements];
    updated.splice(idx, 1);
    setFormData({ ...formData, achievements: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...formData,
        end_date: formData.is_current ? null : formData.end_date || null,
      };

      if (editingExp) {
        await experiencesService.update(editingExp.id, payload);
        if (showToast) showToast('Experience record updated successfully!', 'success');
      } else {
        await experiencesService.create(payload);
        if (showToast) showToast('New experience record created!', 'success');
      }
      setIsModalOpen(false);
      fetchExperiences();
    } catch (err) {
      console.error('Failed to save experience:', err);
      if (showToast) showToast('Failed to save experience.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm.exp) return;
    try {
      await experiencesService.delete(deleteConfirm.exp.id);
      if (showToast) showToast('Experience record deleted.', 'success');
      fetchExperiences();
    } catch (err) {
      console.error('Failed to delete experience:', err);
      if (showToast) showToast('Failed to delete record.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Work Experience Timeline
          </h1>
          <p className="text-xs font-mono text-cyan-400 mt-1">
            RECORD EMPLOYMENT HISTORY, RESPONSIBILITIES & ACHIEVEMENTS
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center font-mono text-cyan-400 animate-pulse text-sm">
          Loading employment records...
        </div>
      ) : experiences.length === 0 ? (
        <div className="text-center py-12 glass-panel rounded-2xl border border-slate-800 text-slate-400 text-sm">
          No experience records found. Click "Add Experience" to create your first entry.
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-white">{exp.job_title}</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-800 text-cyan-400">
                    {exp.company}
                  </span>
                  {exp.is_current && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      CURRENT
                    </span>
                  )}
                </div>

                <div className="text-xs font-mono text-slate-400 flex items-center gap-4 mb-2">
                  <span>{exp.start_date} → {exp.is_current ? 'Present' : exp.end_date || 'N/A'}</span>
                  <span>{exp.employment_type}</span>
                  {exp.location && <span>{exp.location}</span>}
                </div>

                <div className="text-xs text-slate-300">
                  {exp.responsibilities?.length || 0} responsibilities listed • {exp.achievements?.length || 0} achievements recorded
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-center">
                <button
                  onClick={() => handleOpenModal(exp)}
                  className="p-2 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-cyan-400"
                  title="Edit Experience"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteConfirm({ isOpen: true, exp })}
                  className="p-2 rounded-xl border border-slate-800 hover:bg-rose-950/40 text-slate-300 hover:text-rose-400"
                  title="Delete Experience"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingExp ? `Edit: ${editingExp.job_title}` : 'Add Experience Record'}
          maxWidth="max-w-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Apex Cloud Systems"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.job_title}
                  onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                  placeholder="Senior Security Engineer"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Employment Type
                </label>
                <select
                  value={formData.employment_type}
                  onChange={(e) => setFormData({ ...formData, employment_type: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="San Francisco, CA (Hybrid)"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Start Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  End Date {!formData.is_current && '*'}
                </label>
                <input
                  type="date"
                  disabled={formData.is_current}
                  required={!formData.is_current}
                  value={formData.end_date || ''}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono disabled:opacity-40"
                />
              </div>
            </div>

            <div>
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.is_current}
                  onChange={(e) => setFormData({ ...formData, is_current: e.target.checked })}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500"
                />
                <span>I currently work here</span>
              </label>
            </div>

            {/* Responsibilities list builder */}
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Responsibilities (Bullet items)
              </label>
              <div className="space-y-1 mb-2">
                {formData.responsibilities.map((r, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
                    <span>• {r}</span>
                    <button type="button" onClick={() => handleRemoveResp(idx)} className="text-slate-400 hover:text-rose-400">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={respInput}
                  onChange={(e) => setRespInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddResp(); } }}
                  placeholder="e.g. Architected core microservice API serving 500k requests..."
                  className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="button"
                  onClick={handleAddResp}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-medium"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Achievements list builder */}
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Key Achievements / Impacts
              </label>
              <div className="space-y-1 mb-2">
                {formData.achievements.map((a, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
                    <span>• {a}</span>
                    <button type="button" onClick={() => handleRemoveAch(idx)} className="text-slate-400 hover:text-rose-400">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={achInput}
                  onChange={(e) => setAchInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddAch(); } }}
                  placeholder="e.g. Decreased vulnerability response turnaround by 42%..."
                  className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="button"
                  onClick={handleAddAch}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-medium"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 text-xs font-medium hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 disabled:opacity-50"
              >
                {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{editingExp ? 'Save Changes' : 'Create Entry'}</span>
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, exp: null })}
        onConfirm={handleDelete}
        title="Delete Experience Record"
        message={`Are you sure you want to delete experience at "${deleteConfirm.exp?.company}"?`}
      />

    </div>
  );
};
