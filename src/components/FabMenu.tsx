import { useEffect, useRef, useState } from "react";

export default function FabMenu() {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // cerrar al clicar fuera / Esc
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

  return (
    <div
      ref={boxRef}
      style={{
        position: "fixed",
        top: "14px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      <button
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen(v => !v)}
        style={{
          border: "2px solid rgba(255,255,255,0.65)",
          borderRadius: "32px",
          width: 56,
          height: 56,
          background: "rgba(20,20,20,0.55)",
          color: "#fff",
          backdropFilter: "blur(8px)",
          cursor: "pointer",
          boxShadow: open ? "0 0 14px rgba(255,255,255,0.25)" : "0 6px 18px rgba(0,0,0,0.45)",
          transition: "all .25s ease",
        }}
      >
        ☰
      </button>

      <div
        style={{
          position: "relative",
          pointerEvents: open ? "auto" : "none",
          opacity: open ? 1 : 0,
          transform: `translateY(${open ? 0 : -8}px)`,
          transition: "opacity .18s ease, transform .18s ease",
        }}
      >
        {/* caret */}
        <div
          style={{
            position: "absolute",
            top: -6,
            left: "50%",
            transform: "translateX(-50%)",
            width: 12,
            height: 12,
            background: "rgba(10,10,10,0.92)",
            borderLeft: "1px solid rgba(255,255,255,0.14)",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            rotate: "45deg",
          }}
        />
        {/* panel */}
        <nav
          role="menu"
          style={{
            width: 260,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(10,10,10,0.92)",
            backdropFilter: "blur(10px)",
            color: "#fff",
            borderRadius: 14,
            boxShadow: "0 12px 30px rgba(0,0,0,0.45)",
            overflow: "hidden",
          }}
        >
          {[
            { href: "#home", label: "Home" },
            { href: "#projects", label: "Projects" },
            { href: "#about", label: "About" },
            { href: "#contact", label: "Contact" },
          ].map(item => (
            <a
              key={item.href}
              role="menuitem"
              href={item.href}
              style={{
                display: "block",
                padding: "12px 14px",
                textDecoration: "none",
                color: "#fff",
                opacity: 0.95,
              }}
              onClick={() => setOpen(false)}
              onMouseEnter={e => ((e.currentTarget.style.background = "rgba(255,255,255,0.08)"))}
              onMouseLeave={e => ((e.currentTarget.style.background = "transparent"))}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
