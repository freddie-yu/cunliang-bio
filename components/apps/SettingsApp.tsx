import React from 'react';
import { Theme } from '../../types';
import { Monitor, Command, Terminal, Image as ImageIcon } from 'lucide-react';

interface SettingsAppProps {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
  setWallpaper?: (url: string) => void;
}

const WALLPAPERS = [
  { name: 'Big Sur', url: "https://4kwallpapers.com/images/wallpapers/macos-big-sur-apple-layers-fluidic-colorful-wwdc-2020-5120x2880-1455.jpg" },
  { name: 'Monterey', url: "https://4kwallpapers.com/images/wallpapers/macos-monterey-stock-purple-dark-mode-layers-5k-5120x2880-5888.jpg" },
  { name: 'Ventura', url: "https://4kwallpapers.com/images/wallpapers/macos-ventura-abstract-orange-background-stock-5k-5120x2880-8551.jpg" },
  { name: 'Sonoma', url: "https://4kwallpapers.com/images/wallpapers/macos-sonoma-horizon-blue-sky-daylight-stock-5k-6016x6016-11652.jpg" },
];

const SettingsApp: React.FC<SettingsAppProps> = ({ currentTheme, setTheme, setWallpaper }) => {
  const getTextColor = () => {
    switch (currentTheme) {
      case 'retro': return 'text-ink';
      case 'linux': return 'text-gray-200';
      default: return 'text-gray-900';
    }
  };

  return (
    <div className={`p-6 h-full flex flex-col gap-8 overflow-y-auto ${getTextColor()}`}>
      {/* Theme Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">System Appearance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Retro Theme Option */}
          <button 
            onClick={() => setTheme('retro')}
            className={`
              relative p-4 rounded-xl border-4 transition-all flex flex-col items-center gap-3
              ${currentTheme === 'retro' ? 'border-retro-blue bg-yellow-50' : 'border-gray-200 hover:border-gray-300'}
            `}
          >
            <div className="w-full h-24 bg-[#fdf6e3] border-2 border-ink shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
              <span className="font-hand font-bold text-xl text-ink">Hello!</span>
            </div>
            <div className="text-center">
              <p className={`font-bold font-hand text-lg ${currentTheme === 'retro' ? 'text-ink' : 'text-gray-700'}`}>Indie Retro</p>
              <p className="text-sm opacity-60">Handcrafted Aesthetic</p>
            </div>
          </button>

          {/* MacOS Theme Option */}
          <button 
            onClick={() => setTheme('macos')}
            className={`
              relative p-4 rounded-xl border-4 transition-all flex flex-col items-center gap-3
              ${currentTheme === 'macos' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
            `}
          >
            <div className="w-full h-24 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden">
               <div className="h-6 bg-gray-100 border-b flex items-center px-2 gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
               </div>
               <div className="flex-1 flex items-center justify-center">
                  <Command size={20} className="text-gray-400"/>
               </div>
            </div>
            <div className="text-center">
              <p className={`font-bold font-sans text-lg ${currentTheme === 'linux' ? 'text-gray-300' : 'text-gray-800'}`}>macOS Inspired</p>
              <p className="text-sm opacity-60">Clean & Glassy</p>
            </div>
          </button>

          {/* Linux Theme Option */}
          <button 
            onClick={() => setTheme('linux')}
            className={`
              relative p-4 rounded-xl border-4 transition-all flex flex-col items-center gap-3
              ${currentTheme === 'linux' ? 'border-green-500 bg-green-900/10' : 'border-gray-200 hover:border-gray-300'}
            `}
          >
            <div className="w-full h-24 bg-[#1e1e1e] border border-gray-600 flex flex-col font-mono text-green-400 text-xs p-2">
               <span>$ init_system</span>
               <span>{'>'} Loading...</span>
               <span className="animate-pulse">_</span>
            </div>
            <div className="text-center">
              <p className={`font-bold font-mono text-lg ${currentTheme === 'linux' ? 'text-gray-200' : 'text-gray-800'}`}>Dev / Linux</p>
              <p className="text-sm opacity-60">Terminal Chic</p>
            </div>
          </button>
        </div>
      </section>

      {/* Wallpaper Section (MacOS Only) */}
      {currentTheme === 'macos' && setWallpaper && (
        <section>
           <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><ImageIcon size={24}/> Wallpaper</h2>
           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {WALLPAPERS.map((wp, i) => (
                <button
                  key={i}
                  onClick={() => setWallpaper(wp.url)}
                  className="group relative aspect-video rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 focus:border-blue-500 transition-all"
                >
                   <img src={wp.url} alt={wp.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                   <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] py-1 text-center backdrop-blur-sm">
                      {wp.name}
                   </div>
                </button>
              ))}
           </div>
        </section>
      )}

      <div className="mt-auto pt-6 border-t opacity-50 text-sm text-center border-current">
        Current Environment: <span className="font-bold uppercase">{currentTheme}</span>
      </div>
    </div>
  );
};

export default SettingsApp;