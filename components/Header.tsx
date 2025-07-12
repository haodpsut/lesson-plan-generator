
import React from 'react';
import { BrainCircuitIcon, SettingsIcon } from './Icons';

interface HeaderProps {
    onOpenSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 py-3 max-w-4xl">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <BrainCircuitIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    AI Lesson Plan Generator
                </h1>
                <span className="hidden sm:inline-block text-sm font-medium text-blue-500 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded-md">IT Edition</span>
            </div>
            <button
                onClick={onOpenSettings}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Open settings"
            >
                <SettingsIcon className="w-6 h-6 text-slate-600 dark:text-slate-300" />
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
