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

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const res = await getAllFiles();
        setFiles(res.data.files || []);
      } catch (err) {
        console.error("Failed to load files", err);
      }
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
      setFiles(res.data.files || []);
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
    try {
      await deleteFile(id);
      const res = await getAllFiles();
      setFiles(res.data.files || []);
    } catch (err) {
      console.error("Delete failed", err);
    }
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
      />
    </div>
  );
}
