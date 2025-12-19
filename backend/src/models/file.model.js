const { v4: uuid } = require('uuid');

const files = []; // in-memory (DB later)

function createFile(file) {
  const record = {
    id: uuid(),
    originalName: file.originalname,
    filename: file.filename,
    mimeType: file.mimetype,
    size: file.size,
    path: `/uploads/${file.filename}`,
    uploadedAt: new Date()
  };

  files.push(record);
  return record;
}

function getAllFiles() {
  return files;
}

function getFileById(id) {
  return files.find(file => file.id === id);
}

function deleteFile(id) {
  const index = files.findIndex(f => f.id === id);
  if (index === -1) return null;
  return files.splice(index, 1)[0];
}

module.exports = {
  createFile,
  getAllFiles,
  getFileById,
  deleteFile
};
