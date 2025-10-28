import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function FabMenu() {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // cerrar al clicar fuera / ESC
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onEsc);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onEsc);
    };
  }, []);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },   
    { to: "/reel", label: "Reel" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: "clamp(12px, 2vh, 20px)",
        right: "clamp(12px, 2vw, 20px)",
        zIndex: 100,
      }}
    >
      {/* ANCLA: tamaño fijo, sirve para que el menú se posicione en absoluto */}
      <div ref={boxRef} style={{ position: "relative", width: 60, height: 60 }}>
        {/* Botón circular blanco (centrado dentro del ancla) */}
        <button
          aria-expanded={open}
          aria-haspopup="menu"
          onClick={() => setOpen(v => !v)}
          style={{
            position: "absolute",
            inset: 0,                          // ocupa el ancla completa
            cursor: "pointer",
            background: "#fff",
            border: "1.5px solid rgba(0,0,0,0.12)",
            borderRadius: "50%",
            boxShadow: open
              ? "0 0 16px rgba(0,0,0,0.25)"
              : "0 6px 20px rgba(0,0,0,0.20)",
            transition: "box-shadow .25s ease, transform .25s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Icono hamburguesa → X */}
          <span
            aria-hidden
            style={{
              position: "relative",
              width: 26,
              height: 18,
              display: "block",
              transform: "translateX(1px)",   // microajuste visual
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 0, right: 0,
                top: open ? "7.5px" : "0px",
                height: 4,
                borderRadius: 2,
                background: "#000",
                transform: open ? "rotate(45deg)" : "none",
                transition: "transform .28s ease, top .28s ease",
              }}
            />
            <span
              style={{
                position: "absolute",
                left: 3, right: 3,
                top: 7.5,
                height: 3,
                borderRadius: 2,
                background: open ? "transparent" : "#7b7b7b",
                transition: "opacity .2s ease",
              }}
            />
            <span
              style={{
                position: "absolute",
                left: 0, right: 0,
                bottom: open ? "7.5px" : "0px",
                height: 4,
                borderRadius: 2,
                background: "#000",
                transform: open ? "rotate(-45deg)" : "none",
                transition: "transform .28s ease, bottom .28s ease",
              }}
            />
          </span>
        </button>

        {/* Menú: ABSOLUTO respecto al ancla, no afecta al layout */}
        <AnimatePresence>
          {open && (
            <motion.nav
              role="menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{
                position: "absolute",
                right: 0,                      // 👈 pegado al borde derecho del botón
                top: "calc(100% + 10px)",      // debajo del botón
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 10,
              }}
            >
              {/* caret */}
              <div
                style={{
                  position: "absolute",
                  top: -6,
                  right: 22,
                  transform: "rotate(45deg)",
                  width: 12,
                  height: 12,
                  background: "#fff",
                  borderLeft: "1px solid rgba(0,0,0,0.1)",
                  borderTop: "1px solid rgba(0,0,0,0.1)",
                }}
              />

              {links.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.9 }}
                  transition={{ duration: 0.22, ease: "easeOut", delay: i * 0.05 }}
                  style={{ position: "relative", zIndex: 1 }}
                >
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    style={{
                      display: "block",
                      padding: "10px 18px",
                      textDecoration: "none",
                      background: "#fff",
                      color: "#000",
                      borderRadius: 9999,        // burbuja
                      boxShadow: "0 3px 12px rgba(0,0,0,0.15)",
                      fontSize: 14,
                      fontWeight: 500,
                      transition: "background .2s ease, transform .2s ease",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#f1f1f1")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
