import { useState } from "react";

type Shape = "pill" | "squircle";

export default function FabMenu({
  shape = "squircle",
}: { shape?: Shape }) {
  const [open, setOpen] = useState(false);

  const baseBtn: React.CSSProperties = {
    width: 56,
    height: 48,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(15,15,15,0.65)",
    backdropFilter: "blur(8px)",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
  };

  const shapes: Record<Shape, React.CSSProperties> = {
    pill: { borderRadius: 9999 },
    squircle: { borderRadius: "28px 22px 26px 24px" },
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 18,
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
        onClick={() => setOpen(v => !v)}
        aria-label="Toggle menu"
        style={{ ...baseBtn, ...shapes[shape] }}
      >
        ☰
      </button>

      {open && (
        <div
          style={{
            width: 260,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(10,10,10,0.92)",
            color: "#fff",
            padding: 12,
            borderRadius: 16,
            boxShadow: "0 12px 30px rgba(0,0,0,0.45)",
            backdropFilter: "blur(10px)",
          }}
        >
          <MenuLink href="#home">Home</MenuLink>
          <MenuLink href="#projects">Projects</MenuLink>
          <MenuLink href="#about">About</MenuLink>
          <MenuLink href="#contact">Contact</MenuLink>
        </div>
      )}
    </div>
  );
}

function MenuLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      style={{
        display: "block",
        padding: "10px 8px",
        borderRadius: 10,
        textDecoration: "none",
        color: "#fff",
        opacity: 0.92,
      }}
    />
  );
}
