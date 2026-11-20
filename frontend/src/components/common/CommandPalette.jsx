import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FolderGit2, Sparkles, FileText, ArrowRight, Mail, Compass, Award, Shield, Cpu, Terminal, Radio, GraduationCap, Bot } from 'lucide-react';

export const CommandPalette = ({ isOpen, onClose, projects = [], onSelectProject, onOpenCopilot }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickLinks = [
    { label: '🤖 Agent Prakash // AI Copilot', action: 'copilot', icon: Bot, tag: 'AI 2.0' },
    { label: '01 // Home Hub', href: '#home', icon: Terminal, tag: 'Apex' },
    { label: '02 // Security Dossier (About)', href: '#about', icon: Shield, tag: 'Core' },
    { label: '03 // 3D Technology Globe (Skills)', href: '#skills', icon: Cpu, tag: '3D Globe' },
    { label: '04 // Featured Deployments (Projects)', href: '#projects', icon: FolderGit2, tag: 'Deployments' },
    { label: '05 // Career Chronicle (Experience)', href: '#experience', icon: FileText, tag: 'Timeline' },
    { label: '06 // Academic Foundation (Education)', href: '#education', icon: GraduationCap, tag: 'Degrees' },
    { label: '07 // Verified Certifications', href: '#certifications', icon: Award, tag: 'Licenses' },
    { label: '08 // Honors & CTF Accolades', href: '#achievements', icon: Sparkles, tag: 'Awards' },
    { label: '09 // 3D Global Transmission (Contact)', href: '#contact', icon: Radio, tag: 'Broadcast' },
  ];

  const filteredProjects = projects.filter((p) => {
    const q = query.toLowerCase();
    const title = p.title?.toLowerCase() || '';
    const desc = p.description?.toLowerCase() || '';
    const cat = p.category_name?.toLowerCase() || '';
    const techs = Array.isArray(p.technologies) ? p.technologies.join(' ').toLowerCase() : '';
    return title.includes(q) || desc.includes(q) || cat.includes(q) || techs.includes(q);
  });

  const filteredLinks = quickLinks.filter((l) =>
    l.label.toLowerCase().includes(query.toLowerCase()) || l.tag.toLowerCase().includes(query.toLowerCase())
  );

  const handleItemClick = (item) => {
    onClose();
    if (item.action === 'copilot') {
      if (onOpenCopilot) onOpenCopilot();
      return;
    }
    if (item.href) {
      const elem = document.querySelector(item.href);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleProjectClick = (project) => {
    onClose();
    if (onSelectProject) {
      onSelectProject(project);
    } else {
      const elem = document.querySelector('#projects');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="w-full max-w-2xl glass-panel-3d border border-cyan-500/40 shadow-2xl shadow-cyan-950/80 rounded-2xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-cyan-500/25 bg-slate-950/60">
          <Search className="w-5 h-5 text-cyan-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search deployments, tech stack, skills, or navigation..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none font-mono"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-white mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-cyan-300 bg-slate-900 border border-cyan-500/30 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-left">
          {/* Projects Results */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="text-[10px] font-mono tracking-widest uppercase text-cyan-400 px-3 py-1 flex items-center justify-between">
                <span>Deployments ({filteredProjects.length})</span>
                <span className="text-slate-500">Press to inspect</span>
              </div>
              <div className="space-y-1">
                {filteredProjects.slice(0, 5).map((project) => (
                  <button
                    key={project.id}
                    onClick={() => handleProjectClick(project)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-cyan-950/40 border border-transparent hover:border-cyan-500/30 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                        <FolderGit2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {project.title}
                        </div>
                        <div className="text-xs font-mono text-slate-400 truncate max-w-md">
                          {project.category_name} {project.technologies?.length ? `· ${project.technologies.slice(0, 3).join(', ')}` : ''}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Navigation Links */}
          {filteredLinks.length > 0 && (
            <div>
              <div className="text-[10px] font-mono tracking-widest uppercase text-cyan-400 px-3 py-1">
                Cyber Navigation Matrix
              </div>
              <div className="space-y-1">
                {filteredLinks.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleItemClick(item)}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-900 border border-transparent hover:border-cyan-500/30 transition-all text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                          {item.label}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-300 uppercase px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
                        {item.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {filteredProjects.length === 0 && filteredLinks.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-sm font-mono">
              No matching archive telemetry for "{query}".
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>OM PRAKASH // 3D CYBERPUNK COMMAND MATRIX</span>
          <div className="flex items-center gap-2">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 rounded text-[10px] text-cyan-400">
              ESC
            </kbd>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
