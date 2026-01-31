/**
 * 联系我相关路由
 * - 合作联络保存入库
 */

const express = require('express');
const router = express.Router();
const db = require('../config/database');

/**
 * 提交合作联络信息
 * POST /api/contact
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, company, subject, message } = req.body;

    // 验证必填字段
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: '姓名、邮箱和留言内容为必填项'
      });
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: '请输入有效的邮箱地址'
      });
    }

    const id = await db.insert(
      `INSERT INTO contact_messages (name, email, phone, company, subject, message) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, email, phone || null, company || null, subject || '合作咨询', message]
    );

    res.status(201).json({
      success: true,
      message: '感谢您的留言，我会尽快回复您！',
      data: { id }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '提交失败，请稍后重试', error: error.message });
  }
});

/**
 * 获取联络信息列表（管理用）
 * GET /api/contact
 */
router.get('/', async (req, res) => {
  try {
    const { status, limit = 20, offset = 0 } = req.query;
    let sql = 'SELECT * FROM contact_messages WHERE 1=1';
    const params = [];

    if (status) {
      sql += ' AND status = ?';
      params.push(status);
    }

    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const messages = await db.query(sql, params);

    // 获取总数
    const countResult = await db.query('SELECT COUNT(*) as total FROM contact_messages');
    const total = countResult[0].total;

    res.json({
      success: true,
      data: messages,
      pagination: { total, limit: parseInt(limit), offset: parseInt(offset) }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: '获取联络列表失败', error: error.message });
  }
});

/**
 * 更新联络信息状态
 * PUT /api/contact/:id/status
 */
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // pending, replied, archived

    const affected = await db.update(
      'UPDATE contact_messages SET status = ?, updated_at = NOW() WHERE id = ?',
      [status, id]
    );

    if (affected === 0) {
      return res.status(404).json({ success: false, message: '联络信息不存在' });
    }

    res.json({ success: true, message: '状态更新成功' });
  } catch (error) {
    res.status(500).json({ success: false, message: '更新状态失败', error: error.message });
  }
});

/**
 * 删除联络信息
 * DELETE /api/contact/:id
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const affected = await db.remove('DELETE FROM contact_messages WHERE id = ?', [id]);

    if (affected === 0) {
      return res.status(404).json({ success: false, message: '联络信息不存在' });
    }

    res.json({ success: true, message: '删除成功' });
  } catch (error) {
    res.status(500).json({ success: false, message: '删除失败', error: error.message });
  }
});

module.exports = router;
