
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppID, AppConfig, WindowState, Theme } from '../types';
import { User, FolderKanban, Mail, Terminal, Settings, Apple, Wifi, Search, Command, Battery, Power } from 'lucide-react';
import Window from './OS/Window';
import Spotlight from './OS/Spotlight';
import AboutApp from './apps/AboutApp';
import ProjectsApp from './apps/ProjectsApp';
import SettingsApp from './apps/SettingsApp';
import { getAssetUrl, assetUrls } from '../utils/assetPaths';
import TerminalApp from './apps/TerminalApp';
import ContactApp from './apps/ContactApp';

// --- Assets & Icons ---

const AppleLogo = () => (
  <svg viewBox="0 0 384 512" width="14" height="14" fill="currentColor">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/>
  </svg>
);

const RealMacOSIcon: React.FC<{ appId: AppID; size: number }> = ({ appId, size }) => {
  let src = '';
  
  switch (appId) {
    case 'terminal':
      src = assetUrls.terminal;
      break;
    case 'settings':
      src = assetUrls.preferences;
      break;
    case 'projects':
      src = assetUrls.projects;
      break;
    case 'about':
    case 'about_mac':
      src = assetUrls.about;
      break;
    case 'contact':
      src = assetUrls.mail;
      break;
    default:
      return <div style={{ width: size, height: size }} className="bg-gray-400 rounded-[22%]" />;
  }

  return (
    <img 
      src={src} 
      alt={appId} 
      style={{ width: size, height: size }} 
      className="object-contain drop-shadow-md transition-all duration-200 active:brightness-75 pointer-events-none"
    />
  );
};

// --- App Icons Handling ---
const AppIcon: React.FC<{ appId: AppID; icon: any; theme: Theme; size?: number }> = ({ appId, icon: Icon, theme, size = 48 }) => {
  if (theme === 'macos') {
    return <RealMacOSIcon appId={appId} size={size} />;
  }
  if (theme === 'linux') {
    return <Icon size={size} className="text-gray-300" strokeWidth={1.5} />;
  }
  return <Icon size={size} className="text-ink" strokeWidth={2.5} />;
};

// --- Realistic MacOS Folder (Desktop) ---
const MacOSFolderIcon: React.FC = () => (
  <div className="w-[4rem] h-[3.2rem] flex items-center justify-center transition-transform active:scale-95 group pointer-events-none">
    <img 
      src={assetUrls.folders} 
      alt="Folder"
      className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
    />
  </div>
);

// --- About This Mac (Easter Egg) ---
const AboutMacContent: React.FC = () => (
  <div className="flex flex-col items-center justify-center p-8 text-center bg-transparent h-full font-sans">
    <div className="w-24 h-24 mb-4 flex items-center justify-center">
       <img src={assetUrls.about} alt="Finder" className="w-full h-full object-contain drop-shadow-xl" />
    </div>
    <h2 className="text-2xl font-bold text-gray-900 mb-1">OpenBio Dev Hub</h2>
    <p className="text-gray-500 text-xs mb-8 font-medium">Version 14.2.1 (Web Build)</p>
    
    <div className="flex flex-col gap-1.5 text-[11px] text-gray-600 mb-8 bg-white/50 p-4 rounded-lg border border-gray-200/50 w-full max-w-[280px]">
       <div className="flex justify-between w-full"><span className="font-semibold text-right text-gray-500">Chip</span> <span className="text-gray-900">OpenBio-M1 Virtual</span></div>
       <div className="flex justify-between w-full"><span className="font-semibold text-right text-gray-500">Memory</span> <span className="text-gray-900">16 GB Unified</span></div>
       <div className="flex justify-between w-full"><span className="font-semibold text-right text-gray-500">Startup</span> <span className="text-gray-900">Macintosh HD</span></div>
    </div>
    
    <div className="flex gap-3">
       <button className="px-4 py-1 bg-white border border-gray-300 rounded-[4px] shadow-sm text-[12px] text-gray-700 font-medium active:bg-gray-100 hover:bg-gray-50 transition-colors">More Info...</button>
       <button className="px-4 py-1 bg-white border border-gray-300 rounded-[4px] shadow-sm text-[12px] text-gray-700 font-medium active:bg-gray-100 hover:bg-gray-50 transition-colors">Storage Report...</button>
    </div>
  </div>
);

