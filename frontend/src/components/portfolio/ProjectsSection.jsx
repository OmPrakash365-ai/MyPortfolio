import React, { useState, useMemo } from 'react';
import {
  FolderGit2,
  Search,
  ExternalLink,
  Github,
  ArrowRight,
  Sparkles,
  Layers,
  Star,
  CheckCircle2,
  X,
  Lock,
  Eye,
} from 'lucide-react';
import { Card3DTilt } from '../3d/Card3DTilt';

export const ProjectsSection = ({ projects = [], categories = [], onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract all categories dynamically from props and available projects
  const categoryFilters = useMemo(() => {
    const list = [{ slug: 'all', name: 'All Architecture' }];
    categories.forEach((cat) => {
      list.push({ slug: cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-'), name: cat.name });
    });
    return list;
  }, [categories]);

  // Filter projects by category and search query
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        project.category_slug === selectedCategory ||
        (project.category_name && project.category_name.toLowerCase().includes(selectedCategory.toLowerCase()));

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        project.title?.toLowerCase().includes(q) ||
        project.description?.toLowerCase().includes(q) ||
        project.category_name?.toLowerCase().includes(q) ||
        (Array.isArray(project.technologies) &&
          project.technologies.some((t) => t.toLowerCase().includes(q)));

      return matchesCategory && matchesQuery;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background Volumetric Light */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-wider shadow-sm shadow-cyan-950">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>03 // 3D Interactive Project Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Featured <span className="cyber-gradient-text">Deployments</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Production-grade systems, zero-trust platforms, and defensive security tooling rendered as interactive 3D glass cards.
          </p>
        </div>

        {/* Filter Controls & Live Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-12">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            {categoryFilters.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedCategory === cat.slug
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-lg shadow-cyan-500/30 scale-105'
                    : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white hover:border-cyan-500/40'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Live Search Input */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword or tech..."
              className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* 3D Projects Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <Card3DTilt key={project.id} maxTilt={9} scale={1.02} className="h-full">
              <div className="glass-panel-3d rounded-3xl overflow-hidden border border-cyan-500/25 hover:border-cyan-400 transition-all duration-300 shadow-xl shadow-black/80 flex flex-col justify-between h-full group text-left relative">
                
                {/* Hologram Reticle */}
                <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5">
                  {project.is_featured && (
                    <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black text-[9px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 shadow-md shadow-amber-500/30">
                      <Star className="w-2.5 h-2.5 fill-current" />
                      Featured
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-md bg-black/70 border border-cyan-500/40 text-[9px] font-mono text-cyan-300">
                    0{idx + 1}
                  </span>
                </div>

                {/* Project Image Stage */}
                <div
                  onClick={() => onSelectProject && onSelectProject(project)}
                  className="w-full aspect-[16/10] bg-slate-950 relative overflow-hidden cursor-pointer"
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center filter contrast-[1.03] transition-transform duration-700 group-hover:scale-108"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40 flex flex-col items-center justify-center p-6 text-center">
                      <Layers className="w-10 h-10 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest font-semibold">
                        {project.title}
                      </span>
                    </div>
                  )}

                  {/* Category Pill Over Image */}
                  <div className="absolute bottom-3 left-3 z-20">
                    <span className="px-2.5 py-1 rounded-full bg-slate-950/90 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 backdrop-blur-md">
                      {project.category_name || 'Software'}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-cyan-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                    <span className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs font-mono uppercase tracking-wider shadow-lg shadow-cyan-500/50 flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Case Study</span>
                    </span>
                  </div>
                </div>

                {/* Project Metadata Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3
                      onClick={() => onSelectProject && onSelectProject(project)}
                      className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer leading-snug line-clamp-2"
                    >
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies Badges */}
                  {Array.isArray(project.technologies) && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.technologies.slice(0, 4).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-[10px] font-mono text-cyan-400 self-center">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Action Triggers */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                    <button
                      onClick={() => onSelectProject && onSelectProject(project)}
                      className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 group/btn"
                    >
                      <span>Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center gap-3">
                      {project.live_demo_url && (
                        <a
                          href={project.live_demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-white transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-white transition-colors"
                          title="Source Code"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            </Card3DTilt>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center text-slate-500">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">No deployments found</h3>
            <p className="text-xs font-mono text-slate-400">
              Try adjusting your query or category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-mono uppercase tracking-wider font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
