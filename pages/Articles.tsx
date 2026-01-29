
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const ALL_ARTICLES = [
  {
    id: 'antigravity-gemini-3pro',
    title: 'Antigravity 与 Gemini 3 Pro：下一代多模态推理架构实践',
    excerpt: '深度解析 Antigravity 如何利用 Gemini 3 Pro 的长上下文能力，构建具备毫秒级响应的智能前端代理系统。',
    date: '2024年03月20日',
    time: '15 分钟阅读',
    category: 'AI 工具',
    tags: ['#Gemini3', '#Antigravity', '#LLM']
  },
  {
    id: 'cursor-ide-deep-dive',
    title: 'Cursor：为什么它是目前最懂前端工程师的 AI 原生 IDE',
    excerpt: '从 Composer 模式到代码索引库，探讨 Cursor 如何在 VSCode 基础上重塑编码工作流。',
    date: '2024年03月15日',
    time: '10 分钟阅读',
    category: 'AI 工具',
    tags: ['#Cursor', '#IDE', '#Efficiency']
  },
  {
    id: 'augment-vscode-plugin',
    title: 'VSCode 插件 Augment：深度集成的高性能代码补全方案',
    excerpt: 'Augment 带来的不仅仅是补全，更是基于项目全量代码理解的上下文感知，实测优于 Copilot 的体验。',
    date: '2024年03月10日',
    time: '8 分钟阅读',
    category: 'AI 工具',
    tags: ['#Augment', '#VSCode', '#AI']
  },
  {
    id: 'alibaba-qwen-coder',
    title: '阿里 Qwen-Coder (Qder)：大规模开源编程模型的进化与实战',
    excerpt: '国产最强编程模型 Qwen-Coder 深度测评，如何在中大型 React 项目中实现高效的代码生成与重构。',
    date: '2024年03月05日',
    time: '12 分钟阅读',
    category: 'AI 工具',
    tags: ['#Qwen', '#Alibaba', '#OpenSource']
  },
  {
    id: 'bytedance-trae-preview',
    title: '字节跳动 Trae：自适应全场景 AI 协作开发环境初探',
    excerpt: 'Trae 如何通过字节内部海量代码库训练，实现在复杂业务逻辑下的精准代码建议与自动化测试生成。',
    date: '2024年02月28日',
    time: '14 分钟阅读',
    category: 'AI 工具',
    tags: ['#Trae', '#Bytedance', '#DevTools']
  },
  {
    id: 'windsurf-agent-ide',
    title: 'Windsurf：Codeium 推出的首个代理式（Agentic）IDE 深度体验',
    excerpt: '解析 Windsurf 的 Multi-file Editing 能力，看 Agent 如何自主完成跨文件的代码重构任务。',
    date: '2024年02月20日',
    time: '16 分钟阅读',
    category: 'AI 工具',
    tags: ['#Windsurf', '#Codeium', '#Agent']
  },
  {
    id: 'ai-cli-comparison',
    title: 'Claude Code / Codex CLI / Gemini CLI：命令行 AI 工具对比',
    excerpt: '告别图形界面，对比三大主流 CLI 工具在终端环境下的文件操作、代码解释及自动化脚本编写能力。',
    date: '2024年02月15日',
    time: '9 分钟阅读',
    category: 'AI 工具',
    tags: ['#Claude', '#Codex', '#CLI']
  },
  {
    id: 'perf-grid-react',
    title: '优化海量数据网格的 React 渲染周期',
    excerpt: '深入分析虚拟化技术、Memoization 陷阱，以及在处理超过 10,000 行交互数据时的 DOM 协调过程。',
    date: '2023年10月24日',
    time: '12 分钟阅读',
    category: '性能优化',
    tags: ['#react', '#前端开发']
  },
  {
    id: 'vue-xss-prevention',
    title: '强化 Vue.js 应用：防止用户生成内容中的 XSS 攻击',
    excerpt: '探索消毒库和 Vue 内置功能，确保您的应用程序在面对现代跨站脚本攻击向量时依然稳固安全。',
    date: '2023年9月18日',
    time: '8 分钟阅读',
    category: 'Web 安全',
    tags: ['#vue', '#安全']
  },
  {
    id: 'ts-advanced-patterns',
    title: 'TypeScript 高级模式：超越基本接口定义',
    excerpt: '学习如何利用模版字符串类型、映射类型以及条件类型来构建强类型的企业级 API 客户端。',
    date: '2023年7月12日',
    time: '10 分钟阅读',
    category: '架构设计',
    tags: ['#typescript', '#架构']
  },
  {
    id: 'nextjs-14-rsc',
    title: 'Next.js 14 与 React Server Components 深度实践',
    excerpt: '全面解析 RSC 的加载策略，如何权衡服务器端与客户端组件，以及全新的数据获取范式。',
    date: '2023年6月30日',
    time: '18 分钟阅读',
    category: 'React / Vue',
    tags: ['#nextjs', '#react']
  }
];

