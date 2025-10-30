import { useEffect, useRef } from "react";

type Item = { src: string; alt?: string };
type Props = {
  items: Item[];
  onItemClick?: (index: number) => void;
};

export default function MiniGallery({ items, onItemClick }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Reveal en scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll("[data-card]")) as HTMLElement[];

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0) scale(1)";
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((c) => {
      c.style.opacity = "0";
      c.style.transform = "translateY(24px) scale(0.98)";
      io.observe(c);
    });

    return () => io.disconnect();
  }, []);

  // Tilt con el ratón
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;  // -0.5..0.5
    const dy = (e.clientY - cy) / rect.height; // -0.5..0.5
    const maxTilt = 6;
    target.style.transform = `rotateX(${-dy * maxTilt}deg) rotateY(${dx * maxTilt}deg)`;
  };
  const onMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: "grid",
        gap: "1.2rem",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      }}
    >
      {/* responsive */}
      <style>{`
        @media (max-width: 1100px) {
          [data-minigallery] { grid-template-columns: repeat(2, minmax(0,1fr)); }
        }
        @media (max-width: 700px) {
          [data-minigallery] { grid-template-columns: 1fr; }
        }
      `}</style>

      <div data-minigallery style={{ display: "contents" }}>
        {items.map((it, i) => (
          <div
            key={i}
            data-card
            style={{
              position: "relative",
              aspectRatio: "16 / 10",
              borderRadius: 18,
              overflow: "hidden",
              transformStyle: "preserve-3d",
              transition: "transform .25s ease, opacity .4s ease",
              cursor: onItemClick ? "pointer" : "default",
              background: "#111",
              boxShadow: "0 16px 60px rgba(0,0,0,.35)",
            }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onClick={() => onItemClick?.(i)}
          >
            <img
              src={it.src}
              alt={it.alt ?? `gallery-${i}`}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: "scale(1.05)",
                transition: "transform .35s ease, filter .25s ease",
                filter: "brightness(.95)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.12)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            />
            {/* vignette */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(120% 90% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,.55) 100%)",
                pointerEvents: "none",
                mixBlendMode: "multiply",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