// --- Top Bar Menus Data ---
const TOP_BAR_MENUS: Record<string, string[]> = {
  File: ['New Window', 'New Tab', 'Open...', 'Open Recent', 'Close Window', 'Save', 'Print...'],
  Edit: ['Undo', 'Redo', 'Cut', 'Copy', 'Paste', 'Select All'],
  View: ['As Icons', 'As List', 'As Columns', 'Enter Full Screen'],
  Go: ['Back', 'Forward', 'Enclosing Folder', 'Recents', 'Documents', 'Desktop', 'Downloads'],
  Window: ['Minimize', 'Zoom', 'Move Window to Left Side of Screen', 'Move Window to Right Side of Screen', 'Cycle Through Windows'],
  Help: ['Search', 'macOS Help', 'What\'s New']
};

const SASSY_MESSAGES = [
  "Hey, you know I'm not real macOS, right?",
  "Hah! Still clicking? I told you, fake OS.",
  "Click all you want, I'm just a website.",
  "404: Real functionality not found.",
  "Nice try, Steve Jobs would be proud.",
  "I'm flattered you think this works.",
  "Functionality.exe has left the chat.",
  "Stop poking me!",
  "Are you looking for bugs or features?",
  "This is just a CSS trick, relax.",
  "You found the secret: Disappointment.",
  "Maybe try the terminal?",
];

interface DesktopProps {
  onLock?: () => void;
  initialTheme?: Theme;
}

