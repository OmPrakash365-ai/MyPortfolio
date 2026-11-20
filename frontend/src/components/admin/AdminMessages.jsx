import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle2, Circle, Trash2, Reply, Search, Loader2 } from 'lucide-react';
import { messagesService } from '../../services/api';
import { ConfirmDialog } from '../common/ConfirmDialog';

export const AdminMessages = ({ showToast, onRefreshStats }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, msg: null });

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const data = await messagesService.list();
      setMessages(data);
    } catch (err) {
      console.error('Failed to load messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleRead = async (message) => {
    try {
      await messagesService.partialUpdate(message.id, { is_read: !message.is_read });
      fetchMessages();
      if (onRefreshStats) onRefreshStats();
    } catch (err) {
      console.error('Failed to toggle read state:', err);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm.msg) return;
    try {
      await messagesService.delete(deleteConfirm.msg.id);
      if (showToast) showToast('Message deleted.', 'success');
      fetchMessages();
      if (onRefreshStats) onRefreshStats();
    } catch (err) {
      console.error('Failed to delete message:', err);
      if (showToast) showToast('Failed to delete message.', 'error');
    }
  };

  const filtered = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Contact Submissions & Inquiries
          </h1>
          <p className="text-xs font-mono text-cyan-400 mt-1">
            CLIENT TELEMETRY // REAL-TIME INBOX & TRANSMISSIONS
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400">
          Total Received: <strong className="text-white">{messages.length}</strong>
        </div>
      </div>

      {/* Search Input */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search inquiries by sender, email, keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
          />
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center font-mono text-cyan-400 animate-pulse text-sm">
          Loading contact submissions...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 glass-panel rounded-2xl border border-slate-800 text-slate-400 text-sm">
          No inquiries found.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((msg) => (
            <div
              key={msg.id}
              className={`glass-panel p-6 rounded-2xl border transition-all ${
                msg.is_read
                  ? 'border-slate-800/80 bg-slate-950/40'
                  : 'border-cyan-500/40 bg-slate-900/80 shadow-md shadow-cyan-950/30'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => handleToggleRead(msg)}
                    title={msg.is_read ? 'Mark as Unread' : 'Mark as Read'}
                    className="text-slate-400 hover:text-cyan-400"
                  >
                    {msg.is_read ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                    )}
                  </button>

                  <span className="text-sm font-bold text-white">{msg.name}</span>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-300"
                  >
                    &lt;{msg.email}&gt;
                  </a>

                  {!msg.is_read && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                      NEW
                    </span>
                  )}
                </div>

                <div className="text-xs font-mono text-slate-400">
                  {new Date(msg.created_at).toLocaleString()}
                </div>
              </div>

              <h4 className="text-sm font-semibold text-white mb-2">{msg.subject}</h4>

              <p className="text-xs sm:text-sm text-slate-300 whitespace-pre-wrap leading-relaxed mb-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                {msg.message}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                <button
                  onClick={() => handleToggleRead(msg)}
                  className="text-xs font-mono text-slate-400 hover:text-white"
                >
                  {msg.is_read ? 'Mark as Unread' : 'Mark as Read'}
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium transition-colors"
                  >
                    <Reply className="w-3.5 h-3.5" />
                    <span>Reply via Email</span>
                  </a>
                  <button
                    onClick={() => setDeleteConfirm({ isOpen: true, msg })}
                    className="p-1.5 rounded-lg border border-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400"
                    title="Delete Message"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, msg: null })}
        onConfirm={handleDelete}
        title="Delete Contact Message"
        message={`Are you sure you want to delete message from ${deleteConfirm.msg?.name}?`}
      />

    </div>
  );
};
