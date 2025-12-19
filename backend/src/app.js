const express = require('express');
const cors = require('cors');

const fileRoutes = require('./routes/file.routes');

const app = express();

app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use('/api/files', fileRoutes);

module.exports = app;
