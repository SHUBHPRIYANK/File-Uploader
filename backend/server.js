const express = require("express");
const cors = require("cors");
const path = require("path");

const fileRoutes = require("./src/routes/file.routes");

const app = express();

app.use(cors());
app.use(express.json());

// serve backend/uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api/files", fileRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running ");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});