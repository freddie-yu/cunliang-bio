import React, { useState, useEffect, useRef } from 'react';
import { FileSystemItem, AppID } from '../../types';

interface TerminalAppProps {
  onLaunchApp?: (id: AppID) => void;
}

// Enhanced Mock File System
const fileSystem: Record<string, FileSystemItem> = {
  'root': {
    name: 'root',
    type: 'folder',
    children: [
      { 
        name: 'projects', 
        type: 'folder', 
        children: [
          { name: 'project-alpha.json', type: 'file', content: '{\n  "name": "Project Alpha",\n  "status": "In Development"\n}' },
          { name: 'beta-tool.config', type: 'file', content: 'TARGET=production\nDEBUG=false' },
        ]
      },
      { 
        name: 'skills', 
        type: 'folder', 
        children: [
          { name: 'frontend.txt', type: 'file', content: '- React\n- TypeScript\n- Tailwind CSS' },
          { name: 'backend.txt', type: 'file', content: '- Node.js\n- Python\n- SQL' },
        ]
      },
      { 
        name: 'about.md', 
        type: 'file', 
        content: '# User (Dev)\n\n> Developer building cool things.\n\nWelcome to my terminal.' 
      },
      { name: 'contact.info', type: 'file', content: 'Email: hello@example.com\nGithub: github.com/chenyibai9527/Open-Bio-Template' },
      { name: '.bashrc', type: 'file', content: 'export PATH=$PATH:/bin/openbio\nalias ll="ls -la"' },
    ]
  }
};

