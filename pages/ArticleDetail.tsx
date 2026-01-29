
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ALL_ARTICLES = [
  { id: 'antigravity-gemini-3pro', title: 'Antigravity 与 Gemini 3 Pro：下一代多模态推理架构实践', category: 'AI 工具', date: '2024年03月20日' },
  { id: 'cursor-ide-deep-dive', title: 'Cursor：为什么它是目前最懂前端工程师的 AI 原生 IDE', category: 'AI 工具', date: '2024年03月15日' },
  { id: 'augment-vscode-plugin', title: 'VSCode 插件 Augment：深度集成的高性能代码补全方案', category: 'AI 工具', date: '2024年03月10日' },
  { id: 'alibaba-qwen-coder', title: '阿里 Qwen-Coder (Qder)：大规模开源编程模型的进化与实战', category: 'AI 工具', date: '2024年03月05日' },
  { id: 'bytedance-trae-preview', title: '字节跳动 Trae：自适应全场景 AI 协作开发环境初探', category: 'AI 工具', date: '2024年02月28日' },
  { id: 'windsurf-agent-ide', title: 'Windsurf：Codeium 推出的首个代理式（Agentic）IDE 深度体验', category: 'AI 工具', date: '2024年02月20日' },
  { id: 'ai-cli-comparison', title: 'Claude Code / Codex CLI / Gemini CLI：命令行 AI 工具对比', category: 'AI 工具', date: '2024年02月15日' },
  { id: 'perf-grid-react', title: '优化海量数据网格的 React 渲染周期', category: '性能优化', date: '2023年10月24日' },
  { id: 'vue-xss-prevention', title: '强化 Vue.js 应用：防止用户生成内容中的 XSS 攻击', category: 'Web 安全', date: '2023年9月18日' },
];

const ArticleDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);

  const article = useMemo(() => {
    return ALL_ARTICLES.find(a => a.id === id) || ALL_ARTICLES[0];
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((winScroll / height) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-slate-200 dark:bg-slate-800">
        <div className="h-full bg-primary transition-all duration-100" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 lg:py-20 animate-in fade-in duration-500">
        <button 
          onClick={() => navigate('/articles')}
          className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-10 group font-bold text-sm"
        >
          <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
          返回技术列表
        </button>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">{article.category}</span>
            <span className="text-slate-400 text-xs font-bold">{article.date}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-8 tracking-tight">{article.title}</h1>
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <div className="size-12 rounded-full bg-slate-300 overflow-hidden border-2 border-white dark:border-slate-700 shadow-lg">
               <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeDkCgjbrtgqUm8LoVTgGBa4Qco20Hr8QfCYoe7Ov_nQlNtyavXYw0zqC7dzDGVMKT0mbJ7sq5tz3dgdaNgvuw5lfxqoEj5j-8QRa2WA2ZLsMVwf2Sn6chqDioaMhWXBxstyVaNHctv5cQcqN7RDGhHH8tQIlftiZsCjNDrbY5UKGBIMeXu-anbIzaacWFjQYwwVjrifP6azkOvedn3jJEp6I4IumXKpYw2KVGktPVvAOEo3AZk9Nl4XPbOLDNwWQHjOZ8k2h3iUGH" alt="Author" className="object-cover w-full h-full" />
            </div>
            <div>
              <p className="font-black text-sm">谢启铜</p>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Senior Frontend Engineer @ DevPortfolio</p>
            </div>
          </div>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
          <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-400 font-medium italic border-l-4 border-primary pl-6 py-2 bg-primary/5 rounded-r-xl">
            摘要：随着生成式 AI 的爆发，AI 编程工具已经从单纯的“补全插件”进化为深度集成、具备 Agent 能力的“智能工作站”。本文将带您深入了解该领域最前沿的工具链及其应用实践。
          </p>

          <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-12 mb-6 tracking-tight">核心能力剖析</h2>
          <p>
            无论是基于 <strong>Antigravity</strong> 架构的 Gemini 3 Pro 实践，还是 <strong>Cursor</strong> 的原生体验，核心都在于对代码上下文（Context）的极致利用。
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
               <span className="material-symbols-outlined text-primary text-3xl mb-3">psychology</span>
               <h3 className="font-bold mb-2">深度推理能力</h3>
               <p className="text-sm text-slate-500">基于最新大模型（如 Qwen-Coder / Claude 3.5）实现的复杂逻辑纠错。</p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
               <span className="material-symbols-outlined text-primary text-3xl mb-3">auto_fix_high</span>
               <h3 className="font-bold mb-2">代理式协作</h3>
               <p className="text-sm text-slate-500">如 Windsurf 所展示的，AI 能够跨文件自主完成重构任务。</p>
            </div>
          </div>

          <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-12 mb-6 tracking-tight">实践建议</h2>
          <p>
            对于前端开发者，建议优先尝试 <strong>Cursor</strong> 与 <strong>字节 Trae</strong> 进行日常业务开发，同时利用 <strong>CLI 工具（如 Claude Code）</strong> 进行快速的脚本编写与代码审查。
          </p>

          <div className="p-10 bg-slate-900 text-white rounded-3xl mt-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10"><span className="material-symbols-outlined text-9xl">tips_and_updates</span></div>
            <h3 className="text-2xl font-bold mb-4 relative z-10">写在最后</h3>
            <p className="text-slate-400 leading-relaxed relative z-10">
              AI 并不会取代开发者，但那些熟练使用 AI 工具（如本文提到的 Qder, Augment, Windsurf 等）的开发者，必将拥有前所未有的生产力。欢迎关注我的后续更新，深入探索每一项工具的实操案例。
            </p>
          </div>
        </div>

        <footer className="mt-24 pt-10 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex gap-6">
              <button className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold text-sm">
                <span className="material-symbols-outlined text-[20px]">thumb_up</span> 
                <span>赞同 48</span>
              </button>
              <button className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold text-sm">
                <span className="material-symbols-outlined text-[20px]">bookmark</span>
                <span>收藏</span>
              </button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">分享至:</span>
              <div className="flex gap-2">
                <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition-all"><span className="material-symbols-outlined text-[18px]">share</span></div>
                <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition-all"><span className="material-symbols-outlined text-[18px]">content_copy</span></div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ArticleDetail;
