
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Terminal from '../components/Terminal';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState<string>("https://lh3.googleusercontent.com/aida-public/AB6AXuBeDkCgjbrtgqUm8LoVTgGBa4Qco20Hr8QfCYoe7Ov_nQlNtyavXYw0zqC7dzDGVMKT0mbJ7sq5tz3dgdaNgvuw5lfxqoEj5j-8QRa2WA2ZLsMVwf2Sn6chqDioaMhWXBxstyVaNHctv5cQcqN7RDGhHH8tQIlftiZsCjNDrbY5UKGBIMeXu-anbIzaacWFjQYwwVjrifP6azkOvedn3jJEp6I4IumXKpYw2KVGktPVvAOEo3AZk9Nl4XPbOLDNwWQHjOZ8k2h3iUGH");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) setProfilePic(event.target.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const skills = [
    { name: 'React', icon: 'code', color: 'text-blue-500' },
    { name: 'Vue 3', icon: 'data_object', color: 'text-emerald-500' },
    { name: 'TypeScript', icon: 'terminal', color: 'text-blue-600' },
    { name: 'Vite', icon: 'bolt', color: 'text-amber-500' },
    { name: 'Next.js', icon: 'layers', color: 'text-slate-900 dark:text-white' },
    { name: 'Tailwind', icon: 'brush', color: 'text-sky-400' },
    { name: 'Node.js', icon: 'database', color: 'text-green-600' },
    { name: 'Three.js', icon: 'view_in_ar', color: 'text-indigo-500' },
    { name: 'GraphQL', icon: 'hub', color: 'text-pink-500' },
    { name: 'Docker', icon: 'container', color: 'text-blue-400' }
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[1100px] px-6 py-12 md:py-24">
        <div className="flex flex-col gap-10 md:flex-row items-center">
          <div className="flex flex-col gap-8 flex-1">
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-primary text-xs font-bold uppercase tracking-wider">诚邀合作</span>
              </div>
              <h1 className="text-slate-900 dark:text-white text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                Web 前端 <br />
                <span className="text-primary">开发工程师.</span>
              </h1>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-slate-500 dark:text-slate-400 font-medium italic">// 谢启铜</span>
                <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-2"></div>
                <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-tighter">中共党员</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-lg leading-relaxed">
                精通 Vue 与 React 双生态，擅长构建复杂数据可视化、人工智能交互及高性能企业级应用。
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => navigate('/projects')}
                className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-primary text-white text-base font-bold transition-all hover:bg-blue-700 shadow-xl shadow-primary/30 active:scale-95"
              >
                查看项目
              </button>
              <button 
                onClick={() => navigate('/articles')}
                className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-slate-200 dark:bg-[#232f48] text-slate-900 dark:text-white text-base font-bold transition-all hover:bg-slate-300 dark:hover:bg-[#2c3b5a] active:scale-95"
              >
                阅读博客
              </button>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 border border-primary/20 rounded-2xl pointer-events-none group-hover:border-primary/40 transition-colors"></div>
            <div className="w-72 h-72 md:w-96 md:h-96 bg-slate-300 dark:bg-[#1a2333] rounded-2xl overflow-hidden shadow-2xl relative border-4 border-white dark:border-slate-800">
              <img 
                src={profilePic} 
                alt="Professional headshot" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white text-primary px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform"
                >
                  <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                  更换照片
                </button>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoChange} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Skills */}
      <div className="w-full max-w-[1100px] px-6 mb-24">
        <h3 className="text-center text-slate-400 font-bold uppercase tracking-[0.2em] text-xs mb-10">我的技能宇宙 / TECH STACK</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {skills.map((skill) => (
            <div key={skill.name} className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white dark:bg-[#1a2333] border border-slate-100 dark:border-slate-800 hover:border-primary/40 transition-all hover:-translate-y-1 shadow-sm hover:shadow-xl group">
              <span className={`material-symbols-outlined text-4xl ${skill.color} group-hover:scale-110 transition-transform`}>{skill.icon}</span>
              <p className="text-slate-700 dark:text-white text-sm font-bold">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Terminal Feature */}
      <div className="w-full max-w-[1100px] px-6 mb-24">
         <div className="flex items-center gap-3 mb-8">
            <span className="material-symbols-outlined text-primary">terminal</span>
            <h2 className="text-2xl font-bold">交互终端 / Interactive CLI</h2>
         </div>
         <Terminal />
      </div>

      {/* Recent Activities */}
      <div className="w-full max-w-[1100px] px-6 mb-24 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <h2 className="text-slate-900 dark:text-white text-2xl font-bold mb-8 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">history</span> 最近活动
          </h2>
          <div className="grid grid-cols-[40px_1fr] gap-x-4">
            {[
              { title: '发布文章：高级 React 性能优化模式', date: '2023-11-15 • 博客文章', icon: 'article', desc: '深入探讨企业级应用中的 Memoization、虚拟列表滚动以及高效的组件拆分方案。' },
              { title: '开源发布：FlexiGrid-UI 框架', date: '2023-11-02 • GitHub', icon: 'commit', desc: '提交了 v1.0.4 版本，该布局库具有零运行时 CSS 开销的特性。' },
              { title: '加入 Tech Frontier 技术社区', date: '2023-10-20 • 开发者社区', icon: 'groups', desc: '参与每月一次的架构设计圆桌会议，与业内专家共同探讨前沿技术。' }
            ].map((item, idx, arr) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-xl">{item.icon}</span>
                  </div>
                  {idx !== arr.length - 1 && <div className="w-[2px] bg-slate-200 dark:bg-[#324467] grow my-2"></div>}
                </div>
                <div className={`flex flex-1 flex-col ${idx !== arr.length - 1 ? 'pb-10' : ''}`}>
                  <p className="text-slate-900 dark:text-white text-lg font-bold">{item.title}</p>
                  <p className="text-slate-500 dark:text-[#92a4c9] text-sm mt-1">{item.date}</p>
                  <p className="text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">{item.desc}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-slate-900 dark:text-white text-2xl font-bold mb-8 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">newsmode</span> 新闻动态
          </h2>
          <div className="bg-slate-100 dark:bg-[#1a2333] border border-slate-200 dark:border-[#232f48] rounded-xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform text-primary">
              <span className="material-symbols-outlined text-6xl">rss_feed</span>
            </div>
            <span className="text-primary font-bold text-xs uppercase tracking-widest mb-4 block">今日聚焦</span>
            <h3 className="text-xl font-bold dark:text-white mb-4 leading-snug">2024 前端开发路线图：核心学习指南</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
              个人对不断演进的前端生态的看法，以及为什么 Bun 和 Rust 工具链正在改变行业规则。
            </p>
            <button className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:underline">
              阅读详情 <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
