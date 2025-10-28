import { Link } from "react-router-dom";

export default function SiteLogo() {
  return (
    <Link
      to="/"
      aria-label="Ir a inicio"
      style={{
        position: "fixed",
        top: "clamp(12px, 2vh, 20px)",
        left: "clamp(12px, 2vw, 20px)",
        zIndex: 100,
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        textDecoration: "none",
        color: "#fff",
      }}
    >
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "#111",
          border: "1.5px solid rgba(255,255,255,0.2)",
          display: "grid",
          placeItems: "center",
          boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
          overflow: "hidden",
        }}
      >
        {/* Logo dentro (png/svg) */}
        <img
          src="/images/logo.svg" // pon tu logo aquí
          alt="Logo"
          style={{ width: 28, height: 28, objectFit: "contain" }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
      </div>
    </Link>
  );
}
