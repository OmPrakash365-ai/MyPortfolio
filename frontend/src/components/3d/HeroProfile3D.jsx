import React, { useState, useRef } from 'react';
import { ShieldCheck, Code, Lock, Terminal, Activity, Zap } from 'lucide-react';

export const HeroProfile3D = ({ profile }) => {
  const containerRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Smooth mouse tilt handler
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 12;
    const rotateX = -((y - centerY) / centerY) * 12;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-6 select-none">
      
      {/* 3D Perspective Canvas Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative perspective-1000 cursor-pointer group"
      >
        {/* Volumetric Neon Ambient Glow Aura */}
        <div
          className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/25 via-purple-600/30 to-blue-500/25 rounded-[3.5rem] blur-2xl transition-all duration-700 pointer-events-none"
          style={{
            transform: `scale(${isHovered ? 1.08 : 1})`,
            opacity: isHovered ? 0.9 : 0.65,
          }}
        ></div>

        {/* Dual Rotating 3D Concentric Orbital Rings */}
        <div className="absolute -inset-8 pointer-events-none flex items-center justify-center">
          {/* Outer Ring */}
          <div className="w-[118%] h-[118%] rounded-full border border-dashed border-cyan-400/35 animate-spin-slow"></div>
          {/* Inner Counter-Rotating Ring */}
          <div className="absolute w-[108%] h-[108%] rounded-full border border-purple-400/30 animate-spin-reverse-slow"></div>
          {/* Orbiting Tech Nodes */}
          <div
            className="absolute w-3 h-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400 animate-spin-slow"
            style={{ transformOrigin: 'calc(50% + 185px) 50%' }}
          ></div>
          <div
            className="absolute w-2.5 h-2.5 rounded-full bg-purple-400 shadow-lg shadow-purple-400 animate-spin-reverse-slow"
            style={{ transformOrigin: '50% calc(50% + 215px)' }}
          ></div>
        </div>

        {/* 3D Card Stage with Preserve-3D */}
        <div
          className="relative preserve-3d transition-transform duration-300 ease-out"
          style={{
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          }}
        >
          {/* Main Frame Pedestal Container */}
          <div className="w-[280px] h-[370px] sm:w-[340px] sm:h-[450px] lg:w-[400px] lg:h-[510px] rounded-[2.8rem] p-3 sm:p-4 glass-panel-3d relative overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-950/70 animate-float-subtle">
            
            {/* Hologram Scanlines Overlay */}
            <div className="absolute inset-0 hologram-scanlines pointer-events-none opacity-40 z-20"></div>

            {/* Corner Cyberpunk Reticle Markers */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-cyan-400 pointer-events-none z-30"></div>
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-cyan-400 pointer-events-none z-30"></div>
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-cyan-400 pointer-events-none z-30"></div>
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-cyan-400 pointer-events-none z-30"></div>

            {/* Inner Portrait Stage */}
            <div className="w-full h-full rounded-[2.2rem] bg-gradient-to-b from-slate-900 via-slate-950 to-[#070b16] border border-slate-800/80 overflow-hidden relative flex items-center justify-center p-2 sm:p-3">
              
              {/* Radial Backdrop Highlight */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/15 via-transparent to-transparent pointer-events-none"></div>

              {profile?.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name || "Portrait"}
                  className="w-full h-full object-contain object-center rounded-2xl relative z-10 filter contrast-[1.03] transition-transform duration-500 group-hover:scale-105"
                  style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                  }}
                />
              ) : (
                /* Fallback Cyberpunk Silhouette if no avatar uploaded */
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 relative z-10">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 shadow-xl shadow-cyan-950/60">
                    <Terminal className="w-12 h-12 text-cyan-400" />
                  </div>
                  <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase mb-1">
                    System Operator
                  </span>
                  <span className="text-base font-bold text-white">
                    {profile?.name || 'Om Prakash'}
                  </span>
                </div>
              )}

              {/* Status Pill on Bottom of Image */}
              <div className="absolute bottom-3 inset-x-3 z-30 px-3.5 py-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-cyan-500/30 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-slate-200 font-semibold">{profile?.name || 'Om Prakash'}</span>
                </div>
                <span className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">
                  {profile?.open_to_work ? 'AVAILABLE' : 'ACTIVE'}
                </span>
              </div>
            </div>

            {/* Floating Holographic Panel 1: Top Right (Z-Depth 30) */}
            <div className="absolute top-5 right-5 z-40 px-2.5 py-1 rounded-full bg-slate-950/90 border border-cyan-400/40 text-[10px] font-mono text-cyan-300 flex items-center gap-1.5 shadow-lg shadow-cyan-950/80 pointer-events-none translate-z-30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>DEFENSE PROTOCOL // OK</span>
            </div>

            {/* Floating Holographic Panel 2: Bottom Left (Z-Depth 30) */}
            <div className="absolute -left-2 bottom-16 z-40 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/90 border border-cyan-500/40 text-[10px] font-mono text-cyan-400 shadow-lg pointer-events-none translate-z-20">
              <Lock className="w-3 h-3 text-cyan-400" />
              <span>ZERO-TRUST VERIFIED</span>
            </div>

          </div>
        </div>
      </div>

      {/* Hologram Circular Pedestal Beneath Portrait */}
      <div className="w-64 sm:w-80 h-10 -mt-5 hologram-pedestal rounded-full pointer-events-none relative flex items-center justify-center">
        <div className="w-48 sm:w-60 h-2 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent rounded-full animate-pulse-glow"></div>
      </div>

    </div>
  );
};
