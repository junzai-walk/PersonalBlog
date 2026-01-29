
import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import ArticlePublish from './pages/ArticlePublish';
import LeetCode from './pages/LeetCode';
import About from './pages/About';
import ContactModal from './components/ContactModal';
import AIChat from './components/AIChat';
import autofit from 'autofit.js';

const Header = ({ onContactOpen, theme, toggleTheme }: { onContactOpen: () => void, theme: string, toggleTheme: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: '首页', path: '/' },
    { name: '项目', path: '/projects' },
    { name: '文章', path: '/articles' },
    { name: '刷题', path: '/leetcode' },
    { name: '关于', path: '/about' },
  ];

  // Hide header on publish page for immersive experience
  if (location.pathname === '/publish') return null;

  return (
    <header className={`flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-[#232f48] px-6 lg:px-40 py-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50 transition-all ${scrolled ? 'py-3' : 'py-4'}`}>
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
        <div className="size-8 bg-primary rounded flex items-center justify-center text-white">
          <span className="material-symbols-outlined text-xl">terminal</span>
        </div>
        <h2 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">DevPortfolio</h2>
      </div>
      <div className="flex flex-1 justify-end gap-6 items-center">
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? 'text-primary' : 'text-slate-600 dark:text-slate-300'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/publish')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 transition-colors text-sm font-bold"
          >
            <span className="material-symbols-outlined text-[18px]">edit_note</span>
            写文章
          </button>
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
          >
            <span className="material-symbols-outlined">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
          </button>
          <button 
            onClick={onContactOpen}
            className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold transition-transform active:scale-95 shadow-lg shadow-primary/20 hover:bg-blue-600"
          >
            联系我
          </button>
        </div>
      </div>
    </header>
  );
};

const Footer = ({ onContactOpen }: { onContactOpen: () => void }) => {
  const location = useLocation();
  if (location.pathname === '/publish') return null;

  return (
    <footer className="border-t border-slate-200 dark:border-[#232f48] py-12 px-6 lg:px-40 bg-slate-50 dark:bg-background-dark/50">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">terminal</span>
            <span className="font-bold text-lg dark:text-white">谢启铜</span>
          </div>
          <p className="text-slate-500 text-sm">© 2024 • 用心构建每一个像素</p>
        </div>
        <div className="flex gap-6">
          <button onClick={onContactOpen} className="text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-2xl">alternate_email</span>
          </button>
          <a className="text-slate-400 hover:text-primary transition-colors" href="#">
            <svg className="size-6 fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    autofit.init({
      dh: 1080,
      dw: 1920,
      el: '#root',
      resize: true,
      allowScroll: true
    });
  }, []);

  return (
    <div className={`relative min-h-screen overflow-x-hidden flex flex-col font-sans transition-colors duration-500`}>
      <div className="absolute inset-0 grid-pattern pointer-events-none opacity-20 dark:opacity-40"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] gradient-blur pointer-events-none opacity-30 dark:opacity-100"></div>
      
      <ScrollToTop />
      <Header onContactOpen={() => setIsContactModalOpen(true)} theme={theme} toggleTheme={toggleTheme} />
      
      <main className="flex-grow z-10 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
          <Route path="/publish" element={<ArticlePublish />} />
          <Route path="/leetcode" element={<LeetCode />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      
      <Footer onContactOpen={() => setIsContactModalOpen(true)} />
      
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      <AIChat />
    </div>
  );
};

export default App;
