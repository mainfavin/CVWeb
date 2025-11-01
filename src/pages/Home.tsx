import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

const AUTO_TO_WORK_MS = 25000;

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation("home");

  const reduced = useMemo(
    () => window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches,
    []
  );

  useEffect(() => {
    const id = setTimeout(() => navigate("/work", { replace: true }), AUTO_TO_WORK_MS);
    return () => clearTimeout(id);
  }, [navigate]);

  return (
    <main style={wrap}>
      <div style={centerBlock}>
        {/* headline */}
        <header style={head}>
          <div style={eyebrow}>{t("hero.eyebrow")}</div>
          <h1 style={title}>{t("hero.title")}</h1>
          <p style={subtitle}>{t("hero.subtitle1")}</p>
          <p style={subtitle}>{t("hero.subtitle2")}</p>
        </header>

        {/* split cards */}
        <section style={grid}>
          {/* WORK */}
          <Link
            to="/work"
            aria-label={t("cards.work.aria")}
            style={{ ...card, ...workCard }}
            onMouseEnter={() => warm("/Work")}
            onMouseMove={(e) => tilt(e, 10)}
            onMouseLeave={(e) => untilt(e)}
          >
            <div style={{ ...stroke, WebkitTextStroke: "1px rgba(1, 1, 1, 1)" }}>
              {t("cards.work.badge")}
            </div>
            <div style={cardInner}>
              <div style={mini}>{t("cards.work.mini")}</div>
              <h2 style={{ ...cardTitle, color: "#111" }}>{t("cards.work.title")}</h2>
              <p style={{ ...cardLead, color: "#1b1b1b" }}>{t("cards.work.lead")}</p>
              <span style={{ ...cta, ...ctaDark }}>{t("cards.work.cta")}</span>
            </div>
          </Link>

          {/* ABOUT */}
          <Link
            to="/about"
            aria-label={t("cards.about.aria")}
            style={{ ...card, ...aboutCard }}
            onMouseEnter={() => warm("/About")}
            onMouseMove={(e) => tilt(e, 10)}
            onMouseLeave={(e) => untilt(e)}
          >
            <div style={{ ...stroke, WebkitTextStroke: "1px rgba(255, 255, 255, 1)" }}>
              {t("cards.about.badge")}
            </div>
            <div style={cardInner}>
              <div style={{ ...mini, color: "rgba(255,255,255,.7)" }}>
                {t("cards.about.mini")}
              </div>
              <h2 style={cardTitle}>{t("cards.about.title")}</h2>
              <p style={{ ...cardLead, color: "rgba(255,255,255,.9)" }}>
                {t("cards.about.lead")}
              </p>
              <span style={{ ...cta, ...ctaLight }}>{t("cards.about.cta")}</span>
            </div>
          </Link>
        </section>
      </div>

      {!reduced && (
        <div style={autoHint}>
          {t("autoRedirect", { seconds: AUTO_TO_WORK_MS / 1000 })}
        </div>
      )}
    </main>
  );
}

/* ------ small helpers ------ */
function warm(chunk: "/Work" | "/About") {
  try {
    import(/* @vite-ignore */ `./${chunk}.tsx`);
  } catch { /* noop */ }
}
function tilt(e: React.MouseEvent, max = 8) {
  const el = e.currentTarget as HTMLAnchorElement;
  const r = el.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  const dx = (e.clientX - cx) / (r.width / 2);
  const dy = (e.clientY - cy) / (r.height / 2);
  el.style.transform = `perspective(900px) rotateX(${-dy * max}deg) rotateY(${dx * max}deg) translateY(-2px)`;
}
function untilt(e: React.MouseEvent) {
  const el = e.currentTarget as HTMLAnchorElement;
  el.style.transform = "";
}

