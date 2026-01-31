import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArticles, type Article } from '../api/articles';

const Articles: React.FC = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [filter, setFilter] = useState('全部文章');
  const [searchQuery, setSearchQuery] = useState('');
  const [limit, setLimit] = useState(4);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async (isLoadMore = false) => {
    setLoading(true);
    try {
      const res = await getArticles({
        category: filter === '全部文章' ? undefined : filter,
        search: searchQuery || undefined,
        limit,
        offset: isLoadMore ? articles.length : 0
      });
      if (isLoadMore) {
        setArticles(prev => [...prev, ...res.data]);
      } else {
        setArticles(res.data);
      }
      setTotal(res.pagination.total);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setOffset(0); // Reset offset when filter or search changes
    setArticles([]); // Clear articles to show loading state for new search/filter
    fetchArticles();
  }, [filter, searchQuery]);

  const hasMore = articles.length < total;


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
                  onClick={() => { setFilter(cat); }}
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
            {loading && articles.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-20 animate-pulse text-slate-400">
                  <span className="material-symbols-outlined text-6xl mb-4">loading</span>
                  <p>内容加载中...</p>
               </div>
            ) : articles.length > 0 ? (
              articles.map((art, idx) => (
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
                       <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> {art.reading_time}</span>
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
                  onClick={() => fetchArticles(true)}
                  disabled={loading}
                  className="px-10 py-4 rounded-xl bg-primary text-white font-bold hover:bg-blue-600 transition-all shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-50"
                >
                  {loading ? '加载中...' : '加载更多内容'}
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
