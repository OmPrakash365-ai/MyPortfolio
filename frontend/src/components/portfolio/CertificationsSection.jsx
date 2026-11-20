import React from 'react';
import { Award, ExternalLink, Calendar, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Card3DTilt } from '../3d/Card3DTilt';

export const CertificationsSection = ({ certifications = [] }) => {
  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      {/* Background Volumetric Light */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-wider shadow-sm shadow-cyan-950">
            <Award className="w-3.5 h-3.5" />
            <span>06 // Verified Credentials & Licenses</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Professional <span className="cyber-gradient-text">Certifications</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Cryptographically verified accreditations, cloud architecture certifications, and ethical hacking credentials.
          </p>
        </div>

        {/* 3D Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {certifications.map((cert, idx) => {
            const formattedDate = cert.issue_date
              ? new Date(cert.issue_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
              : 'Active';

            return (
              <Card3DTilt key={cert.id} maxTilt={9} scale={1.02} className="h-full">
                <div className="glass-panel-3d rounded-3xl p-6 sm:p-7 border border-cyan-500/25 hover:border-cyan-400/70 transition-all shadow-xl h-full flex flex-col justify-between group relative overflow-hidden">
                  
                  <div className="space-y-4">
                    
                    {/* Top Status & Date */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
                      <span className="text-cyan-400 font-bold">LICENSE // 0{idx + 1}</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{formattedDate}</span>
                      </span>
                    </div>

                    {/* Issuing Organization */}
                    <div className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
                      {cert.issuing_organization}
                    </div>

                    {/* Certificate Name */}
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {cert.name}
                    </h3>

                    {/* Credential ID */}
                    {cert.credential_id && (
                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-400 break-all">
                        ID: <span className="text-cyan-300 font-bold">{cert.credential_id}</span>
                      </div>
                    )}

                    {/* Certificate Preview Image if available */}
                    {cert.certificate_image && (
                      <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 mt-2">
                        <img
                          src={cert.certificate_image}
                          alt={cert.name}
                          className="w-full h-full object-cover object-center filter contrast-[1.02] group-hover:scale-105 transition-transform"
                          loading="lazy"
                        />
                      </div>
                    )}

                  </div>

                  {/* Verification Link Button */}
                  <div className="pt-6 mt-6 border-t border-slate-800">
                    {cert.credential_url ? (
                      <a
                        href={cert.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-xs font-mono uppercase tracking-wider text-cyan-300 hover:bg-cyan-900/70 hover:border-cyan-400 transition-all group/link"
                      >
                        <span>Verify Credential</span>
                        <ExternalLink className="w-3.5 h-3.5 group-link-hover:translate-x-0.5 group-link-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    ) : (
                      <span className="text-xs font-mono text-slate-500 uppercase tracking-widest block text-center">
                        Verified Enterprise Authority
                      </span>
                    )}
                  </div>

                </div>
              </Card3DTilt>
            );
          })}
        </div>

      </div>
    </section>
  );
};
