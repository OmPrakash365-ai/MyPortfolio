import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertTriangle, ArrowRight, Github, Linkedin, Instagram, Twitter, Radio } from 'lucide-react';
import { submitContact } from '../../services/api';
import { ContactGlobe3D } from '../3d/ContactGlobe3D';
import { Card3DTilt } from '../3d/Card3DTilt';

export const ContactSection = ({ profile, socialLinks = [], showToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const getPlatformIcon = (platform) => {
    const p = platform?.toLowerCase() || '';
    if (p.includes('git')) return <Github className="w-4 h-4" />;
    if (p.includes('link')) return <Linkedin className="w-4 h-4" />;
    if (p.includes('insta')) return <Instagram className="w-4 h-4" />;
    if (p.includes('twit')) return <Twitter className="w-4 h-4" />;
    return <Mail className="w-4 h-4" />;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await submitContact(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      if (showToast) {
        showToast('Telemetry transmission delivered successfully.', 'success');
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      setError('Transmission failed. Direct email communication recommended.');
      if (showToast) {
        showToast('Transmission error. Please retry.', 'error');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Volumetric Light */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-wider shadow-sm shadow-cyan-950">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>08 // 3D Global Transmission Node</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Initiate <span className="cyber-gradient-text">Transmission</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Open secure communications for full-stack engineering initiatives, technical leadership, or penetration testing audits.
          </p>
        </div>

        {/* 3D Globe + Glassmorphism Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: 3D Transmission Globe & Contact Coordinates */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <Card3DTilt maxTilt={6}>
              <div className="glass-panel-3d rounded-3xl p-6 sm:p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-950/70 relative overflow-hidden">
                
                {/* 3D Global Transmission Globe */}
                <div className="relative">
                  <ContactGlobe3D />
                  
                  <div className="absolute top-2 left-2 text-[10px] font-mono text-cyan-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>BEACON ACTIVE // 127.0.0.1</span>
                  </div>
                </div>

                {/* Direct Coordinates */}
                <div className="space-y-3 mt-4 pt-4 border-t border-slate-800">
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">Direct Channel</span>
                      <a href={`mailto:${profile?.email || 'admin@portfolio.com'}`} className="text-xs sm:text-sm font-bold text-white hover:text-cyan-400 transition-colors">
                        {profile?.email || 'admin@portfolio.com'}
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block mb-0.5">Telephone</span>
                      <span className="text-xs font-semibold text-slate-200">{profile?.phone || '+91 98765 43210'}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block mb-0.5">Location</span>
                      <span className="text-xs font-semibold text-slate-200 truncate block">{profile?.location || 'New Delhi, India / Remote'}</span>
                    </div>
                  </div>

                  {/* Social Channel Strip */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {socialLinks.map((item) => (
                      <a
                        key={item.id}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                      >
                        {getPlatformIcon(item.platform)}
                        <span className="capitalize">{item.platform}</span>
                      </a>
                    ))}
                  </div>

                </div>

              </div>
            </Card3DTilt>
          </div>

          {/* Right Column: Cyberpunk Glassmorphism Contact Form */}
          <div className="lg:col-span-7">
            <Card3DTilt maxTilt={5}>
              <div className="glass-panel-3d rounded-3xl p-6 sm:p-10 border border-cyan-500/30 shadow-2xl relative text-left">
                
                {/* Hologram Reticle */}
                <div className="absolute top-4 right-6 text-xs font-mono text-cyan-400/60 uppercase">
                  ENCRYPTED CHANNEL // TLS 1.3
                </div>

                {success ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-950">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Transmission Confirmed
                    </h3>
                    <p className="text-sm text-slate-400 max-w-sm mx-auto">
                      Your encrypted inquiry has been written to the backend inbox. Telemetry acknowledgment received.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="mt-4 px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs uppercase font-bold tracking-wider shadow-lg shadow-cyan-950"
                    >
                      Transmit Another Packet
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {error && (
                      <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-400 text-xs flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                          Sender Identity *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Agent / Client Name"
                          className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_12px_rgba(6,182,212,0.3)] transition-all font-mono"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                          Return Address (Email) *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="client@organization.com"
                          className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_12px_rgba(6,182,212,0.3)] transition-all font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                        Subject Protocol *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Security Audit / Enterprise Initiative"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_12px_rgba(6,182,212,0.3)] transition-all font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                        Transmission Payload (Message) *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Detail your architecture requirements, timeline, or vulnerability assessment scope..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_12px_rgba(6,182,212,0.3)] transition-all font-mono resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-xs sm:text-sm font-mono uppercase tracking-widest hover:from-cyan-400 hover:to-purple-500 transition-all shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                    >
                      {submitting ? (
                        <span>Broadcasting Signal...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Transmit Encrypted Packet</span>
                        </>
                      )}
                    </button>

                  </form>
                )}

              </div>
            </Card3DTilt>
          </div>

        </div>

      </div>
    </section>
  );
};
