import React, { useEffect } from 'react';
import { X, ExternalLink, Github, ArrowLeft, ArrowRight, ShieldCheck, Layers, Calendar, Tag, CheckCircle2, Lock, Terminal } from 'lucide-react';

export const ProjectDetailModal = ({ project, allProjects = [], onClose, onSelectProject }) => {
  useEffect(() => {
    // Lock body scroll when modal is active
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Keyboard navigation: Escape to close, Left/Right arrows to cycle projects
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && nextProject) {
        onSelectProject(nextProject);
      } else if (e.key === 'ArrowLeft' && prevProject) {
        onSelectProject(prevProject);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, allProjects, onClose, onSelectProject]);

  if (!project) return null;

  // Find index and next/previous projects
  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  const formattedDate = project.completion_date
    ? new Date(project.completion_date).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      })
    : 'Active / 2024';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 backdrop-blur-xl p-2 sm:p-4 lg:p-8 animate-fade-in">
      <div
        className="w-full max-w-5xl glass-panel-3d border border-cyan-500/40 shadow-2xl shadow-cyan-950/80 rounded-3xl overflow-hidden my-auto flex flex-col max-h-[92vh] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hologram Scanlines Overlay */}
        <div className="absolute inset-0 hologram-scanlines pointer-events-none opacity-20"></div>

        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/25 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>DEPLOYMENT // 0{currentIndex + 1}</span>
            <span className="text-slate-600">/</span>
            <span className="text-white font-bold truncate max-w-xs sm:max-w-md">
              {project.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Next/Prev in Header */}
            <div className="hidden sm:flex items-center gap-1 text-xs font-mono">
              <button
                onClick={() => onSelectProject(prevProject)}
                className="p-1.5 rounded-lg hover:bg-cyan-950/60 text-slate-400 hover:text-cyan-300 transition-colors border border-slate-800"
                title={`Previous: ${prevProject?.title}`}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="text-cyan-400 font-bold px-2">
                {currentIndex + 1} / {allProjects.length}
              </span>
              <button
                onClick={() => onSelectProject(nextProject)}
                className="p-1.5 rounded-lg hover:bg-cyan-950/60 text-slate-400 hover:text-cyan-300 transition-colors border border-slate-800"
                title={`Next: ${nextProject?.title}`}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500 transition-colors"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10 space-y-8 text-left relative z-10">
          
          {/* Project Cover Image Container */}
          <div className="w-full rounded-2xl overflow-hidden border border-cyan-500/30 relative bg-slate-950 shadow-xl">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full max-h-[480px] object-cover object-center filter contrast-[1.03]"
              />
            ) : (
              <div className="w-full h-64 sm:h-80 md:h-96 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 shadow-lg shadow-cyan-950">
                  <Layers className="w-8 h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white max-w-lg mb-2">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  {project.category_name || 'System Architecture'}
                </p>
              </div>
            )}
          </div>

          {/* Title & Metadata Strip */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pb-6 border-b border-slate-800">
            <div className="lg:col-span-8 space-y-2">
              <div className="inline-flex items-center gap-2 mb-1">
                <span className="px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider">
                  {project.category_name || 'Software Architecture'}
                </span>
                {project.is_featured && (
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/40 text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                    ★ Featured System
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                <span className="cyber-gradient-text">{project.title}</span>
              </h1>
            </div>

            {/* Quick Action Links */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end justify-center">
              {project.live_demo_url && (
                <a
                  href={project.live_demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs uppercase font-mono tracking-wider hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25 w-full sm:w-auto"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live Platform</span>
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-800 hover:border-cyan-500/50 bg-slate-900 text-slate-200 hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all w-full sm:w-auto"
                >
                  <Github className="w-4 h-4" />
                  <span>Inspect Source Code</span>
                </a>
              )}
            </div>
          </div>

          {/* Project Metadata Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs font-mono">
            <div>
              <span className="text-slate-500 uppercase block mb-1">Architecture Category</span>
              <span className="text-cyan-300 font-bold">{project.category_name || 'Full-Stack'}</span>
            </div>
            <div>
              <span className="text-slate-500 uppercase block mb-1">Deployment Date</span>
              <span className="text-white font-bold">{formattedDate}</span>
            </div>
            <div>
              <span className="text-slate-500 uppercase block mb-1">Security Posture</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Zero-Trust Verified
              </span>
            </div>
            <div>
              <span className="text-slate-500 uppercase block mb-1">Lead Developer</span>
              <span className="text-purple-400 font-bold">Om Prakash</span>
            </div>
          </div>

          {/* Detailed Editorial Sections */}
          <div className="space-y-6">
            
            {/* 01 / Overview */}
            <div className="space-y-2 p-5 rounded-2xl bg-slate-950/50 border border-slate-800/80">
              <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-2">
                <span>01 // System Overview</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* 02 / Blueprint & Technical Solution */}
            {project.detailed_overview && (
              <div className="space-y-2 p-5 rounded-2xl bg-slate-950/50 border border-slate-800/80">
                <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-2">
                  <span>02 // Technical Blueprint & Architecture</span>
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {project.detailed_overview}
                </p>
              </div>
            )}

            {/* 03 / Key Capabilities */}
            {project.key_features && project.key_features.length > 0 && (
              <div className="space-y-3 p-5 rounded-2xl bg-slate-950/50 border border-slate-800/80">
                <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-2">
                  <span>03 // Core Architectural Features</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.key_features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 04 / Security Mitigations */}
            {project.security_highlights && (
              <div className="space-y-2 p-5 rounded-2xl bg-slate-950/50 border border-slate-800/80">
                <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
                  <span>04 // Security Controls & Mitigations</span>
                </h3>
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed whitespace-pre-line">
                    {project.security_highlights}
                  </p>
                </div>
              </div>
            )}

            {/* Technologies Used */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="space-y-2 p-5 rounded-2xl bg-slate-950/50 border border-slate-800/80">
                <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-2">
                  <span>05 // Tech Stack & Tooling</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-300 font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Bottom Cycling Navigation */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevProject && (
              <button
                onClick={() => onSelectProject(prevProject)}
                className="w-full sm:w-auto flex items-center gap-3 p-3.5 rounded-xl border border-slate-800 hover:border-cyan-500/50 bg-slate-900 text-left group transition-all"
              >
                <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-500">
                    Previous Deployment
                  </div>
                  <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 truncate max-w-[200px]">
                    {prevProject.title}
                  </div>
                </div>
              </button>
            )}

            <button
              onClick={onClose}
              className="text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-cyan-400 underline underline-offset-4"
            >
              Close Case Study (Esc)
            </button>

            {nextProject && (
              <button
                onClick={() => onSelectProject(nextProject)}
                className="w-full sm:w-auto flex items-center justify-end gap-3 p-3.5 rounded-xl border border-slate-800 hover:border-cyan-500/50 bg-slate-900 text-right group transition-all"
              >
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-500">
                    Next Deployment
                  </div>
                  <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 truncate max-w-[200px]">
                    {nextProject.title}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
