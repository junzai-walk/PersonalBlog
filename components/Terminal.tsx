
import React, { useState, useRef, useEffect } from 'react';

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<string[]>([
    'Welcome to DevPortfolio Terminal v1.0.0',
    'Type "help" to see available commands.',
    ''
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, string> = {
    help: 'Available commands: about, skills, contact, clear, date',
    about: 'Xie Qitong - Senior Frontend Engineer specializing in React & Node.js.',
    skills: 'React, Vue3, TypeScript, Vite, Tailwind, Three.js, Docker...',
    contact: 'Email: dev@xietong.com | GitHub: github.com/xietong',
    date: new Date().toLocaleString(),
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    let response = commands[cmd] || `Command not found: ${cmd}. Type "help" for a list of commands.`;

    if (cmd === 'clear') {
      setHistory(['Terminal cleared.']);
    } else {
      setHistory(prev => [...prev, `> ${input}`, response, '']);
    }
    setInput('');
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="w-full bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-800 font-mono text-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-800">
        <div className="flex gap-2">
           <div className="size-3 rounded-full bg-red-500/50"></div>
           <div className="size-3 rounded-full bg-yellow-500/50"></div>
           <div className="size-3 rounded-full bg-green-500/50"></div>
        </div>
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">zsh — xie@portfolio</span>
      </div>
      <div 
        ref={scrollRef}
        className="p-4 h-64 overflow-y-auto text-slate-300 space-y-1 scroll-smooth"
      >
        {history.map((line, i) => (
          <div key={i} className={line.startsWith('>') ? 'text-primary' : ''}>{line}</div>
        ))}
        <form onSubmit={handleCommand} className="flex gap-2">
          <span className="text-emerald-500">xie@portfolio %</span>
          <input 
            type="text" 
            autoFocus
            className="bg-transparent border-none outline-none flex-1 text-white p-0"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;
