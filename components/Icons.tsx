
import React from 'react';

type IconProps = {
  className?: string;
};

export const BrainCircuitIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 5a3 3 0 1 0-5.993.142"/>
    <path d="M18 5a3 3 0 1 0-5.993.142"/>
    <path d="M12 19a3 3 0 1 0 5.993-.142"/>
    <path d="M6 19a3 3 0 1 0 5.993-.142"/>
    <path d="M12 12a3 3 0 1 0-5.993.142"/>
    <path d="M18 12a3 3 0 1 0-5.993.142"/>
    <path d="M6 5h.01"/>
    <path d="M18 5h.01"/>
    <path d="M6 12h.01"/>
    <path d="M18 12h.01"/>
    <path d="M6 19h.01"/>
    <path d="M18 19h.01"/>
    <path d="M9 8V5"/>
    <path d="M15 8V5"/>
    <path d="M9 19v-3"/>
    <path d="M15 19v-3"/>
    <path d="M9 12v3"/>
    <path d="M15 12v3"/>
    <path d="m9 8 6 0"/>
    <path d="m9 16 6 0"/>
  </svg>
);

export const GenerateIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15.2 3a2 2 0 0 1 2.8 2.8L12 12l-4-4 7.2-5Z"/>
    <path d="M12 12L4 20"/>
    <path d="m7 13 2.8 2.8C10.5 16.5 11 17 12 17s1.5-.5 2.2-1.2L17 13"/>
    <path d="m15 21-3-3"/>
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6-10.375A1 1 0 0 1 3.5 2H2" />
    <path d="M14.063 8.5A2 2 0 0 0 15.5 9.937l10.375 6A1 1 0 0 1 22 19.5v1.5" />
    <path d="M22 2 2 22" />
    <path d="m13 5.4 3.6-2.8a2 2 0 0 1 3.2 2.3Z" />
    <path d="M2.6 11 5.4 14a2 2 0 0 1-2.3 3.2Z" />
  </svg>
);

export const ResetIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 2v6h6"/>
    <path d="M21 12A9 9 0 0 0 6.49 4.3L3 7"/>
    <path d="M21 22v-6h-6"/>
    <path d="M3 12a9 9 0 0 0 14.51 7.7L21 17"/>
  </svg>
);

export const CopyIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
  </svg>
);

export const CheckIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="20 6 9 17 4 12"/>
    </svg>
);

export const PdfIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14 2 14 8 20 8"/>
    <path d="M10 12v-1h2a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h2"/>
    <path d="M15 12h1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1"/>
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
        <circle cx="12" cy="12" r="3"/>
    </svg>
);

export const CloseIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);
