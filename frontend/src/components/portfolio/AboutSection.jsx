import React, { useState } from 'react';
import { Shield, Terminal, Cpu, Award, Download, CheckCircle2, Lock, Zap, ArrowRight, Activity } from 'lucide-react';
import { AboutSphere3D } from '../3d/AboutSphere3D';
import { Card3DTilt } from '../3d/Card3DTilt';

export const AboutSection = ({ profile, resume }) => {
  const [activeTab, setActiveTab] = useState('bio');

  const tabs = [
    { id: 'bio', label: 'Biography', icon: Terminal },
    { id: 'objectives', label: 'Core Objectives', icon: Cpu },
    { id: 'security', label: 'CTF & Security', icon: Shield },
    { id: 'vision', label: 'Long-Term Vision', icon: Zap },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Volumetric Light */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-wider shadow-sm shadow-cyan-950">
            <Shield className="w-3.5 h-3.5" />
            <span>01 // Cyber Security Dossier</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About the <span className="cyber-gradient-text">Architect</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Bridging resilient backend engineering with an offensive-defensive cybersecurity intelligence mindset.
          </p>
        </div>

        {/* 3D Visual & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: 3D Holographic Security Core */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <Card3DTilt maxTilt={8} className="w-full">
              <div className="glass-panel-3d rounded-3xl p-6 sm:p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-950/60 relative overflow-hidden group">
                
                {/* 3D Spinning Security Shield Core */}
                <div className="relative">
                  <AboutSphere3D />
                  
                  {/* Overlay Status Pill */}
                  <div className="absolute bottom-4 inset-x-4 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 text-xs font-mono text-center flex items-center justify-between">
                    <span className="text-slate-300">SECURITY CORE:</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      ACTIVE // SECURED
                    </span>
                  </div>
                </div>

                {/* Metrics Matrix */}
                <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-800/80">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                    <span className="text-xl font-bold text-cyan-400 font-mono block">
                      {profile?.years_of_experience || '4'}+
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">
                      Years Experience
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                    <span className="text-xl font-bold text-purple-400 font-mono block">
                      {profile?.projects_completed || '28'}+
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">
                      Deployments
                    </span>
                  </div>
                </div>

              </div>
            </Card3DTilt>
          </div>

          {/* Right Column: Holographic Information Panels */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Interactive Holographic Tabs */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-950/80 border border-slate-800 backdrop-blur-md">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-950/50 font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Content Panel */}
            <Card3DTilt maxTilt={5}>
              <div className="glass-panel-3d rounded-3xl p-6 sm:p-8 border border-cyan-500/25 shadow-xl relative text-left min-h-[300px] flex flex-col justify-between">
                
                {/* Hologram Reticle */}
                <div className="absolute top-4 right-4 text-[10px] font-mono text-cyan-400/60 uppercase">
                  NODE // 0x7F01
                </div>

                <div className="space-y-4">
                  {activeTab === 'bio' && (
                    <div className="space-y-3 animate-fade-in">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-cyan-400" />
                        <span>Professional Biography</span>
                      </h3>
                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                        {profile?.biography ||
                          "With a dual background in modern full-stack engineering and offensive cybersecurity, I build applications that are as impenetrable as they are intuitive. My architectural work focuses on distributed web systems, RESTful microservices, and proactive threat modeling."}
                      </p>
                    </div>
                  )}

                  {activeTab === 'objectives' && (
                    <div className="space-y-3 animate-fade-in">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-purple-400" />
                        <span>Engineering Objectives</span>
                      </h3>
                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                        {profile?.career_objectives ||
                          "My mission is to architect systems where security is native, not reactive. From automated CI/CD vulnerability scanning to zero-trust access control, I design software that businesses and users can rely upon in hostile network environments."}
                      </p>
                    </div>
                  )}

                  {activeTab === 'security' && (
                    <div className="space-y-3 animate-fade-in">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Shield className="w-5 h-5 text-emerald-400" />
                        <span>CTF & Vulnerability Research</span>
                      </h3>
                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                        {profile?.personal_interests ||
                          "Capture The Flag (CTF) challenges, vulnerability disclosures, custom SIEM log analyzers, cryptography, and container escape mitigation."}
                      </p>
                    </div>
                  )}

                  {activeTab === 'vision' && (
                    <div className="space-y-3 animate-fade-in">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Zap className="w-5 h-5 text-amber-400" />
                        <span>Long-Term Aspirations</span>
                      </h3>
                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                        {profile?.career_goals ||
                          "Lead high-caliber engineering teams in developing autonomous cyber defense tooling, resilient distributed infrastructure, and next-generation developer platforms."}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer Action */}
                <div className="pt-6 mt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>VERIFIED ZERO-TRUST PROFILE</span>
                  </div>

                  {resume?.file && (
                    <a
                      href={resume.file}
                      download
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-xs font-mono text-cyan-300 hover:bg-cyan-900/60 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Resume (PDF)</span>
                    </a>
                  )}
                </div>

              </div>
            </Card3DTilt>

          </div>

        </div>

      </div>
    </section>
  );
};
