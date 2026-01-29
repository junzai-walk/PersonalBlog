
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('全部');

  const categories = ['全部', 'Vue3', 'React', 'TypeScript', 'Three.js'];
  
  const projects = [
    {
      id: 'company-official',
      title: '公司官网',
      category: 'Vue3',
      tags: ['Vue3', 'Tailwind', 'SEO'],
      desc: '具备高性能响应式设计的官方网站，针对 Core Web Vitals 深度优化，支持国际化内容交付。',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzGKFw8DY1EFtoCU_zn-lq6fjIrIEhLO5SDCFHTWM3gWPi5QwIw4bnGSGLBtbpaM3L1i-PlAbdFB83VGGiRWKThwtdMByCvIjo6Gz_M3A77gPPcaRNL7C9_LQ3ND7o1Y2vIjC1Cggo5DInG5_KYjxp0jxOGQ6VG8Ug_w6ifEGLwjUuBWLZtE5xNjYgQwA25KuRmlsAayyLRA3RwXGEwmkzsg0iqZgJpAUnFc7kXHQDUodBR95loOduYGo_41HBmQPQPFHQLFfZzEbm',
    },
    {
      id: 'data-hub',
      title: '数据中台',
      category: 'React',
      tags: ['React', 'ECharts', 'Redux'],
      desc: '企业级数据可视化看板，集成实时状态管理系统与高度自定义的分析组件库。',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcr4yDxgFSLOvRu7XxZo4U9uBY00zTcB7jUbY0RFUB5-6-WoaZfFA2KFMFUvAkF1TwF0yqIUuBLqCERPb8nOM0HM6AmDul4oiLImyWBvRai0XwROhqKwWW1EHj93BJbjXkEwYY-dugu5w9bSNreEDs1FvMiv2dVIOctfGL7wfWel97zmBGsjfBElS1b-oN3gsZx7abhja2D44v3mA7gXaspcWSJE7JndWrEjaLQ8Pp9y05iEZCTdrryGye7vrroCC2Zjzmkqzw-Yj-',
    },
    {
      id: 'smart-ops',
      title: '智慧运维',
      category: 'Vue3',
      tags: ['Vue3', 'WebSocket', 'SCSS'],
      desc: '工业级运维监控平台，利用 WebSocket 技术实现数据的零延迟实时更新与预警。',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdtJlHBFl563CXp_m8SLK844okzZ9qcv87IjkOyUMLaqWNJ4Mf_3ZYWbqae4zn98HDR-sLxDvbWBp-z0lwmNC7d-nYPnjZ_A0M0AeF4J1TuO5WRDPplTGydN0vzudk8YE-fYE3k1FaOEP-g9ybn8m6vmfLoA3iRcSKRrxLZeuagKjDvvT6Gbjsf-ljBWJMdW_zT1-is6tx8jqNc8IhEUzFz03MdRufegPnvyOzSU6lWs85DJAA9J5LAXAr25TQXIOzmaEx6UJi_vnu',
    },
    {
      id: 'boss-3d',
      title: 'Boss3D 平台',
      category: 'Three.js',
      tags: ['Three.js', 'WebGL', 'TypeScript'],
      desc: '先进的 WebGL 可视化平台，用于建筑效果渲染和交互式 3D 模型操控。',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkeOGFjl0YtcQ8E4qkK09iZsALDj4r0x5MaGsEWTrsG5uw5myN9t1dwU1zbX3y6LNK-AJlD7V-isBCNmHc7dJcgEbExvBj8ozEXxydzbyJ2Kl_9-KkE6Eiv-o0EB1-1O72kPKQRhtOXWEHGsE4d-pKLdvMXhnt29r9dtMnXYQ4LUofb87dobOfoqh2SIIzO6YQ8HyDBkw9DnJtxx782It6CzBAzuUBZ5CPHiU5AAlbgGBjasFm4za1MkVg6gptm4marhD0r3RajtA4',
    }
  ];

  const filteredProjects = filter === '全部' 
    ? projects 
    : projects.filter(p => p.category === filter || p.tags.includes(filter));

  return (
    <div className="max-w-[1200px] mx-auto w-full px-6 py-12">
      <div className="flex flex-col items-center text-center mb-16">
        <span className="px-3 py-1 text-xs font-bold tracking-widest uppercase bg-primary/10 text-primary rounded-full mb-4">2024 项目作品集</span>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-2xl">为 Web 打造的工程化解决方案</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
          专注于高性能 Web 应用、前端架构设计以及复杂数据可视化系统的全方位展示。
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`flex h-10 items-center justify-center gap-x-2 rounded-xl px-6 transition-all ${
              filter === cat 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'bg-slate-200 dark:bg-[#232f48] hover:bg-slate-300 dark:hover:bg-[#2d3b5a] text-slate-700 dark:text-slate-300'
            }`}
          >
            <span className="text-sm font-semibold">{cat === '全部' ? '全部项目' : cat}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((p, i) => (
          <div 
            key={p.id} 
            onClick={() => navigate(`/projects/${p.id}`)}
            className="group relative flex flex-col bg-white dark:bg-[#1a2131] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5 cursor-pointer animate-in fade-in zoom-in duration-500"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="relative w-full aspect-video overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg text-white font-bold border border-white/20">查看详情</span>
              </div>
              <img 
                src={p.image} 
                alt={p.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                {p.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-500 rounded border border-slate-200 dark:border-slate-700">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                {p.desc}
              </p>
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                了解更多 <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
