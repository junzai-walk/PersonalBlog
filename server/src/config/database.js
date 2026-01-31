/**
 * MySQL 数据库连接配置
 */

const mysql = require('mysql2/promise');

// 创建数据库连接池
const pool = mysql.createPool({
  host: process.env.DB_HOST || '175.178.87.16',
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'junzai',
  password: process.env.DB_PASSWORD || 'qwer123456',
  database: process.env.DB_NAME || 'blog',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
});

// 测试数据库连接
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ 数据库连接成功');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ 数据库连接失败:', error.message);
    return false;
  }
}

// 执行查询
async function query(sql, params = []) {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (error) {
    console.error('查询错误:', error);
    throw error;
  }
}

// 执行插入并返回插入的ID
async function insert(sql, params = []) {
  try {
    const [result] = await pool.execute(sql, params);
    return result.insertId;
  } catch (error) {
    console.error('插入错误:', error);
    throw error;
  }
}

// 执行更新并返回影响的行数
async function update(sql, params = []) {
  try {
    const [result] = await pool.execute(sql, params);
    return result.affectedRows;
  } catch (error) {
    console.error('更新错误:', error);
    throw error;
  }
}

// 执行删除并返回影响的行数
async function remove(sql, params = []) {
  try {
    const [result] = await pool.execute(sql, params);
    return result.affectedRows;
  } catch (error) {
    console.error('删除错误:', error);
    throw error;
  }
}

module.exports = {
  pool,
  testConnection,
  query,
  insert,
  update,
  remove
};
