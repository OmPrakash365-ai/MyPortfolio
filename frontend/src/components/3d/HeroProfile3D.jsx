import React, { useState, useRef } from 'react';
import { ShieldCheck, Lock, Terminal } from 'lucide-react';

export const HeroProfile3D = ({ profile }) => {
  const containerRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Smooth mouse tilt handler for realistic depth
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 8;
    const rotateX = -((y - centerY) / centerY) * 8;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const avatarUrl = !imgError && profile?.avatar
    ? profile.avatar
    : '/profile/omprakash_portrait.jpg';

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-2 select-none">
      
      {/* 3D Perspective Canvas Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative perspective-1000 cursor-pointer group w-full max-w-[460px] sm:max-w-[500px] lg:max-w-[540px]"
      >
        {/* Volumetric Neon Ambient Glow Behind Portrait */}
        <div
          className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/20 via-purple-600/25 to-blue-500/20 rounded-[3rem] blur-3xl transition-all duration-700 pointer-events-none"
          style={{
            transform: `scale(${isHovered ? 1.05 : 1})`,
            opacity: isHovered ? 0.9 : 0.65,
          }}
        ></div>

        {/* 3D Stage with Preserve-3D */}
        <div
          className="relative preserve-3d transition-transform duration-300 ease-out"
          style={{
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          }}
        >
          {/* Main Cinematic Viewport Frame */}
          <div className="relative w-full aspect-[4/5] sm:aspect-[4.2/5] rounded-[2.5rem] overflow-hidden glass-panel-3d border border-cyan-500/30 shadow-2xl shadow-cyan-950/70">
            
            {/* Hologram Scanlines Overlay */}
            <div className="absolute inset-0 hologram-scanlines pointer-events-none opacity-20 z-20"></div>

            {/* Corner Cyberpunk Reticle Markers */}
            <div className="absolute top-5 left-5 w-5 h-5 border-t-2 border-l-2 border-cyan-400 pointer-events-none z-30"></div>
            <div className="absolute top-5 right-5 w-5 h-5 border-t-2 border-r-2 border-cyan-400 pointer-events-none z-30"></div>
            <div className="absolute bottom-5 left-5 w-5 h-5 border-b-2 border-l-2 border-cyan-400 pointer-events-none z-30"></div>
            <div className="absolute bottom-5 right-5 w-5 h-5 border-b-2 border-r-2 border-cyan-400 pointer-events-none z-30"></div>

            {/* Inner Portrait Container */}
            <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-slate-900/60 via-[#070b16] to-[#030712] flex items-center justify-center">
              
              {/* Radial Glow Backdrop */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,_var(--tw-gradient-stops))] from-cyan-500/15 via-transparent to-transparent pointer-events-none"></div>

              {/* High-Resolution Hero Portrait */}
              <img
                src={avatarUrl}
                alt={profile?.name || "Om Prakash"}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover object-top filter contrast-[1.04] brightness-[1.02] transition-transform duration-700 group-hover:scale-[1.03]"
              />

              {/* Subtle Bottom & Edge Vignette Gradient to blend naturally */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80 pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/30 via-transparent to-[#030712]/30 pointer-events-none"></div>
            </div>

            {/* Top Right HUD Panel: DEFENSE PROTOCOL // OK */}
            <div className="absolute top-5 right-5 z-40 px-3 py-1.5 rounded-full bg-slate-950/90 border border-cyan-400/50 text-[10px] sm:text-[11px] font-mono text-cyan-300 flex items-center gap-1.5 shadow-xl shadow-cyan-950/90 backdrop-blur-md pointer-events-none">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-bold tracking-wider">DEFENSE PROTOCOL // OK</span>
            </div>

            {/* Bottom Chest Cyberpunk HUD Bar */}
            <div className="absolute bottom-6 inset-x-6 sm:inset-x-8 z-40 flex flex-col items-start gap-1.5 pointer-events-none">
              
              {/* Small Tag: ZERO-TRUST VERIFIED */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-950/90 border border-cyan-500/40 text-[9px] sm:text-[10px] font-mono text-cyan-400 backdrop-blur-md shadow-md">
                <Lock className="w-3 h-3 text-cyan-400" />
                <span className="tracking-wider uppercase font-semibold">ZERO-TRUST VERIFIED</span>
              </div>

              {/* Main Futuristic HUD Pill Bar */}
              <div className="w-full px-5 py-3 rounded-2xl bg-slate-950/90 border border-cyan-500/60 shadow-[0_0_25px_rgba(6,182,212,0.3)] backdrop-blur-xl flex items-center justify-between text-xs sm:text-sm font-mono relative overflow-hidden">
                {/* Subtle scanning glow inside the bar */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 pointer-events-none"></div>
                
                {/* Left: Name with pulsing beacon */}
                <div className="flex items-center gap-2.5 relative z-10">
                  <div className="relative flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping absolute"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  </div>
                  <span className="text-white font-bold tracking-wide">
                    {profile?.name || 'Om Prakash'}
                  </span>
                </div>

                {/* Right: Availability Status */}
                <div className="relative z-10 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-500/40 text-[10px] sm:text-[11px] font-bold text-cyan-300 uppercase tracking-widest">
                    {profile?.open_to_work ? 'AVAILABLE' : 'ACTIVE'}
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
};
