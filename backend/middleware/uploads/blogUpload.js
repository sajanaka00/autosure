const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create blog uploads directory
const uploadsDir = 'uploads/blogs';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage for blog images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename: blog-timestamp-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).toLowerCase().replace(/\s+/g, '-');
    cb(null, `blog-${name}-${uniqueSuffix}${ext}`);
  }
});

// File filter for blog images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed for blog images.'), false);
  }
};

// Configure multer for blogs
const blogUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit for blog images
    files: 5 // Maximum 5 files per upload
  }
});

module.exports = blogUpload;