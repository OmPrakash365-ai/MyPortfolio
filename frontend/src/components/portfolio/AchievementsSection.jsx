import React from 'react';
import { Trophy, Calendar, Sparkles, ExternalLink } from 'lucide-react';
import { Card3DTilt } from '../3d/Card3DTilt';

export const AchievementsSection = ({ achievements = [] }) => {
  if (!achievements || achievements.length === 0) return null;

  return (
    <section id="achievements" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-wider shadow-sm shadow-cyan-950">
            <Trophy className="w-3.5 h-3.5" />
            <span>07 // Reconnaissance & Honors</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Awards & <span className="cyber-gradient-text">Accolades</span>
          </h2>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {achievements.map((ach, idx) => (
            <Card3DTilt key={ach.id} maxTilt={8} className="h-full">
              <div className="glass-panel-3d rounded-3xl p-6 sm:p-7 border border-cyan-500/25 hover:border-cyan-400/60 transition-all shadow-xl h-full flex flex-col justify-between group">
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                    <span>HONOR // 0{idx + 1}</span>
                    <span>{ach.date ? new Date(ach.date).getFullYear() : 'Recent'}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {ach.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {ach.description}
                  </p>

                  {ach.image && (
                    <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 mt-2">
                      <img
                        src={ach.image}
                        alt={ach.title}
                        className="w-full h-full object-cover object-center filter contrast-[1.02] group-hover:scale-105 transition-transform"
                        loading="lazy"
                      />
                    </div>
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
