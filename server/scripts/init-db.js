/**
 * 数据库初始化脚本
 * 读取 db/init.sql 并执行
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const fs = require('fs');
const mysql = require('mysql2/promise');

async function initDB() {
  console.log('🔄 开始初始化数据库...');

  try {
    // 创建连接
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      multipleStatements: true // 允许执行多条 SQL 语句
    });

    console.log('✅ 数据库连接成功');

    // 读取 SQL 文件
    const sqlPath = path.join(__dirname, '../db/init.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    // 执行 SQL
    console.log('🔄 正在执行 SQL 脚本...');
    await connection.query(sql);

    console.log('✅ 数据库表结构初始化完成！');

    await connection.end();
  } catch (error) {
    console.error('❌ 数据库初始化失败:', error);
    process.exit(1);
  }
}

initDB();
