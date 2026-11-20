import React, { useState, useEffect } from 'react';
import { Trophy, Plus, Edit2, Trash2, Calendar, Award, Loader2 } from 'lucide-react';
import { achievementsService } from '../../services/api';
import { Modal } from '../common/Modal';
import { ConfirmDialog } from '../common/ConfirmDialog';

export const AdminAchievements = ({ showToast }) => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAch, setEditingAch] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    organization_or_event: '',
    date: '',
    description: '',
    order: 0,
  });

  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, ach: null });

  const fetchAchievements = async () => {
    setLoading(true);
    try {
      const data = await achievementsService.list();
      setAchievements(data);
    } catch (err) {
      console.error('Failed to load achievements:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleOpenModal = (ach = null) => {
    if (ach) {
      setEditingAch(ach);
      setFormData({
        title: ach.title,
        organization_or_event: ach.organization_or_event || '',
        date: ach.date || '',
        description: ach.description || '',
        order: ach.order || 0,
      });
    } else {
      setEditingAch(null);
      setFormData({
        title: '',
        organization_or_event: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        order: 0,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingAch) {
        await achievementsService.update(editingAch.id, formData);
        if (showToast) showToast('Achievement updated!', 'success');
      } else {
        await achievementsService.create(formData);
        if (showToast) showToast('Achievement added!', 'success');
      }
      setIsModalOpen(false);
      fetchAchievements();
    } catch (err) {
      console.error('Failed to save achievement:', err);
      if (showToast) showToast('Failed to save achievement.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm.ach) return;
    try {
      await achievementsService.delete(deleteConfirm.ach.id);
      if (showToast) showToast('Achievement deleted.', 'success');
      fetchAchievements();
    } catch (err) {
      console.error('Failed to delete achievement:', err);
      if (showToast) showToast('Failed to delete.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Honors & Achievements
          </h1>
          <p className="text-xs font-mono text-cyan-400 mt-1">
            RECORD CTF VICTORIES, HACKATHON AWARDS & DISCLOSURES
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Achievement</span>
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center font-mono text-cyan-400 animate-pulse text-sm">
          Loading achievements...
        </div>
      ) : achievements.length === 0 ? (
        <div className="text-center py-12 glass-panel rounded-2xl border border-slate-800 text-slate-400 text-sm">
          No achievements listed yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-cyan-400 font-bold">{ach.date}</span>
                  <Trophy className="w-4 h-4 text-amber-400" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">{ach.title}</h3>
                {ach.organization_or_event && (
                  <h4 className="text-xs font-semibold text-amber-300 font-mono mb-2">
                    {ach.organization_or_event}
                  </h4>
                )}
                <p className="text-xs text-slate-400 line-clamp-3">{ach.description}</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 mt-3 border-t border-slate-800/80">
                <button
                  onClick={() => handleOpenModal(ach)}
                  className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-cyan-400"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteConfirm({ isOpen: true, ach })}
                  className="p-1.5 rounded-lg border border-slate-800 hover:bg-rose-950/40 text-slate-300 hover:text-rose-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
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
          title={editingAch ? `Edit Achievement` : 'Add New Achievement'}
          maxWidth="max-w-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Achievement Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="1st Place Winner - Cyber Defense CTF"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Event / Organization
                </label>
                <input
                  type="text"
                  value={formData.organization_or_event}
                  onChange={(e) => setFormData({ ...formData, organization_or_event: e.target.value })}
                  placeholder="National Cyber League"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Date Awarded *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Description *
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Led team defending network topology against adversary red team attacks..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              ></textarea>
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
                <span>{editingAch ? 'Save Changes' : 'Create Entry'}</span>
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, ach: null })}
        onConfirm={handleDelete}
        title="Delete Achievement"
        message={`Are you sure you want to delete "${deleteConfirm.ach?.title}"?`}
      />

    </div>
  );
};
