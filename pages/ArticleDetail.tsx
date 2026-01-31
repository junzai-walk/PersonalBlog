import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleDetail, type Article } from '../api/articles';

const ArticleDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await getArticleDetail(id);
        setArticle(data);
      } catch (error) {
        console.error('Failed to fetch article detail:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
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

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center animate-pulse">
        <p className="text-slate-400">正在加载文章内容...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">文章不存在</h1>
        <button onClick={() => navigate('/articles')} className="text-primary font-bold">返回列表</button>
      </div>
    );
  }

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

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed text-lg mb-16">
          <div className="whitespace-pre-wrap">
            {article.content}
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
