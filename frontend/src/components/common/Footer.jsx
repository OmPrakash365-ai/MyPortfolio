import React from 'react';
import { ArrowUp, Shield, Terminal, Activity } from 'lucide-react';

export const Footer = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 border-t border-slate-900 bg-slate-950/80 backdrop-blur-md relative z-10 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-12 border-b border-slate-900">
          
          <div className="md:col-span-6 space-y-3">
            <span className="text-2xl font-extrabold tracking-tight text-white block">
              <span className="cyber-gradient-text">{profile?.name || 'OM PRAKASH'}</span>
            </span>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              Software Developer & Cybersecurity Specialist. Engineering resilient distributed systems, offensive-defensive security tooling, and interactive 3D WebGL architectures.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>NODE STATUS: ONLINE // ZERO-TRUST VERIFIED</span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block">
              Direct Matrix
            </span>
            <div className="flex flex-col space-y-1.5 text-xs font-mono text-slate-400">
              <a href="#home" className="hover:text-cyan-400 transition-colors">01 // Home Hub</a>
              <a href="#about" className="hover:text-cyan-400 transition-colors">02 // Security Dossier</a>
              <a href="#skills" className="hover:text-cyan-400 transition-colors">03 // 3D Tech Globe</a>
              <a href="#projects" className="hover:text-cyan-400 transition-colors">04 // Deployments</a>
              <a href="#experience" className="hover:text-cyan-400 transition-colors">05 // Career Chronicle</a>
              <a href="#contact" className="hover:text-cyan-400 transition-colors">06 // Transmission Node</a>
            </div>
          </div>

          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between space-y-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-300 hover:bg-slate-800 hover:border-cyan-400 transition-all shadow-md shadow-cyan-950"
            >
              <span>Return to Apex</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>

            <a
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-400 hover:text-purple-300 transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Control Plane</span>
            </a>
          </div>

        </div>

        {/* Colophon & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} {profile?.name || 'Om Prakash'}. All rights reserved.
          </div>
          <div>
            CYBERPUNK 3D UNIVERSE // THREE.JS & REACT THREE FIBER
          </div>
        </div>

      </div>
    </footer>
  );
};
