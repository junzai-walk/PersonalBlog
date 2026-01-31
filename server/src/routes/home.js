/**
 * 首页相关路由
 * - 最近活动列表
 * - 头像查询/替换
 * - 技能宇宙 CRUD
 */

const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { uploadAvatar } = require('../config/upload');
const fs = require('fs');
const path = require('path');

// ==================== 最近活动 ====================

/**
 * 获取最近活动列表
 * GET /api/home/activities
 */
router.get('/activities', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const activities = await db.query(
      `SELECT * FROM activities ORDER BY created_at DESC LIMIT ?`,
      [parseInt(limit)]
    );
    res.json({ success: true, data: activities });
  } catch (error) {
    res.status(500).json({ success: false, message: '获取活动列表失败', error: error.message });
  }
});

// ==================== 头像管理 ====================

/**
 * 获取当前头像
 * GET /api/home/avatar
 */
router.get('/avatar', async (req, res) => {
  try {
    const result = await db.query('SELECT avatar_url FROM profile WHERE id = 1');
    const avatarUrl = result.length > 0 ? result[0].avatar_url : null;
    res.json({ success: true, data: { avatarUrl } });
  } catch (error) {
    res.status(500).json({ success: false, message: '获取头像失败', error: error.message });
  }
});

/**
 * 上传/替换头像
 * POST /api/home/avatar
 */
router.post('/avatar', uploadAvatar.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: '请选择要上传的头像' });
    }

    const avatarUrl = `/uploads/avatars/${req.file.filename}`;

    // 先检查是否存在记录
    const existing = await db.query('SELECT id, avatar_url FROM profile WHERE id = 1');

    if (existing.length > 0) {
      // 删除旧头像文件
      if (existing[0].avatar_url && existing[0].avatar_url.startsWith('/uploads/')) {
        const oldPath = path.join(__dirname, '../../', existing[0].avatar_url);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      // 更新头像
      await db.update('UPDATE profile SET avatar_url = ?, updated_at = NOW() WHERE id = 1', [avatarUrl]);
    } else {
      // 创建新记录
      await db.insert('INSERT INTO profile (id, avatar_url) VALUES (1, ?)', [avatarUrl]);
    }

    res.json({ success: true, message: '头像更新成功', data: { avatarUrl } });
  } catch (error) {
    res.status(500).json({ success: false, message: '头像上传失败', error: error.message });
  }
});

// ==================== 技能宇宙 CRUD ====================

/**
 * 获取所有技能
 * GET /api/home/skills
 */
router.get('/skills', async (req, res) => {
  try {
    const skills = await db.query('SELECT * FROM skills ORDER BY sort_order ASC');
    res.json({ success: true, data: skills });
  } catch (error) {
    res.status(500).json({ success: false, message: '获取技能列表失败', error: error.message });
  }
});

/**
 * 添加技能
 * POST /api/home/skills
 */
router.post('/skills', async (req, res) => {
  try {
    const { name, icon, color, sort_order = 0 } = req.body;

    if (!name || !icon) {
      return res.status(400).json({ success: false, message: '技能名称和图标不能为空' });
    }

    const id = await db.insert(
      'INSERT INTO skills (name, icon, color, sort_order) VALUES (?, ?, ?, ?)',
      [name, icon, color || 'text-blue-500', sort_order]
    );

    res.json({ success: true, message: '技能添加成功', data: { id, name, icon, color, sort_order } });
  } catch (error) {
    res.status(500).json({ success: false, message: '添加技能失败', error: error.message });
  }
});

/**
 * 更新技能
 * PUT /api/home/skills/:id
 */
router.put('/skills/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, icon, color, sort_order } = req.body;

    const affected = await db.update(
      'UPDATE skills SET name = ?, icon = ?, color = ?, sort_order = ? WHERE id = ?',
      [name, icon, color, sort_order, id]
    );

    if (affected === 0) {
      return res.status(404).json({ success: false, message: '技能不存在' });
    }

    res.json({ success: true, message: '技能更新成功' });
  } catch (error) {
    res.status(500).json({ success: false, message: '更新技能失败', error: error.message });
  }
});

/**
 * 删除技能
 * DELETE /api/home/skills/:id
 */
router.delete('/skills/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const affected = await db.remove('DELETE FROM skills WHERE id = ?', [id]);

    if (affected === 0) {
      return res.status(404).json({ success: false, message: '技能不存在' });
    }

    res.json({ success: true, message: '技能删除成功' });
  } catch (error) {
    res.status(500).json({ success: false, message: '删除技能失败', error: error.message });
  }
});

module.exports = router;
