const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { pool } = require('../src/config/database');

async function seed() {
  try {
    console.log('开始执行数据库初始化模拟数据...');
    const seedSqlPath = path.join(__dirname, '../db/seed.sql');
    const seedSql = fs.readFileSync(seedSqlPath, 'utf8');

    // 将 SQL 文件按分号分割成多条语句（简单处理）
    // 注意：如果有存储过程或包含分号的字符串会有问题，但对于目前的 seed.sql 够用了
    const statements = seedSql
      .split(';')
      .map(s => {
        // 移除每段中以 -- 开头的注释行
        return s.split('\n')
          .filter(line => !line.trim().startsWith('--'))
          .join('\n')
          .trim();
      })
      .filter(s => s.length > 0);

    console.log(`准备执行 ${statements.length} 条 SQL 语句...`);

    for (let statement of statements) {
      if (statement.toLowerCase().startsWith('use')) continue; // 跳过 USE 语句，连接池已指定
      try {
        await pool.query(statement);
      } catch (err) {
        console.error(`执行语句失败: ${statement.substring(0, 50)}...`);
        console.error(`错误详情: ${err.message}`);
      }
    }

    console.log('✅ 数据库初始化模拟数据完成！');
    process.exit(0);
  } catch (error) {
    console.error('❌ 初始化数据过程中出现错误:', error);
    process.exit(1);
  }
}

seed();
