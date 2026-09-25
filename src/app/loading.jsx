export default function Loading() {
  return (
    <div style={{
      minHeight: "50vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "1rem",
      backgroundColor: "var(--bg-page)",
      color: "var(--mainBlue)",
    }}>
      <div style={{
        width: "42px",
        height: "42px",
        border: "3px solid #bfdbfe",
        borderTopColor: "var(--mainBlue)",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }}></div>
      <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-muted)" }}>
        Loading Campussutras...
      </span>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
