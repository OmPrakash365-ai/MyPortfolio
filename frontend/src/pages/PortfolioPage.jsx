import React, { useState, useEffect } from 'react';
import { getPortfolioData } from '../services/api';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { HeroSection } from '../components/portfolio/HeroSection';
import { AboutSection } from '../components/portfolio/AboutSection';
import { SkillsSection } from '../components/portfolio/SkillsSection';
import { ProjectsSection } from '../components/portfolio/ProjectsSection';
import { ExperienceSection } from '../components/portfolio/ExperienceSection';
import { EducationSection } from '../components/portfolio/EducationSection';
import { CertificationsSection } from '../components/portfolio/CertificationsSection';
import { AchievementsSection } from '../components/portfolio/AchievementsSection';
import { ResumeSection } from '../components/portfolio/ResumeSection';
import { ContactSection } from '../components/portfolio/ContactSection';
import { CommandPalette } from '../components/common/CommandPalette';
import { ProjectDetailModal } from '../components/portfolio/ProjectDetailModal';
import { AICopilot } from '../components/ai/AICopilot';
import { CanvasBackground } from '../components/3d/CanvasBackground';
import { Shield, AlertTriangle, RefreshCw } from 'lucide-react';

export const PortfolioPage = ({ showToast }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getPortfolioData();
      setData(res);
    } catch (err) {
      console.error('Failed to load portfolio overview:', err);
      setError('Unable to link with Django API. Ensure backend server is operational.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Global Command+K or Ctrl+K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center p-6 text-center">
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-600 p-[2px] animate-spin">
            <div className="w-full h-full bg-[#030712] rounded-2xl"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Shield className="w-7 h-7 text-cyan-400" />
          </div>
        </div>
        <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest animate-pulse">
          INITIALIZING 3D UNIVERSE TELEMETRY & DATABASE LINKS...
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center p-6 text-center">
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 mb-4 shadow-xl shadow-rose-950/40">
          <AlertTriangle className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">API Connection Offline</h2>
        <p className="text-slate-400 text-sm max-w-md mb-6 font-mono">{error}</p>
        <button
          onClick={loadData}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono uppercase font-bold tracking-wider transition-all shadow-lg shadow-cyan-950"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry Transmission</span>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-300 relative overflow-x-hidden">
      
      {/* 3D Deep Space WebGL Interactive Background */}
      <CanvasBackground />

      {/* Floating Glassmorphic Navbar */}
      <Navbar
        profile={data.profile}
        resume={data.resume}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Main 3D Cyberpunk Sections */}
      <main className="flex-1 relative z-10">
        <HeroSection
          profile={data.profile}
          resume={data.resume}
          socialLinks={data.social_links}
        />

        <AboutSection
          profile={data.profile}
          resume={data.resume}
        />

        <SkillsSection
          skillCategories={data.skill_categories}
        />

        <ProjectsSection
          projects={data.projects}
          categories={data.project_categories}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        <ExperienceSection
          experiences={data.experiences}
        />

        <EducationSection
          educations={data.educations}
        />

        <CertificationsSection
          certifications={data.certifications}
        />

        <AchievementsSection
          achievements={data.achievements}
        />

        <ResumeSection
          resume={data.resume}
          profile={data.profile}
        />

        <ContactSection
          profile={data.profile}
          socialLinks={data.social_links}
          showToast={showToast}
        />
      </main>

      {/* Futuristic Colophon Footer */}
      <Footer
        profile={data.profile}
        socialLinks={data.social_links}
      />

      {/* Global ⌘K / Ctrl+K Command Palette */}
      <CommandPalette
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        projects={data.projects}
        onSelectProject={(project) => setSelectedProject(project)}
        onOpenCopilot={() => setCopilotOpen(true)}
      />

      {/* Dedicated Project Case Study Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          allProjects={data.projects}
          onClose={() => setSelectedProject(null)}
          onSelectProject={(project) => setSelectedProject(project)}
        />
      )}

      {/* 🤖 Digital Twin AI Portfolio Copilot (Agent Prakash) */}
      <AICopilot
        portfolioData={data}
        onSelectProject={(project) => setSelectedProject(project)}
        isOpen={copilotOpen}
        onToggleOpen={setCopilotOpen}
      />

    </div>
  );
};
