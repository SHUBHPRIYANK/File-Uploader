import { useEffect, useState } from "react";
import UploadArea from "./components/UploadArea";
import FileList from "./components/FileList";
import ProgressBar from "./components/ProgressBar";
import {
  uploadSingleFile,
  uploadMultipleFiles,
  getAllFiles,
  deleteFile,
  downloadFile
} from "./services/fileService";

export default function App() {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");

  // 🔹 Preview modal state
  const [previewFile, setPreviewFile] = useState(null);

  // Load files on mount
  useEffect(() => {
    const loadFiles = async () => {
      const res = await getAllFiles();
      setFiles(res.data.files);
    };
    loadFiles();
  }, []);

  const handleUpload = async (selectedFiles) => {
    setProgress(0);
    setUploading(true);
    setStatus("Uploading files...");

    try {
      if (selectedFiles.length === 1) {
        await uploadSingleFile(selectedFiles[0], setProgress);
      } else {
        await uploadMultipleFiles(selectedFiles, setProgress);
      }

      setStatus("Upload complete ✔");
      const res = await getAllFiles();
      setFiles(res.data.files);
    } catch (err) {
      console.error(err);
      setStatus("Upload failed ❌");
    } finally {
      setUploading(false);
      setTimeout(() => {
        setProgress(0);
        setStatus("");
      }, 1000);
    }
  };

  const handleDelete = async (id) => {
    await deleteFile(id);
    const res = await getAllFiles();
    setFiles(res.data.files);
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        background: "#121212",
        color: "#e0e0e0",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 0 20px rgba(0,0,0,0.6)"
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        📁 File Uploader
      </h2>

      <UploadArea onUpload={handleUpload} uploading={uploading} />

      <ProgressBar progress={progress} />

      {status && <p>{status}</p>}

      <FileList
        files={files}
        onDelete={handleDelete}
        onDownload={downloadFile}
        onPreview={setPreviewFile}
      />

      {/* 🔹 Preview Modal */}
      {previewFile && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 6,
              maxWidth: "80%",
              maxHeight: "80vh",
              overflow: "auto"
            }}
          >
            <h4>{previewFile.originalName}</h4>

            {/* ✅ Image preview */}
            {previewFile.mimeType.startsWith("image/") ? (
              <img
                src={previewFile.url}
                alt={previewFile.originalName}
                style={{ maxWidth: "100%", maxHeight: "70vh" }}
              />
            ) : (
              /* ✅ All other files via iframe */
              <iframe
                src={previewFile.url}
                width="100%"
                height="500px"
                title="File Preview"
                style={{ border: "1px solid #ccc" }}
              />
            )}

            <div style={{ marginTop: 10, textAlign: "right" }}>
              <button onClick={() => setPreviewFile(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
