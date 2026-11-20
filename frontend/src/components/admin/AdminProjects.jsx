import React, { useState, useEffect } from 'react';
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Github,
  Star,
  Search,
  Upload,
  X,
  Loader2,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { projectsService, projectCategoriesService } from '../../services/api';
import { Modal } from '../common/Modal';
import { ConfirmDialog } from '../common/ConfirmDialog';

export const AdminProjects = ({ showToast }) => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [saving, setSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    detailed_overview: '',
    technologies: [],
    github_url: '',
    live_demo_url: '',
    completion_date: '',
    is_featured: false,
    order: 0,
    key_features: [],
    security_highlights: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');

  // Delete State
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, project: null });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projData, catData] = await Promise.all([
        projectsService.list(),
        projectCategoriesService.list(),
      ]);
      setProjects(projData);
      setCategories(catData);
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        category: project.category || (categories[0]?.id || ''),
        description: project.description,
        detailed_overview: project.detailed_overview || '',
        technologies: Array.isArray(project.technologies) ? [...project.technologies] : [],
        github_url: project.github_url || '',
        live_demo_url: project.live_demo_url || '',
        completion_date: project.completion_date || '',
        is_featured: project.is_featured || false,
        order: project.order || 0,
        key_features: Array.isArray(project.key_features) ? [...project.key_features] : [],
        security_highlights: project.security_highlights || '',
      });
      setImagePreview(project.image || null);
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        category: categories[0]?.id || '',
        description: '',
        detailed_overview: '',
        technologies: ['React', 'Django', 'PostgreSQL'],
        github_url: '',
        live_demo_url: '',
        completion_date: new Date().toISOString().split('T')[0],
        is_featured: false,
        order: 0,
        key_features: [],
        security_highlights: '',
      });
      setImagePreview(null);
    }
    setImageFile(null);
    setTechInput('');
    setFeatureInput('');
    setIsModalOpen(true);
  };

  const handleAddTech = () => {
    if (!techInput.trim()) return;
    if (!formData.technologies.includes(techInput.trim())) {
      setFormData({ ...formData, technologies: [...formData.technologies, techInput.trim()] });
    }
    setTechInput('');
  };

  const handleRemoveTech = (index) => {
    const updated = [...formData.technologies];
    updated.splice(index, 1);
    setFormData({ ...formData, technologies: updated });
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    setFormData({ ...formData, key_features: [...formData.key_features, featureInput.trim()] });
    setFeatureInput('');
  };

  const handleRemoveFeature = (index) => {
    const updated = [...formData.key_features];
    updated.splice(index, 1);
    setFormData({ ...formData, key_features: updated });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'technologies' || key === 'key_features') {
          payload.append(key, JSON.stringify(formData[key]));
        } else if (formData[key] !== null && formData[key] !== undefined) {
          payload.append(key, formData[key]);
        }
      });

      if (imageFile) {
        payload.append('image', imageFile);
      }

      if (editingProject) {
        await projectsService.update(editingProject.id, payload);
        if (showToast) showToast(`Project "${formData.title}" updated successfully!`, 'success');
      } else {
        await projectsService.create(payload);
        if (showToast) showToast(`Project "${formData.title}" created successfully!`, 'success');
      }

      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      console.error('Failed to save project:', err);
      if (showToast) showToast('Failed to save project.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm.project) return;
    try {
      await projectsService.delete(deleteConfirm.project.id);
      if (showToast) showToast('Project deleted successfully.', 'success');
      fetchData();
    } catch (err) {
      console.error('Failed to delete project:', err);
      if (showToast) showToast('Failed to delete project.', 'error');
    }
  };

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Project Management
          </h1>
          <p className="text-xs font-mono text-cyan-400 mt-1">
            CRUD REPOSITORY // ARCHITECTURE SPECIFICATIONS & LINKS
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
          />
        </div>
        <div className="text-xs font-mono text-slate-400 shrink-0">
          Total: <span className="text-white font-bold">{filtered.length}</span> projects
        </div>
      </div>

      {/* Projects Table / Cards */}
      {loading ? (
        <div className="py-12 text-center font-mono text-cyan-400 animate-pulse text-sm">
          Loading project catalogue...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 glass-panel rounded-2xl border border-slate-800 text-slate-400 text-sm">
          No projects found. Click "Add New Project" to create one!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="glass-panel rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail Preview */}
                <div className="h-40 bg-slate-950 relative overflow-hidden border-b border-slate-800">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600">
                      <Layers className="w-10 h-10" />
                    </div>
                  )}
                  {project.is_featured && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      FEATURED
                    </span>
                  )}
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950/80 text-cyan-400 border border-slate-800">
                    {project.category_name || 'General'}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-bold text-white mb-1.5 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {Array.isArray(project.technologies) &&
                      project.technologies.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-slate-300 border border-slate-800">
                          {t}
                        </span>
                      ))}
                    {project.technologies?.length > 3 && (
                      <span className="text-[10px] font-mono text-slate-500">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.live_demo_url && (
                    <a href={project.live_demo_url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenModal(project)}
                    className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
                    title="Edit Project"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm({ isOpen: true, project })}
                    className="p-1.5 rounded-lg border border-slate-800 hover:bg-rose-950/40 text-slate-300 hover:text-rose-400 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingProject ? `Edit: ${editingProject.title}` : 'Add New Project'}
          maxWidth="max-w-3xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="SentinelGuard Scanner"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Short Summary (Card view) *
              </label>
              <textarea
                required
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enterprise vulnerability assessment tool coordinating Nmap sweeps..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              ></textarea>
            </div>

            {/* Detailed Overview */}
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Detailed Overview & Architecture (Detail Modal)
              </label>
              <textarea
                rows={3}
                value={formData.detailed_overview}
                onChange={(e) => setFormData({ ...formData, detailed_overview: e.target.value })}
                placeholder="Engineered using microservice architecture with Celery workers..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              ></textarea>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Project Image / Screenshot
              </label>
              <div className="flex items-center gap-4">
                {imagePreview && (
                  <div className="w-24 h-16 rounded-lg overflow-hidden border border-slate-700">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <label className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 hover:bg-slate-800 cursor-pointer flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span>{imagePreview ? 'Replace Image' : 'Upload Image'}</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>
            </div>

            {/* Technologies */}
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Technologies Used
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {formData.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-xs font-mono text-slate-200 flex items-center gap-1.5"
                  >
                    <span>{t}</span>
                    <button type="button" onClick={() => handleRemoveTech(idx)} className="text-slate-400 hover:text-rose-400">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTech(); } }}
                  placeholder="e.g. Docker, Redis, Nmap"
                  className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
                <button
                  type="button"
                  onClick={handleAddTech}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-medium"
                >
                  Add Tech
                </button>
              </div>
            </div>

            {/* Key Features List Builder */}
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Key Features (Bullet points)
              </label>
              <div className="space-y-1.5 mb-2">
                {formData.key_features.map((feat, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
                    <span>• {feat}</span>
                    <button type="button" onClick={() => handleRemoveFeature(idx)} className="text-slate-400 hover:text-rose-400">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddFeature(); } }}
                  placeholder="e.g. Automated Nmap port scanner with NIST CVE correlation"
                  className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-medium"
                >
                  Add Feature
                </button>
              </div>
            </div>

            {/* Security Highlights */}
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Security & Hardening Highlights
              </label>
              <textarea
                rows={2}
                value={formData.security_highlights}
                onChange={(e) => setFormData({ ...formData, security_highlights: e.target.value })}
                placeholder="PBKDF2 encryption, zero-trust sandbox execution, rate-limited APIs..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
              ></textarea>
            </div>

            {/* URLs & Completion Date */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={formData.github_url}
                  onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Live Demo URL
                </label>
                <input
                  type="url"
                  value={formData.live_demo_url}
                  onChange={(e) => setFormData({ ...formData, live_demo_url: e.target.value })}
                  placeholder="https://app.example.com"
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Completion Date
                </label>
                <input
                  type="date"
                  value={formData.completion_date}
                  onChange={(e) => setFormData({ ...formData, completion_date: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>

            {/* Featured & Order */}
            <div className="flex items-center justify-between pt-2">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-cyan-500"
                />
                <span className="text-xs font-medium text-slate-200">
                  Mark as Featured Project
                </span>
              </label>

              <div className="flex items-center gap-2">
                <label className="text-xs font-mono text-slate-400 uppercase">Display Order:</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-16 px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white text-center font-mono"
                />
              </div>
            </div>

            {/* Submit */}
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
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 disabled:opacity-50"
              >
                {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{editingProject ? 'Save Changes' : 'Create Project'}</span>
              </button>
            </div>

          </form>
        </Modal>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, project: null })}
        onConfirm={handleDelete}
        title="Delete Project"
        message={`Are you sure you want to permanently delete "${deleteConfirm.project?.title}"?`}
      />

    </div>
  );
};
