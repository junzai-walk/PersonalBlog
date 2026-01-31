
import React, { useState } from 'react';
import { API_BASE_URL } from '../api/config';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    company: '',
    subject: '合作咨询',
    message: '' 
  });
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', company: '', subject: '合作咨询', message: '' });
        setTimeout(() => {
          onClose();
          setStatus('idle');
        }, 2000);
      } else {
        setStatus('error');
        setErrorMessage(result.message || '提交失败，请稍后重试');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setStatus('error');
      setErrorMessage('网络错误，请检查连接后重试');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-card-dark w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">合作联络</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {status === 'success' ? (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="size-16 bg-easy/20 text-easy rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-4xl">check_circle</span>
              </div>
              <h3 className="text-xl font-bold mb-2">已成功发送！</h3>
              <p className="text-slate-500">感谢您的来信，我会尽快回复。</p>
            </div>
          ) : status === 'error' ? (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="size-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-4xl">error</span>
              </div>
              <h3 className="text-xl font-bold mb-2">提交失败</h3>
              <p className="text-slate-500">{errorMessage}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500">您的姓名 *</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary transition-all outline-none"
                  placeholder="张先生/女士"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500">电子邮箱 *</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary transition-all outline-none"
                  placeholder="email@example.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500">联系电话</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary transition-all outline-none"
                    placeholder="可选"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500">公司名称</label>
                  <input 
                    type="text" 
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary transition-all outline-none"
                    placeholder="可选"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500">咨询主题</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary transition-all outline-none"
                >
                  <option value="合作咨询">合作咨询</option>
                  <option value="项目开发">项目开发</option>
                  <option value="技术交流">技术交流</option>
                  <option value="其他">其他</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500">您的留言 *</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary transition-all outline-none resize-none"
                  placeholder="描述您的项目或合作想法..."
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
              >
                {status === 'sending' ? (
                  <>
                    <span className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>发送中...</span>
                  </>
                ) : (
                  <>发送信息 <span className="material-symbols-outlined">send</span></>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
