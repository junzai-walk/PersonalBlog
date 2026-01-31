-- 创建数据库（如果不存在）
CREATE DATABASE IF NOT EXISTS blog DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE blog;

-- 1. 个人资料表 (Profile)
CREATE TABLE IF NOT EXISTS profile (
  id INT PRIMARY KEY,
  avatar_url VARCHAR(255),
  resume_url VARCHAR(255),
  resume_name VARCHAR(255),
  uploaded_at TIMESTAMP NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 初始化个人资料
INSERT IGNORE INTO profile (id) VALUES (1);

-- 2. 技能表 (Skills)
CREATE TABLE IF NOT EXISTS skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  icon VARCHAR(50) NOT NULL,
  color VARCHAR(50) DEFAULT 'text-blue-500',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. 最近活动表 (Activities)
CREATE TABLE IF NOT EXISTS activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  date VARCHAR(50),
  type VARCHAR(50),
  icon VARCHAR(50),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. 项目表 (Projects) - 改为字符串 ID
DROP TABLE IF EXISTS projects;
CREATE TABLE projects (
  id VARCHAR(100) PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  category VARCHAR(50),
  tags JSON,
  description TEXT,
  image VARCHAR(255),
  video_url VARCHAR(255),
  project_url VARCHAR(255),
  source_url VARCHAR(255),
  features JSON,
  tech_stack JSON,
  long_description TEXT,
  view_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 5. 文章表 (Articles) - 改为字符串 ID
DROP TABLE IF EXISTS articles;
CREATE TABLE articles (
  id VARCHAR(100) PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  excerpt TEXT,
  content LONGTEXT,
  date VARCHAR(50),
  reading_time VARCHAR(20),
  category VARCHAR(50),
  tags JSON,
  view_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 6. 刷题统计表 (LeetCode Stats)
CREATE TABLE IF NOT EXISTS leetcode_stats (
  id INT PRIMARY KEY,
  total_solved INT DEFAULT 0,
  accuracy VARCHAR(20),
  streak_days INT DEFAULT 0,
  global_rank INT DEFAULT 0,
  weekly_solved INT DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 初始化刷题统计
INSERT IGNORE INTO leetcode_stats (id, total_solved, accuracy, streak_days, global_rank) 
VALUES (1, 452, '94.2%', 15, 24812);

-- 7. 刷题记录表 (LeetCode Problems)
CREATE TABLE IF NOT EXISTS leetcode_problems (
  id INT AUTO_INCREMENT PRIMARY KEY,
  problem_id INT NOT NULL,
  title VARCHAR(100) NOT NULL,
  difficulty VARCHAR(20) NOT NULL,
  tags JSON,
  url VARCHAR(255),
  solved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. 职业生涯表 (Career Timeline)
CREATE TABLE IF NOT EXISTS career_timeline (
  id INT AUTO_INCREMENT PRIMARY KEY,
  year VARCHAR(50) NOT NULL,
  title VARCHAR(100) NOT NULL,
  company VARCHAR(100) NOT NULL,
  description TEXT,
  start_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. 街舞生活媒体表 (Dance Media)
CREATE TABLE IF NOT EXISTS dance_media (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  description TEXT,
  url VARCHAR(255) NOT NULL,
  type ENUM('image', 'video') DEFAULT 'image',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 10. 联系我留言表 (Contact Messages)
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  company VARCHAR(100),
  subject VARCHAR(200),
  message TEXT NOT NULL,
  status ENUM('pending', 'read', 'replied') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