const Desktop: React.FC<DesktopProps> = ({ onLock, initialTheme }) => {
  const [theme, setTheme] = useState<Theme>(initialTheme || 'macos');
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<AppID | null>(null);
  const [nextZIndex, setNextZIndex] = useState(10);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // New States
  const [wallpaper, setWallpaper] = useState("https://4kwallpapers.com/images/wallpapers/macos-big-sur-apple-layers-fluidic-colorful-wwdc-2020-5120x2880-1455.jpg");
  const [isMobile, setIsMobile] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [powerOff, setPowerOff] = useState(false);
  const [hasPoweredOff, setHasPoweredOff] = useState(false);
  
  // Existing States
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isAsleep, setIsAsleep] = useState(false);
  
  // Ref for the main desktop area (excluding top bar)
  const desktopRef = useRef<HTMLDivElement>(null);

  // Mobile Detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (initialTheme) setTheme(initialTheme);
  }, [initialTheme]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSpotlightOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const APPS: Record<AppID, Omit<AppConfig, 'component'>> = {
    about: { id: 'about', title: 'About Me', icon: User, defaultWidth: 700, defaultHeight: 450 },
    projects: { id: 'projects', title: 'Projects', icon: FolderKanban, defaultWidth: 800, defaultHeight: 600 },
    contact: { id: 'contact', title: 'Contact', icon: Mail, defaultWidth: 500, defaultHeight: 400 },
    settings: { id: 'settings', title: 'Settings', icon: Settings, defaultWidth: 600, defaultHeight: 400 },
    terminal: { id: 'terminal', title: 'Terminal', icon: Terminal, defaultWidth: 600, defaultHeight: 400 },
    about_mac: { id: 'about_mac', title: 'About This Mac', icon: Apple, defaultWidth: 320, defaultHeight: 400 },
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const getAppContent = (id: AppID) => {
    switch (id) {
      case 'about': return <AboutApp theme={theme} isMobile={isMobile} />;
      case 'projects': return <ProjectsApp theme={theme} />;
      case 'contact': return <ContactApp theme={theme} />;
      case 'settings': return <SettingsApp currentTheme={theme} setTheme={setTheme} setWallpaper={setWallpaper} />;
      case 'terminal': return <TerminalApp onLaunchApp={openApp} />;
      case 'about_mac': return <AboutMacContent />;
      default: return null;
    }
  };

  const openApp = (appId: AppID, variant?: 'default' | 'dialog') => {
    const existingWindow = windows.find(w => w.id === appId);
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        setWindows(prev => prev.map(w => w.id === appId ? { ...w, isMinimized: false } : w));
      }
      focusWindow(appId);
      return;
    }
    
    const app = APPS[appId];
    
    const desktopRect = desktopRef.current?.getBoundingClientRect();
    const availableWidth = desktopRect?.width || window.innerWidth;
    const availableHeight = desktopRect?.height || window.innerHeight;
    
    const margin = 20; 
    const dockBuffer = theme === 'linux' ? 50 : 120; 
    
    const maxWidth = availableWidth - margin * 2;
    const maxHeight = availableHeight - dockBuffer;
    
    const width = Math.min(app.defaultWidth || 600, maxWidth);
    const height = Math.min(app.defaultHeight || 500, maxHeight);
    
    const x = Math.max(0, (availableWidth - width) / 2) + (windows.length * 20); 
    const y = Math.max(0, (maxHeight - height) / 2 * 0.9) + (windows.length * 20);

    const newWindow: WindowState = {
      id: appId,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZIndex,
      position: { x, y },
      size: { width, height },
      variant: variant || 'default',
    };
    
    setWindows([...windows, newWindow]);
    setActiveWindowId(appId);
    setNextZIndex(prev => prev + 1);
  };

  const closeWindow = (id: AppID) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const toggleMinimize = (id: AppID) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: !w.isMinimized } : w));
  };

  const toggleMaximize = (id: AppID) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
    focusWindow(id);
  };

  const updateWindowPosition = (id: AppID, x: number, y: number) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, position: { x, y } } : w));
  };

  const focusWindow = (id: AppID) => {
    setActiveWindowId(id);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: nextZIndex } : w));
    setNextZIndex(prev => prev + 1);
  };

  const handleMenuAction = (action: string) => {
    setActiveMenu(null);
    switch (action) {
      case 'about_mac': openApp('about_mac', 'dialog'); break;
      case 'sleep': setIsAsleep(true); break;
      case 'restart': onLock?.(); break;
      case 'shutdown': onLock?.(); break;
      case 'new_window': openApp('terminal'); break;
      case 'settings': openApp('settings'); break;
      default: 
        // Pick a random sassy message
        const randomMsg = SASSY_MESSAGES[Math.floor(Math.random() * SASSY_MESSAGES.length)];
        showToast(randomMsg);
    }
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'macos':
        return {
          wrapper: 'font-sans antialiased selection:bg-blue-500/30',
          background: `bg-cover bg-center transition-[background-image] duration-500`,
          topBar: 'h-[28px] bg-black/40 backdrop-blur-md text-white/90 flex items-center justify-between px-3 z-[9999] text-[13px] font-medium shadow-sm transition-colors duration-300',
          dockContainer: 'mb-4',
          dock: 'bg-white/20 backdrop-blur-[50px] border-[0.5px] border-white/20 rounded-[24px] px-3 py-3 flex gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-300',
          iconContainer: 'bg-transparent transition-all duration-200',
          desktopIcons: 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]',
        };
      case 'linux':
        return {
          wrapper: 'font-mono selection:bg-green-700 selection:text-white theme-linux',
          background: 'bg-[#0f0f0f]',
          topBar: 'hidden', 
          dockContainer: 'mb-0 w-full',
          dock: 'bg-[#1a1a1a] border-t border-[#333] w-full px-2 py-1 flex items-center gap-2 shadow-none rounded-none justify-start overflow-x-auto',
          iconContainer: 'bg-transparent rounded-sm hover:bg-[#333] transition-colors p-1 shrink-0',
          desktopIcons: 'text-gray-300 hover:bg-[#333]/50 p-2 rounded',
        };
      case 'retro':
      default:
        return {
          wrapper: 'font-hand selection:bg-retro-blue selection:text-white',
          background: 'bg-[#F0EAD6]',
          topBar: 'h-8 bg-white border-b-2 border-ink flex items-center justify-between px-4 z-50 text-black',
          dockContainer: 'mb-4',
          dock: 'bg-white/90 backdrop-blur border-2 border-ink rounded-2xl px-4 py-2 flex gap-4 shadow-[0px_8px_20px_rgba(0,0,0,0.2)] hover:-translate-y-1',
          iconContainer: 'bg-paper border-2 border-ink rounded-lg p-1',
          desktopIcons: 'text-ink',
        };
    }
  };

  const classes = getThemeClasses();

  return (
    <div 
      className={`h-screen w-screen relative overflow-hidden flex flex-col bg-black`}
    >
      {/* Standby Overlay (When Powered Off) */}
      <AnimatePresence>
        {powerOff && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100000] bg-black flex flex-col items-center justify-center cursor-pointer"
            onClick={() => {
              setPowerOff(false);
              setHasPoweredOff(true);
            }}
          >
            <div className="flex flex-col items-center gap-4 animate-pulse">
               <div className="w-16 h-16 rounded-full border-4 border-red-900/50 flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.5)]">
                 <Power size={32} className="text-red-600" />
               </div>
               <div className="text-red-900 font-mono text-sm tracking-[0.5em]">NO SIGNAL</div>
            </div>
            <div className="absolute bottom-10 text-gray-800 font-mono text-xs">Touch to Power On</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Desktop Wrapper with CRT Animations */}
      <div 
        className={`flex-1 w-full h-full relative overflow-hidden flex flex-col transition-all duration-500 
          ${classes.wrapper} 
          ${theme !== 'macos' ? classes.background : ''}
          ${powerOff ? 'animate-turn-off' : (hasPoweredOff ? 'animate-turn-on' : '')}
        `}
        style={theme === 'macos' ? { backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        onClick={() => { setActiveMenu(null); setIsSpotlightOpen(false); }}
      >
        {/* Sleep Overlay */}
        {isAsleep && (
          <div 
            className="absolute inset-0 z-[9999] bg-black cursor-none flex items-center justify-center"
            onClick={() => setIsAsleep(false)}
          >
            <div className="animate-pulse text-white/20 font-sans text-sm">Click to wake</div>
          </div>
        )}
        
        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div 
              initial={{ opacity: 0, y: -20, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0 }}
              className="fixed top-12 left-1/2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border border-white/20 text-sm font-medium z-[10000] text-center w-max max-w-[90vw]"
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>

        <Spotlight 
          isOpen={isSpotlightOpen} 
          onClose={() => setIsSpotlightOpen(false)} 
          onLaunchApp={openApp}
          apps={APPS}
        />

        {theme === 'retro' && (
          <div 
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{ 
                backgroundImage: 'linear-gradient(#2d2d2d 1px, transparent 1px), linear-gradient(90deg, #2d2d2d 1px, transparent 1px)', 
                backgroundSize: '40px 40px' 
            }}
          ></div>
        )}

        {/* Top Bar */}
        {(theme === 'macos' || theme === 'retro') && (
          <div className={classes.topBar} onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-2 h-full">
              {theme === 'macos' ? (
                <div className="flex items-center gap-1 h-full">
                   {/* Apple Menu */}
                   <div className="relative h-full flex items-center">
                      <button 
                          className={`cursor-default px-3 py-1 rounded-[4px] hover:bg-white/10 transition-colors ${activeMenu === 'apple' ? 'bg-white/10' : ''}`}
                          onClick={() => setActiveMenu(activeMenu === 'apple' ? null : 'apple')}
                      >
                          <AppleLogo />
                      </button>
                      {activeMenu === 'apple' && (
                        <div className="absolute top-[28px] left-0 min-w-[240px] bg-white/70 backdrop-blur-2xl border-[0.5px] border-gray-200/50 shadow-[0_10px_40px_rgba(0,0,0,0.2)] rounded-lg py-1.5 flex flex-col z-[99999]">
                           {[{ label: 'About This Mac', action: 'about_mac' }, { type: 'separator' }, { label: 'System Settings...', action: 'settings' }, { type: 'separator' }, { label: 'Sleep', action: 'sleep' }, { label: 'Restart...', action: 'restart' }, { label: 'Log Out...', action: 'shutdown' }].map((item: any, idx) => (
                             item.type === 'separator' ? <div key={idx} className="h-[1px] bg-black/5 my-1 mx-3" /> :
                             <div key={idx} 
                                  onClick={() => handleMenuAction(item.action)}
                                  className={`px-3 py-1 mx-1 rounded-[4px] flex justify-between items-center text-[13px] text-black hover:bg-blue-500 hover:text-white cursor-default transition-colors`}>
                                 <span>{item.label}</span>
                             </div>
                           ))}
                        </div>
                      )}
                   </div>
                   
                   <span className="font-bold cursor-default hidden sm:block drop-shadow-sm tracking-wide px-2 text-[13px]">Finder</span>

                   {/* Interactive Menus */}
                   <div className="hidden md:flex font-medium opacity-100 h-full items-center">
                      {Object.keys(TOP_BAR_MENUS).map(menuName => (
                        <div key={menuName} className="relative h-full flex items-center">
                          <button 
                            onClick={() => setActiveMenu(activeMenu === menuName ? null : menuName)}
                            className={`px-3 py-0.5 mx-0.5 h-[20px] rounded-[4px] hover:bg-white/10 transition-colors cursor-default drop-shadow-sm flex items-center ${activeMenu === menuName ? 'bg-white/10' : ''}`}
                          >
                            {menuName}
                          </button>
                          {/* Dropdown for Menus */}
                          {activeMenu === menuName && (
                            <div className="absolute top-[28px] left-0 min-w-[220px] bg-white/70 backdrop-blur-2xl border-[0.5px] border-gray-200/50 shadow-[0_10px_40px_rgba(0,0,0,0.2)] rounded-lg py-1.5 flex flex-col z-[99999]">
                               {TOP_BAR_MENUS[menuName].map((item, idx) => (
                                 <div key={idx} 
                                      className="px-3 py-1 mx-1 rounded-[4px] text-[13px] text-black hover:bg-blue-500 hover:text-white cursor-default transition-colors"
                                      onClick={() => handleMenuAction(item)}
                                  >
                                     {item}
                                 </div>
                               ))}
                            </div>
                          )}
                        </div>
                      ))}
                   </div>
                </div>
              ) : (
                 <span className={`font-bold tracking-wider ${theme === 'retro' ? 'text-black' : 'text-white'}`}>OpenBio Dev Hub</span>
              )}
            </div>
            
            {/* Right Status Bar */}
            <div className="flex items-center gap-4">
              {theme === 'macos' && (
                <div className="flex items-center gap-4 text-white/90">
                  <div className="flex items-center gap-2 cursor-default" title="Battery">
                     <Battery size={20} className="fill-white/20" strokeWidth={2} />
                  </div>
                  <Wifi size={18} className="cursor-default" strokeWidth={2.5} />
                  <Search size={16} className="cursor-pointer" strokeWidth={2.5} onClick={() => setIsSpotlightOpen(true)} />
                  <div className="ml-2 text-[13px] font-medium cursor-default w-max drop-shadow-md hidden sm:block">
                    {currentTime.toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric'})} &nbsp;
                    {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
              )}
              {theme === 'retro' && (
                  <div className='flex items-center gap-4 text-black h-full'>
                    <div className='text-lg'>
                      {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                    {/* Fixed Button Container to prevent resizing */}
                    <div className="w-6 h-6 flex items-center justify-center">
                      <button 
                        onClick={() => setPowerOff(true)}
                        className="flex items-center justify-center w-full h-full hover:text-red-600 transition-colors" 
                        title="Turn Off"
                      >
                        <Power size={20} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
              )}
            </div>
          </div>
        )}

        {/* Desktop Area - Windows live here */}
        <div className="flex-1 relative z-0" ref={desktopRef}>
          {/* Desktop Icons Container */}
          <div className={`absolute top-4 ${theme === 'macos' ? 'right-4 items-end' : 'left-4 items-start'} flex flex-col gap-6`}>
            {Object.values(APPS).filter(app => app.id !== 'about_mac').map((app) => (
               <motion.button 
                 key={app.id}
                 onClick={() => openApp(app.id as AppID)}
                 onDoubleClick={() => openApp(app.id as AppID)}
                 className={`group flex flex-col items-center gap-1 w-[6rem] p-2 rounded focus:outline-none transition-colors
                   ${theme === 'macos' ? 'hover:bg-white/10 rounded-[6px] active:bg-white/20 border border-transparent hover:border-white/5' : ''}
                   ${theme === 'retro' ? classes.desktopIcons : ''}
                 `}
               >
                  <div className={`
                    flex items-center justify-center transition-all pointer-events-none
                    ${theme === 'retro' ? 'w-16 h-16 bg-white border-2 border-ink rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : ''}
                    ${theme === 'linux' ? 'w-12 h-12 text-green-500 border border-green-800 bg-black/50 p-2' : ''}
                  `}>
                      {theme === 'macos' ? (
                        <MacOSFolderIcon />
                      ) : (
                        <AppIcon appId={app.id as AppID} icon={app.icon} theme={theme} size={32} />
                      )}
                  </div>
                  <span className={`
                    px-2 py-0.5 rounded-[4px] text-[12px] text-center leading-tight line-clamp-2 mt-1
                    ${theme === 'retro' ? 'font-bold bg-white border border-transparent group-hover:border-ink text-sm' : ''}
                    ${theme === 'macos' ? 'font-medium text-white drop-shadow-md shadow-black/50' : ''}
                    ${theme === 'linux' ? 'font-mono text-green-400 text-xs' : ''}
                  `}>
                    {app.title}
                  </span>
               </motion.button>
            ))}
          </div>

          {/* Windows */}
          {windows.map(window => (
            <Window
              key={window.id}
              window={window}
              title={APPS[window.id].title}
              isActive={activeWindowId === window.id}
              theme={theme}
              dragConstraints={desktopRef}
              isMobile={isMobile}
              onClose={() => closeWindow(window.id)}
              onMinimize={() => toggleMinimize(window.id)}
              onMaximize={() => toggleMaximize(window.id)}
              onFocus={() => focusWindow(window.id)}
              onPositionChange={(x, y) => updateWindowPosition(window.id, x, y)}
            >
              {getAppContent(window.id)}
            </Window>
          ))}
        </div>

        {/* Dock Area */}
        <div className={`flex justify-center z-[9000] ${classes.dockContainer}`}>
          <div className={`${classes.dock}`}>
            {theme === 'linux' && <div className="mr-2 px-3 py-1 bg-green-700 text-white font-bold rounded-sm flex items-center gap-2 whitespace-nowrap"><Terminal size={14}/> Menu</div>}
            
            {Object.values(APPS).filter(app => app.id !== 'about_mac').map((app) => {
              const isOpen = windows.find(w => w.id === app.id);
              return (
                <button
                  key={app.id}
                  onClick={() => openApp(app.id as AppID)}
                  className={`relative group transition-all duration-300 ease-out origin-bottom shrink-0 ${theme === 'linux' ? 'px-2 py-1' : 'hover:-translate-y-2 hover:scale-110'}`}
                >
                   <div className={`flex items-center justify-center ${classes.iconContainer} ${theme === 'macos' ? 'w-[52px] h-[52px]' : (theme === 'linux' ? 'w-8 h-8 rounded text-gray-300' : 'w-12 h-12 hover:bg-yellow-100')}`}>
                      <AppIcon appId={app.id as AppID} icon={app.icon} theme={theme} size={theme === 'linux' ? 18 : 52} />
                   </div>
                   
                   {isOpen && theme !== 'linux' && (
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-black/60 rounded-full dark:bg-white/80"></div>
                   )}
                   {isOpen && theme === 'linux' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500"></div>
                   )}

                   {theme === 'macos' && (
                     <div className="absolute -top-14 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-200/80 backdrop-blur-md border border-white/20 text-gray-800 text-[12px] rounded-[5px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-medium shadow-lg after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-gray-200/80">
                       {app.title}
                     </div>
                   )}
                </button>
              );
            })}
            
            {theme === 'linux' && <div className="ml-auto text-green-500 font-mono text-sm px-4 self-center hidden sm:block whitespace-nowrap">{currentTime.toLocaleTimeString()}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Desktop;
