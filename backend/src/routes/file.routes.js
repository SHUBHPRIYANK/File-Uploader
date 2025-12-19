const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const controller = require("../controllers/file.controller");

// single file upload
router.post("/", upload.single("file"), controller.uploadSingle);

// multiple files upload
router.post("/batch", upload.array("files", 10), controller.uploadMultiple);

// list files
router.get("/", controller.listFiles);

// delete file
router.delete("/:id", controller.deleteFile);

// download file
router.get("/:id/download", controller.downloadFile);

module.exports = router;
