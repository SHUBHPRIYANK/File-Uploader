export default function FileItem({ file, onDelete, onDownload }) {
  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div style={{ borderBottom: "1px solid #333", padding: "14px 0" }}>
      <strong style={{ color: "#fff" }}>{file.originalName}</strong>

      <div style={{ fontSize: "14px", color: "#aaa", marginTop: "4px" }}>
        {formatSize(file.size)} • {file.mimeType}
      </div>

      <div style={{ fontSize: "13px", color: "#777", marginTop: "2px" }}>
        Uploaded at: {formatDate(file.uploadedAt)}
      </div>

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => onDownload(file.id)}>⬇ Download</button>{" "}
        <button onClick={() => onDelete(file.id)}>🗑 Delete</button>
      </div>
    </div>
  );
}
