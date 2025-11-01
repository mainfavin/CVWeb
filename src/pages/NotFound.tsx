// src/pages/NotFound.tsx
import { useTranslation } from "react-i18next"; // <-- Agregado
import { Link } from "react-router-dom"; // <-- Agregado

export default function NotFound() {
  const { t } = useTranslation(); // <-- Agregado
  
  return (
    <main style={{minHeight:"100vh", color:"#c3c3c3ff", background:"#0e0e0e"}}>
      <div style={{width: "100vw", 
        margin:"0 auto", 
        padding:"10vh 0", 
        textAlign:"center",
        }}>
        <h1 style={{fontSize: "clamp(3rem, 10vw, 8rem)", margin: "0 0 10px"}}>{t("notFound.title")}</h1> {/* <-- Reemplazado */}
        <p style={{fontSize: "clamp(1rem, 2vw, 1.4rem)", opacity: 0.8}}>{t("notFound.subtitle")}</p> {/* <-- Reemplazado */}
        <Link to="/" style={{color: "#fff", opacity: 0.9, marginTop: "20px", display: "inline-block", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.4)"}}>
          {t("notFound.cta")} {/* <-- Reemplazado */}
        </Link>
      </div>
    </main>
  );
}