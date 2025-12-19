const express = require('express');
const cors = require('cors');
const path = require("path");

const fileRoutes = require('./routes/file.routes');

const app = express();

app.use(cors());
app.use(express.json());

// ✅ serve backend/uploads
app.use('/uploads', express.static(path.join(__dirname, "uploads")));

app.use('/api/files', fileRoutes);

module.exports = app;
