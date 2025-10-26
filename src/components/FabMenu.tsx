/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import lottie, {type AnimationItem } from "lottie-web";

export default function FabMenu() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<HTMLDivElement>(null);
  const animationInstance = useRef<AnimationItem | null>(null);

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

  // carga del icono animado
  useEffect(() => {
    if (!animRef.current) return;
    animationInstance.current = lottie.loadAnimation({
      container: animRef.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "/animations/menu.json",
      rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
    });
    return () => animationInstance.current?.destroy();
  }, []);

  // controla animación de apertura/cierre con retardo
  useEffect(() => {
    const anim = animationInstance.current;
    if (!anim) return;

    if (open) {
      anim.setDirection(1);
      anim.play();
    } else {
      setClosing(true);
      setTimeout(() => {
        anim.setDirection(-1);
        anim.play();
        setClosing(false);
      }, 250);
    }
  }, [open]);

  return (
    <div
      ref={boxRef}
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      {/* === Botón === */}
      <button
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen(v => !v)}
        disabled={closing}
        style={{
          width: 60,
          height: 60,
          cursor: "pointer",
          background: "#fff",
          border: "1.5px solid rgba(0,0,0,0.1)",
          borderRadius: "50%",
          boxShadow: open
            ? "0 0 16px rgba(0,0,0,0.25)"
            : "0 6px 20px rgba(0,0,0,0.20)",
          transition: "box-shadow .25s ease, transform .25s ease",
          display: "grid",
          placeItems: "center",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
      >
        <div
          ref={animRef}
          style={{
            width: "34px",
            height: "34px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </button>

      {/* === Desplegable === */}
      <div
        style={{
          position: "relative",
          pointerEvents: open ? "auto" : "none",
          opacity: open ? 1 : 0,
          transform: `translateY(${open ? 0 : -8}px)`,
          transition: "opacity .25s ease, transform .25s ease",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -6,
            left: "50%",
            transform: "translateX(-50%) rotate(45deg)",
            width: 12,
            height: 12,
            background: "#fff",
            borderLeft: "1px solid rgba(0,0,0,0.1)",
            borderTop: "1px solid rgba(0,0,0,0.1)",
          }}
        />
        <nav
          role="menu"
          style={{
            width: 220,
            border: "1px solid rgba(0,0,0,0.1)",
            background: "#fff",
            color: "#000",
            borderRadius: 14,
            boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
            overflow: "hidden",
          }}
        >
          {[
            { to: "/", label: "Home" },
            { to: "/project/ana-maxim", label: "Ana Maxim" },
            { to: "/project/moon-in-the-12th", label: "Moon in the 12th" },
            { to: "/about", label: "About" },
          ].map(item => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: "12px 14px",
                textDecoration: "none",
                color: "#000",
                opacity: 0.9,
              }}
              onMouseEnter={e =>
                (e.currentTarget.style.background = "rgba(0,0,0,0.05)")
              }
              onMouseLeave={e =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
