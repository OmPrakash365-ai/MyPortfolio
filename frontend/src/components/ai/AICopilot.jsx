import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  X,
  Minimize2,
  Maximize2,
  Terminal,
  ShieldCheck,
  FolderGit2,
  FileText,
  Mail,
  Download,
  ExternalLink,
  Cpu,
  ArrowRight,
  RefreshCw,
  Zap,
} from 'lucide-react';

export const AICopilot = ({ portfolioData, onSelectProject, isOpen: controlledIsOpen, onToggleOpen }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (val) => {
    if (onToggleOpen) onToggleOpen(val);
    setInternalIsOpen(val);
  };
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const profile = portfolioData?.profile || {};
  const projects = portfolioData?.projects || [];
  const skills = portfolioData?.skill_categories || [];
  const experiences = portfolioData?.experiences || [];
  const certifications = portfolioData?.certifications || [];
  const resume = portfolioData?.resume || {};

  // Suggested quick prompt chips
  const quickPrompts = [
    { label: '⚡ Top Featured Deployments', query: 'Show me your featured projects and system architectures.' },
    { label: '🛡️ Cybersecurity & Zero-Trust', query: 'What is your background in cybersecurity, audits, and CTF?' },
    { label: '💻 Full-Stack & Python Experience', query: 'What is your experience with Django, React, and Python?' },
    { label: '📄 Download Verified CV', query: 'Can I download your resume and credentials dossier?' },
    { label: '💬 How to Contact or Hire Om', query: 'Are you available for roles and how can I get in touch?' },
  ];

  // Initialize greeting message on first mount
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'agent',
          text: `Neural telemetry online. I am **Agent Prakash**, Om's AI Portfolio Copilot.\n\nI have instant access to Om's architecture blueprints, zero-trust security research, skill proficiencies, and verified credentials. Ask me anything or select a prompt below!`,
          actions: [
            { label: 'Explore Top Projects', query: 'Show me your featured projects' },
            { label: 'Inspect Security Arsenal', query: 'Tell me about cybersecurity capabilities' },
          ],
        },
      ]);
    }
  }, [portfolioData]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized, isTyping]);

  // Focus input on open
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 150);
      setHasUnread(false);
    }
  }, [isOpen, isMinimized]);

  // Knowledge retrieval & response engine
  const processQuery = (rawQuery) => {
    const q = rawQuery.toLowerCase().trim();

    // 1. DYNAMIC SPECIFIC PROJECT MATCH
    // Check if the query specifically refers to any project in the database
    const matchedProject = projects.find((proj) => {
      const titleLower = (proj.title || '').toLowerCase();
      const slugLower = (proj.slug || '').toLowerCase();
      if (slugLower && q.includes(slugLower)) return true;
      if (titleLower && q.includes(titleLower)) return true;
      // Match key words (length >= 4) from title
      const words = titleLower.split(/[\s:,\-_|]+/).filter((w) => w.length >= 4);
      return words.some((w) => q.includes(w));
    });

    if (matchedProject) {
      const techList = Array.isArray(matchedProject.technologies)
        ? matchedProject.technologies.join(', ')
        : (matchedProject.technologies || 'Full-Stack Architecture');

      const actions = [
        { label: `Inspect ${matchedProject.title.split(':')[0]} Case Study ↗`, type: 'view_project', project: matchedProject },
      ];
      if (matchedProject.live_url) {
        actions.push({ label: 'Live Deployment ↗', type: 'external_link', url: matchedProject.live_url });
      }
      if (matchedProject.github_url) {
        actions.push({ label: 'Source Repository ↗', type: 'external_link', url: matchedProject.github_url });
      }

      return {
        text: `**${matchedProject.title}**\n\n• **Category**: ${matchedProject.category_name || 'System Architecture'}\n• **Purpose**: ${matchedProject.description || 'Production system deployment'}\n${matchedProject.detailed_overview ? `• **Architecture**: ${matchedProject.detailed_overview}\n` : ''}• **Tech Stack**: ${techList}\n${matchedProject.security_highlights ? `• **Security Highlights**: ${matchedProject.security_highlights}\n` : ''}`,
        actions,
      };
    }

    // 2. GENERAL PROJECTS / DEPLOYMENTS QUERIES
    if (q.includes('project') || q.includes('deployment') || q.includes('work') || q.includes('portfolio') || q.includes('built') || q.includes('case study') || q.includes('showcase')) {
      const featured = projects.filter((p) => p.is_featured);
      const displayProjects = featured.length > 0 ? featured : projects.slice(0, 3);
      const projectList = displayProjects.map((p) => `• **${p.title}** (${p.category_name || 'System Architecture'})`).join('\n');

      return {
        text: `Om has deployed **${projects.length} verified production systems** in his live database:\n\n${projectList || '• No active projects recorded yet.'}\n\nSelect any deployment below to examine its live interactive 3D blueprint and case study:`,
        actions: displayProjects.map((p) => ({
          label: `Inspect ${p.title.split(':')[0]}`,
          type: 'view_project',
          project: p,
        })),
      };
    }

    // 3. DYNAMIC SPECIFIC SKILL MATCH
    let specificSkill = null;
    let specificSkillCategory = null;
    for (const cat of skills) {
      if (cat.skills && Array.isArray(cat.skills)) {
        const found = cat.skills.find(
          (s) => s.name && q.includes(s.name.toLowerCase())
        );
        if (found) {
          specificSkill = found;
          specificSkillCategory = cat.name;
          break;
        }
      }
    }

    if (specificSkill) {
      return {
        text: `**Skill Verified: ${specificSkill.name}**\n\n• **Category**: ${specificSkillCategory || 'Technical Arsenal'}\n• **Proficiency Level**: ${specificSkill.proficiency || 90}%\n• **Status**: Active in production architecture and defensive telemetry.`,
        actions: [
          { label: 'View Skills Radar', type: 'navigate', target: '#skills' },
          { label: 'Explore All Projects', query: 'Show me your projects' },
        ],
      };
    }

    // 4. DYNAMIC SPECIFIC EXPERIENCE / COMPANY MATCH
    const matchedExp = experiences.find((exp) => {
      const compLower = (exp.company_name || '').toLowerCase();
      const roleLower = (exp.job_title || '').toLowerCase();
      return (compLower && q.includes(compLower)) || (roleLower && q.includes(roleLower));
    });

    if (matchedExp) {
      return {
        text: `**${matchedExp.job_title}** at **${matchedExp.company_name}**\n\n• **Employment**: ${matchedExp.employment_type || 'Full-time'}\n• **Period**: ${matchedExp.start_date || 'Present'} — ${matchedExp.is_current ? 'Present' : (matchedExp.end_date || '')}\n• **Location**: ${matchedExp.location || 'Remote'}\n• **Key Responsibilities**: ${matchedExp.description || 'System engineering and secure architecture.'}`,
        actions: [
          { label: 'View Career Chronicle', type: 'navigate', target: '#experience' },
        ],
      };
    }

    // 5. DYNAMIC SPECIFIC CERTIFICATION MATCH
    const matchedCert = certifications.find((c) => {
      const nameLower = (c.name || '').toLowerCase();
      const issuerLower = (c.issuing_organization || '').toLowerCase();
      return (nameLower && q.includes(nameLower)) || (issuerLower && q.includes(issuerLower));
    });

    if (matchedCert) {
      return {
        text: `**Verified Credential: ${matchedCert.name}**\n\n• **Issuing Authority**: ${matchedCert.issuing_organization || 'Accredited Board'}\n• **Issue Date**: ${matchedCert.issue_date || 'Verified'}\n${matchedCert.credential_id ? `• **Credential ID**: \`${matchedCert.credential_id}\`\n` : ''}${matchedCert.description ? `• **Scope**: ${matchedCert.description}\n` : ''}`,
        actions: [
          ...(matchedCert.credential_url ? [{ label: 'Verify Credential ↗', type: 'external_link', url: matchedCert.credential_url }] : []),
          { label: 'View Certifications Grid', type: 'navigate', target: '#certifications' },
        ],
      };
    }

    // 6. Cybersecurity & CTF Queries
    if (q.includes('cyber') || q.includes('security') || q.includes('ctf') || q.includes('hack') || q.includes('pentest') || q.includes('audit') || q.includes('zero-trust')) {
      const certNames = certifications.map((c) => c.name).join(', ') || 'CompTIA Security+, CEH, AWS Solutions Architect, OSWE';
      return {
        text: `**Cybersecurity & Threat Intelligence Dossier**\n\n• **Philosophy**: Zero-Trust architecture where security is native to the system design, not patched on after deployment.\n• **Audits & CTF**: Over **${profile.security_assessments || 45}+ security assessments** and competitive Capture The Flag engagements.\n• **Offensive Tooling**: Kali Linux, Burp Suite Professional, Nmap, Metasploit, Wireshark, custom Python exploits.\n• **Defensive Controls**: AES-GCM-256 payload encryption, JWT token rotation, PBKDF2/Argon2 password hashing, and container isolation.\n• **Accreditations**: ${certNames}.`,
        actions: [
          { label: 'View Verified Certifications', type: 'navigate', target: '#certifications' },
          { label: 'Explore Security Tools', type: 'navigate', target: '#skills' },
        ],
      };
    }

    // 7. Technical Skills & Stack General Queries
    if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('language') || q.includes('framework') || q.includes('tool') || q.includes('python') || q.includes('django') || q.includes('react')) {
      const topCategories = skills.slice(0, 4).map((c) => {
        const topSkills = c.skills?.slice(0, 3).map((s) => s.name).join(', ') || '';
        return `• **${c.name}**: ${topSkills}`;
      }).join('\n');

      return {
        text: `**Technical Architecture Stack**\n\nDirectly synced from Om's admin database:\n\n${topCategories || '• **Languages**: Python, Java, JavaScript, C++\n• **Backend**: Django REST Framework, Node.js, Flask\n• **Frontend**: React 18, Three.js, Tailwind CSS\n• **Cloud & SecOps**: Docker, Kubernetes, Linux, AWS'}\n\nOm has mastered **${profile.technologies_mastered || 22}+ technologies** with an emphasis on production resilience.`,
        actions: [
          { label: 'Rotate 3D Technology Globe', type: 'navigate', target: '#skills' },
          { label: 'View Full Lexicon', type: 'navigate', target: '#skills' },
        ],
      };
    }

    // 8. Experience & Career General Queries
    if (q.includes('experience') || q.includes('career') || q.includes('job') || q.includes('role') || q.includes('work history') || q.includes('company')) {
      const expList = experiences.map((exp) => `• **${exp.job_title}** at **${exp.company_name}** (${exp.employment_type || 'Full-time'})`).join('\n');
      return {
        text: `**Career Trajectory (${profile.years_of_experience || 4}+ Years Professional Experience)**\n\n${expList || '• **Lead Full-Stack & Security Architect** — Production software engineering\n• **Security Research Specialist** — Zero-trust implementation & vulnerability analysis'}\n\nOm specializes in building applications that withstand real-world threat actors while maintaining sub-second latency.`,
        actions: [
          { label: 'View Career Chronicle', type: 'navigate', target: '#experience' },
        ],
      };
    }

    // 9. Resume / CV Download Queries
    if (q.includes('resume') || q.includes('cv') || q.includes('download') || q.includes('pdf') || q.includes('dossier')) {
      return {
        text: `**Curriculum Vitae & Verified Credentials Dossier**\n\nYou can download the complete, verified PDF resume directly detailing Om's engineering history, system designs, and security certifications.`,
        actions: resume.file ? [
          { label: 'Download Resume (PDF) 📥', type: 'download_resume', url: resume.file },
        ] : [
          { label: 'Go to Resume Section', type: 'navigate', target: '#resume' },
        ],
      };
    }

    // 10. Contact, Hiring, & Availability Queries
    if (q.includes('contact') || q.includes('hire') || q.includes('available') || q.includes('email') || q.includes('interview') || q.includes('phone') || q.includes('call') || q.includes('reach')) {
      return {
        text: `**Status: ${profile.open_to_work ? '🟢 Available for High-Impact Roles & CTF' : 'Security Consultation Open'}**\n\n• **Location**: ${profile.location || 'New Delhi, India / Remote Global'}\n• **Email**: ${profile.email || 'admin@portfolio.com'}\n• **Phone**: ${profile.phone || '+91 98765 43210'}\n\nYou can transmit an encrypted message directly through the contact terminal below!`,
        actions: [
          { label: 'Jump to Transmission Form 📡', type: 'navigate', target: '#contact' },
          { label: `Email Om (${profile.email || 'admin@portfolio.com'})`, type: 'external_link', url: `mailto:${profile.email || 'admin@portfolio.com'}` },
        ],
      };
    }

    // 11. General / Philosophy / Fallback
    return {
      text: `${profile.name || 'Om Prakash'} is a **${profile.tagline || 'Software Developer & Cybersecurity Specialist'}** based in ${profile.location || 'India'}.\n\nHe architects high-scale React + Django applications, leads zero-trust security implementations, and conducts penetration testing audits.\n\nWould you like me to guide you to his **Deployments**, **Security Dossier**, or **Download his CV**?`,
      actions: [
        { label: 'Featured Deployments', query: 'Show me your projects' },
        { label: 'Download Resume (PDF)', query: 'Download resume' },
        { label: 'Initiate Contact', query: 'How to contact Om' },
      ],
    };
  };

  const handleSendMessage = (textToSend = null) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate neural reasoning latency
    setTimeout(() => {
      const response = processQuery(text);
      const agentMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: response.text,
        actions: response.actions || [],
      };
      setMessages((prev) => [...prev, agentMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleActionClick = (action) => {
    if (action.query) {
      handleSendMessage(action.query);
      return;
    }

    if (action.type === 'view_project' && action.project) {
      if (onSelectProject) {
        onSelectProject(action.project);
      } else {
        const el = document.querySelector('#projects');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (action.type === 'navigate' && action.target) {
      const el = document.querySelector(action.target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (action.type === 'download_resume' && action.url) {
      window.open(action.url, '_blank');
      return;
    }

    if (action.type === 'external_link' && action.url) {
      window.open(action.url, '_blank');
      return;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* ======================================================== */}
      {/* FLOATING CYBERPUNK LAUNCHER BEACON (Bottom Right) */}
      {/* ======================================================== */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
          {/* Always Visible Launcher Pill matching design */}
          <div
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#081528]/90 border border-cyan-500/40 text-xs font-mono text-cyan-300 shadow-xl shadow-cyan-950/70 backdrop-blur-md cursor-pointer hover:border-cyan-400 hover:text-white transition-all hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Ask Agent Prakash</span>
          </div>

          {/* Hologram Launcher Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[2px] shadow-2xl shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all group"
            title="Open AI Portfolio Copilot (Agent Prakash)"
          >
            {/* Pulsing Radar Ring */}
            <span className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 blur-md opacity-70 group-hover:opacity-100 transition-opacity animate-pulse-slow pointer-events-none"></span>

            <div className="w-full h-full bg-[#05091a] rounded-[14px] flex items-center justify-center relative z-10">
              <Bot className="w-7 h-7 text-cyan-400 group-hover:text-white transition-colors" />
              {/* Online Green Beacon */}
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#05091a] animate-ping"></span>
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#05091a]"></span>
            </div>
          </button>
        </div>
      )}

      {/* ======================================================== */}
      {/* AI COPILOT INTERACTIVE MODAL / HUD */}
      {/* ======================================================== */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ${
            isMinimized
              ? 'bottom-6 right-6 w-72'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] max-w-lg'
          }`}
        >
          <div className="glass-panel-3d border border-cyan-500/40 shadow-2xl shadow-cyan-950/90 rounded-3xl overflow-hidden flex flex-col relative backdrop-blur-2xl">
            
            {/* Hologram Scanlines Overlay */}
            <div className="absolute inset-0 hologram-scanlines pointer-events-none opacity-20"></div>

            {/* Copilot Header */}
            <div className="px-5 py-3.5 bg-slate-950/90 border-b border-cyan-500/30 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1.5px] flex items-center justify-center">
                    <div className="w-full h-full bg-[#05091a] rounded-[10px] flex items-center justify-center">
                      <Bot className="w-5 h-5 text-cyan-400" />
                    </div>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#05091a]"></span>
                </div>

                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white font-mono">AGENT PRAKASH</span>
                    <span className="px-1.5 py-0.2 rounded bg-cyan-950/80 border border-cyan-500/40 text-[9px] font-mono text-cyan-300 font-bold uppercase">
                      AI 2.0
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 block">
                    Zero-Trust Neural Copilot
                  </span>
                </div>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  title={isMinimized ? 'Expand' : 'Minimize'}
                >
                  {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
                  title="Close Copilot"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Minimized Content Preview */}
            {isMinimized ? (
              <div
                onClick={() => setIsMinimized(false)}
                className="p-3 bg-slate-950/80 text-xs font-mono text-cyan-300 flex items-center justify-between cursor-pointer hover:bg-slate-900"
              >
                <span>Copilot Active · Click to restore</span>
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
            ) : (
              <>
                {/* Scrollable Message History Area */}
                <div className="p-4 sm:p-5 overflow-y-auto max-h-[380px] sm:max-h-[420px] min-h-[260px] space-y-4 text-left relative z-10 text-xs sm:text-sm">
                  {messages.map((msg) => {
                    const isAgent = msg.sender === 'agent';
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-2.5 items-start ${isAgent ? 'justify-start' : 'justify-end'}`}
                      >
                        {isAgent && (
                          <div className="w-7 h-7 rounded-lg bg-cyan-950/90 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-0.5">
                            <Bot className="w-4 h-4 text-cyan-400" />
                          </div>
                        )}

                        <div
                          className={`rounded-2xl p-3.5 sm:p-4 max-w-[85%] leading-relaxed ${
                            isAgent
                              ? 'bg-slate-900/95 border border-cyan-500/25 text-slate-200 shadow-md shadow-black/50'
                              : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium shadow-md shadow-cyan-900/40'
                          }`}
                        >
                          <div className="whitespace-pre-line text-xs sm:text-[13px]">
                            {msg.text}
                          </div>

                          {/* Action Buttons if agent response provides them */}
                          {isAgent && msg.actions && msg.actions.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-3 mt-3 border-t border-slate-800">
                              {msg.actions.map((act, aIdx) => (
                                <button
                                  key={aIdx}
                                  onClick={() => handleActionClick(act)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-[11px] font-mono text-cyan-300 hover:bg-cyan-900/90 hover:border-cyan-400 hover:text-white transition-all shadow-sm"
                                >
                                  <span>{act.label}</span>
                                  <ArrowRight className="w-3 h-3 text-cyan-400" />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex gap-2.5 items-center text-xs font-mono text-cyan-400">
                      <div className="w-7 h-7 rounded-lg bg-cyan-950/90 border border-cyan-500/40 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-cyan-400 animate-spin-slow" />
                      </div>
                      <div className="px-3 py-2 rounded-xl bg-slate-900 border border-cyan-500/20 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]"></span>
                        <span className="text-[10px] text-slate-400 ml-1">Analyzing knowledge graph...</span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Prompts Chips Bar */}
                <div className="px-4 py-2 bg-slate-950/70 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar relative z-10">
                  {quickPrompts.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(item.query)}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 whitespace-nowrap transition-all shrink-0"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Input Controls Bar */}
                <div className="p-3 bg-slate-950/90 border-t border-cyan-500/25 relative z-10">
                  <div className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask Agent Prakash anything about Om..."
                      className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_12px_rgba(6,182,212,0.3)] transition-all font-mono"
                    />

                    <button
                      onClick={() => handleSendMessage()}
                      disabled={!inputMessage.trim() || isTyping}
                      className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 transition-all shadow-md shadow-cyan-950 shrink-0"
                      title="Transmit Query"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 px-1 pt-2">
                    <span>Press Enter to send</span>
                    <span className="text-cyan-400/70">AGENT PRAKASH V2.0</span>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </>
  );
};
