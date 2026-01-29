
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mocked details based on ID
  const project = {
    title: '智慧运维管理平台',
    category: 'Vue3 / WebSocket / 数据可视化',
    desc: '这是一款面向工业 4.0 的大规模设备监控系统。它能够实时采集数千个传感器的压力、温度和运行状态数据，并通过三维可视化界面直观地展示给运维人员。',
    features: [
      '实时数据流：利用 WebSocket 实现 50ms 以内的低延迟数据同步。',
      '三维孪生：基于 Three.js 构建工厂数字孪生模型，支持点击交互定位故障。',
      '智能预警：基于历史数据的异常检测算法，提前 2 小时发现潜在风险。'
    ],
    techStack: ['Vue 3.2', 'TypeScript', 'Pinia', 'Three.js', 'ECharts', 'Tailwind CSS'],
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAdtJlHBFl563CXp_m8SLK844okzZ9qcv87IjkOyUMLaqWNJ4Mf_3ZYWbqae4zn98HDR-sLxDvbWBp-z0lwmNC7d-nYPnjZ_A0M0AeF4J1TuO5WRDPplTGydN0vzudk8YE-fYE3k1FaOEP-g9ybn8m6vmfLoA3iRcSKRrxLZeuagKjDvvT6Gbjsf-ljBWJMdW_zT1-is6tx8jqNc8IhEUzFz03MdRufegPnvyOzSU6lWs85DJAA9J5LAXAr25TQXIOzmaEx6UJi_vnu'
    ]
  };

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-12 lg:py-20">
      <button 
        onClick={() => navigate('/projects')}
        className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-12 group"
      >
        <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
        返回作品集
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">{project.title}</h1>
            <p className="text-primary font-bold text-lg">{project.category}</p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">description</span> 项目概述
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-loose text-lg">
              {project.desc}
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">star</span> 核心功能
            </h2>
            <ul className="space-y-4">
              {project.features.map((f, i) => (
                <li key={i} className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <span className="material-symbols-outlined text-primary shrink-0">check_circle</span>
                  <span className="text-slate-600 dark:text-slate-300">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-10">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 aspect-video">
            <img src={project.images[0]} alt="Screenshot" className="w-full h-full object-cover" />
          </div>

          <div className="bg-slate-100 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold mb-6">技术栈</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map(tech => (
                <span key={tech} className="px-4 py-2 rounded-lg bg-white dark:bg-slate-800 text-sm font-bold shadow-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all">
              <span className="material-symbols-outlined">launch</span> 在线演示
            </button>
            <button className="flex-1 py-4 bg-slate-200 dark:bg-slate-800 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all">
              <span className="material-symbols-outlined">code</span> 查看源码
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
