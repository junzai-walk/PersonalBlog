USE blog;

-- 清空现有数据（可选，为了确保脚本可重复运行）
-- SET FOREIGN_KEY_CHECKS = 0;
-- TRUNCATE TABLE skills;
-- TRUNCATE TABLE activities;
-- TRUNCATE TABLE projects;
-- TRUNCATE TABLE articles;
-- TRUNCATE TABLE leetcode_problems;
-- TRUNCATE TABLE career_timeline;
-- TRUNCATE TABLE dance_media;
-- SET FOREIGN_KEY_CHECKS = 1;

-- 1. 个人资料 (Profile) - 更新默认记录
UPDATE profile SET 
  avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=JunZai',
  resume_url = 'https://example.com/resume.pdf',
  resume_name = '谢启铜_前端开发工程师_简历.pdf',
  uploaded_at = NOW()
WHERE id = 1;

-- 2. 技能表 (Skills)
INSERT IGNORE INTO skills (name, icon, color, sort_order) VALUES 
('Vue.js', 'v-icon-vue', 'text-emerald-500', 1),
('React', 'v-icon-react', 'text-blue-400', 2),
('TypeScript', 'v-icon-typescript', 'text-blue-600', 3),
('Node.js', 'v-icon-nodejs', 'text-green-600', 4),
('MySQL', 'v-icon-mysql', 'text-blue-800', 5),
('Tailwind CSS', 'v-icon-tailwind', 'text-cyan-400', 6),
('Vite', 'v-icon-vite', 'text-purple-500', 7),
('Three.js', 'v-icon-threejs', 'text-white', 8);

-- 3. 最近活动 (Activities)
INSERT IGNORE INTO activities (title, date, type, icon, description) VALUES 
('发布开源项目 V-UI', '2026-01-30', 'Project', 'v-icon-github', '发布了一个基于 Vue 3 + TS 的组件库'),
('发表技术博客', '2026-01-25', 'Blog', 'v-icon-article', '深入解构 Vue 3 响应式原理'),
('LeetCode 每日一题', '2026-01-20', 'Code', 'v-icon-leetcode', '连续打卡 30 天，解题量突破 500'),
('完成街舞工作室网站', '2026-01-15', 'Client', 'v-icon-web', '为南京某街舞工作室开发了官方展示网站');

-- 4. 项目表 (Projects)
INSERT IGNORE INTO projects (id, title, category, tags, description, image, video_url, project_url, source_url, features, tech_stack, long_description) VALUES 
('personal-portfolio', '个人作品集网站', 'Web Development', 
 '["Vue 3", "Three.js", "TailwindCSS"]', 
 '使用 Vue 3 和 Three.js 构建的极具现代感的个人作品集网站。', 
 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97', 
 NULL, 'https://portfolio.example.com', 'https://github.com/junzai/portfolio',
 '["响应式设计", "3D 交互背景", "动态技能展示", "多语言支持"]',
 '["Vue 3", "Vite", "Three.js", "GSAP", "MySQL"]',
 '这是一个完整的个人品牌展示平台，前端使用最新的 Vue 3 技术栈，结合 Three.js 实现炫酷的 3D 背景，后端采用 Node.js 提供 API 支持。'),

('smart-home-dashboard', '智能家居控制版面', 'UI/UX Design', 
 '["React", "Framer Motion", "IoT"]', 
 '一个直观的物联网家居管理系统界面。', 
 'https://images.unsplash.com/photo-1558002038-1033186869b0', 
 NULL, NULL, 'https://github.com/junzai/smart-home',
 '["暗色/亮色模式切换", "实时传感器数据", "设备控制逻辑"]',
 '["React", "Next.js", "Chart.js", "Socket.io"]',
 '该项目专注于极致的用户体验，通过 WebSocket 实现设备状态的实时同步，界面流畅度极高。');

-- 5. 文章表 (Articles)
INSERT IGNORE INTO articles (id, title, excerpt, content, date, reading_time, category, tags) VALUES 
('vue3-reactivity-deep-dive', '深入理解 Vue 3 响应式系统', 
 '本文将带你从零实现一个微型的 Vue 3 响应式系统，理解 Proxy 的妙用。', 
 '# 深入解析 Vue 3 响应式\n\nVue 3 引入了基于 Proxy 的响应式系统，解决了 Vue 2 中 Object.defineProperty 的诸多局限...\n\n## Proxy 的优势\n1. 可以监听对象属性的添加和删除\n2. 可以监听数组索引的变化...', 
 '2026-01-20', '15 min', 'Frontend', '["Vue.js", "JavaScript", "Reactivity"]'),

('mastering-threejs-basics', 'Three.js 零基础入门指南', 
 '想在网页上实现酷炫的 3D 效果？这篇文章是你最好的起点。', 
 '# Three.js 入门\n\nThree.js 是目前最流行的 WebGL 库之一。它大大简化了在浏览器中创建 3D 场景的难度...\n\n## 核心概念\n- 场景 (Scene)\n- 相机 (Camera)\n- 渲染器 (Renderer)', 
 '2026-01-10', '20 min', 'Graphics', '["Three.js", "WebGL", "Frontend"]');

-- 6. 刷题统计 (LeetCode Stats) - 更新默认记录
UPDATE leetcode_stats SET 
  total_solved = 524,
  accuracy = '95.8%',
  streak_days = 21,
  global_rank = 12500,
  weekly_solved = 15
WHERE id = 1;

-- 7. 刷题记录 (LeetCode Problems)
INSERT IGNORE INTO leetcode_problems (problem_id, title, difficulty, tags, url) VALUES 
(1, 'Two Sum', 'Easy', '["Array", "Hash Table"]', 'https://leetcode.com/problems/two-sum/'),
(3, 'Longest Substring Without Repeating Characters', 'Medium', '["String", "Sliding Window"]', 'https://leetcode.com/problems/longest-substring-without-repeating-characters/'),
(42, 'Trapping Rain Water', 'Hard', '["Array", "Two Pointers", "Stack"]', 'https://leetcode.com/problems/trapping-rain-water/');

-- 8. 职业生涯 (Career Timeline)
INSERT IGNORE INTO career_timeline (year, title, company, description, start_date) VALUES 
('2025 - Now', '前端开发工程师', '南京凯奥思数据技术有限公司', '负责核心业务系统的开发与维护，主导前端架构升级。', '2025-01-01'),
('2023 - 2024', '初级前端开发', '某科技创新工作室', '参与多个外包项目的开发，积累了丰富的 React 与 Vue 实战经验。', '2023-06-15');

-- 9. 街舞生活媒体 (Dance Media)
INSERT IGNORE INTO dance_media (title, description, url, type) VALUES 
('南京年度 Breaking 比赛', '2025 年南京街舞大赛精彩瞬间', 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad', 'image'),
('基础风车教学', '分享一些 Breaking 基础动作的心得', 'https://www.w3schools.com/html/mov_bbb.mp4', 'video');

-- 10. 联系留言 (Contact Messages)
INSERT IGNORE INTO contact_messages (name, email, subject, message) VALUES 
('王经理', 'manager@company.com', '项目外包咨询', '你好，看到你的作品集非常赞，想咨询一下关于官网开发的合作。'),
('李同学', 'student@school.edu', '技术交流', '看了你的博客，关于 WebGL 那部分讲解得非常透彻，受教了！');
