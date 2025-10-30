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
        justifyContent: "center",
        textDecoration: "none",
        color: "#fff",
      }}
    >
      {/* SVG o imagen con fondo transparente */}
      <img
        src="/images/logo.png"
        alt="Logo"
        style={{
          width: 56,
          height: "auto",
          objectFit: "contain",
          display: "block",
         // background: "transparent", // 👈 asegura transparencia
        }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
    </Link>
  );
}
