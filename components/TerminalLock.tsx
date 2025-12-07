import React, { useState, useEffect, useRef } from 'react';
import { Lock } from 'lucide-react';

interface TerminalLockProps {
  onUnlock: () => void;
}

const TerminalLock: React.FC<TerminalLockProps> = ({ onUnlock }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [bootSequence, setBootSequence] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bootStartedRef = useRef(false);

  // Reset function for debugging
  const resetBootSequence = () => {
    sessionStorage.removeItem('terminalLock_booted');
    sessionStorage.removeItem('terminalLock_boot_in_progress');
    sessionStorage.removeItem('openbio-boot-completed'); // Also clear the alternative key
    setHistory([]);
    setBootSequence(true);
    bootStartedRef.current = false;
    window.location.reload();
  };

  useEffect(() => {
    // Enhanced duplicate prevention for React StrictMode
    const hasBooted = sessionStorage.getItem('terminalLock_booted');
    const bootInProgress = sessionStorage.getItem('terminalLock_boot_in_progress');
    
    if (hasBooted === 'true') {
      console.log('TerminalLock: Boot already completed, skipping');
      setBootSequence(false);
      return;
    }
    
    if (bootInProgress === 'true') {
      console.log('TerminalLock: Boot already in progress, skipping');
      return;
    }
    
    console.log('TerminalLock: Starting boot sequence');
    sessionStorage.setItem('terminalLock_boot_in_progress', 'true');

    // Initial Boot Sequence Animation
    const bootLines = [
      "BIOS Date 01/15/24 14:23:55 Ver: 1.0.2",
      "CPU: OpenBio-Core-X4 @ 4.20GHz",
      "Memory Test: 65536K OK",
      "Detecting Primary Master ... OPENBIO_DRIVE_01",
      "Detecting Primary Slave ... None",
      "Loading kernel modules...",
      "[OK] Mounted root filesystem.",
      "[OK] Started Network Manager.",
      "[OK] Started Secure Gateway.",
      " ",
      "Welcome to OpenBio Dev Hub OS v1.0",
      "Login required to access the mainframe.",
      " ",
    ];

    const timeouts: NodeJS.Timeout[] = [];
    let delay = 0;
    let completedLines = 0;
    
    bootLines.forEach((line, index) => {
      delay += Math.random() * 300 + 50;
      const timeout = setTimeout(() => {
        // Double-check prevention
        if (sessionStorage.getItem('terminalLock_booted') === 'true') {
          console.log(`Line ${index} skipped - boot already marked as complete`);
          return;
        }
        
        setHistory(prev => {
          // Additional duplicate check
          if (prev.includes(line)) {
            console.log(`Duplicate line ${index} detected, skipping`);
            return prev;
          }
          console.log(`Adding line ${index}: ${line}`);
          return [...prev, line];
        });
        
        completedLines++;
        
        if (index === bootLines.length - 1) {
          console.log('Boot sequence completed successfully');
          setBootSequence(false);
          sessionStorage.setItem('terminalLock_booted', 'true');
          sessionStorage.removeItem('terminalLock_boot_in_progress');
          // Focus input after boot
          setTimeout(() => inputRef.current?.focus(), 100);
        }
      }, delay);
      timeouts.push(timeout);
    });

    // Enhanced cleanup function
    return () => {
      console.log('Cleaning up boot sequence timeouts');
      timeouts.forEach(timeout => clearTimeout(timeout));
      // Don't remove the in_progress flag here as it might be a React re-render
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = input.trim();
      const newHistory = [...history, `guest@openbio-gateway:~$ ${command}`];
      
      if (command === 'openbio') {
        newHistory.push("Access Granted. Initializing GUI Environment...");
        setHistory(newHistory);
        setInput('');
        setTimeout(onUnlock, 1500);
      } else if (command === 'help') {
        newHistory.push("HINT: The password is 'openbio'.");
        setHistory(newHistory);
        setInput('');
      } else if (command === 'clear') {
        setHistory([]);
        setInput('');
        return;
      } else {
        newHistory.push(`Access Denied: '${command}'. Type 'help' for hint.`);
        setHistory(newHistory);
        setInput('');
      }
    }
  };

  return (
    <div 
      className="h-screen w-screen bg-black text-[#33ff33] font-mono flex flex-col items-center justify-center relative overflow-hidden" 
      onClick={() => !bootSequence && inputRef.current?.focus()}
    >
      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 z-50 crt-overlay pointer-events-none animate-crt-flicker"></div>
      
      {/* Screen Container */}
      <div className="w-full h-full p-4 md:p-10 relative z-10 flex flex-col">
        
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto max-w-4xl mx-auto w-full text-lg md:text-xl leading-relaxed text-glow">
          {history.map((line, i) => (
             <div key={i} className="break-words mb-1">
               {line.includes("OK") ? (
                 <span>
                   [<span className="text-[#33ff33] font-bold">OK</span>] {line.replace("[OK] ", "")}
                 </span>
               ) : (
                 <span className={line.startsWith("guest@") ? "opacity-100" : "opacity-80"}>{line}</span>
               )}
             </div>
          ))}

          {!bootSequence && (
            <div className="flex items-center mt-2">
              <span className="text-[#33ff33] mr-2">guest@openbio-gateway:~$</span>
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleCommand}
                  className="bg-transparent border-none outline-none text-[#33ff33] w-full absolute inset-0 opacity-0 z-10 cursor-none"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                />
                {/* Custom Cursor Rendering */}
                <span className="whitespace-pre">{input}</span>
                <span className="cursor-block bg-[#33ff33] shadow-[0_0_8px_#33ff33]"></span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Footer */}
        <div className="mt-4 text-center text-[#33ff33]/40 text-sm uppercase tracking-widest font-bold">
            SECURE CONNECTION // PORT 22 // SSH-2.0-OpenSSH_8.9
            {/* Hidden reset button for debugging - triple click to reset */}
            <span 
              className="ml-4 cursor-pointer opacity-0 hover:opacity-20" 
              onClick={resetBootSequence}
              title="Triple click to reset boot sequence"
            >
              [RESET]
            </span>
        </div>
      </div>
    </div>
  );
};

export default TerminalLock;