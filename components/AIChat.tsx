
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: '你好！我是谢启铜的 AI 助手。你可以问我关于他的技能、项目经验或者职业规划。' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: '你现在是前端工程师谢启铜的 AI 个人助手。你的目标是回答招聘者或访客关于他的简历和技能的问题。他的核心技能包括 React, Vue3, TypeScript, 三维可视化。他是个中共党员，性格开朗，喜欢街舞 Popping。回答要专业、幽默且简短。',
        }
      });
      
      const aiResponse = response.text || '对不起，我暂时无法回答这个问题。';
      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: 'AI 连接遇到了一点小问题，请稍后再试。' }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-[80]">
      {isOpen ? (
        <div className="w-80 h-[450px] bg-white dark:bg-card-dark rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-primary p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">smart_toy</span>
              <span className="font-bold text-sm">AI 简历助手</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="material-symbols-outlined text-[20px]">close</button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-xl ${
                  msg.role === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-xl animate-pulse text-xs text-slate-400">
                  AI 正在思考...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={sendMessage} className="p-4 border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <input 
              type="text" 
              placeholder="询问他的项目经验..." 
              className="flex-1 bg-slate-100 dark:bg-slate-900 border-none rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-primary outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="bg-primary text-white size-8 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="size-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95 group"
        >
          <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">smart_toy</span>
        </button>
      )}
    </div>
  );
};

export default AIChat;
