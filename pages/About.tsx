import React, { useState, useEffect } from 'react';
import { getTimeline, getDanceMedia, getResume, type TimelineItem, type DanceMedia, type ResumeInfo } from '../api/about';
import { API_BASE_URL, UPLOAD_BASE_URL } from '../api/config';

const About: React.FC = () => {
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [danceMedia, setDanceMedia] = useState<DanceMedia[]>([]);
  const [resume, setResume] = useState<ResumeInfo | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tl, dm, rs] = await Promise.all([
          getTimeline(),
          getDanceMedia(),
          getResume()
        ]);
        setTimeline(tl);
        setDanceMedia(dm);
        setResume(rs);
      } catch (error) {
        console.error('Failed to fetch about data:', error);
      }
    };
    fetchData();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadStatus('uploading');
      setProgress(30);
      
      const formData = new FormData();
      formData.append('resume', file);

      try {
        const response = await fetch(`${API_BASE_URL}/about/resume`, {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();
        
        if (result.success) {
          setProgress(100);
          setUploadStatus('success');
          setResume(result.data);
          setTimeout(() => setUploadStatus('idle'), 3000);
        } else {
          alert('上传失败: ' + result.message);
          setUploadStatus('idle');
        }
      } catch (error) {
        console.error('Resume upload error:', error);
        setUploadStatus('idle');
      }
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-12">
      <div className="mb-12">
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-[-0.033em]">关于我与生活</h1>
          <p className="text-slate-500 dark:text-[#92a4c9] text-lg max-w-2xl font-normal leading-normal">
            平衡严谨的代码与自由的律动。
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-10">
          <section>
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">history_edu</span>
              <h2 className="text-2xl font-bold">职业生涯 / Timeline</h2>
            </div>
            <div className="relative pl-6 border-l-2 border-slate-100 dark:border-slate-800 space-y-10">
              {timeline.map((item, i) => (
                <div key={i} className="relative">
                   <div className="absolute -left-[31px] top-1.5 size-4 rounded-full bg-primary border-4 border-background-light dark:border-background-dark shadow-[0_0_10px_rgba(19,91,236,0.5)]"></div>
                   <p className="text-xs font-bold text-primary mb-1 uppercase tracking-widest">{item.year}</p>
                   <h3 className="text-lg font-bold">{item.title}</h3>
                   <p className="text-slate-500 text-sm mb-2">{item.company}</p>
                   <p className="text-slate-400 text-sm italic">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">upload_file</span>
              <h2 className="text-2xl font-bold">资料共享</h2>
            </div>
            <div className="p-8 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex flex-col items-center text-center group hover:border-primary/50 transition-all">
              {uploadStatus === 'idle' ? (
                <>
                  <div className="size-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-3xl">cloud_upload</span>
                  </div>
                  <h3 className="font-bold mb-1">{resume ? '更新您的简历' : '上传您的简历'}</h3>
                  {resume && (
                    <div className="mb-4 text-xs text-slate-400">
                      当前文件: <a href={`${UPLOAD_BASE_URL}${resume.url}`} target="_blank" className="text-primary hover:underline">{resume.name}</a>
                    </div>
                  )}
                  <label className="cursor-pointer bg-primary text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg shadow-primary/20 hover:bg-blue-600 transition-colors">
                    {resume ? '重新选择' : '选择文件'}
                    <input type="file" className="hidden" onChange={handleFileUpload} />
                  </label>
                </>
              ) : uploadStatus === 'uploading' ? (
                <div className="w-full space-y-4 py-8 px-4">
                   <p className="text-sm font-bold text-slate-500 mb-2">文件处理中...</p>
                   <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }}></div>
                   </div>
                </div>
              ) : (
                <div className="py-8">
                  <span className="material-symbols-outlined text-4xl text-easy mb-2">check_circle</span>
                  <p className="font-bold text-easy">上传成功！</p>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="lg:col-span-7 space-y-12">
          <section>
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-pink-500">psychology</span>
              <h2 className="text-2xl font-bold">性格特质</h2>
            </div>
            <div className="bg-white dark:bg-[#192233] p-8 rounded-xl border border-slate-200 dark:border-[#232f48]">
              <h3 className="text-xl font-bold mb-4">“一半 i 一半 e” 的性格光谱</h3>
              <p className="text-slate-500 dark:text-[#92a4c9] mb-8 leading-relaxed">
                在编写代码时，我是深度的 i 人；而在音乐响起时，我的 e 人属性便会觉醒。
              </p>
              <div className="relative pt-1">
                <div className="overflow-hidden h-3 mb-4 flex rounded-full bg-slate-100 dark:bg-slate-800">
                   <div style={{ width: '50%' }} className="bg-primary shadow-[0_0_15px_rgba(19,91,236,0.5)]"></div>
                   <div style={{ width: '50%' }} className="bg-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.5)]"></div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">audiotrack</span>
              <h2 className="text-2xl font-bold">街舞生活</h2>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {danceMedia.length > 0 ? (
                danceMedia.map((media) => (
                  <div key={media.id} className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-2xl group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity"></div>
                    {media.type === 'video' ? (
                      <video src={`${UPLOAD_BASE_URL}${media.url}`} className="w-full h-full object-cover" controls />
                    ) : (
                      <img 
                        src={`${UPLOAD_BASE_URL}${media.url}`} 
                        alt={media.title} 
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute bottom-0 left-0 p-6 z-20">
                      <h3 className="text-white text-2xl font-bold">{media.title}</h3>
                      <p className="text-white/70 text-sm mt-2">{media.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                   <p className="text-slate-400">暂无媒体内容</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
