const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create vehicle uploads directory
const uploadsDir = 'uploads/vehicles';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage for vehicle images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename: vehicle-timestamp-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).toLowerCase().replace(/\s+/g, '-');
    cb(null, `vehicle-${name}-${uniqueSuffix}${ext}`);
  }
});

// File filter for vehicle images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and WebP are allowed for vehicle images.'), false);
  }
};

// Configure multer for vehicles
const vehicleUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB limit for vehicle images (higher quality needed)
    files: 10 // Maximum 10 files per vehicle upload
  }
});

module.exports = vehicleUpload;