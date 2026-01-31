
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../types';
import ProjectModal from '../components/ProjectModal';
import { getProjects, createProject, updateProject, deleteProject } from '../api/projects';

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState('全部');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await getProjects({ category: filter === '全部' ? undefined : filter });
      setProjects(data as any);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [filter]);

  const categories = ['全部', 'Web Development', 'UI/UX Design', 'Vue3', 'Vue2', 'Nuxt.js', 'React', '微信小程序', 'H5移动应用', 'Three.js', 'Node.js'];

  const handleSaveProject = async (project: Project) => {
    try {
      if (editingProject) {
        await updateProject(project.id, project);
      } else {
        await createProject(project);
      }
      fetchProjects();
      setEditingProject(null);
    } catch (error) {
      console.error('Failed to save project:', error);
    }
  };

  const handleDeleteProject = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('确定要删除这个项目吗？')) {
      try {
        await deleteProject(id);
        fetchProjects();
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    }
  };

  const handleEditProject = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const filteredProjects = projects; // 后端已经过滤了


  return (
    <div className="max-w-[1200px] mx-auto w-full px-6 py-12">
      <div className="flex flex-col items-center text-center mb-16 relative">
        <span className="px-3 py-1 text-xs font-bold tracking-widest uppercase bg-primary/10 text-primary rounded-full mb-4">2024 项目作品集</span>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-2xl">为 Web 打造的工程化解决方案</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
          专注于高性能 Web 应用、前端架构设计以及复杂数据可视化系统的全方位展示。
        </p>
        
        <button 
          onClick={() => {
            setEditingProject(null);
            setIsModalOpen(true);
          }}
          className="mt-8 flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined">add</span>
          新增项目
        </button>
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                 <button 
                  onClick={(e) => handleEditProject(e, p)}
                  className="p-2 bg-white/20 backdrop-blur-md rounded-lg text-white font-bold border border-white/20 hover:bg-white/30 transition-colors"
                >
                  <span className="material-symbols-outlined">edit</span>
                </button>
                <button 
                  onClick={(e) => handleDeleteProject(e, p.id)}
                  className="p-2 bg-red-500/50 backdrop-blur-md rounded-lg text-white font-bold border border-white/20 hover:bg-red-500/70 transition-colors"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
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
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors uppercase">{p.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                {p.description}
              </p>
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                了解更多 <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProjectModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setEditingProject(null);
        }} 
        onSave={handleSaveProject} 
        editingProject={editingProject}
      />
    </div>
  );
};

export default Projects;
