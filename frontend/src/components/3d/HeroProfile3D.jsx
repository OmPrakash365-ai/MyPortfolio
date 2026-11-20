import React, { useState, useRef } from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export const HeroProfile3D = ({ profile }) => {
  const containerRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(
    profile?.avatar || '/profile/omprakash_portrait.jpg'
  );

  // Smooth mouse tilt handler for realistic depth
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 6;
    const rotateX = -((y - centerY) / centerY) * 6;

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
    <div className="relative w-full flex flex-col items-center justify-center select-none">
      
      {/* 3D Perspective Canvas Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative perspective-1000 cursor-pointer group w-full max-w-[480px] sm:max-w-[520px] lg:max-w-[560px]"
      >
        {/* Volumetric Neon Ambient Glow Behind Portrait */}
        <div
          className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/20 via-[#15335e]/40 to-blue-500/20 rounded-[3rem] blur-3xl transition-all duration-700 pointer-events-none"
          style={{
            transform: `scale(${isHovered ? 1.05 : 1})`,
            opacity: isHovered ? 0.9 : 0.7,
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
          <div className="relative w-full aspect-[4/4.8] sm:aspect-[4.2/4.8] rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-950/70">
            
            {/* Hologram Scanlines Overlay */}
            <div className="absolute inset-0 hologram-scanlines pointer-events-none opacity-15 z-20"></div>

            {/* Corner Cyberpunk Reticle Markers */}
            <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-cyan-400 pointer-events-none z-30"></div>
            <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-cyan-400 pointer-events-none z-30"></div>
            <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-cyan-400 pointer-events-none z-30"></div>
            <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-cyan-400 pointer-events-none z-30"></div>

            {/* Floating Holographic Badge: Top Right */}
            <div className="absolute top-4 right-5 z-40 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950/85 border border-cyan-400/50 text-[10px] sm:text-[11px] font-mono text-cyan-300 backdrop-blur-md shadow-lg shadow-cyan-950/70 pointer-events-none">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold tracking-wider">DEFENSE PROTOCOL // OK</span>
            </div>

            {/* High-Resolution Suit Portrait */}
            <img
              src={imgSrc}
              onError={() => setImgSrc('/profile/omprakash_portrait.jpg')}
              alt={profile?.name || "Om Prakash"}
              className="w-full h-full object-cover object-top filter contrast-[1.04] brightness-[0.98] transition-transform duration-500 group-hover:scale-[1.03]"
            />

            {/* Subtle Bottom Dark Gradient Vignette for Text Contrast */}
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#061224] via-[#061224]/80 to-transparent pointer-events-none z-20"></div>

            {/* Bottom HUD Cluster */}
            <div className="absolute bottom-4 inset-x-4 sm:inset-x-6 z-30 flex flex-col items-start gap-2">
              
              {/* Small Tag: ZERO-TRUST VERIFIED */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-950/90 border border-cyan-500/40 text-[9px] sm:text-[10px] font-mono text-cyan-400 backdrop-blur-md shadow-md">
                <Lock className="w-3 h-3 text-cyan-400" />
                <span className="tracking-wider uppercase font-semibold">ZERO-TRUST VERIFIED</span>
              </div>

              {/* Main Futuristic HUD Pill Bar */}
              <div className="w-full px-5 py-3 rounded-2xl bg-[#071327]/90 border border-cyan-500/60 shadow-[0_0_25px_rgba(6,182,212,0.35)] backdrop-blur-xl flex items-center justify-between text-xs sm:text-sm font-mono relative overflow-hidden">
                {/* Subtle scanning glow inside the bar */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10 pointer-events-none"></div>
                
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
                  <span className="px-2.5 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-500/50 text-[10px] sm:text-[11px] font-bold text-cyan-300 uppercase tracking-widest">
                    {profile?.open_to_work ? 'AVAILABLE' : 'ACTIVE'}
                  </span>
                </div>
              </div>

              {/* Glowing Neon Cyan Pod Accent Line */}
              <div className="w-3/4 mx-auto h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#00f0ff]"></div>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
};
