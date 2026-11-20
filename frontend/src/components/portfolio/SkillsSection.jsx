import React, { useState } from 'react';
import {
  Code,
  Shield,
  Layers,
  Database,
  Cloud,
  Wrench,
  Cpu,
  Terminal,
  Activity,
  Lock,
  Zap,
  GitBranch,
  Server,
  Sparkles,
} from 'lucide-react';
import { SkillsSphere3D } from '../3d/SkillsSphere3D';
import { Card3DTilt } from '../3d/Card3DTilt';

export const SkillsSection = ({ skillCategories = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getCategoryIcon = (iconName) => {
    const icon = iconName?.toLowerCase() || '';
    if (icon.includes('shield') || icon.includes('cyber')) return <Shield className="w-4 h-4 text-emerald-400" />;
    if (icon.includes('code') || icon.includes('lang')) return <Code className="w-4 h-4 text-cyan-400" />;
    if (icon.includes('layer') || icon.includes('frame')) return <Layers className="w-4 h-4 text-purple-400" />;
    if (icon.includes('data') || icon.includes('sql')) return <Database className="w-4 h-4 text-blue-400" />;
    if (icon.includes('cloud') || icon.includes('devops')) return <Cloud className="w-4 h-4 text-sky-400" />;
    if (icon.includes('tool') || icon.includes('wrench')) return <Wrench className="w-4 h-4 text-amber-400" />;
    return <Cpu className="w-4 h-4 text-cyan-400" />;
  };

  const getSkillIcon = (iconName) => {
    const icon = iconName?.toLowerCase() || '';
    if (icon.includes('terminal')) return <Terminal className="w-4 h-4 text-cyan-400" />;
    if (icon.includes('shield')) return <Shield className="w-4 h-4 text-emerald-400" />;
    if (icon.includes('lock')) return <Lock className="w-4 h-4 text-purple-400" />;
    if (icon.includes('database')) return <Database className="w-4 h-4 text-blue-400" />;
    if (icon.includes('cloud')) return <Cloud className="w-4 h-4 text-sky-400" />;
    if (icon.includes('server')) return <Server className="w-4 h-4 text-indigo-400" />;
    if (icon.includes('zap')) return <Zap className="w-4 h-4 text-amber-400" />;
    if (icon.includes('git')) return <GitBranch className="w-4 h-4 text-rose-400" />;
    return <Code className="w-4 h-4 text-cyan-400" />;
  };

  const filteredCategories = selectedCategory === 'all'
    ? skillCategories
    : skillCategories.filter((cat) => cat.slug === selectedCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background Volumetric Glows */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-wider shadow-sm shadow-cyan-950">
            <Cpu className="w-3.5 h-3.5" />
            <span>02 // 3D Technology Globe & Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Technical <span className="cyber-gradient-text">Competencies</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Drag to rotate the 3D interactive technology sphere or explore specialized engineering competencies below.
          </p>
        </div>

        {/* 3D Interactive Technology Globe Showcase */}
        <div className="mb-16">
          <Card3DTilt maxTilt={4} className="w-full">
            <div className="glass-panel-3d rounded-3xl p-6 sm:p-10 border border-cyan-500/30 shadow-2xl shadow-cyan-950/70 relative overflow-hidden text-center">
              
              {/* Globe Reticle Marker */}
              <div className="absolute top-4 left-6 text-xs font-mono text-cyan-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                <span>INTERACTIVE 3D WEBGL NODE // DRAG TO ROTATE</span>
              </div>

              {/* The Three.js Interactive 3D Sphere */}
              <div className="py-2">
                <SkillsSphere3D />
              </div>

              {/* Floating Technology Pills below Globe */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-4 border-t border-slate-800/80">
                {['Java', 'Python', 'React', 'Django', 'PostgreSQL', 'Kali Linux', 'Docker', 'Git', 'Nmap', 'AES-256'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

            </div>
          </Card3DTilt>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar justify-start sm:justify-center">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-lg shadow-cyan-500/30 scale-105'
                : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white hover:border-cyan-500/40'
            }`}
          >
            All Competencies
          </button>

          {skillCategories.map((cat) => (
            <button
              key={cat.id}
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

        {/* Categorized Skills Grid */}
        <div className="space-y-10 text-left">
          {filteredCategories.map((category) => (
            <div key={category.id} className="space-y-4">
              
              {/* Category Subheader */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                    {getCategoryIcon(category.icon || category.name)}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                    {category.name}
                  </h3>
                </div>

                <span className="text-xs font-mono text-cyan-400">
                  {category.skills?.length || 0} Modules
                </span>
              </div>

              {/* Skill Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {category.skills?.map((skill) => (
                  <Card3DTilt key={skill.id} maxTilt={10}>
                    <div className="glass-panel-3d rounded-2xl p-4 sm:p-5 border border-cyan-500/20 hover:border-cyan-500/60 transition-all group relative overflow-hidden">
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                          {getSkillIcon(skill.icon_name || skill.name)}
                        </div>
                        <span className="text-xs font-mono text-cyan-400 font-bold">
                          {skill.proficiency}%
                        </span>
                      </div>

                      <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mb-1 truncate">
                        {skill.name}
                      </div>

                      <div className="text-[11px] font-mono text-slate-400 mb-3">
                        {skill.proficiency_label || 'Production'}
                      </div>

                      {/* Glowing Proficiency Bar */}
                      <div className="w-full h-1.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 transition-all duration-1000 shadow-[0_0_8px_#00f0ff]"
                          style={{ width: `${skill.proficiency}%` }}
                        ></div>
                      </div>

                    </div>
                  </Card3DTilt>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