const Articles: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('全部文章');
  const [visibleCount, setVisibleCount] = useState(4);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    return ALL_ARTICLES.filter(art => {
      const matchesFilter = filter === '全部文章' || art.category === filter;
      const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  const displayedArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-5xl font-black tracking-tighter mb-4">技术写作与洞察</h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">
              探索 AI 编程工具的前沿动态、React 生态系统的深度优化以及现代安全模式。
            </p>
          </div>

          <div className="flex flex-col gap-6 mb-10">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input 
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary outline-none transition-all" 
                placeholder="搜索 AI 工具、文章标题或关键字..." 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="border-b border-slate-200 dark:border-slate-800 flex gap-8 overflow-x-auto pb-px scrollbar-hide">
              {['全部文章', 'AI 工具', '性能优化', 'React / Vue', 'Web 安全', '架构设计'].map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => { setFilter(cat); setVisibleCount(4); }}
                  className={`pb-3 text-sm font-bold whitespace-nowrap transition-colors relative ${
                    filter === cat ? 'text-primary' : 'text-slate-500 hover:text-primary'
                  }`}
                >
                  {cat}
                  {filter === cat && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary animate-in fade-in slide-in-from-left-1 duration-300"></div>}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 min-h-[400px]">
            {displayedArticles.length > 0 ? (
              displayedArticles.map((art, idx) => (
                <article 
                  key={art.id} 
                  onClick={() => navigate(`/articles/${art.id}`)}
                  className="group p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span className={`px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-widest ${
                      art.category === 'AI 工具' 
                        ? 'bg-primary/20 text-primary border border-primary/30 animate-pulse' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}>
                      {art.category}
                    </span>
                    <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                       <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">calendar_today</span> {art.date}</span>
                       <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> {art.time}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                    {art.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-2 leading-relaxed text-sm">
                    {art.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {art.tags.map(t => (
                        <span key={t} className="text-[10px] bg-slate-50 dark:bg-slate-800/50 px-2 py-1 rounded text-slate-400 font-bold">{t}</span>
                      ))}
                    </div>
                    <div className="text-sm font-bold text-primary flex items-center gap-1 group/link">
                      阅读正文 
                      <span className="material-symbols-outlined transition-transform group-hover/link:translate-x-1 text-[18px]">arrow_right_alt</span>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <span className="material-symbols-outlined text-6xl mb-4">history_edu</span>
                <p className="font-bold">未找到与 "{searchQuery}" 相关的 AI 工具或文章</p>
              </div>
            )}
            
            {hasMore && (
              <div className="pt-8 flex justify-center">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 4)}
                  className="px-10 py-4 rounded-xl bg-primary text-white font-bold hover:bg-blue-600 transition-all shadow-xl shadow-primary/20 active:scale-95"
                >
                  加载更多内容
                </button>
              </div>
            )}
          </div>
        </div>

        <aside className="w-full lg:w-80 space-y-10">
          <div className="p-8 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
               <span className="material-symbols-outlined text-primary">trending_up</span>
               当前 AI 热点
            </h4>
            <div className="flex flex-col gap-5">
              {[
                { n: 'Cursor Composer 技巧', v: '2.4k' },
                { n: 'Gemini 3 Pro API 实操', v: '1.8k' },
                { n: '字节 Trae 体验分享', v: '1.2k' },
                { n: 'Agentic IDE 对比', v: '950' }
              ].map(h => (
                <div key={h.n} className="flex items-center justify-between group cursor-pointer">
                  <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors font-medium">#{h.n}</span>
                  <span className="text-[10px] bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full text-slate-500 font-bold">{h.v}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Articles;
