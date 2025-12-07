import React, { useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { WindowState, Theme } from '../../types';

interface WindowProps {
  window: WindowState;
  title: string;
  children: React.ReactNode;
  isActive: boolean;
  theme: Theme;
  dragConstraints?: React.RefObject<Element>;
  isMobile?: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onPositionChange: (x: number, y: number) => void;
}

const Window: React.FC<WindowProps> = ({
  window,
  title,
  children,
  isActive,
  theme,
  dragConstraints,
  isMobile = false,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange,
}) => {
  const dragControls = useDragControls();
  const windowRef = useRef<HTMLDivElement>(null);

  if (window.isMinimized) return null;

  const isDialog = window.variant === 'dialog';
  const forceFull = isMobile && !isDialog;

  // --- Theme Styles Configuration ---
  const getStyles = () => {
    switch (theme) {
      case 'macos':
        return {
          container: `bg-[#f5f5f5] rounded-xl border border-white/20 font-sans text-gray-800 overflow-hidden transition-[box-shadow,opacity] duration-200 ${isActive ? 'shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-black/5' : 'shadow-[0_10px_30px_rgba(0,0,0,0.2)] opacity-95'} ${forceFull ? 'rounded-none border-none' : ''}`,
          header: `h-[38px] bg-[#e3e3e3]/50 backdrop-blur-xl flex items-center px-4 select-none relative border-b border-gray-300/30 touch-none`, 
          title: `absolute left-0 right-0 text-center font-semibold text-[13px] text-gray-600/90 pointer-events-none tracking-wide`,
          controls: `flex items-center gap-[8px] z-10 group`, 
          content: `bg-[#ffffff] h-full`, 
          closeBtn: `w-[12px] h-[12px] rounded-full bg-[#FF5F56] border-[0.5px] border-[#E0443E] flex items-center justify-center text-black/60 opacity-100 hover:brightness-90 active:brightness-75 transition-transform active:scale-95`,
          minBtn: `w-[12px] h-[12px] rounded-full bg-[#FFBD2E] border-[0.5px] border-[#DEA123] flex items-center justify-center text-black/60 opacity-100 hover:brightness-90 active:brightness-75 transition-transform active:scale-95`,
          maxBtn: `w-[12px] h-[12px] rounded-full bg-[#27C93F] border-[0.5px] border-[#1AAB29] flex items-center justify-center text-black/60 opacity-100 hover:brightness-90 active:brightness-75 transition-transform active:scale-95`,
        };
      case 'linux':
        return {
          container: `bg-[#1e1e1e] border border-[#333] shadow-lg font-mono text-gray-200 rounded-sm overflow-hidden ${forceFull ? 'border-none' : ''}`,
          header: `h-8 bg-[#2d2d2d] border-b border-[#333] flex items-center justify-between px-2 select-none touch-none`,
          title: `font-bold text-sm text-gray-400 flex items-center gap-2`,
          controls: `flex items-center gap-1`,
          content: `bg-[#1e1e1e]`,
          closeBtn: `w-6 h-6 hover:bg-[#c42b1c] hover:text-white flex items-center justify-center transition-colors text-gray-400 rounded-sm`,
          minBtn: `w-6 h-6 hover:bg-[#333] flex items-center justify-center transition-colors text-gray-400 rounded-sm`,
          maxBtn: `w-6 h-6 hover:bg-[#333] flex items-center justify-center transition-colors text-gray-400 rounded-sm`,
        };
      case 'retro':
      default:
        return {
          container: `flex flex-col bg-paper border-2 border-ink shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-hand overflow-hidden ${forceFull ? 'border-0 shadow-none' : ''}`,
          header: `h-10 border-b-2 border-ink flex items-center justify-between px-3 cursor-grab active:cursor-grabbing select-none touch-none ${isActive ? 'bg-yellow-100' : 'bg-gray-100'}`,
          title: `font-bold text-lg text-ink tracking-wide`,
          controls: `flex items-center gap-2 order-first`,
          content: `bg-white/50 backdrop-blur-sm relative`,
          closeBtn: `w-4 h-4 rounded-full border border-ink bg-retro-red hover:opacity-80 flex items-center justify-center group`,
          minBtn: `w-4 h-4 rounded-full border border-ink bg-yellow-400 hover:opacity-80 flex items-center justify-center group`,
          maxBtn: `w-4 h-4 rounded-full border border-ink bg-retro-green hover:opacity-80 flex items-center justify-center group`,
        };
    }
  };

  const styles = getStyles();

  // Dynamic dimensions
  const targetWidth = (window.isMaximized || forceFull) ? '100%' : window.size.width;
  const targetHeight = (window.isMaximized || forceFull) ? '100%' : window.size.height;
  
  const targetX = (window.isMaximized || forceFull) ? 0 : window.position.x;
  const targetY = (window.isMaximized || forceFull) ? 0 : window.position.y;
  
  const targetRadius = (window.isMaximized || forceFull) ? 0 : (theme === 'macos' ? 12 : (theme === 'linux' ? 0 : 12));

  return (
    <motion.div
      ref={windowRef}
      drag={!window.isMaximized && !forceFull}
      dragControls={dragControls}
      dragListener={false} // Only drag from header
      dragMomentum={false} // No momentum, follows cursor exactly
      dragConstraints={dragConstraints}
      dragElastic={0} // Hard stop at boundaries
      onDragEnd={() => {
        if (!window.isMaximized && !forceFull && dragConstraints?.current && windowRef.current) {
           const parentRect = dragConstraints.current.getBoundingClientRect();
           const winRect = windowRef.current.getBoundingClientRect();
           const relativeX = winRect.left - parentRect.left;
           const relativeY = winRect.top - parentRect.top;
           onPositionChange(Math.max(0, relativeX), Math.max(0, relativeY));
        }
      }}
      initial={{ 
        scale: 0.95, 
        opacity: 0,
        x: targetX,
        y: targetY,
        width: targetWidth,
        height: targetHeight
      }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        width: targetWidth,
        height: targetHeight,
        x: targetX,
        y: targetY,
        borderRadius: targetRadius,
      }}
      style={{
        position: 'absolute',
        zIndex: window.zIndex,
        willChange: 'transform',
      }}
      onMouseDown={onFocus}
      className={`${styles.container} flex flex-col`}
    >
      {/* Title Bar */}
      <div 
        className={styles.header}
        onPointerDown={(e) => {
          if (!window.isMaximized && !forceFull) dragControls.start(e);
        }}
      >
        {theme === 'macos' && <div className={styles.title}>{title}</div>}
        
        {/* Controls */}
        <div 
          className={styles.controls} 
          onPointerDown={(e) => e.stopPropagation()} 
        >
          {theme === 'linux' && <span className="text-gray-500 mr-2 text-xs">[{window.id}]</span>}
          {theme === 'retro' || theme === 'macos' ? (
             <>
               <button onClick={(e) => { e.stopPropagation(); onClose(); }} className={styles.closeBtn}>
                 {theme === 'macos' && <X size={6} className="opacity-0 group-hover:opacity-100 text-black/70 font-bold" strokeWidth={4} />}
                 {theme === 'retro' && <X size={10} className="opacity-0 group-hover:opacity-100 text-ink" />}
               </button>
               
               {!isDialog && !forceFull && (
                 <>
                  <button onClick={(e) => { e.stopPropagation(); onMinimize(); }} className={styles.minBtn}>
                    {theme === 'macos' && <Minus size={6} className="opacity-0 group-hover:opacity-100 text-black/70 font-bold" strokeWidth={4} />}
                    {theme === 'retro' && <Minus size={10} className="opacity-0 group-hover:opacity-100 text-ink" />}
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); onMaximize(); }} className={styles.maxBtn}>
                    {theme === 'macos' && <Maximize2 size={5} className="opacity-0 group-hover:opacity-100 text-black/70 font-bold" strokeWidth={4} />}
                    {theme === 'retro' && <Square size={8} className="opacity-0 group-hover:opacity-100 text-ink" />}
                  </button>
                 </>
               )}
               {isDialog && theme === 'macos' && (
                 <>
                   <div className="w-[12px] h-[12px] rounded-full bg-[#d1d5db] border-[0.5px] border-[#b0b0b0]" />
                   <div className="w-[12px] h-[12px] rounded-full bg-[#d1d5db] border-[0.5px] border-[#b0b0b0]" />
                 </>
               )}
             </>
          ) : (
             <span className={styles.title}>{title}</span>
          )}
        </div>

        {/* Linux Controls */}
        {theme === 'linux' && (
           <div className="flex items-center" onPointerDown={(e) => e.stopPropagation()}>
             {!isDialog && !forceFull && (
               <>
                 <button onClick={(e) => { e.stopPropagation(); onMinimize(); }} className={styles.minBtn}>
                    <Minus size={12} />
                 </button>
                 <button onClick={(e) => { e.stopPropagation(); onMaximize(); }} className={styles.maxBtn}>
                    <Square size={10} />
                 </button>
               </>
             )}
             <button onClick={(e) => { e.stopPropagation(); onClose(); }} className={styles.closeBtn}>
                <X size={12} />
             </button>
           </div>
        )}

        {/* Retro Title */}
        {theme === 'retro' && (
           <>
            <span className={styles.title}>{title}</span>
            <div className="w-14"></div>
           </>
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 overflow-auto relative ${styles.content}`}>
        {theme === 'retro' && (
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          </div>
        )}
        <div className="relative z-10 h-full">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default Window;