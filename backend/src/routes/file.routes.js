const express = require('express');
const upload = require('../middleware/upload');
const controller = require('../controllers/file.controller');

const router = express.Router();

router.post('/', upload.single('file'), controller.uploadSingle);
router.post('/batch', upload.array('files', 10), controller.uploadMultiple);
router.get('/', controller.listFiles);
router.get('/:id/download', controller.downloadFile); // ✅ ADD THIS
router.delete('/:id', controller.deleteFile);

module.exports = router;
