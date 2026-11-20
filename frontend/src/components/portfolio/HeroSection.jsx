import React from 'react';
import { Download, Mail, ArrowRight, ShieldCheck, Terminal, Award, Code2, Github, Linkedin, Twitter, Instagram, ExternalLink, Eye, Sparkles } from 'lucide-react';
import { TypingEffect } from '../common/TypingEffect';
import { HeroProfile3D } from '../3d/HeroProfile3D';

export const HeroSection = ({ profile, resume, socialLinks = [] }) => {
  const titles = profile?.typing_titles && profile.typing_titles.length > 0
    ? profile.typing_titles
    : [
        "Software Developer | Cybersecurity Enthusiast",
        "Full-Stack Architect",
        "Penetration Tester & Ethical Hacker",
        "Cloud & SecOps Specialist",
      ];

  const getPlatformIcon = (platform) => {
    const p = platform?.toLowerCase() || '';
    if (p.includes('git')) return <Github className="w-4 h-4" />;
    if (p.includes('link')) return <Linkedin className="w-4 h-4" />;
    if (p.includes('insta')) return <Instagram className="w-4 h-4" />;
    if (p.includes('twit')) return <Twitter className="w-4 h-4" />;
    return <ExternalLink className="w-4 h-4" />;
  };

  return (
    <section id="home" className="relative min-h-[96vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Volumetric Glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-purple-600/15 blur-[140px] pointer-events-none rounded-full"></div>
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[350px] bg-gradient-to-bl from-purple-600/15 via-cyan-600/10 to-transparent blur-[130px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Greeting, Typings, CTAs & Socials */}
          <div className="lg:col-span-6 text-center lg:text-left order-2 lg:order-1 space-y-6">
            
            {/* Availability Status Indicator */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-xs font-mono text-cyan-300 backdrop-blur-md shadow-lg shadow-cyan-950/50">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-semibold text-emerald-400">AVAILABILITY:</span>
              <span>{profile?.open_to_work ? 'Available for High-Impact Roles & CTF' : 'Security Consultation Open'}</span>
            </div>

            {/* Greeting & Name */}
            <div>
              <div className="text-sm sm:text-base font-mono text-cyan-400 uppercase tracking-widest mb-2 flex items-center justify-center lg:justify-start gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Hello, I'm</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
                <span className="cyber-gradient-text">{profile?.name || 'Om Prakash'}</span>
              </h1>
            </div>

            {/* Animated Typing Title */}
            <div className="text-lg sm:text-2xl font-mono text-slate-300 h-12 flex items-center justify-center lg:justify-start">
              <TypingEffect words={titles} />
            </div>

            {/* Short Introduction */}
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              {profile?.short_intro ||
                "Architecting resilient, production-grade applications with modern React and Django backends, coupled with an offensive and defensive cybersecurity mindset to safeguard digital infrastructure."}
            </p>

            {/* Action Buttons: Download Resume, Explore Projects, Contact Me */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              {resume?.file && (
                <a
                  href={resume.file}
                  download
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white shadow-xl shadow-cyan-500/30 hover:from-cyan-400 hover:to-purple-500 hover:scale-[1.03] active:scale-[0.98] transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume</span>
                </a>
              )}

              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-slate-900/90 text-slate-200 border border-slate-700/80 hover:bg-slate-800 hover:border-cyan-500/50 hover:text-white transition-all shadow-lg hover:scale-[1.02]"
              >
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>Explore Projects</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-cyan-950/50 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900/60 transition-all shadow-md hover:scale-[1.02]"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Contact Me</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </a>
            </div>

            {/* Social Links & Metric Counters */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider mr-1">
                  Matrix:
                </span>
                {socialLinks.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:scale-110 transition-all shadow-sm"
                    title={item.title || item.platform}
                  >
                    {getPlatformIcon(item.platform)}
                  </a>
                ))}
              </div>

              {/* Dynamic Metrics */}
              <div className="flex items-center gap-5 text-xs font-mono text-slate-400">
                <div>
                  <span className="text-cyan-400 font-bold text-sm">{profile?.years_of_experience || '4'}+</span> Years Exp
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-700"></div>
                <div>
                  <span className="text-purple-400 font-bold text-sm">{profile?.projects_completed || '28'}+</span> Projects
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-700"></div>
                <div>
                  <span className="text-emerald-400 font-bold text-sm">{profile?.security_assessments || '45'}+</span> Audits
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Holographic Profile Environment */}
          <div className="lg:col-span-6 flex justify-center order-1 lg:order-2">
            <HeroProfile3D profile={profile} />
          </div>

        </div>
      </div>
    </section>
  );
};
