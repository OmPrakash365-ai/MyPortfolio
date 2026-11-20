import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Plus,
  Edit2,
  Trash2,
  Sliders,
  FolderPlus,
  Loader2,
  X,
  Code,
  Shield,
  Layers,
  Database,
  Cloud,
  Wrench,
} from 'lucide-react';
import { skillsService, skillCategoriesService } from '../../services/api';
import { Modal } from '../common/Modal';
import { ConfirmDialog } from '../common/ConfirmDialog';

export const AdminSkills = ({ showToast }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Skill Modal
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [savingSkill, setSavingSkill] = useState(false);
  const [skillForm, setSkillForm] = useState({
    name: '',
    category: '',
    proficiency: 85,
    proficiency_label: 'Advanced',
    icon_name: 'Terminal',
    is_featured: true,
    order: 0,
  });

  // Category Modal
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [savingCategory, setSavingCategory] = useState(false);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    icon: 'Code',
    order: 0,
  });

  // Delete State
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    item: null,
    type: 'skill', // 'skill' or 'category'
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const cats = await skillCategoriesService.list();
      setCategories(cats);
    } catch (err) {
      console.error('Failed to load skills:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenSkillModal = (skill = null, defaultCatId = null) => {
    if (skill) {
      setEditingSkill(skill);
      setSkillForm({
        name: skill.name,
        category: skill.category,
        proficiency: skill.proficiency,
        proficiency_label: skill.proficiency_label || 'Advanced',
        icon_name: skill.icon_name || 'Terminal',
        is_featured: skill.is_featured,
        order: skill.order || 0,
      });
    } else {
      setEditingSkill(null);
      setSkillForm({
        name: '',
        category: defaultCatId || (categories[0]?.id || ''),
        proficiency: 85,
        proficiency_label: 'Advanced',
        icon_name: 'Terminal',
        is_featured: true,
        order: 0,
      });
    }
    setIsSkillModalOpen(true);
  };

  const handleProficiencyChange = (val) => {
    let label = 'Intermediate';
    if (val >= 90) label = 'Expert';
    else if (val >= 80) label = 'Advanced';
    else if (val >= 65) label = 'Proficient';

    setSkillForm({
      ...skillForm,
      proficiency: val,
      proficiency_label: label,
    });
  };

  const handleSaveSkill = async (e) => {
    e.preventDefault();
    setSavingSkill(true);
    try {
      if (editingSkill) {
        await skillsService.update(editingSkill.id, skillForm);
        if (showToast) showToast(`Skill "${skillForm.name}" updated!`, 'success');
      } else {
        await skillsService.create(skillForm);
        if (showToast) showToast(`Skill "${skillForm.name}" added!`, 'success');
      }
      setIsSkillModalOpen(false);
      fetchData();
    } catch (err) {
      console.error('Failed to save skill:', err);
      if (showToast) showToast('Failed to save skill.', 'error');
    } finally {
      setSavingSkill(false);
    }
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    if (!categoryForm.name.trim()) return;
    setSavingCategory(true);
    try {
      await skillCategoriesService.create(categoryForm);
      if (showToast) showToast(`Category "${categoryForm.name}" created!`, 'success');
      setIsCategoryModalOpen(false);
      setCategoryForm({ name: '', icon: 'Code', order: 0 });
      fetchData();
    } catch (err) {
      console.error('Failed to create category:', err);
      if (showToast) showToast('Failed to create category.', 'error');
    } finally {
      setSavingCategory(false);
    }
  };

  const handleDelete = async () => {
    const { item, type } = deleteConfirm;
    if (!item) return;

    try {
      if (type === 'skill') {
        await skillsService.delete(item.id);
        if (showToast) showToast('Skill deleted successfully.', 'success');
      } else {
        await skillCategoriesService.delete(item.id);
        if (showToast) showToast('Skill category deleted.', 'success');
      }
      fetchData();
    } catch (err) {
      console.error('Failed to delete:', err);
      if (showToast) showToast('Deletion failed.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Skills & Technical Arsenal
          </h1>
          <p className="text-xs font-mono text-cyan-400 mt-1">
            MANAGE PROFICIENCIES, DISCIPLINES & VISUAL METERS
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCategoryModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white text-xs font-medium"
          >
            <FolderPlus className="w-4 h-4 text-purple-400" />
            <span>New Category</span>
          </button>
          <button
            onClick={() => handleOpenSkillModal()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25"
          >
            <Plus className="w-4 h-4" />
            <span>Add Skill</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center font-mono text-cyan-400 animate-pulse text-sm">
          Loading categorized skill matrix...
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-12 glass-panel rounded-2xl border border-slate-800 text-slate-400 text-sm">
          No categories found. Create a category to start organizing skills.
        </div>
      ) : (
        <div className="space-y-8">
          {categories.map((cat) => (
            <div key={cat.id} className="glass-panel p-6 rounded-3xl border border-slate-800">
              
              {/* Category Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{cat.name}</h3>
                    <span className="text-[11px] font-mono text-slate-400">
                      {cat.skills?.length || 0} Skills listed
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenSkillModal(null, cat.id)}
                    className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 text-xs flex items-center gap-1 font-mono"
                    title="Add skill to this category"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                  <button
                    onClick={() => setDeleteConfirm({ isOpen: true, item: cat, type: 'category' })}
                    className="p-1.5 rounded-lg border border-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 transition-colors"
                    title="Delete entire category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Skills Grid */}
              {cat.skills?.length === 0 ? (
                <div className="py-6 text-center text-xs font-mono text-slate-500">
                  No skills in this category yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-white">{skill.name}</span>
                          <span className="text-xs font-mono text-cyan-400 font-bold">
                            {skill.proficiency}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-900 rounded-full h-1.5 mb-2 overflow-hidden border border-slate-800">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                            style={{ width: `${skill.proficiency}%` }}
                          ></div>
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">
                          Level: {skill.proficiency_label || 'Advanced'}
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-1.5 pt-2 mt-2 border-t border-slate-900">
                        <button
                          onClick={() => handleOpenSkillModal(skill)}
                          className="p-1 rounded text-slate-400 hover:text-cyan-400"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ isOpen: true, item: skill, type: 'skill' })}
                          className="p-1 rounded text-slate-400 hover:text-rose-400"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Skill Modal */}
      {isSkillModalOpen && (
        <Modal
          isOpen={isSkillModalOpen}
          onClose={() => setIsSkillModalOpen(false)}
          title={editingSkill ? `Edit: ${editingSkill.name}` : 'Add New Skill'}
          maxWidth="max-w-md"
        >
          <form onSubmit={handleSaveSkill} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Skill Name *
              </label>
              <input
                type="text"
                required
                value={skillForm.name}
                onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                placeholder="e.g. Penetration Testing"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Category *
              </label>
              <select
                value={skillForm.category}
                onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Proficiency slider */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-mono text-slate-400 uppercase">
                  Proficiency: <strong className="text-cyan-400">{skillForm.proficiency}%</strong>
                </label>
                <span className="text-xs font-mono text-purple-400">
                  {skillForm.proficiency_label}
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="5"
                value={skillForm.proficiency}
                onChange={(e) => handleProficiencyChange(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Icon Name (Lucide tag)
              </label>
              <input
                type="text"
                value={skillForm.icon_name}
                onChange={(e) => setSkillForm({ ...skillForm, icon_name: e.target.value })}
                placeholder="Terminal, Shield, Database..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-300">
                <input
                  type="checkbox"
                  checked={skillForm.is_featured}
                  onChange={(e) => setSkillForm({ ...skillForm, is_featured: e.target.checked })}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500"
                />
                <span>Featured Skill</span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsSkillModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 text-xs font-medium hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={savingSkill}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 disabled:opacity-50"
              >
                {savingSkill && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{editingSkill ? 'Save Changes' : 'Create Skill'}</span>
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Add Category Modal */}
      {isCategoryModalOpen && (
        <Modal
          isOpen={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
          title="Create New Skill Category"
          maxWidth="max-w-md"
        >
          <form onSubmit={handleSaveCategory} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Category Name *
              </label>
              <input
                type="text"
                required
                value={categoryForm.name}
                onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                placeholder="e.g. AI & Machine Learning Security"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Category Icon
              </label>
              <select
                value={categoryForm.icon}
                onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
              >
                <option value="Code">Code</option>
                <option value="Shield">Shield</option>
                <option value="Layers">Layers</option>
                <option value="Database">Database</option>
                <option value="Cloud">Cloud</option>
                <option value="Wrench">Wrench</option>
                <option value="Cpu">Cpu</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 text-xs font-medium hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={savingCategory}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 disabled:opacity-50"
              >
                {savingCategory && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Create Category</span>
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, item: null, type: 'skill' })}
        onConfirm={handleDelete}
        title={deleteConfirm.type === 'skill' ? 'Delete Skill' : 'Delete Skill Category'}
        message={`Are you sure you want to permanently delete "${deleteConfirm.item?.name}"?`}
      />

    </div>
  );
};