const TerminalApp: React.FC<TerminalAppProps> = ({ onLaunchApp }) => {
  const [history, setHistory] = useState<Array<{type: 'in' | 'out' | 'info', content: React.ReactNode}>>([
    { type: 'info', content: 'Welcome to OpenBioOS Kernel v1.0.0 (tty1)' },
    { type: 'info', content: 'Type "help" for a list of available commands.' }
  ]);
  const [input, setInput] = useState('');
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [startTime] = useState<Date>(new Date());
  
  // Command History
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  // Matrix Effect
  const [isMatrix, setIsMatrix] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Matrix Effect Loop
  useEffect(() => {
    if (!isMatrix || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 600;
    canvas.height = canvas.parentElement?.clientHeight || 400;

    const columns = Math.floor(canvas.width / 20);
    const drops: number[] = Array(columns).fill(1);
    const chars = "01OPENBIOCODE";

    const draw = () => {
       ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
       ctx.fillRect(0, 0, canvas.width, canvas.height);
       
       ctx.fillStyle = '#0F0';
       ctx.font = '15px monospace';

       for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(text, i * 20, drops[i] * 20);
          
          if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
             drops[i] = 0;
          }
          drops[i]++;
       }
    };
    
    const interval = setInterval(draw, 33);
    
    // Stop on click
    const stopMatrix = () => {
       clearInterval(interval);
       setIsMatrix(false);
       inputRef.current?.focus();
    };
    canvas.addEventListener('click', stopMatrix);
    canvas.addEventListener('keydown', stopMatrix);

    return () => {
       clearInterval(interval);
       canvas.removeEventListener('click', stopMatrix);
       canvas.removeEventListener('keydown', stopMatrix);
    };
  }, [isMatrix]);

  const resolvePath = (pathParts: string[]): FileSystemItem | null => {
    let current = fileSystem['root'];
    for (const part of pathParts) {
      if (current.children) {
        const next = current.children.find(c => c.name === part);
        if (next) {
          current = next;
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
    return current;
  };

  const getUptime = () => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - startTime.getTime()) / 1000);
    const mins = Math.floor(diff / 60);
    const secs = diff % 60;
    return `${mins}m ${secs}s`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
       e.preventDefault();
       if (cmdHistory.length > 0) {
          const newIndex = Math.min(historyIndex + 1, cmdHistory.length - 1);
          setHistoryIndex(newIndex);
          setInput(cmdHistory[cmdHistory.length - 1 - newIndex]);
       }
    } else if (e.key === 'ArrowDown') {
       e.preventDefault();
       if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setInput(cmdHistory[cmdHistory.length - 1 - newIndex]);
       } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setInput('');
       }
    } else if (e.key === 'Tab') {
       e.preventDefault();
       // Simple Autocomplete
       const cmds = ['help', 'clear', 'pwd', 'echo', 'date', 'sudo', 'rm', 'ls', 'cd', 'cat', 'whoami', 'neofetch', 'open', 'cmatrix'];
       const currentDir = resolvePath(currentPath);
       const files = currentDir?.children?.map(c => c.name) || [];
       const candidates = [...cmds, ...files];
       
       const parts = input.split(' ');
       const lastPart = parts[parts.length - 1];
       
       const match = candidates.find(c => c.startsWith(lastPart));
       if (match) {
          parts[parts.length - 1] = match;
          setInput(parts.join(' '));
       }
    } else if (e.key === 'Enter') {
       handleCommand();
    }
  };

  const handleCommand = () => {
      const cmdTrimmed = input.trim();
      if (!cmdTrimmed) return;
      
      const promptPath = currentPath.length === 0 ? '~' : `~/${currentPath.join('/')}`;
      
      setHistory(prev => [...prev, { type: 'in', content: `guest@openbio:${promptPath}$ ${input}` }]);
      setCmdHistory(prev => [...prev, cmdTrimmed]);
      setHistoryIndex(-1);
      setInput('');

      const [cmd, ...args] = cmdTrimmed.split(' ');

      switch (cmd) {
        case 'help':
          setHistory(prev => [...prev, { type: 'out', content: 
            <div className="text-gray-400 grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg">
              <div><span className="text-yellow-400 font-bold">ls</span> <span className="opacity-70">- List directory</span></div>
              <div><span className="text-yellow-400 font-bold">cd [dir]</span> <span className="opacity-70">- Change directory</span></div>
              <div><span className="text-yellow-400 font-bold">cat [file]</span> <span className="opacity-70">- Read file</span></div>
              <div><span className="text-yellow-400 font-bold">open [app]</span> <span className="opacity-70">- Launch app</span></div>
              <div><span className="text-yellow-400 font-bold">neofetch</span> <span className="opacity-70">- System info</span></div>
              <div><span className="text-yellow-400 font-bold">cmatrix</span> <span className="opacity-70">- Wake up Neo</span></div>
              <div><span className="text-yellow-400 font-bold">clear</span> <span className="opacity-70">- Clear screen</span></div>
            </div> 
          }]);
          break;

        case 'clear':
          setHistory([]);
          break;
          
        case 'cmatrix':
          setIsMatrix(true);
          break;

        case 'open':
           if (!args[0]) {
              setHistory(prev => [...prev, { type: 'out', content: 'usage: open [app_name] (e.g., open contact)' }]);
           } else {
              const appMap: Record<string, string> = {
                 'contact': 'contact', 'mail': 'contact',
                 'projects': 'projects', 'work': 'projects',
                 'about': 'about', 'me': 'about',
                 'settings': 'settings', 'config': 'settings',
                 'mac': 'about_mac'
              };
              const target = appMap[args[0].toLowerCase()];
              if (target && onLaunchApp) {
                 onLaunchApp(target as any);
                 setHistory(prev => [...prev, { type: 'out', content: `Launching ${args[0]}...` }]);
              } else {
                 setHistory(prev => [...prev, { type: 'out', content: `open: application not found: ${args[0]}` }]);
              }
           }
           break;

        case 'pwd':
           setHistory(prev => [...prev, { type: 'out', content: `/home/guest/${currentPath.join('/')}` }]);
           break;

        case 'echo':
            setHistory(prev => [...prev, { type: 'out', content: args.join(' ') }]);
            break;

        case 'date':
            setHistory(prev => [...prev, { type: 'out', content: new Date().toString() }]);
            break;

        case 'sudo':
            setHistory(prev => [...prev, { type: 'out', content: <span className="text-red-400 font-bold">guest is not in the sudoers file. This incident will be reported.</span> }]);
            break;

        case 'rm':
            setHistory(prev => [...prev, { type: 'out', content: <span className="text-red-400">Permission denied: File system is read-only.</span> }]);
            break;
            
        case 'vi':
        case 'vim':
        case 'nano':
            setHistory(prev => [...prev, { type: 'out', content: 'Error: No terminal display environment found. Use "cat" to view files.' }]);
            break;

        case 'ls':
          const currentDir = resolvePath(currentPath);
          if (currentDir && currentDir.type === 'folder' && currentDir.children) {
            setHistory(prev => [...prev, { type: 'out', content: 
              <div className="flex gap-4 flex-wrap">
                {currentDir.children.map(item => (
                  <span key={item.name} className={item.type === 'folder' ? 'text-blue-400 font-bold' : 'text-green-400'}>
                    {item.name}{item.type === 'folder' ? '/' : ''}
                  </span>
                ))}
              </div>
            }]);
          }
          break;

        case 'cd':
          const target = args[0];
          if (!target || target === '~') {
            setCurrentPath([]);
          } else if (target === '..') {
            setCurrentPath(prev => prev.slice(0, -1));
          } else {
            const potentialPath = [...currentPath, target];
            const item = resolvePath(potentialPath);
            if (item && item.type === 'folder') {
              setCurrentPath(potentialPath);
            } else {
              setHistory(prev => [...prev, { type: 'out', content: `cd: no such directory: ${target}` }]);
            }
          }
          break;

        case 'cat':
          const fileName = args[0];
          if (!fileName) {
            setHistory(prev => [...prev, { type: 'out', content: 'usage: cat [file]' }]);
          } else {
            const currentDirObj = resolvePath(currentPath);
            const file = currentDirObj?.children?.find(c => c.name === fileName);
            if (file && file.type === 'file') {
              setHistory(prev => [...prev, { type: 'out', content: <div className="whitespace-pre-wrap text-gray-300 font-mono">{file.content}</div> }]);
            } else {
              setHistory(prev => [...prev, { type: 'out', content: `cat: ${fileName}: No such file or directory` }]);
            }
          }
          break;
          
        case 'whoami':
          setHistory(prev => [...prev, { type: 'out', content: 'guest_user' }]);
          break;

        case 'neofetch':
          const projectCount = fileSystem['root'].children?.find(c => c.name === 'projects')?.children?.length || 0;
          
          setHistory(prev => [...prev, { type: 'out', content: 
            <div className="flex gap-6 mt-2 mb-2 font-mono text-xs sm:text-sm whitespace-pre">
               <div className="text-blue-500 select-none hidden sm:block font-bold leading-tight">
{`      .   .
       \\ /
      ( Y )
       | |
      .| |.
     / | | \\
     ' | | '
       |_|`}
               </div>
               <div className="flex-1">
                  <div className="font-bold text-blue-400 mb-1">guest@openbio.dev</div>
                  <div className="border-b border-gray-600 mb-2 w-full max-w-[200px]"></div>
                  <div className="grid grid-cols-[80px_1fr] gap-x-2">
                    <span className="text-yellow-400 font-bold">OS</span> <span>OpenBio WebOS v1.0</span>
                    <span className="text-yellow-400 font-bold">Host</span> <span>{window.location.hostname}</span>
                    <span className="text-yellow-400 font-bold">Uptime</span> <span>{getUptime()}</span>
                    <span className="text-yellow-400 font-bold">Packages</span> <span>{projectCount} (dpkg)</span>
                    <span className="text-yellow-400 font-bold">Shell</span> <span>zsh 5.8</span>
                    <span className="text-yellow-400 font-bold">Resolution</span> <span>{window.innerWidth}x{window.innerHeight}</span>
                    <span className="text-yellow-400 font-bold">CPU</span> <span>{window.navigator.hardwareConcurrency || 4} threads</span>
                    <span className="text-yellow-400 font-bold">Memory</span> <span>{(window.performance && (window.performance as any).memory?.jsHeapSizeLimit / 1048576)?.toFixed(0) || 'Unknown'} MB</span>
                  </div>
                  <div className="mt-3 flex gap-1">
                    <span className="bg-black w-3 h-3 block"></span>
                    <span className="bg-red-500 w-3 h-3 block"></span>
                    <span className="bg-green-500 w-3 h-3 block"></span>
                    <span className="bg-yellow-500 w-3 h-3 block"></span>
                    <span className="bg-blue-500 w-3 h-3 block"></span>
                    <span className="bg-purple-500 w-3 h-3 block"></span>
                    <span className="bg-cyan-500 w-3 h-3 block"></span>
                    <span className="bg-white w-3 h-3 block"></span>
                  </div>
               </div>
            </div>
          }]);
          break;

        default:
          setHistory(prev => [...prev, { type: 'out', content: `zsh: command not found: ${cmd}` }]);
      }
  };

  return (
    <div 
      className="h-full bg-[#1e1e1e] text-gray-200 font-mono p-4 overflow-y-auto text-sm md:text-base selection:bg-gray-600 relative" 
      onClick={() => inputRef.current?.focus()}
    >
      {/* Matrix Overlay */}
      {isMatrix && (
        <canvas 
           ref={canvasRef} 
           className="absolute inset-0 z-50 cursor-pointer"
        />
      )}

      {history.map((entry, i) => (
        <div key={i} className="mb-1 leading-snug">
          {entry.content}
        </div>
      ))}
      <div className="flex items-center">
        <span className="text-green-400 mr-2 whitespace-nowrap">
          guest@openbio:{currentPath.length === 0 ? '~' : `~/${currentPath.join('/')}`}$
        </span>
        <input 
          ref={inputRef}
          type="text" 
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none flex-1 text-gray-100 min-w-[50px]"
          autoFocus
          autoComplete="off"
          spellCheck="false"
        />
      </div>
      <div ref={scrollRef} />
    </div>
  );
};

export default TerminalApp;