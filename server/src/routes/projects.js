/**
 * 项目相关路由
 * - 项目 CRUD (支持字符串 ID)
 */

const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

/**
 * 获取所有项目
 * GET /api/projects
 */
router.get('/', async (req, res) => {
  try {
    const { category, search, limit, offset = 0 } = req.query;
    let sql = 'SELECT * FROM projects WHERE 1=1';
    const params = [];

    if (category && category !== '全部') {
      sql += ' AND (category = ? OR JSON_CONTAINS(tags, JSON_QUOTE(?)))';
      params.push(category, category);
    }

    if (search) {
      sql += ' AND (title LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    sql += ' ORDER BY created_at DESC';

    if (limit) {
      sql += ' LIMIT ? OFFSET ?';
      params.push(parseInt(limit), parseInt(offset));
    }

    const projects = await db.query(sql, params);

    // 解析 JSON 字段
    const formattedProjects = projects.map(p => ({
      ...p,
      tags: JSON.parse(p.tags || '[]'),
      features: JSON.parse(p.features || '[]'),
      techStack: JSON.parse(p.tech_stack || '[]')
    }));

    res.json({ success: true, data: formattedProjects });
  } catch (error) {
    res.status(500).json({ success: false, message: '获取项目列表失败', error: error.message });
  }
});

/**
 * 获取单个项目详情
 * GET /api/projects/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const projects = await db.query('SELECT * FROM projects WHERE id = ?', [id]);

    if (projects.length === 0) {
      return res.status(404).json({ success: false, message: '项目不存在' });
    }

    const project = projects[0];
    const formattedProject = {
      ...project,
      tags: JSON.parse(project.tags || '[]'),
      features: JSON.parse(project.features || '[]'),
      techStack: JSON.parse(project.tech_stack || '[]')
    };

    res.json({ success: true, data: formattedProject });
  } catch (error) {
    res.status(500).json({ success: false, message: '获取项目详情失败', error: error.message });
  }
});

/**
 * 创建新项目
 * POST /api/projects
 */
router.post('/', async (req, res) => {
  try {
    const {
      id, title, category, tags = [], description, image,
      video_url, project_url, source_url, features = [], tech_stack = [], long_description
    } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: '项目标题不能为空' });
    }

    // 使用传入的 ID 或生成新的 UUID
    const projectId = id || uuidv4();

    // 检查 ID 是否重复
    const existing = await db.query('SELECT id FROM projects WHERE id = ?', [projectId]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: `项目 ID '${projectId}' 已存在` });
    }

    await db.insert(
      `INSERT INTO projects 
        (id, title, category, tags, description, image, video_url, project_url, source_url, features, tech_stack, long_description) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        projectId,
        title,
        category,
        JSON.stringify(tags),
        description,
        image,
        video_url || null,
        project_url || null,
        source_url || null,
        JSON.stringify(features),
        JSON.stringify(tech_stack),
        long_description || null
      ]
    );

    res.status(201).json({ success: true, message: '项目创建成功', data: { id: projectId } });
  } catch (error) {
    res.status(500).json({ success: false, message: '创建项目失败', error: error.message });
  }
});

/**
 * 更新项目
 * PUT /api/projects/:id
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title, category, tags, description, image,
      video_url, project_url, source_url, features, tech_stack, long_description
    } = req.body;

    const affected = await db.update(
      `UPDATE projects SET 
        title = ?, category = ?, tags = ?, description = ?, image = ?,
        video_url = ?, project_url = ?, source_url = ?, features = ?, tech_stack = ?, 
        long_description = ?, updated_at = NOW()
       WHERE id = ?`,
      [
        title,
        category,
        JSON.stringify(tags || []),
        description,
        image,
        video_url || null,
        project_url || null,
        source_url || null,
        JSON.stringify(features || []),
        JSON.stringify(tech_stack || []),
        long_description || null,
        id
      ]
    );

    if (affected === 0) {
      return res.status(404).json({ success: false, message: '项目不存在' });
    }

    res.json({ success: true, message: '项目更新成功' });
  } catch (error) {
    res.status(500).json({ success: false, message: '更新项目失败', error: error.message });
  }
});

/**
 * 删除项目
 * DELETE /api/projects/:id
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // 兼容字符串 ID，直接删除
    const affected = await db.remove('DELETE FROM projects WHERE id = ?', [id]);

    if (affected === 0) {
      return res.status(404).json({ success: false, message: '项目不存在' });
    }

    res.json({ success: true, message: '项目删除成功' });
  } catch (error) {
    res.status(500).json({ success: false, message: '删除项目失败', error: error.message });
  }
});

module.exports = router;
