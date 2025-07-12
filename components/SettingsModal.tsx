
import React, { useState, useEffect } from 'react';
import { CloseIcon } from './Icons';

interface ApiKeys {
  gemini: string;
  openrouter: string;
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (keys: ApiKeys) => void;
  currentKeys: ApiKeys;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onSave, currentKeys }) => {
  const [keys, setKeys] = useState<ApiKeys>(currentKeys);

  useEffect(() => {
    setKeys(currentKeys);
  }, [currentKeys, isOpen]);

  if (!isOpen) {
    return null;
  }
  
  const handleSave = () => {
    onSave(keys);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md border border-slate-200 dark:border-slate-700 relative"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">API Key Settings</h2>
          <button 
            onClick={onClose} 
            className="p-1 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            aria-label="Close settings"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label htmlFor="gemini-key" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Google Gemini API Key
            </label>
            <input
              id="gemini-key"
              type="password"
              value={keys.gemini}
              onChange={e => setKeys(k => ({...k, gemini: e.target.value}))}
              placeholder="Enter your Google AI Studio key"
              className="block w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">Get your key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Google AI Studio</a>.</p>
          </div>
          <div>
            <label htmlFor="openrouter-key" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              OpenRouter API Key
            </label>
            <input
              id="openrouter-key"
              type="password"
              value={keys.openrouter}
              onChange={e => setKeys(k => ({...k, openrouter: e.target.value}))}
              placeholder="Enter your OpenRouter key"
              className="block w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">Get your free key from <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">OpenRouter.ai</a>.</p>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700 flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
          >
            Save Keys
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
