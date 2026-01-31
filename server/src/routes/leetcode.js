/**
 * 刷题(LeetCode)相关路由
 * - 刷题记录查询
 * - 刷题记录修改
 */

const express = require('express');
const router = express.Router();
const db = require('../config/database');

/**
 * 获取刷题统计数据
 * GET /api/leetcode/stats
 */
router.get('/stats', async (req, res) => {
  try {
    const stats = await db.query('SELECT * FROM leetcode_stats WHERE id = 1');

    if (stats.length === 0) {
      return res.json({
        success: true,
        data: {
          total_solved: 0,
          accuracy: 0,
          streak_days: 0,
          global_rank: 0
        }
      });
    }

    res.json({ success: true, data: stats[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: '获取统计数据失败', error: error.message });
  }
});

/**
 * 更新刷题统计数据
 * PUT /api/leetcode/stats
 */
router.put('/stats', async (req, res) => {
  try {
    const { total_solved, accuracy, streak_days, global_rank, weekly_solved } = req.body;

    // 检查是否存在记录
    const existing = await db.query('SELECT id FROM leetcode_stats WHERE id = 1');

    if (existing.length > 0) {
      await db.update(
        `UPDATE leetcode_stats SET 
          total_solved = ?, accuracy = ?, streak_days = ?, global_rank = ?, weekly_solved = ?, updated_at = NOW()
         WHERE id = 1`,
        [total_solved, accuracy, streak_days, global_rank, weekly_solved || 0]
      );
    } else {
      await db.insert(
        `INSERT INTO leetcode_stats (id, total_solved, accuracy, streak_days, global_rank, weekly_solved) 
         VALUES (1, ?, ?, ?, ?, ?)`,
        [total_solved, accuracy, streak_days, global_rank, weekly_solved || 0]
      );
    }

    res.json({ success: true, message: '统计数据更新成功' });
  } catch (error) {
    res.status(500).json({ success: false, message: '更新统计数据失败', error: error.message });
  }
});

/**
 * 获取刷题记录列表
 * GET /api/leetcode/problems
 */
router.get('/problems', async (req, res) => {
  try {
    const { difficulty, search, limit = 20, offset = 0 } = req.query;
    let sql = 'SELECT * FROM leetcode_problems WHERE 1=1';
    const params = [];

    if (difficulty) {
      sql += ' AND difficulty = ?';
      params.push(difficulty);
    }

    if (search) {
      sql += ' AND (title LIKE ? OR JSON_CONTAINS(tags, JSON_QUOTE(?)))';
      params.push(`%${search}%`, search);
    }

    sql += ' ORDER BY solved_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const problems = await db.query(sql, params);

    const formattedProblems = problems.map(p => ({
      ...p,
      tags: JSON.parse(p.tags || '[]')
    }));

    res.json({ success: true, data: formattedProblems });
  } catch (error) {
    res.status(500).json({ success: false, message: '获取刷题记录失败', error: error.message });
  }
});

/**
 * 添加刷题记录
 * POST /api/leetcode/problems
 */
router.post('/problems', async (req, res) => {
  try {
    const { problem_id, title, difficulty, tags = [], url } = req.body;

    if (!title || !difficulty) {
      return res.status(400).json({ success: false, message: '题目标题和难度不能为空' });
    }

    const id = await db.insert(
      `INSERT INTO leetcode_problems (problem_id, title, difficulty, tags, url, solved_at) 
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [problem_id, title, difficulty, JSON.stringify(tags), url]
    );

    res.status(201).json({ success: true, message: '刷题记录添加成功', data: { id } });
  } catch (error) {
    res.status(500).json({ success: false, message: '添加刷题记录失败', error: error.message });
  }
});

/**
 * 更新刷题记录
 * PUT /api/leetcode/problems/:id
 */
router.put('/problems/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { problem_id, title, difficulty, tags, url } = req.body;

    const affected = await db.update(
      `UPDATE leetcode_problems SET 
        problem_id = ?, title = ?, difficulty = ?, tags = ?, url = ?
       WHERE id = ?`,
      [problem_id, title, difficulty, JSON.stringify(tags || []), url, id]
    );

    if (affected === 0) {
      return res.status(404).json({ success: false, message: '刷题记录不存在' });
    }

    res.json({ success: true, message: '刷题记录更新成功' });
  } catch (error) {
    res.status(500).json({ success: false, message: '更新刷题记录失败', error: error.message });
  }
});

/**
 * 删除刷题记录
 * DELETE /api/leetcode/problems/:id
 */
router.delete('/problems/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const affected = await db.remove('DELETE FROM leetcode_problems WHERE id = ?', [id]);

    if (affected === 0) {
      return res.status(404).json({ success: false, message: '刷题记录不存在' });
    }

    res.json({ success: true, message: '刷题记录删除成功' });
  } catch (error) {
    res.status(500).json({ success: false, message: '删除刷题记录失败', error: error.message });
  }
});

/**
 * 获取难度分布统计
 * GET /api/leetcode/distribution
 */
router.get('/distribution', async (req, res) => {
  try {
    const distribution = await db.query(
      `SELECT difficulty, COUNT(*) as solved,
        (SELECT COUNT(*) FROM leetcode_all_problems WHERE difficulty = p.difficulty) as total
       FROM leetcode_problems p
       GROUP BY difficulty`
    );
    res.json({ success: true, data: distribution });
  } catch (error) {
    res.status(500).json({ success: false, message: '获取难度分布失败', error: error.message });
  }
});

module.exports = router;
