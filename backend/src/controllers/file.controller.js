const fs = require('fs');
const path = require('path');
const File = require('../models/file.model');

exports.uploadSingle = (req, res) => {
  const file = File.createFile(req.file);
  res.status(201).json(file);
};

exports.uploadMultiple = (req, res) => {
  const uploaded = req.files.map(File.createFile);
  res.status(201).json({
    files: uploaded,
    count: uploaded.length
  });
};

exports.listFiles = (req, res) => {
  const files = File.getAllFiles();
  const totalSize = files.reduce((s, f) => s + f.size, 0);

  res.json({
    files,
    total: files.length,
    totalSize: `${(totalSize / 1024 / 1024).toFixed(2)} MB`
  });
};

exports.deleteFile = (req, res) => {
  const file = File.deleteFile(req.params.id);
  if (!file) return res.status(404).json({ message: 'Not found' });

  fs.unlinkSync(path.join('.', file.path));
  res.json({ message: 'File deleted' });
};

exports.downloadFile = (req, res) => {
  const { id } = req.params;

  const file = File.getFileById(id);

  if (!file) {
    return res.status(404).json({ message: "File not found" });
  }

  const filePath = path.join('.', file.path);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "File missing on server" });
  }

  res.download(filePath, file.originalName);
};

