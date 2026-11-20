import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Search, Menu, X, Shield, Terminal, Sparkles, Cpu } from 'lucide-react';

export const Navbar = ({ profile, resume, onOpenSearch }) => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);

      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'certifications', 'achievements', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Certifications', href: '#certifications', id: 'certifications' },
    { label: 'Achievements', href: '#achievements', id: 'achievements' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel px-4 sm:px-6 py-2.5 rounded-2xl flex items-center justify-between border border-cyan-500/25 shadow-xl shadow-cyan-950/40 relative overflow-hidden backdrop-blur-xl">
            
            {/* Hologram Scanlines in Navbar */}
            <div className="absolute inset-0 hologram-scanlines pointer-events-none opacity-20"></div>

            {/* Brand Monogram */}
            <a
              href="#home"
              className="flex items-center gap-3 relative z-10 group"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1.5px] shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#05091a] rounded-[10px] flex items-center justify-center font-mono font-bold text-xs text-cyan-400">
                  OP
                </div>
              </div>
              <div className="text-left hidden sm:block">
                <span className="text-sm font-bold tracking-tight text-white block leading-none group-hover:text-cyan-400 transition-colors">
                  {profile?.name || 'OM PRAKASH'}
                </span>
                <span className="text-[9px] font-mono tracking-widest text-cyan-400/80 uppercase block mt-1">
                  CYBERPUNK 3D UNIVERSE
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1 relative z-10">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.href)}
                    className={`relative px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-all ${
                      isActive
                        ? 'text-cyan-300 font-bold bg-cyan-950/60 border border-cyan-500/40 shadow-sm shadow-cyan-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#00f0ff]"></span>
                    )}
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Utilities */}
            <div className="flex items-center gap-2.5 relative z-10">
              {/* Quick Search ⌘K */}
              <button
                onClick={onOpenSearch}
                className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 hover:bg-slate-800 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-950/60 transition-all"
                title="Search Command Palette (⌘K)"
              >
                <Search className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[11px]">Command</span>
                <kbd className="text-[10px] px-1 py-0.2 bg-black/60 rounded border border-cyan-500/30 text-slate-400">
                  ⌘K
                </kbd>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-colors"
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
              </button>

              {/* Mobile Drawer Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl xl:hidden bg-slate-900/80 border border-cyan-500/30 text-cyan-400 hover:bg-slate-800 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Cyber Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#030712]/95 backdrop-blur-2xl pt-24 px-6 pb-8 flex flex-col justify-between xl:hidden animate-fade-in border-b border-cyan-500/30">
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
              <span>CYBER NAVIGATION SYSTEM</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>

            <nav className="grid grid-cols-2 gap-2.5">
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.href)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left font-mono text-xs uppercase tracking-wider transition-all ${
                      isActive
                        ? 'bg-cyan-950/70 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/20'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-cyan-500/40'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] text-cyan-400/60 font-mono">0{idx + 1}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 text-xs font-mono text-cyan-400"
            >
              <Search className="w-4 h-4" />
              <span>Search Database (⌘K)</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
