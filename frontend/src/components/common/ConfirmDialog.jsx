import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal } from './Modal';

export const ConfirmDialog = ({ isOpen, onClose, onConfirm, title = "Confirm Action", message = "Are you sure you want to proceed with this action? This cannot be undone.", confirmText = "Delete", isDestructive = true }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
      <div className="flex flex-col items-center text-center p-2">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${isDestructive ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'}`}>
          <AlertTriangle className="w-6 h-6" />
        </div>
        <p className="text-slate-300 text-sm mb-6 leading-relaxed">
          {message}
        </p>
        <div className="flex items-center justify-center gap-3 w-full">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-lg transition-all ${
              isDestructive
                ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-900/40'
                : 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-900/40'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};
