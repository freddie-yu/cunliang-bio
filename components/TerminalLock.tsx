import React, { useState, useEffect, useRef } from 'react';

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

  // 使用内存状态替代 sessionStorage
  useEffect(() => {
    // 防止重复执行
    if (bootStartedRef.current) return;
    bootStartedRef.current = true;

    console.log('TerminalLock: Starting boot sequence');

    // Initial Boot Sequence Animation
    const bootLines = [
      "BIOS Date 01/15/24 14:23:55 Ver: 1.0.2",
      "CPU: BioHub-Core-X4 @ 4.20GHz",
      "Memory Test: 65536K OK",
      "Detecting Primary Master ... BIOHUB_DRIVE_01",
      "Detecting Primary Slave ... None",
      "Loading kernel modules...",
      "[OK] Mounted root filesystem.",
      "[OK] Started Network Manager.",
      "[OK] Started Secure Gateway.",
      " ",
      "Welcome to BioHub Dev Environment v1.0",
      "Login required to access the mainframe.",
      " ",
    ];

    const timeouts: NodeJS.Timeout[] = [];
    let delay = 0;
    
    bootLines.forEach((line, index) => {
      delay += Math.random() * 300 + 50;
      const timeout = setTimeout(() => {
        setHistory(prev => {
          console.log(`Adding line ${index}: ${line}`);
          return [...prev, line];
        });
        
        if (index === bootLines.length - 1) {
          console.log('Boot sequence completed successfully');
          setBootSequence(false);
          // Focus input after boot
          setTimeout(() => inputRef.current?.focus(), 100);
        }
      }, delay);
      timeouts.push(timeout);
    });

    // Cleanup function
    return () => {
      console.log('Cleaning up boot sequence timeouts');
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = input.trim();
      const newHistory = [...history, `guest@biohub-gateway:~$ ${command}`];
      
      if (command === 'awesome') {
        newHistory.push("Access Granted. Initializing GUI Environment...");
        setHistory(newHistory);
        setInput('');
        setTimeout(onUnlock, 1500);
      } else if (command === 'help') {
        newHistory.push("HINT: The password is 'awesome'.");
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
               {line.includes("[OK]") ? (
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
              <span className="text-[#33ff33] mr-2">guest@biohub-gateway:~$</span>
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
        </div>
      </div>
    </div>
  );
};

export default TerminalLock;
