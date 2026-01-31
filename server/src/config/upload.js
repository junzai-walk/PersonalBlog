/**
 * 文件上传配置
 */

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 确保上传目录存在
const uploadDir = path.join(__dirname, '../../uploads');
const avatarDir = path.join(uploadDir, 'avatars');
const resumeDir = path.join(uploadDir, 'resumes');
const mediaDir = path.join(uploadDir, 'media');
const articleDir = path.join(uploadDir, 'articles');

[uploadDir, avatarDir, resumeDir, mediaDir, articleDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// 生成唯一文件名
const generateFileName = (originalName) => {
  const ext = path.extname(originalName);
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `${timestamp}_${random}${ext}`;
};

// 头像上传配置
const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, avatarDir);
  },
  filename: (req, file, cb) => {
    cb(null, generateFileName(file.originalname));
  }
});

// 简历上传配置
const resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, resumeDir);
  },
  filename: (req, file, cb) => {
    cb(null, generateFileName(file.originalname));
  }
});

// 媒体文件（图片/视频）上传配置
const mediaStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, mediaDir);
  },
  filename: (req, file, cb) => {
    cb(null, generateFileName(file.originalname));
  }
});

// 文章图片上传配置
const articleStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, articleDir);
  },
  filename: (req, file, cb) => {
    cb(null, generateFileName(file.originalname));
  }
});

// 文件类型过滤器
const imageFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const ext = path.extname(file.originalname).toLowerCase().slice(1);
  const mimetype = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(ext);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('只允许上传图片文件 (jpeg, jpg, png, gif, webp)'));
  }
};

const mediaFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|webm|mov|avi/;
  const ext = path.extname(file.originalname).toLowerCase().slice(1);
  const extname = allowedTypes.test(ext);

  if (extname) {
    cb(null, true);
  } else {
    cb(new Error('只允许上传图片或视频文件'));
  }
};

const resumeFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx/;
  const ext = path.extname(file.originalname).toLowerCase().slice(1);
  const extname = allowedTypes.test(ext);

  if (extname) {
    cb(null, true);
  } else {
    cb(new Error('只允许上传 PDF 或 Word 文档'));
  }
};

// 创建上传实例
const uploadAvatar = multer({
  storage: avatarStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

const uploadResume = multer({
  storage: resumeStorage,
  fileFilter: resumeFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

const uploadMedia = multer({
  storage: mediaStorage,
  fileFilter: mediaFilter,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB
});

const uploadArticleImage = multer({
  storage: articleStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

module.exports = {
  uploadAvatar,
  uploadResume,
  uploadMedia,
  uploadArticleImage,
  uploadDir,
  avatarDir,
  resumeDir,
  mediaDir,
  articleDir
};
