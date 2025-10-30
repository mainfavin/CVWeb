import { useEffect, useRef, useState } from "react";

type Item = {
  label: string;
  href: string;
  preview: string;   // ruta a la imagen / captura
  external?: boolean;
};

type Props = {
  items: Item[];
  gap?: number;
};

export default function HoverPreviewLinks({ items, gap = 22 }: Props) {
  const [active, setActive] = useState<Item | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const holderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX + 24, y: e.clientY + 24 });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={holderRef} style={{ position: "relative" }}>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((it) => (
          <li key={it.label} style={{ marginBottom: gap }}>
            <a
              href={it.href}
              target={it.external ? "_blank" : undefined}
              rel={it.external ? "noreferrer" : undefined}
              onMouseEnter={() => setActive(it)}
              onMouseLeave={() => setActive(null)}
              style={{
                color: "#111",
                textDecoration: "none",
                borderBottom: "2px solid #111",
                paddingBottom: 2,
                fontWeight: 600,
              }}
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>

      {/* preview flotante */}
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          pointerEvents: "none",
          transition: "opacity .18s ease, transform .18s ease",
          opacity: active ? 1 : 0,
          zIndex: 9999,
          filter: "drop-shadow(0 10px 30px rgba(0,0,0,.4))",
        }}
      >
        {active && (
          <div
            style={{
              width: "min(15vw, 480px)",
              height: "min(15w, 300px)",
              overflow: "hidden",
              borderRadius: 14,
              border: "1px solid rgba(0,0,0,0.1)",
              background: "#fff",
            }}
          >
            <img
              src={active.preview}
              alt={active.label}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
