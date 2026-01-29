
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ArticlePublish: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('前端');
  const [tags, setTags] = useState<string[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const categories = ['前端', '后端', 'AI 工具', '性能优化', '移动端', '生活随笔'];
  const commonTags = ['React', 'Vue', 'TypeScript', 'Gemini', 'Cursor', 'Node.js', '架构'];

  // Auto-save logic
  useEffect(() => {
    const saved = localStorage.getItem('article_draft');
    if (saved) {
      const { title: t, content: c } = JSON.parse(saved);
      setTitle(t);
      setContent(c);
    }
  }, []);

  useEffect(() => {
    if (title || content) {
      setSaveStatus('saving');
      const timer = setTimeout(() => {
        localStorage.setItem('article_draft', JSON.stringify({ title, content }));
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [title, content]);

  const handlePublish = () => {
    if (!title || !content) {
      alert('请填写标题和内容后再发布');
      return;
    }
    setIsPublishing(true);
    // Simulate API call
    setTimeout(() => {
      localStorage.removeItem('article_draft');
      setIsPublishing(false);
      alert('发布成功！即将跳转至文章列表。');
      navigate('/articles');
    }, 2000);
  };

  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag));
    } else {
      if (tags.length < 3) setTags([...tags, tag]);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white dark:bg-background-dark flex flex-col overflow-hidden transition-colors duration-300">
      {/* Top Header */}
      <header className="h-16 px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-background-dark/80 backdrop-blur-md">
        <div className="flex items-center gap-4 flex-1">
          <button onClick={() => navigate('/articles')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <input 
            type="text" 
            placeholder="输入文章标题..." 
            className="bg-transparent border-none text-xl font-bold w-full focus:ring-0 placeholder:text-slate-300 dark:placeholder:text-slate-600 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-widest">
            {saveStatus === 'saving' ? (
              <span className="flex items-center gap-1"><span className="size-2 bg-amber-500 rounded-full animate-pulse"></span> 自动保存中...</span>
            ) : saveStatus === 'saved' ? (
              <span className="flex items-center gap-1 text-emerald-500"><span className="material-symbols-outlined text-[14px]">done</span> 已存至草稿箱</span>
            ) : (
              <span>草稿箱已更新</span>
            )}
          </div>
          
          <button 
            onClick={() => setShowConfig(true)}
            className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-blue-600 transition-all shadow-lg shadow-primary/20 active:scale-95 text-sm"
          >
            发布
          </button>
          
          <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden border border-slate-300 dark:border-slate-700">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeDkCgjbrtgqUm8LoVTgGBa4Qco20Hr8QfCYoe7Ov_nQlNtyavXYw0zqC7dzDGVMKT0mbJ7sq5tz3dgdaNgvuw5lfxqoEj5j-8QRa2WA2ZLsMVwf2Sn6chqDioaMhWXBxstyVaNHctv5cQcqN7RDGhHH8tQIlftiZsCjNDrbY5UKGBIMeXu-anbIzaacWFjQYwwVjrifP6azkOvedn3jJEp6I4IumXKpYw2KVGktPVvAOEo3AZk9Nl4XPbOLDNwWQHjOZ8k2h3iUGH" alt="Avatar" />
          </div>
        </div>
      </header>

      {/* Main Editor Area */}
      <main className="flex-1 flex overflow-hidden">
        {/* Editor Left */}
        <div className="flex-1 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50 dark:bg-background-dark">
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 text-slate-400">
             <span className="material-symbols-outlined text-[20px] cursor-pointer hover:text-primary">image</span>
             <span className="material-symbols-outlined text-[20px] cursor-pointer hover:text-primary">link</span>
             <span className="material-symbols-outlined text-[20px] cursor-pointer hover:text-primary">format_bold</span>
             <span className="material-symbols-outlined text-[20px] cursor-pointer hover:text-primary">format_italic</span>
             <span className="material-symbols-outlined text-[20px] cursor-pointer hover:text-primary">code</span>
             <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>
             <span className="text-[10px] font-bold uppercase">Markdown 编辑模式</span>
          </div>
          <textarea 
            ref={textareaRef}
            className="flex-1 w-full bg-transparent border-none p-8 focus:ring-0 font-mono text-base leading-relaxed resize-none placeholder:text-slate-300 dark:placeholder:text-slate-700 overflow-y-auto scroll-smooth"
            placeholder="写下你的技术洞察吧..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        {/* Preview Right */}
        <div className="hidden lg:flex flex-1 flex-col bg-white dark:bg-background-dark">
          <div className="flex items-center px-6 py-2 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 text-slate-400">
             <span className="text-[10px] font-bold uppercase">实时预览</span>
          </div>
          <div className="flex-1 p-8 overflow-y-auto prose prose-slate dark:prose-invert max-w-none">
             {title && <h1 className="text-4xl font-black mb-8">{title}</h1>}
             {content ? (
               <div dangerouslySetInnerHTML={{ 
                 __html: content
                   .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
                   .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>')
                   .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>')
                   .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
                   .replace(/\*(.*)\*/gim, '<em>$1</em>')
                   .replace(/!\[(.*?)\]\((.*?)\)/gim, '<img src="$2" alt="$1" class="rounded-xl shadow-lg my-6" />')
                   .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" class="text-primary hover:underline">$1</a>')
                   .replace(/`(.*?)`/gim, '<code class="bg-slate-100 dark:bg-slate-800 px-1 rounded text-primary">$1</code>')
                   .replace(/\n/g, '<br />')
               }} />
             ) : (
               <div className="flex flex-col items-center justify-center h-full text-slate-300 dark:text-slate-700 select-none">
                 <span className="material-symbols-outlined text-6xl mb-4">preview</span>
                 <p className="font-bold">内容预览区域</p>
               </div>
             )}
          </div>
        </div>
      </main>

      {/* Publish Config Modal */}
      {showConfig && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowConfig(false)}></div>
          <div className="relative bg-white dark:bg-card-dark w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-8">发布设置</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-3 uppercase tracking-widest">分类</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                          category === cat ? 'bg-primary text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-3 uppercase tracking-widest">添加标签 (最多3个)</label>
                  <div className="flex flex-wrap gap-2">
                    {commonTags.map(tag => (
                      <button 
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 text-xs font-bold rounded border transition-all ${
                          tags.includes(tag) 
                            ? 'border-primary text-primary bg-primary/5' 
                            : 'border-slate-200 dark:border-slate-800 text-slate-400'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-12">
                <button 
                  onClick={() => setShowConfig(false)}
                  className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 font-bold rounded-xl"
                >
                  取消
                </button>
                <button 
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className="flex-1 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-blue-600 flex items-center justify-center gap-2"
                >
                  {isPublishing ? (
                    <span className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : '确认发布'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticlePublish;
