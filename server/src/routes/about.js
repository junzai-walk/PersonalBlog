/**
 * 关于页面相关路由
 * - 职业生涯 CRUD
 * - 街舞生活媒体上传/替换/删除
 * - 简历上传
 */

const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { uploadMedia, uploadResume } = require('../config/upload');
const fs = require('fs');
const path = require('path');

// ==================== 职业生涯 CRUD ====================

/**
 * 获取职业生涯列表
 * GET /api/about/timeline
 */
router.get('/timeline', async (req, res) => {
  try {
    const timeline = await db.query('SELECT * FROM career_timeline ORDER BY start_date DESC');
    res.json({ success: true, data: timeline });
  } catch (error) {
    res.status(500).json({ success: false, message: '获取职业生涯列表失败', error: error.message });
  }
});

/**
 * 添加职业生涯记录
 * POST /api/about/timeline
 */
router.post('/timeline', async (req, res) => {
  try {
    const { year, title, company, description } = req.body;

    if (!title || !company) {
      return res.status(400).json({ success: false, message: '职位和公司名称不能为空' });
    }

    const id = await db.insert(
      'INSERT INTO career_timeline (year, title, company, description) VALUES (?, ?, ?, ?)',
      [year, title, company, description]
    );

    res.status(201).json({ success: true, message: '职业记录添加成功', data: { id } });
  } catch (error) {
    res.status(500).json({ success: false, message: '添加职业记录失败', error: error.message });
  }
});

/**
 * 更新职业生涯记录
 * PUT /api/about/timeline/:id
 */
router.put('/timeline/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { year, title, company, description } = req.body;

    const affected = await db.update(
      'UPDATE career_timeline SET year = ?, title = ?, company = ?, description = ? WHERE id = ?',
      [year, title, company, description, id]
    );

    if (affected === 0) {
      return res.status(404).json({ success: false, message: '职业记录不存在' });
    }

    res.json({ success: true, message: '职业记录更新成功' });
  } catch (error) {
    res.status(500).json({ success: false, message: '更新职业记录失败', error: error.message });
  }
});

/**
 * 删除职业生涯记录
 * DELETE /api/about/timeline/:id
 */
router.delete('/timeline/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const affected = await db.remove('DELETE FROM career_timeline WHERE id = ?', [id]);

    if (affected === 0) {
      return res.status(404).json({ success: false, message: '职业记录不存在' });
    }

    res.json({ success: true, message: '职业记录删除成功' });
  } catch (error) {
    res.status(500).json({ success: false, message: '删除职业记录失败', error: error.message });
  }
});

// ==================== 街舞生活媒体管理 ====================

/**
 * 获取街舞媒体列表
 * GET /api/about/dance-media
 */
router.get('/dance-media', async (req, res) => {
  try {
    const media = await db.query('SELECT * FROM dance_media ORDER BY created_at DESC');
    res.json({ success: true, data: media });
  } catch (error) {
    res.status(500).json({ success: false, message: '获取媒体列表失败', error: error.message });
  }
});

/**
 * 上传街舞媒体（图片/视频）
 * POST /api/about/dance-media
 */
router.post('/dance-media', uploadMedia.single('media'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: '请选择要上传的文件' });
    }

    const { title, description } = req.body;
    const mediaUrl = `/uploads/media/${req.file.filename}`;
    const mediaType = req.file.mimetype.startsWith('video/') ? 'video' : 'image';

    const id = await db.insert(
      'INSERT INTO dance_media (title, description, url, type) VALUES (?, ?, ?, ?)',
      [title || '街舞生活', description || '', mediaUrl, mediaType]
    );

    res.status(201).json({
      success: true,
      message: '媒体上传成功',
      data: { id, url: mediaUrl, type: mediaType }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '媒体上传失败', error: error.message });
  }
});

/**
 * 替换街舞媒体
 * PUT /api/about/dance-media/:id
 */
router.put('/dance-media/:id', uploadMedia.single('media'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // 获取旧记录
    const existing = await db.query('SELECT * FROM dance_media WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: '媒体不存在' });
    }

    let mediaUrl = existing[0].url;
    let mediaType = existing[0].type;

    // 如果有新文件，删除旧文件并更新
    if (req.file) {
      // 删除旧文件
      if (existing[0].url && existing[0].url.startsWith('/uploads/')) {
        const oldPath = path.join(__dirname, '../../', existing[0].url);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      mediaUrl = `/uploads/media/${req.file.filename}`;
      mediaType = req.file.mimetype.startsWith('video/') ? 'video' : 'image';
    }

    await db.update(
      'UPDATE dance_media SET title = ?, description = ?, url = ?, type = ?, updated_at = NOW() WHERE id = ?',
      [title || existing[0].title, description || existing[0].description, mediaUrl, mediaType, id]
    );

    res.json({ success: true, message: '媒体更新成功', data: { url: mediaUrl, type: mediaType } });
  } catch (error) {
    res.status(500).json({ success: false, message: '媒体更新失败', error: error.message });
  }
});

/**
 * 删除街舞媒体
 * DELETE /api/about/dance-media/:id
 */
router.delete('/dance-media/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // 获取记录以删除文件
    const existing = await db.query('SELECT url FROM dance_media WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: '媒体不存在' });
    }

    // 删除文件
    if (existing[0].url && existing[0].url.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '../../', existing[0].url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await db.remove('DELETE FROM dance_media WHERE id = ?', [id]);

    res.json({ success: true, message: '媒体删除成功' });
  } catch (error) {
    res.status(500).json({ success: false, message: '删除媒体失败', error: error.message });
  }
});

// ==================== 简历上传 ====================

/**
 * 获取当前简历信息
 * GET /api/about/resume
 */
router.get('/resume', async (req, res) => {
  try {
    const result = await db.query('SELECT resume_url, resume_name, uploaded_at FROM profile WHERE id = 1');
    const resumeInfo = result.length > 0 ? {
      url: result[0].resume_url,
      name: result[0].resume_name,
      uploadedAt: result[0].uploaded_at
    } : null;
    res.json({ success: true, data: resumeInfo });
  } catch (error) {
    res.status(500).json({ success: false, message: '获取简历信息失败', error: error.message });
  }
});

/**
 * 上传简历
 * POST /api/about/resume
 */
router.post('/resume', uploadResume.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: '请选择要上传的简历文件' });
    }

    const resumeUrl = `/uploads/resumes/${req.file.filename}`;
    const resumeName = req.file.originalname;

    // 先检查是否存在记录
    const existing = await db.query('SELECT id, resume_url FROM profile WHERE id = 1');

    if (existing.length > 0) {
      // 删除旧简历文件
      if (existing[0].resume_url && existing[0].resume_url.startsWith('/uploads/')) {
        const oldPath = path.join(__dirname, '../../', existing[0].resume_url);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      // 更新简历
      await db.update(
        'UPDATE profile SET resume_url = ?, resume_name = ?, uploaded_at = NOW() WHERE id = 1',
        [resumeUrl, resumeName]
      );
    } else {
      // 创建新记录
      await db.insert(
        'INSERT INTO profile (id, resume_url, resume_name, uploaded_at) VALUES (1, ?, ?, NOW())',
        [resumeUrl, resumeName]
      );
    }

    res.json({
      success: true,
      message: '简历上传成功',
      data: { url: resumeUrl, name: resumeName }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '简历上传失败', error: error.message });
  }
});

module.exports = router;
