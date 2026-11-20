import React from 'react';
import { FileText, Download, CheckCircle2, Shield, Eye, Sparkles } from 'lucide-react';
import { Card3DTilt } from '../3d/Card3DTilt';

export const ResumeSection = ({ resume, profile }) => {
  return (
    <section id="resume" className="py-20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <Card3DTilt maxTilt={6}>
          <div className="glass-panel-3d rounded-3xl p-8 sm:p-12 border border-cyan-500/30 shadow-2xl text-center space-y-6 relative overflow-hidden">
            
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mx-auto shadow-xl shadow-cyan-950/60">
              <FileText className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                VERIFIED CREDENTIAL DOSSIER
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Curriculum <span className="cyber-gradient-text">Vitae</span>
              </h2>
            </div>

            <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Download the complete technical record detailing enterprise software delivery, cryptographic zero-trust architectures, and ethical hacking accreditations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto text-left text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Full-Stack Engineering</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero-Trust Security</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>DevSecOps & Cloud</span>
              </div>
            </div>

            <div className="pt-2">
              {resume?.file && (
                <a
                  href={resume.file}
                  download
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-xs sm:text-sm font-mono uppercase tracking-wider shadow-xl shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Curriculum Vitae (PDF)</span>
                </a>
              )}
            </div>

          </div>
        </Card3DTilt>

      </div>
    </section>
  );
};
