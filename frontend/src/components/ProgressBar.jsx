export default function ProgressBar({ progress }) {
  if (progress <= 0) return null;

  return (
    <div style={{ margin: "15px 0" }}>
      <div
        style={{
          background: "#333",
          height: "8px",
          borderRadius: "4px",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "linear-gradient(90deg, #00c6ff, #0072ff)",
            transition: "width 0.3s ease"
          }}
        />
      </div>
      <small style={{ color: "#aaa" }}>{progress}% uploaded</small>
    </div>
  );
}
