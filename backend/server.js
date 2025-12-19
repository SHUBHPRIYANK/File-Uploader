const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express(); // ✅ define app

app.use(cors());
app.use(express.json());

// serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
const fileRoutes = require("./src/routes/file.routes");
app.use("/files", fileRoutes);

// health check
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
