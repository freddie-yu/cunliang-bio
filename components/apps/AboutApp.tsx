import React, { useState } from 'react';
import { User, Zap, Cpu, Terminal, Briefcase, LayoutTemplate, PenTool, Sparkles, Layers } from 'lucide-react';
import { Theme } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import { userProfile, skills } from '../../config';

interface AboutAppProps {
  theme?: Theme;
  isMobile?: boolean;
}

const AVATAR_URL = userProfile.avatar_url;

// Extract NavItem to prevent re-renders
const NavItem = ({ id, label, icon: Icon, activeTab, setActiveTab }: any) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      setActiveTab(id);
    }}
    className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-[6px] text-[13px] font-medium transition-all duration-200 cursor-default
      ${activeTab === id
        ? 'bg-white shadow-sm text-blue-600'
        : 'text-gray-600 hover:bg-black/5 active:bg-black/10'}`}
  >
     <Icon size={15} strokeWidth={2} />
     {label}
  </button>
);

const AboutApp: React.FC<AboutAppProps> = ({ theme = 'macos', isMobile = false }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'stack' | 'focus' | 'experience'>('profile');

  // --- Linux Theme (JSON / Code View) ---
  if (theme === 'linux') {
    const profileData = {
      user: userProfile.name,
      role: userProfile.role,
      bio: userProfile.bio,
      story: userProfile.story,
      status: userProfile.status,
      skills: skills,
      quote: userProfile.quote
    };

    return (
      <div className="h-full bg-[#1e1e1e] text-green-400 font-mono p-6 overflow-auto text-sm selection:bg-green-900 selection:text-white">
        <div className="flex gap-4 mb-6 border-b border-gray-700 pb-4">
          <div className="w-24 h-24 border-2 border-green-500/50 p-1">
            <img src={AVATAR_URL} alt="Avatar" className="w-full h-full object-cover grayscale contrast-125" onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }} />
          </div>
          <div className="flex flex-col justify-end">
            <h1 className="text-2xl font-bold text-white">User: {userProfile.name}</h1>
            <p className="text-gray-500">Permissions: <span className="text-green-500">ROOT</span></p>
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-purple-400">const</span> <span className="text-blue-400">developerProfile</span> <span className="text-white">=</span> <span className="text-yellow-300">{'{'}</span>

          {Object.entries(profileData).map(([key, value]) => (
            <div key={key} className="pl-4 hover:bg-white/5 py-0.5">
              <span className="text-red-400">"{key}"</span>: {
                Array.isArray(value) ? (
                  <span>
                    <span className="text-yellow-300">[</span>
                    <div className="pl-4 border-l border-gray-700 ml-1">
                      {value.map((v, i) => (
                        <div key={i}>
                          {typeof v === 'object' && v !== null ? (
                             <span>
                               <span className="text-yellow-300">{'{'}</span>
                               {Object.entries(v).map(([k, val], j) => (
                                  <span key={k}> <span className="text-orange-300">{k}</span>: <span className="text-green-300">"{typeof val === 'string' ? val : JSON.stringify(val)}"</span>{j < Object.keys(v).length - 1 && ","}</span>
                               ))}
                               <span className="text-yellow-300">{'}'}</span>
                             </span>
                          ) : (
                             <span className="text-green-300">"{v as string}"</span>
                          )}
                          {i < value.length - 1 && <span className="text-white">,</span>}
                        </div>
                      ))}
                    </div>
                    <span className="text-yellow-300">]</span>,
                  </span>
                ) : typeof value === 'object' && value !== null ? (
                  <span>
                     <span className="text-yellow-300">{'{'}</span>
                     <div className="pl-4 border-l border-gray-700 ml-1">
                        {Object.entries(value).map(([subKey, subVal]) => (
                            <div key={subKey}>
                                <span className="text-orange-300">"{subKey}"</span>: <span className="text-yellow-300">[</span>
                                {Array.isArray(subVal) ? (subVal as string[]).map((v, i) => (
                                    <span key={i}><span className="text-green-300">"{v}"</span>{i < (subVal as string[]).length - 1 && ", "}</span>
                                )) : <span className="text-green-300">"{subVal}"</span>}
                                <span className="text-yellow-300">]</span>,
                            </div>
                        ))}
                     </div>
                     <span className="text-yellow-300">{'}'}</span>,
                  </span>
                ) : (
                  <span><span className="text-green-300">"{value as string}"</span>,</span>
                )}
            </div>
          ))}

          <span className="text-yellow-300">{'}'}</span>;
        </div>

        <div className="mt-8 text-gray-500">
          <span className="animate-pulse">_</span>
        </div>
      </div>
    );
  }

  // --- MacOS Theme (Tabbed Split View) ---
  if (theme === 'macos') {
    const tabs = [
      { id: 'profile', label: 'Profile', icon: User },
      { id: 'stack', label: 'Tech Stack', icon: Layers },
      { id: 'experience', label: 'Experience', icon: Briefcase },
    ] as const;

    const renderTabContent = () => (
      <AnimatePresence mode='wait'>
        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Hi, I'm {userProfile.name}.</h1>
              <p className="text-lg text-gray-500 font-light">
                {userProfile.bio}
              </p>
            </div>

            <div className="bg-blue-50/50 rounded-xl p-5 border border-blue-100/50">
              <h3 className="font-semibold text-blue-900 text-sm mb-2 flex items-center gap-2">
                <Zap size={16} className="fill-blue-500 text-blue-600"/> My Story
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                {userProfile.story}
              </p>
            </div>

            <div>
               <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Current Status</h3>
               <div className="space-y-2">
                  {userProfile.status.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${i === 0 ? 'bg-green-500 animate-pulse' : i === 1 ? 'bg-blue-500' : 'bg-orange-500'}`}></span>
                      <div>
                        <span className="font-semibold text-gray-700">{item.label}:</span> {item.value}
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </motion.div>
        )}

        {/* TECH STACK TAB */}
        {activeTab === 'stack' && (
          <motion.div
            key="stack"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Tech Stack</h2>
              <p className="text-sm text-gray-500">My arsenal for building digital products.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {skills.map((category, idx) => (
                <div key={idx}>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    {idx === 0 ? <LayoutTemplate size={14} /> : idx === 1 ? <Terminal size={14} /> : <PenTool size={14} />}
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map(item => (
                      <span key={item} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-xs font-medium border border-gray-200">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-gray-50 text-xs text-gray-500 italic text-center">
              "{userProfile.quote}"
            </div>
          </motion.div>
        )}

        {/* EXPERIENCE TAB */}
        {activeTab === 'experience' && (
          <motion.div
            key="experience"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Experience</h2>
              <p className="text-sm text-gray-500">My professional journey and what I've learned.</p>
            </div>

            <div className="space-y-4">
              {userProfile.status.map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className={`w-10 h-10 rounded-full ${i === 0 ? 'bg-green-100 text-green-600' : i === 1 ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'} flex items-center justify-center shrink-0`}>
                    {i === 0 ? <User size={20} /> : i === 1 ? <LayoutTemplate size={20} /> : <PenTool size={20} />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.label}</h3>
                    <p className="text-sm text-gray-600 mt-1">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );

    if (isMobile) {
       return (
          <div className="flex flex-col h-full bg-[#f5f5f7] font-sans">
             {/* Mobile Header with Tabs */}
             <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
                <div className="p-4 pb-2 flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm border border-gray-200 shrink-0">
                      <img src={AVATAR_URL} alt="Avatar" className="w-full h-full object-cover" onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }} />
                   </div>
                   <div>
                      <h2 className="font-bold text-gray-900 text-sm leading-tight">{userProfile.name}</h2>
                      <p className="text-[10px] text-gray-500 font-medium">{userProfile.role}</p>
                   </div>
                </div>

                <div className="flex gap-2 overflow-x-auto px-4 pb-3 hide-scrollbar">
                   {tabs.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${activeTab === tab.id ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200'}`}
                      >
                         <tab.icon size={12} />
                         {tab.label}
                      </button>
                   ))}
                </div>
             </div>

             {/* Content Area */}
             <div className="flex-1 overflow-y-auto p-4">
                {renderTabContent()}
             </div>
          </div>
       );
    }

    return (
      <div className="flex h-full font-sans bg-[#f5f5f7]">
        {/* Sidebar */}
        <div className="w-[200px] bg-[#e8e8ed]/50 backdrop-blur-xl border-r border-gray-300/50 flex flex-col pt-8 pb-4 px-3 shrink-0">
           <div className="px-2 mb-6 text-center">
              <div className="w-20 h-20 rounded-full overflow-hidden shadow-md mb-3 mx-auto border-[3px] border-white">
                 <img src={AVATAR_URL} alt="Avatar" className="w-full h-full object-cover" onError={(e) => {
                   (e.target as HTMLImageElement).style.display = 'none';
                 }} />
              </div>
              <h2 className="font-bold text-gray-800 text-base">{userProfile.name}</h2>
              <p className="text-[11px] text-gray-500 font-medium mt-0.5">{userProfile.role}</p>
           </div>

           <nav className="space-y-1 flex-1">
             {tabs.map(tab => (
               <NavItem
                 key={tab.id}
                 id={tab.id}
                 label={tab.label}
                 icon={tab.icon}
                 activeTab={activeTab}
                 setActiveTab={setActiveTab}
               />
             ))}
           </nav>

           <div className="mt-auto flex justify-center gap-4 text-gray-400 pb-2">
              {userProfile.socials.map(s => (
                <a key={s.name} href={s.url} target="_blank" rel="noreferrer">
                  <s.icon size={16} className="hover:text-gray-800 cursor-pointer transition-colors" />
                </a>
              ))}
            </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white overflow-y-auto">
          <div className="p-8 max-w-2xl mx-auto h-full">
            {renderTabContent()}
          </div>
        </div>
      </div>
    );
  }

  // --- Retro Theme (Handwritten / Indie) ---
  return (
    <div className="space-y-6 text-ink p-6 font-hand overflow-y-auto h-full">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Polaroid Style Image */}
        <div className="relative group shrink-0">
          <div className="bg-white p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-ink -rotate-2 w-max">
            <div className="w-32 h-32 border border-ink bg-gray-200 overflow-hidden">
                <img src={AVATAR_URL} alt="Avatar" className="w-full h-full object-cover" onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }} />
            </div>
            <p className="text-center font-bold mt-2 text-sm">Me.png</p>
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">Hello, I'm {userProfile.name}.</h1>
          <p className="text-xl text-retro-blue font-bold mb-4">
            {userProfile.role}
          </p>

          <div className="relative bg-white/50 border-l-4 border-retro-blue pl-4 py-2 italic text-lg mb-4 whitespace-pre-line">
             "{userProfile.story}"
          </div>

          <div className="inline-block bg-yellow-100 px-3 py-1 border border-ink rotate-1 shadow-sm">
             <p className="text-sm font-bold">"{userProfile.quote}"</p>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-dashed border-ink/30 my-2"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 border-2 border-ink shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-sm">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2 underline decoration-retro-green">
               Current Status
            </h3>
            <ul className="space-y-2 text-lg">
                {userProfile.status.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 border-2 border-ink flex items-center justify-center bg-retro-green text-white font-bold text-xs shrink-0 mt-1">{i === 0 ? '✓' : ''}</div>
                    <span><strong>{item.label}:</strong> {item.value}</span>
                  </li>
                ))}
            </ul>
        </div>

        <div className="bg-white p-4 border-2 border-ink shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-sm">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2 underline decoration-retro-blue">
               Tech Stack
            </h3>
            <ul className="space-y-1 text-lg">
                {skills.slice(0, 2).map(category =>
                  category.items.slice(0, 2).map(item =>
                    <li key={item} className="flex items-center gap-2">► {item}</li>
                  )
                )}
            </ul>
            <p className="mt-3 text-sm text-gray-500 italic">"{userProfile.quote}"</p>
        </div>

        <div className="bg-white p-4 border-2 border-ink shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-sm md:col-span-2">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2 underline decoration-retro-red">
               Skills & Specialties
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-lg">
                {skills.map((category, i) => (
                  <div key={i} className="flex items-start gap-2"><span>★</span> <span><strong>{category.title}</strong></span></div>
                ))}
            </div>
        </div>

        <div className="bg-yellow-200 p-5 border-2 border-ink shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] rotate-1 md:col-span-2 relative mt-2">
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-yellow-100/50 rotate-1"></div>
             <h3 className="text-2xl font-bold mb-4 text-center border-b-2 border-ink/10 pb-2">What I'm Doing</h3>

             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                 {userProfile.status.map((item, i) => (
                   <div key={i} className={`text-center ${i === 1 ? 'border-l-2 border-ink/10 border-r-2 sm:border-r-2 sm:border-l-2 sm:px-2 border-t-2 sm:border-t-0 pt-2 sm:pt-0' : i === 2 ? 'border-t-2 sm:border-t-0 pt-2 sm:pt-0' : ''}`}>
                      <p className="font-bold text-lg mb-1">{item.label}</p>
                      <p className="text-sm leading-tight opacity-80">{item.value}</p>
                   </div>
                 ))}
             </div>

             <div className="mt-4 text-center">
                 <span className="inline-block border-2 border-ink px-2 rounded-full text-sm font-bold bg-white">"Building products, not just code."</span>
             </div>
        </div>
      </div>
    </div>
  );
};

export default AboutApp;
