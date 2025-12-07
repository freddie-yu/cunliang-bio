import React, { useState, useEffect, useRef } from 'react';
import { Search, Command } from 'lucide-react';
import { AppID, AppConfig } from '../../types';

interface SpotlightProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchApp: (id: AppID) => void;
  apps: Record<AppID, Omit<AppConfig, 'component'>>;
}

const Spotlight: React.FC<SpotlightProps> = ({ isOpen, onClose, onLaunchApp, apps }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredApps = Object.values(apps).filter(app => 
    app.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]" onClick={onClose}>
      <div 
        className="w-[600px] bg-white/80 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/40 overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-4 border-b border-gray-200/50">
          <Search className="w-6 h-6 text-gray-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-xl text-gray-800 placeholder-gray-400"
            placeholder="Spotlight Search"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        
        {query && (
          <div className="max-h-[300px] overflow-y-auto p-2">
            {filteredApps.length > 0 ? (
              filteredApps.map(app => (
                <button
                  key={app.id}
                  onClick={() => {
                    onLaunchApp(app.id as AppID);
                    onClose();
                    setQuery('');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors group text-left"
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md group-hover:bg-white/20 text-gray-700 group-hover:text-white">
                    {React.createElement(app.icon, { size: 16 })}
                  </div>
                  <span className="text-lg flex-1">{app.title}</span>
                  <span className="text-xs opacity-50 bg-gray-200 px-1.5 py-0.5 rounded group-hover:bg-white/20">Application</span>
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">No results found</div>
            )}
          </div>
        )}
        
        {!query && (
           <div className="px-4 py-2 text-xs text-gray-400 flex items-center justify-end border-t border-gray-200/30">
             <Command size={10} className="mr-1" /> + Space to close
           </div>
        )}
      </div>
    </div>
  );
};

export default Spotlight;