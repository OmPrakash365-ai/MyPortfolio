import React from 'react';
import { Download, Mail, ArrowRight, Github, Linkedin, Twitter, ExternalLink, Eye, Sparkles } from 'lucide-react';
import { TypingEffect } from '../common/TypingEffect';
import { HeroProfile3D } from '../3d/HeroProfile3D';

export const HeroSection = ({ profile, resume, socialLinks = [] }) => {
  const titles = profile?.typing_titles && profile.typing_titles.length > 0
    ? profile.typing_titles
    : [
        "Cybersecurity Specialist",
        "Full Stack Software Developer",
        "Penetration Tester & Ethical Hacker",
        "Cloud Architect & DevSecOps Engineer",
      ];

  const getPlatformIcon = (platform) => {
    const p = platform?.toLowerCase() || '';
    if (p.includes('git')) return <Github className="w-4 h-4" />;
    if (p.includes('link')) return <Linkedin className="w-4 h-4" />;
    if (p.includes('twit')) return <Twitter className="w-4 h-4" />;
    return <ExternalLink className="w-4 h-4" />;
  };

  const displaySocialLinks = socialLinks && socialLinks.length > 0
    ? socialLinks
    : [
        { id: 'gh', platform: 'github', url: 'https://github.com/OmPrakash365-ai' },
        { id: 'li', platform: 'linkedin', url: 'https://linkedin.com' },
        { id: 'tw', platform: 'twitter', url: 'https://twitter.com' },
        { id: 'ex1', platform: 'ctf', url: 'https://tryhackme.com' },
        { id: 'ex2', platform: 'audit', url: '#projects' },
      ];

  return (
    <section
      id="home"
      className="relative min-h-[96vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 90% 80% at 70% 35%, #15335e 0%, #0c2242 35%, #07152b 70%, #050e1c 100%)',
      }}
    >
      {/* Background Volumetric Glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-cyan-600/10 via-blue-600/10 to-purple-600/10 blur-[140px] pointer-events-none rounded-full"></div>
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[350px] bg-gradient-to-bl from-blue-600/15 via-cyan-600/10 to-transparent blur-[130px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Greeting, Typings, CTAs & Socials */}
          <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1 space-y-6">
            
            {/* Availability Status Indicator */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#071326]/85 border border-cyan-500/40 text-xs font-mono text-cyan-300 backdrop-blur-md shadow-lg shadow-cyan-950/50">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-semibold text-emerald-400">AVAILABILITY:</span>
              <span>{profile?.open_to_work ? 'Available for High-Impact Roles & CTF' : 'Security Consultation Open'}</span>
            </div>

            {/* Greeting & Name */}
            <div>
              <div className="text-xs sm:text-sm font-mono text-cyan-400 uppercase tracking-widest mb-2 flex items-center justify-center lg:justify-start gap-2 font-semibold">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Hello, I'm,</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
                <span className="bg-gradient-to-r from-[#00f0ff] via-[#60a5fa] to-[#c084fc] bg-clip-text text-transparent">
                  {profile?.name || 'Om Prakash'}
                </span>
              </h1>
            </div>

            {/* Animated Typing Title */}
            <div className="text-xl sm:text-2xl font-mono text-cyan-400 h-10 flex items-center justify-center lg:justify-start font-bold">
              <TypingEffect words={titles} />
            </div>

            {/* Short Introduction */}
            <p className="text-slate-300/90 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              {profile?.short_intro ||
                "Architecting resilient, production-grade applications with modern React and Django backends, coupled with an offensive and defensive cybersecurity mindset to protect digital ecosystems."}
            </p>

            {/* Action Buttons: Download Resume, Explore Projects, Contact Me */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href={resume?.file || "#contact"}
                download={!!resume?.file}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-[#00d2ff] via-[#3a7bd5] to-[#9b51e0] text-white shadow-[0_0_25px_rgba(0,210,255,0.35)] hover:shadow-[0_0_35px_rgba(0,210,255,0.55)] hover:scale-[1.03] active:scale-[0.98] transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-[#081528]/85 text-slate-200 border border-cyan-500/40 hover:bg-slate-800 hover:border-cyan-400 hover:text-white transition-all shadow-lg hover:scale-[1.02]"
              >
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>Explore Projects</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-[#081528]/85 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-950/60 transition-all shadow-md hover:scale-[1.02]"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Contact Me</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </a>
            </div>

            {/* Social Links & Metric Counters */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mr-1">
                  MATRIX:
                </span>
                {displaySocialLinks.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-[#081528]/90 border border-slate-700/60 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:scale-110 transition-all shadow-sm"
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
                  <span className="text-purple-400 font-bold text-sm">{profile?.projects_completed || '32'}+</span> Projects
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-700"></div>
                <div>
                  <span className="text-emerald-400 font-bold text-sm">{profile?.security_assessments || '50'}+</span> Audits
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Cinematic Profile Environment */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <HeroProfile3D profile={profile} />
          </div>

        </div>
      </div>
    </section>
  );
};
