
import React, { useEffect, useState, useRef } from 'react';
import { Theme } from '../types';
import TerminalLock from './TerminalLock';

interface BootSequenceProps {
  theme: Theme;
  onComplete: () => void;
}

const BOOT_LOGS = [
  "[  OK  ] Started Network Manager.",
  "[  OK  ] Reached target Network.",
  "[  OK  ] Started D-Bus System Message Bus.",
  "[  OK  ] Started User Login Management.",
  "         Starting Network Name Resolution...",
  "[  OK  ] Started Network Name Resolution.",
  "[  OK  ] Reached target Host and Network Name Lookups.",
  "[  OK  ] Started WPA Supplicant.",
  "[  OK  ] Started Update UTMP about System Runlevel Changes.",
  "         Starting Graphics System...",
  "[  OK  ] Found device /dev/dri/card0.",
  "[  OK  ] Started Display Manager.",
  "         Mounting /home/guest...",
  "[  OK  ] Mounted /home/guest.",
  "[  OK  ] Reached target Graphical Interface.",
  "         Starting OpenBio OS v1.0.0...",
  "[  OK  ] Initialized Virtual File System.",
  "[  OK  ] Loaded Kernel Module: openbio_core.",
  "[  OK  ] Loaded Kernel Module: react_renderer.",
  "         Welcome to OpenBio Dev Hub.",
];

const BootSequence: React.FC<BootSequenceProps> = ({ theme, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic for Linux logs
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  // MacOS Boot Logic
  useEffect(() => {
    if (theme === 'macos') {
      const duration = 2500; // 2.5s boot time
      const interval = 30;
      const step = 100 / (duration / interval);

      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(onComplete, 500); // Small delay after 100%
            return 100;
          }
          return prev + step;
        });
      }, interval);

      return () => clearInterval(timer);
    } 
    else if (theme === 'linux') {
       // Realistic scrolling boot logs
       let i = 0;
       const interval = setInterval(() => {
         if (i >= BOOT_LOGS.length) {
            clearInterval(interval);
            setTimeout(onComplete, 800);
            return;
         }
         
         const timestamp = (Math.random() * 2 + i * 0.1).toFixed(4).padStart(7, ' ');
         setLogs(prev => [...prev, `[${timestamp}] ${BOOT_LOGS[i]}`]);
         i++;
       }, 50); // Faster scroll for realism

       return () => clearInterval(interval);
    }
  }, [theme, onComplete]);

  // Render MacOS Boot Screen
  if (theme === 'macos') {
    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center">
        {/* Apple Logo */}
        <div className="mb-12 text-white">
           <svg viewBox="0 0 384 512" width="80" height="80" fill="currentColor">
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/>
          </svg>
        </div>
        
        {/* Progress Bar */}
        <div className="w-[200px] h-[6px] bg-[#333] rounded-full overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-75 ease-linear rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }

  // Render Linux Boot Screen
  if (theme === 'linux') {
    return (
      <div 
        className="h-screen w-screen bg-black text-gray-400 font-mono text-xs p-2 overflow-hidden flex flex-col justify-end"
        onClick={onComplete}
      >
        <div ref={scrollRef} className="flex flex-col gap-0.5 max-h-full overflow-hidden">
          {logs.map((log, i) => (
             <div key={i} className="whitespace-pre-wrap break-words">
               {log.includes("[  OK  ]") ? (
                 <>
                   <span className="text-green-500/50">{log.substring(0, 9)}</span>
                   [ <span className="text-green-500 font-bold">OK</span> ] 
                   {log.split("[  OK  ]")[1]}
                 </>
               ) : (
                 <span className="opacity-80">{log}</span>
               )}
             </div>
          ))}
          <div className="animate-pulse text-white mt-1">_</div>
        </div>
      </div>
    );
  }

  // Render Retro Boot (Original TerminalLock)
  return <TerminalLock onUnlock={onComplete} />;
};

export default BootSequence;
