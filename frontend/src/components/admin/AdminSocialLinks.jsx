import React, { useState, useEffect } from 'react';
import { Share2, Plus, Edit2, Trash2, ExternalLink, Loader2 } from 'lucide-react';
import { socialLinksService } from '../../services/api';
import { Modal } from '../common/Modal';
import { ConfirmDialog } from '../common/ConfirmDialog';

export const AdminSocialLinks = ({ showToast }) => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    platform: 'github',
    title: '',
    url: '',
    icon_name: 'Github',
    is_active: true,
    order: 0,
  });

  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, link: null });

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const data = await socialLinksService.list();
      setLinks(data);
    } catch (err) {
      console.error('Failed to load social links:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleOpenModal = (link = null) => {
    if (link) {
      setEditingLink(link);
      setFormData({
        platform: link.platform,
        title: link.title || '',
        url: link.url,
        icon_name: link.icon_name || 'Github',
        is_active: link.is_active,
        order: link.order || 0,
      });
    } else {
      setEditingLink(null);
      setFormData({
        platform: 'github',
        title: '',
        url: '',
        icon_name: 'Github',
        is_active: true,
        order: 0,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingLink) {
        await socialLinksService.update(editingLink.id, formData);
        if (showToast) showToast('Social link updated!', 'success');
      } else {
        await socialLinksService.create(formData);
        if (showToast) showToast('Social link created!', 'success');
      }
      setIsModalOpen(false);
      fetchLinks();
    } catch (err) {
      console.error('Failed to save social link:', err);
      if (showToast) showToast('Failed to save link.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm.link) return;
    try {
      await socialLinksService.delete(deleteConfirm.link.id);
      if (showToast) showToast('Social link deleted.', 'success');
      fetchLinks();
    } catch (err) {
      console.error('Failed to delete social link:', err);
      if (showToast) showToast('Failed to delete link.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Social & Platform Links
          </h1>
          <p className="text-xs font-mono text-cyan-400 mt-1">
            MANAGE EXTERNAL PROFILES, GITHUB, LINKEDIN & SECURITY PLATFORMS
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Social Link</span>
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center font-mono text-cyan-400 animate-pulse text-sm">
          Loading social accounts...
        </div>
      ) : links.length === 0 ? (
        <div className="text-center py-12 glass-panel rounded-2xl border border-slate-800 text-slate-400 text-sm">
          No social links configured yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((link) => (
            <div
              key={link.id}
              className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-3"
            >
              <div className="truncate">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white truncate">
                    {link.title || link.platform}
                  </span>
                  {!link.is_active && (
                    <span className="text-[10px] font-mono text-rose-400">Inactive</span>
                  )}
                </div>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 truncate block mt-0.5"
                >
                  {link.url}
                </a>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => handleOpenModal(link)}
                  className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-cyan-400"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteConfirm({ isOpen: true, link })}
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
          title={editingLink ? `Edit Social Link` : 'Add New Social Link'}
          maxWidth="max-w-md"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Platform *
              </label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
              >
                <option value="github">GitHub</option>
                <option value="linkedin">LinkedIn</option>
                <option value="twitter">Twitter / X</option>
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="discord">Discord</option>
                <option value="hackthebox">Hack The Box</option>
                <option value="tryhackme">TryHackMe</option>
                <option value="medium">Medium</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Display Title (e.g. GitHub Profile)
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="My GitHub"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Target URL *
              </label>
              <input
                type="url"
                required
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://github.com/username"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500"
                />
                <span>Active on Public Portfolio</span>
              </label>

              <div className="flex items-center gap-2">
                <label className="text-xs font-mono text-slate-400 uppercase">Order:</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-16 px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white text-center font-mono"
                />
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
                <span>{editingLink ? 'Save Changes' : 'Create Link'}</span>
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, link: null })}
        onConfirm={handleDelete}
        title="Delete Social Link"
        message={`Are you sure you want to delete ${deleteConfirm.link?.title || deleteConfirm.link?.platform}?`}
      />

    </div>
  );
};
