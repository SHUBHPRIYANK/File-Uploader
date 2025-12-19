const BASE_URL = "https://file-uploader-production-6b15.up.railway.app";

export default function FileItem({ file, onDelete, onDownload, onPreview }) {
  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const getFileType = (mimeType) => {
    if (mimeType.startsWith("image/")) return "Image";
    if (mimeType === "application/pdf") return "PDF";
    return "Document";
  };

  const canPreview =
    file.mimeType.startsWith("image/") ||
    file.mimeType === "application/pdf";

  const btnStyle = {
    background: "#2a2a2a",
    color: "#eee",
    border: "1px solid #444",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "6px",
  };

  return (
    <div style={{ borderBottom: "1px solid #333", padding: "14px 0" }}>
      <strong style={{ color: "#fff" }}>{file.originalName}</strong>

      <div style={{ fontSize: "14px", color: "#aaa", marginTop: "4px" }}>
        {formatSize(file.size)} • {getFileType(file.mimeType)} • Uploaded{" "}
        {formatDate(file.uploadedAt)}
      </div>

      {file.mimeType.startsWith("image/") && (
        <img
          src={`${BASE_URL}${file.path}`}
          alt={file.originalName}
          width="80"
          style={{ borderRadius: "4px", marginTop: "6px" }}
        />
      )}

      <div style={{ marginTop: "10px" }}>
        {canPreview && (
          <button
            style={btnStyle}
            onClick={() =>
              onPreview({
                ...file,
                url: `${BASE_URL}${file.path}`,
              })
            }
          >
            👁 Preview
          </button>
        )}
        <button style={btnStyle} onClick={() => onDownload(file.id)}>
          ⬇ Download
        </button>
        <button style={btnStyle} onClick={() => onDelete(file.id)}>
          🗑 Delete
        </button>
      </div>
    </div>
  );
}
