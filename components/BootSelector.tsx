import React from 'react';
import { Theme } from '../types';
import { Command, Terminal, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

interface BootSelectorProps {
  onSelect: (theme: Theme) => void;
}

const BootSelector: React.FC<BootSelectorProps> = ({ onSelect }) => {
  return (
    <div className="h-screen w-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ 
            backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
        }}
      ></div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 md:mb-12 z-10"
      >
        <h1 className="text-2xl md:text-5xl font-mono font-bold mb-2 md:mb-4 tracking-tight">SYSTEM BOOTLOADER</h1>
        <p className="text-gray-400 font-mono text-xs md:text-base">Select your operating environment</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 z-10 max-w-5xl w-full">
        {/* Retro */}
        <motion.button
          whileHover={{ scale: 1.05, borderColor: '#fbbf24' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect('retro')}
          className="bg-[#fdf6e3] text-black rounded-xl p-4 md:p-8 border-2 md:border-4 border-gray-700 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all flex flex-row md:flex-col items-center gap-4 md:gap-6 group text-left md:text-center"
        >
          <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white border-2 md:border-4 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] shrink-0">
             <span className="font-hand font-bold text-xl md:text-2xl">Hi!</span>
          </div>
          <div>
             <h3 className="font-hand font-bold text-xl md:text-2xl mb-1">Retro OS</h3>
             <p className="font-hand text-sm md:text-lg text-gray-600">Hand-drawn indie vibe</p>
          </div>
        </motion.button>

        {/* MacOS */}
        <motion.button
          whileHover={{ scale: 1.05, borderColor: '#3b82f6' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect('macos')}
          className="bg-black/80 backdrop-blur-xl text-white rounded-xl p-4 md:p-8 border-2 md:border-4 border-gray-700 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all flex flex-row md:flex-col items-center gap-4 md:gap-6 text-left md:text-center"
        >
          <div className="w-14 h-14 md:w-20 md:h-20 rounded-[22%] bg-white flex items-center justify-center shadow-lg shrink-0">
             <Command size={24} className="text-black md:w-8 md:h-8" />
          </div>
          <div>
             <h3 className="font-sans font-bold text-xl md:text-2xl mb-1">macOS</h3>
             <p className="font-sans text-xs md:text-sm text-gray-400">Professional & Clean</p>
          </div>
        </motion.button>

        {/* Linux */}
        <motion.button
          whileHover={{ scale: 1.05, borderColor: '#22c55e' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect('linux')}
          className="bg-[#0f0f0f] text-green-500 rounded-xl p-4 md:p-8 border-2 md:border-4 border-gray-700 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all flex flex-row md:flex-col items-center gap-4 md:gap-6 font-mono text-left md:text-center"
        >
          <div className="w-14 h-14 md:w-20 md:h-20 bg-[#1a1a1a] border border-gray-600 flex items-center justify-center shrink-0">
             <Terminal size={24} className="md:w-8 md:h-8" />
          </div>
          <div>
             <h3 className="font-bold text-xl md:text-2xl mb-1">Arch / Linux</h3>
             <p className="text-[10px] md:text-xs text-gray-500">Minimalist Terminal</p>
          </div>
        </motion.button>
      </div>

      <div className="mt-8 md:mt-16 font-mono text-gray-600 text-[10px] md:text-xs">
        v1.0.4-stable
      </div>
    </div>
  );
};

export default BootSelector;