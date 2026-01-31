/**
 * 文章相关路由
 * - 文章列表查询
 * - 文章详情 (支持字符串 ID)
 * - 发布/修改/删除文章
 */

const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { uploadArticleImage } = require('../config/upload');
const { v4: uuidv4 } = require('uuid');

/**
 * 获取文章列表
 */
router.get('/', async (req, res) => {
  try {
    const { category, search, limit = 10, offset = 0 } = req.query;
    let sql = 'SELECT id, title, excerpt, date, reading_time, category, tags, created_at FROM articles WHERE 1=1';
    const params = [];

    if (category && category !== '全部文章') {
      sql += ' AND category = ?';
      params.push(category);
    }

    if (search) {
      sql += ' AND (title LIKE ? OR excerpt LIKE ? OR content LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const articles = await db.query(sql, params);

    // 获取总数
    let countSql = 'SELECT COUNT(*) as total FROM articles WHERE 1=1';
    const countParams = [];

    if (category && category !== '全部文章') {
      countSql += ' AND category = ?';
      countParams.push(category);
    }
    if (search) {
      countSql += ' AND (title LIKE ? OR excerpt LIKE ? OR content LIKE ?)';
      countParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    const countResult = await db.query(countSql, countParams);
    const total = countResult[0].total;

    const formattedArticles = articles.map(a => ({
      ...a,
      tags: JSON.parse(a.tags || '[]')
    }));

    res.json({
      success: true,
      data: formattedArticles,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '获取文章列表失败', error: error.message });
  }
});

/**
 * 获取文章详情
 * GET /api/articles/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const articles = await db.query('SELECT * FROM articles WHERE id = ?', [id]);

    if (articles.length === 0) {
      return res.status(404).json({ success: false, message: '文章不存在' });
    }

    const article = articles[0];
    const formattedArticle = {
      ...article,
      tags: JSON.parse(article.tags || '[]')
    };

    // 更新阅读次数
    await db.update('UPDATE articles SET view_count = view_count + 1 WHERE id = ?', [id]);

    res.json({ success: true, data: formattedArticle });
  } catch (error) {
    res.status(500).json({ success: false, message: '获取文章详情失败', error: error.message });
  }
});

/**
 * 发布新文章
 * POST /api/articles
 */
router.post('/', async (req, res) => {
  try {
    const { id, title, excerpt, content, category, tags = [], reading_time } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: '文章标题和内容不能为空' });
    }

    const date = new Date().toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '年').replace(/年/, '年') + '日';

    // 使用传入的 ID 或生成新的 UUID
    const articleId = id || uuidv4();

    // 检查重复 ID
    const existing = await db.query('SELECT id FROM articles WHERE id = ?', [articleId]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: `文章 ID '${articleId}' 已存在` });
    }

    await db.insert(
      `INSERT INTO articles (id, title, excerpt, content, date, reading_time, category, tags) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [articleId, title, excerpt, content, date, reading_time || '5 分钟阅读', category || '未分类', JSON.stringify(tags)]
    );

    res.status(201).json({ success: true, message: '文章发布成功', data: { id: articleId } });
  } catch (error) {
    res.status(500).json({ success: false, message: '发布文章失败', error: error.message });
  }
});

/**
 * 上传文章图片
 */
router.post('/upload-image', uploadArticleImage.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: '请选择要上传的图片' });
    }

    const imageUrl = `/uploads/articles/${req.file.filename}`;
    res.json({ success: true, message: '图片上传成功', data: { url: imageUrl } });
  } catch (error) {
    res.status(500).json({ success: false, message: '图片上传失败', error: error.message });
  }
});

/**
 * 更新文章
 * PUT /api/articles/:id
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, category, tags, reading_time } = req.body;

    const affected = await db.update(
      `UPDATE articles SET 
        title = ?, excerpt = ?, content = ?, category = ?, tags = ?, reading_time = ?, updated_at = NOW()
       WHERE id = ?`,
      [title, excerpt, content, category, JSON.stringify(tags || []), reading_time, id]
    );

    if (affected === 0) {
      return res.status(404).json({ success: false, message: '文章不存在' });
    }

    res.json({ success: true, message: '文章更新成功' });
  } catch (error) {
    res.status(500).json({ success: false, message: '更新文章失败', error: error.message });
  }
});

/**
 * 删除文章
 * DELETE /api/articles/:id
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const affected = await db.remove('DELETE FROM articles WHERE id = ?', [id]);

    if (affected === 0) {
      return res.status(404).json({ success: false, message: '文章不存在' });
    }

    res.json({ success: true, message: '文章删除成功' });
  } catch (error) {
    res.status(500).json({ success: false, message: '删除文章失败', error: error.message });
  }
});

/**
 * 获取文章分类统计
 */
router.get('/stats/categories', async (req, res) => {
  try {
    const stats = await db.query(
      'SELECT category, COUNT(*) as count FROM articles GROUP BY category ORDER BY count DESC'
    );
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: '获取分类统计失败', error: error.message });
  }
});

module.exports = router;
