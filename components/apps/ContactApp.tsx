
import React, { useState } from 'react';
import { Theme } from '../../types';
import { Send, Mail, Copy, Check, Github, Twitter, Paperclip, X } from 'lucide-react';

interface ContactAppProps {
  theme?: Theme;
}

import { userProfile } from '../../config';

const EMAIL = userProfile.email;
const SOCIALS = userProfile.socials;

const ContactApp: React.FC<ContactAppProps> = ({ theme = 'macos' }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    // Open default mail client after a small visual delay
    setTimeout(() => {
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      setTimeout(() => setIsSent(false), 2000);
    }, 800);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- Linux Theme: TUI Email Client ---
  if (theme === 'linux') {
    return (
      <div className="h-full bg-[#1e1e1e] text-gray-300 font-mono p-4 flex flex-col">
        <div className="border-b border-gray-700 pb-2 mb-4 flex justify-between">
          <span>COMPOSE MESSAGE [v1.0]</span>
          <span className="text-green-500">{isSent ? "SENDING..." : "READY"}</span>
        </div>

        <form onSubmit={handleSend} className="flex-1 flex flex-col gap-2">
          <div className="flex gap-2">
            <span className="text-blue-400">To:</span>
            <span className="text-white">{EMAIL}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-blue-400">From:</span>
            <span className="text-gray-500">guest@user</span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-yellow-400">Subject:</span>
            <input 
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className="bg-transparent border-b border-gray-700 focus:border-green-500 outline-none flex-1 text-white px-1"
              placeholder="..."
            />
          </div>
          
          <div className="h-[1px] bg-gray-700 my-2 w-full"></div>
          
          <textarea 
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="flex-1 bg-[#151515] p-2 text-gray-300 border border-gray-700 outline-none resize-none focus:border-green-500"
            placeholder="Type your message here..."
          />

          <div className="mt-2 flex justify-between items-center text-xs">
             <div className="flex gap-4">
               {SOCIALS.map(s => (
                 <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white hover:underline">
                   [{s.name}]
                 </a>
               ))}
             </div>
             <button type="submit" className="bg-gray-700 hover:bg-green-700 text-white px-4 py-1 flex items-center gap-2">
               [ SEND ]
             </button>
          </div>
        </form>
      </div>
    );
  }

  // --- Retro Theme: Postcard / Letter ---
  if (theme === 'retro') {
    return (
      <div className="h-full bg-[#f0f0f0] font-hand overflow-y-auto custom-scrollbar">
        <div className="min-h-full flex items-center justify-center p-6 md:mx-auto md:my-auto">
          <div className="bg-[#fffdf0] w-full max-w-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] border-2 border-ink p-6 relative rotate-1">
             {/* Stamp Area */}
             <div className="absolute top-4 right-4 w-20 h-24 border-2 border-dashed border-ink/30 flex items-center justify-center rotate-3 opacity-50">
                <span className="text-xs text-center font-bold">POSTAGE<br/>PAID</span>
             </div>

             <h2 className="text-3xl font-bold text-ink mb-6 underline decoration-wavy decoration-retro-red pt-2">Say Hello!</h2>

             <form onSubmit={handleSend} className="space-y-4 relative z-10">
                <div className="flex flex-col gap-1">
                   <label className="font-bold text-lg">Subject:</label>
                   <input 
                     type="text" 
                     value={subject}
                     onChange={e => setSubject(e.target.value)}
                     className="bg-transparent border-b-2 border-ink/50 focus:border-retro-blue outline-none text-xl px-2 py-1 font-hand"
                     placeholder="Project Inquiry..."
                   />
                </div>

                <div className="flex flex-col gap-1">
                   <label className="font-bold text-lg">Message:</label>
                   <textarea 
                     value={message}
                     onChange={e => setMessage(e.target.value)}
                     className="bg-[url('https://www.transparenttextures.com/patterns/lined-paper.png')] bg-white/50 border-2 border-ink rounded-sm p-3 text-xl min-h-[150px] outline-none focus:shadow-[4px_4px_0px_0px_rgba(38,139,210,1)] transition-shadow resize-none leading-loose"
                     placeholder="Dear Yibai..."
                   />
                </div>

                <div className="flex justify-between items-end mt-4">
                   <div className="text-sm">
                      <p className="font-bold mb-1">Or find me at:</p>
                      <div className="flex gap-3">
                         {SOCIALS.map(s => (
                           <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-retro-blue transition-colors">
                             <s.icon size={16} /> {s.name.split(' ')[0]}
                           </a>
                         ))}
                      </div>
                   </div>

                   <button 
                     type="submit"
                     disabled={isSent}
                     className="bg-ink text-white font-bold text-xl px-6 py-2 shadow-[4px_4px_0px_0px_rgba(220,50,47,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(220,50,47,1)] transition-all flex items-center gap-2 border-2 border-transparent active:border-black active:bg-white active:text-black"
                   >
                     {isSent ? "Sent!" : <>Send Mail <Send size={18} /></>}
                   </button>
                </div>
             </form>
          </div>
        </div>
      </div>
    );
  }

  // --- MacOS Theme: Mail App ---
  return (
    <div className="h-full flex flex-col font-sans bg-white">
      {/* Mail Toolbar */}
      <div className="h-12 border-b border-gray-200 flex items-center justify-between px-4 bg-[#f6f6f6] shrink-0">
         <div className="flex gap-4">
            <button 
              onClick={handleSend}
              className={`flex flex-col items-center gap-0.5 ${isSent ? 'text-gray-400' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
              disabled={isSent}
            >
               <Send size={18} className={isSent ? "animate-ping" : ""} />
               <span className="text-[10px] font-medium">Send</span>
            </button>
            <button className="flex flex-col items-center gap-0.5 text-gray-400 cursor-not-allowed">
               <Paperclip size={18} />
               <span className="text-[10px] font-medium">Attach</span>
            </button>
         </div>
         <div className="text-xs text-gray-400 font-medium">New Message</div>
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto">
         {/* Headers */}
         <div className="flex items-center px-4 py-2 border-b border-gray-100 shrink-0">
            <span className="text-gray-500 text-sm w-16 text-right mr-3">To:</span>
            <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md text-sm cursor-pointer group relative" onClick={copyEmail}>
               <span>Yibai</span>
               <span className="text-blue-400 text-xs hidden sm:inline">&lt;{EMAIL}&gt;</span>
               {copied ? <Check size={12} /> : <Copy size={12} className="opacity-0 group-hover:opacity-100 transition-opacity"/>}
            </div>
         </div>
         
         <div className="flex items-center px-4 py-2 border-b border-gray-100 shrink-0">
            <span className="text-gray-500 text-sm w-16 text-right mr-3">Subject:</span>
            <input 
               type="text"
               value={subject}
               onChange={e => setSubject(e.target.value)}
               placeholder="Project Inquiry"
               className="flex-1 outline-none text-sm font-medium text-gray-800 placeholder-gray-300 bg-transparent min-w-0"
            />
         </div>

         {/* Body */}
         <textarea 
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="flex-1 p-4 outline-none resize-none text-gray-800 leading-relaxed text-sm selection:bg-blue-100"
            placeholder="Hi Yibai, I'd like to discuss..."
         />

         {/* Footer Signature */}
         <div className="p-4 bg-gray-50 border-t border-gray-100 text-xs text-gray-500 flex justify-between items-center shrink-0">
            <div>
               <p className="font-semibold text-gray-700 mb-1">Connect elsewhere:</p>
               <div className="flex gap-3">
                  {SOCIALS.map(s => (
                    <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                       <s.icon size={14} /> {s.name}
                    </a>
                  ))}
               </div>
            </div>
            <div className="italic opacity-70">
               Sent from open-bio-template
            </div>
         </div>
      </div>
    </div>
  );
};

export default ContactApp;
