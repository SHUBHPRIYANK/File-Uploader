export default function UploadArea({ onUpload, uploading }) {
  const MAX_SIZE = 10 * 1024 * 1024; 

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/pdf",
    "text/plain",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ];

  const handleFiles = (fileList) => {
    if (!fileList.length || uploading) return;

    const files = [...fileList];

    for (const file of files) {
      if (file.size > MAX_SIZE) {
        alert(`❌ "${file.name}" exceeds 10 MB limit.`);
        return;
      }

      if (
        !file.type.startsWith("image/") &&
        !allowedTypes.includes(file.type)
      ) {
        alert(`❌ "${file.name}" is not a supported file type.`);
        return;
      }
    }

    onUpload(files);
  };

  return (
    <div
      onDragOver={(e) => {
        if (!uploading) e.preventDefault();
      }}
      onDrop={(e) => {
        if (uploading) return;
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
      }}
      style={{
        border: "2px dashed #444",
        padding: "40px",
        textAlign: "center",
        marginBottom: "20px",
        borderRadius: "8px",
        background: "#1e1e1e",
        color: "#bbb",
        cursor: uploading ? "not-allowed" : "pointer",
        opacity: uploading ? 0.6 : 1,
      }}
    >
      <p style={{ fontSize: "18px", marginBottom: "6px" }}>
        📂 Drag & drop files here
      </p>
      <p>or click to browse</p>

      <input
        type="file"
        multiple
        disabled={uploading}
        style={{ marginTop: "10px", color: "#ccc" }}
        onChange={(e) => handleFiles(e.target.files)}
      />

      <p style={{ fontSize: "14px", color: "#888", marginTop: "12px" }}>
        Supported: PDF, Images (JPG, PNG), Word, PowerPoint, TXT
        <br />
        Max size per file: <strong>10 MB</strong>
      </p>

      {uploading && (
        <p style={{ marginTop: "10px", color: "#aaa" }}>
          Uploading… please wait ⏳
        </p>
      )}
    </div>
  );
}
