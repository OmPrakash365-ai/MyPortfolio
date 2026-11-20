import React, { useState, useEffect } from 'react';
import { Award, Plus, Edit2, Trash2, ExternalLink, Upload, Calendar, Loader2 } from 'lucide-react';
import { certificationsService } from '../../services/api';
import { Modal } from '../common/Modal';
import { ConfirmDialog } from '../common/ConfirmDialog';

export const AdminCertifications = ({ showToast }) => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    issuing_organization: '',
    issue_date: '',
    credential_id: '',
    credential_url: '',
    order: 0,
  });

  const [badgeFile, setBadgeFile] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, cert: null });

  const fetchCertifications = async () => {
    setLoading(true);
    try {
      const data = await certificationsService.list();
      setCertifications(data);
    } catch (err) {
      console.error('Failed to load certifications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  const handleOpenModal = (cert = null) => {
    if (cert) {
      setEditingCert(cert);
      setFormData({
        name: cert.name,
        issuing_organization: cert.issuing_organization,
        issue_date: cert.issue_date || '',
        credential_id: cert.credential_id || '',
        credential_url: cert.credential_url || '',
        order: cert.order || 0,
      });
    } else {
      setEditingCert(null);
      setFormData({
        name: '',
        issuing_organization: '',
        issue_date: new Date().toISOString().split('T')[0],
        credential_id: '',
        credential_url: '',
        order: 0,
      });
    }
    setBadgeFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== undefined) {
          payload.append(key, formData[key]);
        }
      });
      if (badgeFile) {
        payload.append('badge_image', badgeFile);
      }

      if (editingCert) {
        await certificationsService.update(editingCert.id, payload);
        if (showToast) showToast('Certification updated successfully!', 'success');
      } else {
        await certificationsService.create(payload);
        if (showToast) showToast('Certification added!', 'success');
      }
      setIsModalOpen(false);
      fetchCertifications();
    } catch (err) {
      console.error('Failed to save certification:', err);
      if (showToast) showToast('Failed to save certification.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm.cert) return;
    try {
      await certificationsService.delete(deleteConfirm.cert.id);
      if (showToast) showToast('Certification deleted.', 'success');
      fetchCertifications();
    } catch (err) {
      console.error('Failed to delete certification:', err);
      if (showToast) showToast('Failed to delete certification.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Certifications Management
          </h1>
          <p className="text-xs font-mono text-cyan-400 mt-1">
            MANAGE ACCREDITATIONS, CREDENTIAL IDENTIFIERS & BADGES
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Certification</span>
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center font-mono text-cyan-400 animate-pulse text-sm">
          Loading credentials...
        </div>
      ) : certifications.length === 0 ? (
        <div className="text-center py-12 glass-panel rounded-2xl border border-slate-800 text-slate-400 text-sm">
          No certifications listed yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between gap-4"
            >
              <div>
                <h3 className="text-base font-bold text-white">{cert.name}</h3>
                <h4 className="text-xs font-semibold text-cyan-400 font-mono">
                  {cert.issuing_organization}
                </h4>
                <div className="text-[11px] font-mono text-slate-400 mt-1">
                  Issued: {cert.issue_date} {cert.credential_id && `• ID: ${cert.credential_id}`}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {cert.credential_url && (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-cyan-400"
                    title="Verify online"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button
                  onClick={() => handleOpenModal(cert)}
                  className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-cyan-400"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteConfirm({ isOpen: true, cert })}
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
          title={editingCert ? `Edit Certification` : 'Add New Certification'}
          maxWidth="max-w-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Certification Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="CompTIA Security+ (SY0-601)"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Issuing Organization *
              </label>
              <input
                type="text"
                required
                value={formData.issuing_organization}
                onChange={(e) => setFormData({ ...formData, issuing_organization: e.target.value })}
                placeholder="CompTIA / EC-Council / AWS"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Issue Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.issue_date}
                  onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Credential ID
                </label>
                <input
                  type="text"
                  value={formData.credential_id}
                  onChange={(e) => setFormData({ ...formData, credential_id: e.target.value })}
                  placeholder="COMP001021948"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Credential Verification URL
              </label>
              <input
                type="url"
                value={formData.credential_url}
                onChange={(e) => setFormData({ ...formData, credential_url: e.target.value })}
                placeholder="https://www.credly.com/..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Badge Image (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setBadgeFile(e.target.files[0])}
                className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono"
              />
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
                <span>{editingCert ? 'Save Changes' : 'Create Entry'}</span>
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, cert: null })}
        onConfirm={handleDelete}
        title="Delete Certification"
        message={`Are you sure you want to delete "${deleteConfirm.cert?.name}"?`}
      />

    </div>
  );
};
