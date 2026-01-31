/**
 * 个人博客网站后端API服务
 * 技术栈：Node.js + Express + MySQL
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// 导入路由
const homeRoutes = require('./routes/home');
const projectRoutes = require('./routes/projects');
const articleRoutes = require('./routes/articles');
const leetcodeRoutes = require('./routes/leetcode');
const aboutRoutes = require('./routes/about');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件配置
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件服务 - 用于访问上传的文件
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API 路由
app.use('/api/home', homeRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/leetcode', leetcodeRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/contact', contactRoutes);

// 健康检查接口
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: '服务运行正常',
    timestamp: new Date().toISOString()
  });
});

// 全局错误处理
app.use((err, req, res, next) => {
  console.error('服务器错误:', err);
  res.status(500).json({
    success: false,
    message: '服务器内部错误',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: '接口不存在'
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`
  ================================================
  🚀 后端API服务已启动
  📡 监听端口: ${PORT}
  🌐 健康检查: http://localhost:${PORT}/api/health
  ================================================
  `);
});

module.exports = app;
