import React, { useState, useEffect } from 'react';
import { FileText, Upload, Download, CheckCircle2, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { resumesService } from '../../services/api';
import { ConfirmDialog } from '../common/ConfirmDialog';

export const AdminResume = ({ showToast }) => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('Senior Software & Security Engineer Resume');
  const [pdfFile, setPdfFile] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, item: null });

  const fetchResumes = async () => {
    setLoading(true);
    try {
      const data = await resumesService.list();
      setResumes(data);
    } catch (err) {
      console.error('Failed to load resumes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!pdfFile) {
      if (showToast) showToast('Please select a PDF file to upload.', 'error');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('file', pdfFile);
      formData.append('is_active', 'true');

      await resumesService.create(formData);
      if (showToast) showToast('Resume uploaded and set as active copy!', 'success');
      setPdfFile(null);
      fetchResumes();
    } catch (err) {
      console.error('Upload failed:', err);
      if (showToast) showToast('Failed to upload resume file.', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleSetActive = async (id) => {
    try {
      await resumesService.update(id, { is_active: true });
      if (showToast) showToast('Active resume copy switched.', 'success');
      fetchResumes();
    } catch (err) {
      console.error('Failed to set active resume:', err);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm.item) return;
    try {
      await resumesService.delete(deleteConfirm.item.id);
      if (showToast) showToast('Resume removed.', 'success');
      fetchResumes();
    } catch (err) {
      console.error('Failed to delete resume:', err);
    }
  };

  const activeResume = resumes.find((r) => r.is_active);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Resume Management
        </h1>
        <p className="text-xs font-mono text-cyan-400 mt-1">
          PUBLISH AND MAINTAIN PDF CURRICULUM VITAE COPIES
        </p>
      </div>

      {/* Upload Box */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800">
        <h3 className="text-sm font-bold text-white uppercase font-mono text-cyan-400 mb-4">
          Upload New Resume Document (PDF)
        </h3>

        <form onSubmit={handleUpload} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
              Resume Document Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Om Prakash - Software & Security Resume (2025)"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
              Select PDF File *
            </label>
            <input
              type="file"
              required
              accept="application/pdf"
              onChange={(e) => setPdfFile(e.target.files[0])}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-50"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            <span>Upload & Make Active</span>
          </button>
        </form>
      </div>

      {/* Current Active Resume Highlight */}
      {activeResume && (
        <div className="glass-panel p-6 rounded-3xl border border-cyan-500/40 bg-cyan-950/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-white">{activeResume.title}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    CURRENTLY ACTIVE
                  </span>
                </div>
                <div className="text-xs font-mono text-slate-400 mt-0.5">
                  Uploaded: {new Date(activeResume.uploaded_at).toLocaleString()}
                </div>
              </div>
            </div>

            <a
              href={activeResume.file}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-900/40"
            >
              <Download className="w-4 h-4" />
              <span>Download Active PDF</span>
            </a>
          </div>
        </div>
      )}

      {/* History */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800">
        <h3 className="text-sm font-bold text-white uppercase font-mono text-slate-400 mb-4">
          All Uploaded Versions
        </h3>

        {loading ? (
          <div className="py-6 text-center text-xs font-mono text-cyan-400 animate-pulse">
            Checking storage...
          </div>
        ) : resumes.length === 0 ? (
          <div className="py-6 text-center text-xs font-mono text-slate-500">
            No resume files uploaded yet.
          </div>
        ) : (
          <div className="divide-y divide-slate-800/80">
            {resumes.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white truncate">{item.title}</span>
                    {item.is_active && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-400">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    {new Date(item.uploaded_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {!item.is_active && (
                    <button
                      onClick={() => handleSetActive(item.id)}
                      className="px-2.5 py-1 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 hover:text-cyan-400 hover:bg-slate-900"
                    >
                      Make Active
                    </button>
                  )}
                  <a
                    href={item.file}
                    download
                    className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setDeleteConfirm({ isOpen: true, item })}
                    className="p-1.5 rounded-lg border border-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, item: null })}
        onConfirm={handleDelete}
        title="Delete Resume File"
        message={`Are you sure you want to permanently delete "${deleteConfirm.item?.title}"?`}
      />

    </div>
  );
};
