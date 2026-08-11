import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Code2, Terminal, Play, Copy, Check, Folder, Sparkles } from 'lucide-react';

export const VsCodeGuideModal: React.FC = () => {
  const { isVsCodeGuideOpen, setIsVsCodeGuideOpen } = useStore();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isVsCodeGuideOpen) return null;

  const commands = [
    { title: 'Step 1: Install Dependencies', cmd: 'npm install' },
    { title: 'Step 2: Start Development Server', cmd: 'npm run dev' },
    { title: 'Step 3: Build for Production', cmd: 'npm run build' },
    { title: 'Step 4: Start Production Server', cmd: 'npm start' }
  ];

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#fcfbf7] border border-stone-200 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden my-auto relative">
        
        {/* Header */}
        <div className="p-4 sm:px-6 bg-[#1b4d2e] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Code2 className="w-6 h-6 text-amber-300" />
            <div>
              <h3 className="font-serif font-black text-lg text-white">
                How to Run AK FARM on VS Code (Visual Studio Code)
              </h3>
              <p className="text-[10px] text-emerald-200">
                VS Code Par Website Run Karne Ka Tareeqa (Roman Urdu & English Guide)
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsVsCodeGuideOpen(false)}
            className="p-1.5 text-emerald-200 hover:text-white rounded-full hover:bg-emerald-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto space-y-6 text-stone-800 text-xs">
          
          {/* Quick Summary Box */}
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl space-y-2">
            <h4 className="font-bold text-amber-900 text-sm flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Khulasa / Quick Summary</span>
            </h4>
            <p className="text-stone-700 leading-relaxed">
              Aap is website ko apne computer ya laptop par VS Code par asani se chala sakte hain. Iske liye aapke system mein <strong>Node.js</strong> installed hona chahiye. Neeche diye gaye steps follow karein:
            </p>
          </div>

          {/* Step 1: Download & Open */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-2">
            <h4 className="font-serif font-bold text-stone-900 text-sm flex items-center gap-2">
              <Folder className="w-4 h-4 text-[#1b4d2e]" />
              <span>Step 1: Open Project in VS Code</span>
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-stone-600">
              <li>Open <strong>Visual Studio Code</strong> on your computer.</li>
              <li>Click on <strong>File → Open Folder</strong> and select this AK FARM project folder.</li>
              <li>Open VS Code Terminal by pressing <code>Ctrl + `</code> (or <code>Cmd + `</code> on Mac).</li>
            </ul>
          </div>

          {/* Step 2: Commands to Run */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-3">
            <h4 className="font-serif font-bold text-stone-900 text-sm flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#1b4d2e]" />
              <span>Step 2: Commands to Execute in VS Code Terminal</span>
            </h4>

            <div className="space-y-3">
              {commands.map((c, idx) => (
                <div key={idx} className="bg-stone-900 text-stone-100 p-3 rounded-xl flex items-center justify-between font-mono text-xs">
                  <div>
                    <span className="text-amber-400 font-sans font-bold text-[10px] block uppercase tracking-wider mb-0.5">
                      {c.title}
                    </span>
                    <code className="text-emerald-300 font-bold">$ {c.cmd}</code>
                  </div>

                  <button
                    onClick={() => handleCopy(c.cmd, idx)}
                    className="p-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded-lg transition-colors flex items-center gap-1 text-[10px]"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Open in Browser */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-2">
            <h4 className="font-serif font-bold text-stone-900 text-sm flex items-center gap-2">
              <Play className="w-4 h-4 text-[#1b4d2e]" />
              <span>Step 3: Open Browser Preview</span>
            </h4>
            <p className="text-stone-600">
              When <code>npm run dev</code> starts, open your web browser (Chrome/Edge) and go to:
            </p>
            <div className="bg-emerald-50 text-[#1b4d2e] font-mono font-bold p-2.5 rounded-xl border border-emerald-200 inline-block text-xs">
              http://localhost:3000
            </div>
            <p className="text-stone-500 text-[11px] pt-1">
              Aapki complete website (Header, Hero, Products, Single Product detail modal, Cart, WhatsApp checkout & Client Admin Panel) bilkul same local machine par live chalne lage gi!
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
