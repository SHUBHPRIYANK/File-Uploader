export default function UploadArea({ onUpload, uploading }) {
  const handleFiles = (files) => {
    if (!files.length || uploading) return;
    onUpload([...files]);
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
  cursor: "pointer",
  opacity: uploading ? 0.6 : 1
}}

    >
      <p>Drag & drop files here</p>
      <p>or</p>

     <input
  type="file"
  multiple
  disabled={uploading}
  style={{
    marginTop: "10px",
    color: "#ccc"
  }}

  
  onChange={(e) => handleFiles(e.target.files)}
/>

<p style={{ fontSize: "14px", color: "#888" }}>
  Supported: PDF, Images, Documents  <br/>
  Max Size:10 MB
</p>



      {uploading && (
        <p style={{ marginTop: "10px", color: "#555" }}>
          Uploading… please wait
        </p>
      )}
    </div>
  );
}