/* ------ styles ------ */
const centerBlock: React.CSSProperties = {
  width: " 96vw",
  margin: "0 auto",
  //minHeight: "calc(100svh - 2 * clamp(16px,3vw,28px))", // ocupa casi todo el viewport
  display: "flex",
  flexDirection: "column",
  justifyContent: "center", // centra vertical
  alignItems: "center",     // centra horizontal
  gap: "clamp(28px, 3vh, 40px)",
  
};
const wrap: React.CSSProperties = {
  minHeight: "100svh",
  background: "#0e0e0e",
  color: "#fff",
  padding: "clamp(16px,3vw,28px)",
  boxSizing: "border-box",
  display: "flex",
  placeContent: "center",
};
const head: React.CSSProperties = {
  width: "100%",
  maxWidth: "900px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
  textAlign: "center",
};
const eyebrow: React.CSSProperties = {
  fontSize: 12,
  letterSpacing: ".18em",
  opacity: 0.7,
  marginBottom: 4,
};

const title: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(24px, 3.6vw, 36px)",
  lineHeight: 1.1,
  letterSpacing: ".01em",
  fontWeight: 700,
};

const subtitle: React.CSSProperties = {
  opacity: 0.72,
  marginTop: 4,
  fontSize: "clamp(13px, 1vw, 15px)",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "clamp(16px,2.6vw,30px)",
  width: "100%",
  maxWidth: "1000px",
  margin: "0 auto",
  alignItems: "center",
  justifyItems: "center",
  justifyContent: "center",
};

const card: React.CSSProperties = {
  position: "relative",
  display: "block",
  borderRadius: 26,
  textDecoration: "none",
  overflow: "hidden",
  width: "100%",
  maxWidth: 460,
  height: "min(44svh, 420px)",
  border: "1px solid rgba(255,255,255,.10)",
 
  transition:
    "transform .25s ease, box-shadow .25s ease, filter .25s ease, background .3s ease",
  willChange: "transform, background",
};

const workCard: React.CSSProperties = {
  background: "#E9E3D0",
  color: "#111",
};

const aboutCard: React.CSSProperties = {
  background: "#1E2633",
  color: "#fff",
};

const cardInner: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  padding: "clamp(22px, 3.2vw, 36px)",
  display: "grid",
  gap: 10,
  alignContent: "end",
  height: "100%",
};

const mini: React.CSSProperties = {
  fontSize: 12,
  letterSpacing: ".18em",
  color: "rgba(0,0,0,.55)",
};

const cardTitle: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(26px, 4vw, 40px)",
  lineHeight: 1.02,
  fontWeight: 700,
};

const cardLead: React.CSSProperties = {
  margin: "4px 0 14px",
  lineHeight: 1.55,
  fontSize: "clamp(13px, 1.1vw, 15px)",
};

const cta: React.CSSProperties = {
  display: "inline-block",
  padding: "11px 16px",
  borderRadius: 999,
  fontWeight: 700,
  border: "1px solid rgba(255,255,255,.14)",
  boxShadow: "0 6px 18px rgba(0,0,0,.18)",
};

const ctaDark: React.CSSProperties = {
  background: "#111",
  color: "#fff",
  borderColor: "rgba(0,0,0,.3)",
};

const ctaLight: React.CSSProperties = {
  background: "#fff",
  color: "#000",
  borderColor: "rgba(255,255,255,.3)",
};

const stroke: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "grid",
  placeItems: "center",
  fontWeight: 900,
  fontSize: "clamp(80px, 18vw, 260px)",
  color: "transparent",
  opacity: 0.12,
  userSelect: "none",
  pointerEvents: "none",
};

const autoHint: React.CSSProperties = {
  position: "fixed",
  bottom: 12,
  left: "50%",
  transform: "translateX(-50%)",
  fontSize: 12,
  opacity: 0.6,
};

/* responsive */
const media = `
@media (max-width: 960px) {
  main[style] {
    padding-top: 4vh !important;
    justify-content: flex-start !important;
  }
  section[style*="grid-template-columns"] {
    grid-template-columns: 1fr !important;
    gap: 28px !important;
  }
  a[style*="height:"] {
    height: min(42svh, 440px) !important;
  }
}
`;

if (!document.getElementById("home-inline-styles")) {
  const s = document.createElement("style");
  s.id = "home-inline-styles";
  s.textContent = media;
  document.head.appendChild(s);
}
