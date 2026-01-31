
import React, { useState, useEffect } from 'react';
import { Project } from '../types';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
  editingProject?: Project | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, onSave, editingProject }) => {
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    category: 'Vue3',
    tags: [],
    description: '',
    image: '',
    video_url: '',
    project_url: '',
    source_url: '',
    features: [],
    techStack: [],
    long_description: ''
  });

  const [tagInput, setTagInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    if (editingProject) {
      setFormData(editingProject);
    } else {
      setFormData({
        title: '',
        category: 'Vue3',
        tags: [],
        description: '',
        image: '',
        video_url: '',
        project_url: '',
        source_url: '',
        features: [],
        techStack: [],
        long_description: ''
      });
    }
  }, [editingProject, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'image' | 'video_url') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = (field: 'tags' | 'features' | 'techStack', value: string, setter: (v: string) => void) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] || []), value.trim()]
      }));
      setter('');
    }
  };

  const removeItem = (field: 'tags' | 'features' | 'techStack', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] || []).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: editingProject?.id || Date.now().toString(),
    } as Project);
    onClose();
  };

  const categories = ['Vue3', 'Vue2', 'Nuxt.js', 'React', '微信小程序', 'H5移动应用', 'Three.js', 'Node.js'];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="bg-white dark:bg-[#1a2131] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white dark:bg-[#1a2131] z-10 px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{editingProject ? '编辑项目' : '新增项目'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 dark:text-slate-400">项目名称</label>
              <input
                required
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="例如：公司官网"
                className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 dark:text-slate-400">项目分类</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary outline-none transition-all font-medium"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500 dark:text-slate-400">简短描述</label>
            <textarea
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={2}
              placeholder="一句话介绍项目核心价值..."
              className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary outline-none transition-all font-medium resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500 dark:text-slate-400">详细介绍</label>
            <textarea
              name="long_description"
              value={formData.long_description}
              onChange={handleChange}
              rows={4}
              placeholder="详细描述项目背景、解决方案、技术细节等..."
              className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary outline-none transition-all font-medium resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 dark:text-slate-400">项目封面 (图片地址或上传)</label>
              <div className="flex gap-2">
                <input
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="flex-1 h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary outline-none transition-all"
                />
                <label className="h-12 w-12 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl cursor-pointer hover:bg-slate-200 transition-colors">
                  <span className="material-symbols-outlined">upload_file</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'image')} />
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 dark:text-slate-400">项目视频 (视频地址或上传)</label>
              <div className="flex gap-2">
                <input
                  name="video_url"
                  value={formData.video_url}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="flex-1 h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary outline-none transition-all"
                />
                <label className="h-12 w-12 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl cursor-pointer hover:bg-slate-200 transition-colors">
                  <span className="material-symbols-outlined">video_file</span>
                  <input type="file" accept="video/*" className="hidden" onChange={(e) => handleFileUpload(e, 'video_url')} />
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 dark:text-slate-400">在线演示地址</label>
              <input
                name="project_url"
                value={formData.project_url}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 dark:text-slate-400">源码地址</label>
              <input
                name="source_url"
                value={formData.source_url}
                onChange={handleChange}
                placeholder="https://github.com/..."
                className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-4">
            {/* Tags Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 dark:text-slate-400">技术标签</label>
              <div className="flex gap-2">
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('tags', tagInput, setTagInput))}
                  placeholder="回车确认"
                  className="flex-1 h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary outline-none transition-all"
                />
                <button type="button" onClick={() => addItem('tags', tagInput, setTagInput)} className="px-6 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold">添加</button>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {formData.tags?.map((tag, i) => (
                  <span key={i} className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-lg group">
                    {tag}
                    <button type="button" onClick={() => removeItem('tags', i)} className="hover:text-red-500">
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Features Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 dark:text-slate-400">核心功能</label>
              <div className="flex gap-2">
                <input
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('features', featureInput, setFeatureInput))}
                  placeholder="列出项目亮点..."
                  className="flex-1 h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary outline-none transition-all"
                />
                <button type="button" onClick={() => addItem('features', featureInput, setFeatureInput)} className="px-6 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold">添加</button>
              </div>
              <div className="space-y-2 pt-2 text-sm">
                {formData.features?.map((f, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 group">
                    <span className="text-slate-600 dark:text-slate-300">{f}</span>
                    <button type="button" onClick={() => removeItem('features', i)} className="text-slate-400 hover:text-red-500">
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 dark:text-slate-400">完整技术栈</label>
              <div className="flex gap-2">
                <input
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('techStack', techInput, setTechInput))}
                  placeholder="Vue 3, TypeScript, etc."
                  className="flex-1 h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-primary outline-none transition-all"
                />
                <button type="button" onClick={() => addItem('techStack', techInput, setTechInput)} className="px-6 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold">添加</button>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {formData.techStack?.map((t, i) => (
                  <span key={i} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold flex items-center gap-2">
                    {t}
                    <button type="button" onClick={() => removeItem('techStack', i)} className="hover:text-red-500">
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4 sticky bottom-0 bg-white dark:bg-[#1a2131] py-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-14 rounded-2xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 h-14 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-blue-600 active:scale-[0.98] transition-all"
            >
              {editingProject ? '保存修改' : '立即发布'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
