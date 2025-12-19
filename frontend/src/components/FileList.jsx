import FileItem from "./FileItem";

export default function FileList({ files = [], onDelete, onDownload, onPreview }) {
  if (!files.length) {
    return (
      <p style={{ color: "#777", textAlign: "center", marginTop: "20px" }}>
        No files uploaded yet.
      </p>
    );
  }

  return (
    <div style={{ marginTop: "25px" }}>
      <h3
        style={{
          color: "#eee",
          borderBottom: "1px solid #333",
          paddingBottom: "8px",
          marginBottom: "15px",
        }}
      >
        📂 Your Files
      </h3>

      {files.map((file) => (
        <FileItem
          key={file.id}
          file={file}
          onDelete={onDelete}
          onDownload={onDownload}
          onPreview={onPreview}
        />
      ))}
    </div>
  );
}
