import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Project } from '../types';
import { getProjectDetail } from '../api/projects';

const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await getProjectDetail(id);
        setProject(data as any);
      } catch (error) {
        console.error('Failed to fetch project detail:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-[1100px] mx-auto px-6 py-20 text-center animate-pulse">
        <p className="text-slate-400">正在加载项目详情...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-[1100px] mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">项目不存在</h1>
        <button onClick={() => navigate('/projects')} className="text-primary font-bold">返回作品集</button>
      </div>
    );
  }

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
            <span className="px-3 py-1 text-xs font-bold tracking-widest uppercase bg-primary/10 text-primary rounded-full mb-4 inline-block">
              {project.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase">{project.title}</h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
              {project.description}
            </p>
          </div>

          {project.long_description && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">description</span> 项目背景
              </h2>
              <div className="text-slate-600 dark:text-slate-400 leading-loose text-lg whitespace-pre-wrap">
                {project.long_description}
              </div>
            </div>
          )}

          {project.features && project.features.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">star</span> 核心功能
              </h2>
              <ul className="grid grid-cols-1 gap-4">
                {project.features.map((f, i) => (
                  <li key={i} className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <span className="material-symbols-outlined text-primary shrink-0">check_circle</span>
                    <span className="text-slate-600 dark:text-slate-300 font-medium">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="space-y-10">
          <div className="space-y-6">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 aspect-video bg-black flex items-center justify-center">
              {project.video_url ? (
                <video 
                  src={project.video_url} 
                  controls 
                  className="w-full h-full object-contain"
                  poster={project.image}
                />
              ) : (
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              )}
            </div>
            
            {project.video_url && project.image && (
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-400 uppercase mb-2">项目截图</p>
                <img src={project.image} alt="Thumbnail" className="w-32 aspect-video object-cover rounded-lg border border-slate-200 dark:border-slate-700" />
              </div>
            )}
          </div>

          {project.techStack && project.techStack.length > 0 && (
            <div className="bg-slate-100 dark:bg-[#1a2131] rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">terminal</span> 技术栈
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(tech => (
                  <span key={tech} className="px-4 py-2 rounded-lg bg-white dark:bg-slate-800 text-sm font-bold shadow-sm border border-slate-100 dark:border-slate-700">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            {project.project_url && (
              <a 
                href={project.project_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-primary/20"
              >
                <span className="material-symbols-outlined">launch</span> 在线演示
              </a>
            )}
            {project.source_url && (
              <a 
                href={project.source_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 py-4 bg-slate-200 dark:bg-slate-800 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all font-bold"
              >
                <span className="material-symbols-outlined">code</span> 查看源码
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
