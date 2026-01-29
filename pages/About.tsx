
import React, { useState } from 'react';

const About: React.FC = () => {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [progress, setProgress] = useState(0);

  const timeline = [
    { 
      year: '2025.01 - 至今', 
      title: '前端开发工程师', 
      company: '南京凯奥思数据技术有限公司', 
      desc: '负责公司官网、数据中台、智慧运维及跨境电商购物网站的开发，涉及 Vue3+TS、Vue2、Nuxt 2.0 及 React+TS 等多种技术栈。' 
    },
    { 
      year: '2022.06 - 2024.08', 
      title: '前端开发工程师', 
      company: '南京烽火星空通信发展有限公司', 
      desc: '负责 Boss3D 数据可视化平台、AI 微信小程序及莞-e申报小程序。涉及大文件分片上传、WebSocket 通信、大模型调用及人脸识别等核心技术。' 
    },
    { 
      year: '2018 - 2022', 
      title: '学士学位 / 计算机相关专业', 
      company: '南京工程学院', 
      desc: '系统学习计算机基础知识，于 2022 年顺利毕业并获得学士学位。' 
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadStatus('uploading');
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setUploadStatus('success');
            setTimeout(() => setUploadStatus('idle'), 3000);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
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
                   <p className="text-slate-400 text-sm italic">{item.desc}</p>
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
                  <h3 className="font-bold mb-2">上传您的简历</h3>
                  <label className="cursor-pointer bg-primary text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg shadow-primary/20 hover:bg-blue-600 transition-colors">
                    选择文件
                    <input type="file" className="hidden" onChange={handleFileUpload} />
                  </label>
                </>
              ) : uploadStatus === 'uploading' ? (
                <div className="w-full space-y-4">
                   <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }}></div>
                   </div>
                </div>
              ) : (
                <p className="font-bold text-easy">上传成功！</p>
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
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4vyZvo3fvY2l9PMZT3N0Ey6nmO-phMz8VY3foCUw5HdeY2ucp1ejdkRoAbDPIZ8SLOSWGcwkZMQdSO1AYVQUGo6YXdK4Kft1NDCU8Qg0uMcBDj9PUf-DF2HnMTvUz5B0P4zCpPzacNsfazO6Rd6xw-VWbsriOeY4bQMR-qmL4Gp2T-8IiXzkNOBp6HbyLwZUfBdhi94azc3UTeOvROifYMJQBwwIK6pgoxm1OEJTVcLkB-y03jKuPY6LkRoYNBF4hvPZccXkCPdAO" 
                alt="Dance" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 p-6 z-20">
                <h3 className="text-white text-2xl font-bold">Popping & Hip-Hop</h3>
                <p className="text-white/70 text-sm mt-2">坚持热爱，在节拍中寻找灵感。</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
