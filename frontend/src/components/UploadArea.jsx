import { useRef, useState } from "react";

export default function UploadArea({ onUpload, uploading }) {
  const inputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFiles = (files) => {
    if (!files.length || uploading) return;
    onUpload([...files]);
  };

  return (
    <div
      onClick={() => !uploading && inputRef.current.click()}
      onDragOver={(e) => {
        e.preventDefault();
        if (!uploading) setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragOver(false);
        if (uploading) return;
        handleFiles(e.dataTransfer.files);
      }}
      style={{
        border: `2px dashed ${isDragOver ? "#888" : "#444"}`,
        padding: "40px",
        textAlign: "center",
        marginBottom: "20px",
        borderRadius: "10px",
        background: isDragOver ? "#2a2a2a" : "#1e1e1e",
        color: "#bbb",
        cursor: uploading ? "not-allowed" : "pointer",
        opacity: uploading ? 0.6 : 1,
        transition: "0.2s ease"
      }}
    >
      <p style={{ fontSize: "18px", marginBottom: "8px" }}>
        📂 Drag & drop files here
      </p>
      <p style={{ marginBottom: "10px" }}>or click to choose</p>

      <input
        ref={inputRef}
        type="file"
        multiple
        disabled={uploading}
        style={{ display: "none" }}
        onChange={(e) => handleFiles(e.target.files)}
      />

      <p style={{ fontSize: "14px", color: "#888", marginTop: "10px" }}>
        Supported: PDF, Images, Documents <br />
        Max size: 10 MB
      </p>

      {uploading && (
        <p style={{ marginTop: "12px", color: "#aaa" }}>
          ⏳ Uploading… please wait
        </p>
      )}
    </div>
  );
}
