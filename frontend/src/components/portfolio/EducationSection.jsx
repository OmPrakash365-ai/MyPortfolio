import React from 'react';
import { GraduationCap, Award, Calendar, BookOpen } from 'lucide-react';
import { Card3DTilt } from '../3d/Card3DTilt';

export const EducationSection = ({ educations = [] }) => {
  return (
    <section id="education" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-wider shadow-sm shadow-cyan-950">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>05 // Academic Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Academic <span className="cyber-gradient-text">Degrees</span>
          </h2>
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
          {educations.map((edu, idx) => (
            <Card3DTilt key={edu.id} maxTilt={8}>
              <div className="glass-panel-3d rounded-3xl p-6 sm:p-8 border border-cyan-500/25 hover:border-cyan-400/60 transition-all shadow-xl h-full flex flex-col justify-between">
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                    <span>ACADEMIC // 0{idx + 1}</span>
                    <span>{edu.graduation_year || 'Completed'}</span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {edu.degree}
                    </h3>
                    <div className="text-sm font-semibold text-purple-400">
                      {edu.institution_name}
                    </div>
                  </div>

                  {edu.cgpa && (
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>Score / CGPA: {edu.cgpa}</span>
                    </div>
                  )}

                  {edu.description && (
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
                      {edu.description}
                    </p>
                  )}
                </div>

              </div>
            </Card3DTilt>
          ))}
        </div>

      </div>
    </section>
  );
};
