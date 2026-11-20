import React, { useState } from 'react';
import { Shield, Lock, User, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLogin = ({ onSuccess, showToast }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('adminpassword123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please provide both username/email and password.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await login(username, password);
      if (showToast) showToast('Authenticated successfully. Welcome back!', 'success');
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err.response?.data?.detail ||
        'Authentication failed. Please check your credentials.'
      );
      if (showToast) showToast('Invalid credentials provided.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute w-[500px] h-[300px] bg-gradient-to-tr from-cyan-600/10 via-blue-600/10 to-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md">
        
        {/* Back Link */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Public Portfolio</span>
        </a>

        {/* Login Box */}
        <div className="glass-panel rounded-3xl p-8 border border-slate-800 shadow-2xl shadow-cyan-950/40">
          
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 shadow-lg shadow-cyan-950/50">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Admin Gateway
            </h1>
            <p className="text-xs font-mono text-cyan-400 mt-1">
              PORTFOLIO CONTROL PLANE // RESTRICTED ACCESS
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2.5 mb-6">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                Username or Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                />
              </div>
            </div>

            {/* Seeded default hint */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] font-mono text-slate-400">
              <span className="text-cyan-400 font-bold block mb-0.5">Seeded Credentials:</span>
              <span>Username: <strong className="text-slate-200">admin</strong> | Password: <strong className="text-slate-200">adminpassword123</strong></span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 mt-6"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying credentials...</span>
                </>
              ) : (
                <span>Access Console</span>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};
