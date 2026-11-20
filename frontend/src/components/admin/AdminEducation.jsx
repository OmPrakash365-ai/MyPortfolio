import React, { useState, useEffect } from 'react';
import { GraduationCap, Plus, Edit2, Trash2, Calendar, Loader2 } from 'lucide-react';
import { educationsService } from '../../services/api';
import { Modal } from '../common/Modal';
import { ConfirmDialog } from '../common/ConfirmDialog';

export const AdminEducation = ({ showToast }) => {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    course: '',
    start_year: '2017',
    graduation_year: '2021',
    cgpa: '3.9 / 4.0',
    description: '',
    order: 0,
  });

  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, edu: null });

  const fetchEducations = async () => {
    setLoading(true);
    try {
      const data = await educationsService.list();
      setEducations(data);
    } catch (err) {
      console.error('Failed to load education details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  const handleOpenModal = (edu = null) => {
    if (edu) {
      setEditingEdu(edu);
      setFormData({
        institution: edu.institution,
        degree: edu.degree,
        course: edu.course || '',
        start_year: edu.start_year || '',
        graduation_year: edu.graduation_year || '',
        cgpa: edu.cgpa || '',
        description: edu.description || '',
        order: edu.order || 0,
      });
    } else {
      setEditingEdu(null);
      setFormData({
        institution: '',
        degree: '',
        course: '',
        start_year: '2018',
        graduation_year: '2022',
        cgpa: '',
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
      if (editingEdu) {
        await educationsService.update(editingEdu.id, formData);
        if (showToast) showToast('Education details updated successfully!', 'success');
      } else {
        await educationsService.create(formData);
        if (showToast) showToast('Education entry added!', 'success');
      }
      setIsModalOpen(false);
      fetchEducations();
    } catch (err) {
      console.error('Failed to save education:', err);
      if (showToast) showToast('Failed to save education details.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm.edu) return;
    try {
      await educationsService.delete(deleteConfirm.edu.id);
      if (showToast) showToast('Education record deleted.', 'success');
      fetchEducations();
    } catch (err) {
      console.error('Failed to delete education:', err);
      if (showToast) showToast('Failed to delete record.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Education Management
          </h1>
          <p className="text-xs font-mono text-cyan-400 mt-1">
            MANAGE DEGREES, INSTITUTIONS & ACADEMIC ACHIEVEMENTS
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center font-mono text-cyan-400 animate-pulse text-sm">
          Loading education records...
        </div>
      ) : educations.length === 0 ? (
        <div className="text-center py-12 glass-panel rounded-2xl border border-slate-800 text-slate-400 text-sm">
          No education entries found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educations.map((edu) => (
            <div
              key={edu.id}
              className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-cyan-400 font-bold">
                    {edu.start_year} - {edu.graduation_year}
                  </span>
                  {edu.cgpa && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      CGPA: {edu.cgpa}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{edu.degree}</h3>
                <h4 className="text-sm font-semibold text-slate-300 mb-2">{edu.institution}</h4>
                {edu.course && (
                  <p className="text-xs font-mono text-slate-400 mb-2">Major: {edu.course}</p>
                )}
                {edu.description && (
                  <p className="text-xs text-slate-400 line-clamp-3">{edu.description}</p>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-slate-800/80">
                <button
                  onClick={() => handleOpenModal(edu)}
                  className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-cyan-400"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteConfirm({ isOpen: true, edu })}
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
          title={editingEdu ? `Edit Education` : 'Add Education Record'}
          maxWidth="max-w-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Institution Name *
              </label>
              <input
                type="text"
                required
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                placeholder="California State University"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Degree *
                </label>
                <input
                  type="text"
                  required
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  placeholder="Bachelor of Science in CS"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Course / Major
                </label>
                <input
                  type="text"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  placeholder="Information Security & Systems"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Start Year
                </label>
                <input
                  type="text"
                  value={formData.start_year}
                  onChange={(e) => setFormData({ ...formData, start_year: e.target.value })}
                  placeholder="2017"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Graduation Year *
                </label>
                <input
                  type="text"
                  required
                  value={formData.graduation_year}
                  onChange={(e) => setFormData({ ...formData, graduation_year: e.target.value })}
                  placeholder="2021"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  CGPA / Honors
                </label>
                <input
                  type="text"
                  value={formData.cgpa}
                  onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                  placeholder="3.92 / 4.00"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Description / Coursework / Honors
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Coursework in Cryptography, Distributed Systems, Software Engineering..."
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
                <span>{editingEdu ? 'Save Changes' : 'Create Entry'}</span>
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, edu: null })}
        onConfirm={handleDelete}
        title="Delete Education Record"
        message={`Are you sure you want to delete education at "${deleteConfirm.edu?.institution}"?`}
      />

    </div>
  );
};
