import React from 'react';
import { ExternalLink, Github, Twitter, Layers, Terminal, Box } from 'lucide-react';
import { Theme } from '../../types';

interface ProjectsAppProps {
  theme?: Theme;
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  color?: string; // For retro theme
}

import { projects as configProjects, userProfile } from '../../config';

const projects = configProjects;
const socials = userProfile.socials;

const ProjectsApp: React.FC<ProjectsAppProps> = ({ theme = 'retro' }) => {
  
  // --- Linux Theme: Package Manager List ---
  if (theme === 'linux') {
    return (
      <div className="h-full bg-[#1e1e1e] text-gray-300 font-mono p-4 overflow-y-auto selection:bg-green-900 selection:text-white">
        <div className="mb-6 border-b border-gray-700 pb-2">
           <span className="text-green-500">guest@openbio-template:~$</span> <span className="text-white">apt list --installed | grep "openbio-template-projects"</span>
        </div>
        
        <div className="space-y-4">
           {projects.map((p, i) => (
             <div key={i} className="hover:bg-white/5 p-2 rounded-sm group">
                <div className="flex items-baseline gap-2">
                   <span className="text-green-400 font-bold">{p.title.toLowerCase().replace(/ /g, '-')}</span>
                   <span className="text-gray-500 text-xs">v1.0.0</span>
                   <span className="text-blue-400 text-xs">[installed]</span>
                </div>
                <div className="pl-4 text-sm text-gray-400 mt-1">{p.description}</div>
                <div className="pl-4 mt-1 flex gap-2 text-xs">
                   <span className="text-yellow-600">Dep:</span> {p.tags.join(', ')}
                </div>
                <div className="pl-4 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   <a href={p.link} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline text-xs flex items-center gap-1">
                      Link: {p.link} <ExternalLink size={10} />
                   </a>
                </div>
             </div>
           ))}
        </div>

        <div className="mt-8 pt-4 border-t border-gray-700">
           <div className="mb-2 text-gray-400"># Connect</div>
           <div className="flex gap-4">
              {socials.map(s => (
                <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                   <s.icon size={14} /> {s.name}
                </a>
              ))}
           </div>
        </div>
      </div>
    );
  }

  // --- MacOS Theme: Clean Grid ---
  if (theme === 'macos') {
    return (
      <div className="h-full bg-gray-50/50 p-8 overflow-y-auto font-sans">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-end mb-8">
             <div>
                <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
                <p className="text-gray-500 text-sm mt-1">A curated list of my production apps.</p>
             </div>
             <div className="flex gap-2">
                {socials.map(s => (
                  <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all text-gray-600 hover:text-blue-600 border border-gray-200">
                     <s.icon size={18} />
                  </a>
                ))}
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {projects.map((p, i) => (
               <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
                  <div className="flex justify-between items-start mb-3">
                     <div className={`w-10 h-10 rounded-lg ${p.color?.replace('100', '50') || 'bg-gray-100'} flex items-center justify-center text-gray-700`}>
                        <Box size={20} />
                     </div>
                     <a href={p.link} target="_blank" rel="noreferrer" className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                        OPEN
                     </a>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{p.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{p.description}</p>
                  
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-50 mt-auto">
                     {p.tags.map(t => (
                       <span key={t} className="px-2 py-0.5 bg-gray-50 border border-gray-100 text-[10px] text-gray-500 font-medium rounded-md uppercase tracking-wide">
                          {t}
                       </span>
                     ))}
                  </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    );
  }

  // --- Retro Theme: Garage Indie Style ---
  return (
    <div className="p-6 h-full overflow-y-auto bg-transparent">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
         <div>
            <h1 className="text-4xl font-bold font-hand text-ink mb-1">My Garage</h1>
            <p className="font-hand text-lg text-gray-600">Stuff I built to solve problems.</p>
         </div>
         <div className="flex gap-3">
            {socials.map(s => (
               <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 font-bold font-hand border-2 border-ink px-3 py-1 bg-white hover:bg-yellow-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform active:translate-y-1 active:shadow-none">
                  <s.icon size={16} /> {s.name}
               </a>
            ))}
         </div>
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
          {projects.map((project, idx) => (
            <div key={idx} className={`bg-white border-2 border-ink p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col h-full relative overflow-hidden`}>
              {/* Colored Header Bar */}
              <div className={`absolute top-0 left-0 right-0 h-3 ${project.color} border-b-2 border-ink`}></div>
              
              <div className="mt-4 mb-2 flex justify-between items-start">
                <h3 className="text-2xl font-bold font-hand">{project.title}</h3>
                <a href={project.link} target="_blank" rel="noreferrer" className="text-ink hover:scale-110 transition-transform">
                   <ExternalLink size={20} />
                </a>
              </div>
              
              <p className="text-lg text-gray-700 mb-6 font-hand leading-tight flex-1">{project.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-gray-100 border border-ink text-sm rounded-sm font-bold font-hand transform hover:rotate-2 transition-transform cursor-default">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
       </div>
    </div>
  );
};

export default ProjectsApp;