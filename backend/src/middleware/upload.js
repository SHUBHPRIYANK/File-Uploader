const multer = require('multer');

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

// ✅ Allow images, pdf, txt, word, ppt
const allowedTypes = [
  'image/jpeg',
  'image/png',
  'image/jpg',

  'application/pdf',
  'text/plain',

  // Word
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',

  // PowerPoint
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation'
];

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith('image/') ||
    allowedTypes.includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

module.exports = upload;
