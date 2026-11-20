import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Terminal, Activity } from 'lucide-react';
import { Card3DTilt } from '../3d/Card3DTilt';

export const ExperienceSection = ({ experiences = [] }) => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background Volumetric Glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-wider shadow-sm shadow-cyan-950">
            <Briefcase className="w-3.5 h-3.5" />
            <span>04 // 3D Career Chronicle & Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Work <span className="cyber-gradient-text">Experience</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Chronological engineering milestones, technical leadership roles, and security implementations.
          </p>
        </div>

        {/* Futuristic 3D Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Glowing Center Line */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-600 shadow-[0_0_12px_rgba(6,182,212,0.6)]"></div>

          <div className="space-y-12">
            {experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              const startYear = exp.start_date ? new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';
              const endYear = exp.is_current ? 'Present' : exp.end_date ? new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';

              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Glowing Node Point */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_#00f0ff] z-20">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></div>
                  </div>

                  {/* Spacer for opposite column */}
                  <div className="hidden sm:block sm:w-1/2"></div>

                  {/* Card Container */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-8">
                    <Card3DTilt maxTilt={7}>
                      <div className="glass-panel-3d rounded-2xl p-6 sm:p-7 border border-cyan-500/25 hover:border-cyan-400/60 transition-all text-left group relative overflow-hidden shadow-xl">
                        
                        {/* Corner Cyber Reticle */}
                        <div className="absolute top-3 right-3 text-[10px] font-mono text-cyan-400/60 uppercase">
                          REC // 0{idx + 1}
                        </div>

                        {/* Date and Type Tag */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 font-bold">
                            {startYear} — {endYear}
                          </span>
                          {exp.employment_type && (
                            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400">
                              {exp.employment_type}
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {exp.job_title}
                        </h3>

                        <div className="text-sm font-semibold text-purple-400 mb-3 flex items-center gap-2">
                          <span>{exp.company_name}</span>
                          {exp.location && (
                            <>
                              <span className="text-slate-600">·</span>
                              <span className="text-xs text-slate-400 font-mono">{exp.location}</span>
                            </>
                          )}
                        </div>

                        {exp.description && (
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                            {exp.description}
                          </p>
                        )}

                        {/* Responsibilities */}
                        {Array.isArray(exp.responsibilities) && exp.responsibilities.length > 0 && (
                          <div className="space-y-1.5 pt-2 border-t border-slate-800">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                              Responsibilities:
                            </span>
                            {exp.responsibilities.slice(0, 3).map((resp, rIdx) => (
                              <div key={rIdx} className="flex items-start gap-2 text-xs text-slate-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></span>
                                <span>{resp}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Measurable Impact */}
                        {Array.isArray(exp.achievements) && exp.achievements.length > 0 && (
                          <div className="space-y-1.5 pt-3 mt-3 border-t border-slate-800/80">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-1">
                              Impact Delivered:
                            </span>
                            {exp.achievements.slice(0, 2).map((ach, aIdx) => (
                              <div key={aIdx} className="flex items-start gap-2 text-xs text-emerald-300">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                                <span>{ach}</span>
                              </div>
                            ))}
                          </div>
                        )}

                      </div>
                    </Card3DTilt>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
