import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import FilmFrame from "./FilmFrame";
import TextOverlay from "./TextOverlay";
import { useInertialReel } from "../hooks/useInertialReel";

type Item = { image: string; title?: string; subtitle?: string };

type Props = {
  items: Item[];
  slugs?: string[];
  gapVh?: number;
  scaleAmp?: number;
  moveAmp?: number;
  wheelMult?: number;
  dragMult?: number;
  friction?: number;
};

export default function VerticalReel({
  items,
  slugs = [],
  gapVh = 6,
  scaleAmp = 0.12,
  moveAmp = 0.25,
  wheelMult = 0.55,
  dragMult = 0.20,
  friction = 0.96
}: Props) {
  const baseScaleRef = useRef(1.18);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      const t = Math.min(Math.max((w - 1000) / 1000, 0), 1);
      baseScaleRef.current = 1.16 + t * 0.16;
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const updateFrame = () => {
    const track = trackRef.current!;
    const slides = Array.from(track.children) as HTMLElement[];
    const vh = window.innerHeight;
    const center = vh / 2;

    slides.forEach(slide => {
      const img  = slide.querySelector("img") as HTMLImageElement | null;
      const text = slide.querySelector("[data-text]") as HTMLDivElement | null;
      if (!img) return;

      const r = slide.getBoundingClientRect();
      const slideCenter = r.top + r.height / 2;
      const dist = slideCenter - center;
      const norm = Math.min(Math.abs(dist) / (vh * 0.7), 1);

      const base  = baseScaleRef.current;
      const extra = (1 - norm) * scaleAmp;
      const scale = base + extra;

      const rawShift = -dist * moveAmp;
      const maxShift = slide.clientHeight * 0.12;
      const shift    = Math.max(-maxShift, Math.min(maxShift, rawShift));

      img.style.transform =
        `translate(-50%,-50%) translateY(${shift}px) scale(${scale})`;

      if (text) {
        text.style.opacity   = String(1 - norm * 0.85);
        text.style.transform =
          `translate3d(0, ${dist * -0.05}px, 0) scale(${1 + (1 - norm) * 0.06})`;
      }
    });
  };

  const { trackRef, isDragging, justDragged } = useInertialReel(updateFrame, {
    wheelMult,
    dragMult,
    friction,
  });

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden", background: "#0e0e0e" }}>
      <div
        ref={trackRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: `${gapVh}vh`,
          willChange: "transform",
          touchAction: "none",
          userSelect: "none",
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        {[...items, ...items].map((item, i) => {
          const slug = slugs.length ? slugs[i % slugs.length] : undefined;
          return (
            <FilmFrame
              key={`${i}-${item.image}`}
              width="clamp(720px, 92vw, 2500px)"
              height="min(80vh, 850px)"
            >
              <img
                src={item.image}
                alt={item.title ?? `slide-${i}`}
                draggable={false}
                style={{
                  position: "absolute",
                  top: "50%", left: "50%",
                  width: "120%", height: "120%",
                  objectFit: "cover",
                  transform: "translate(-50%,-50%) scale(1.18)",
                  transformOrigin: "center center",
                  willChange: "transform",
                  filter: "brightness(0.95)",
                  transition: "filter .25s ease",
                }}
              />

              {(item.title || item.subtitle) && (
                <TextOverlay title={item.title} subtitle={item.subtitle} />
              )}

              {slug && (
                  <Link
                    to={`/project/${slug}`}
                    aria-label={`Abrir proyecto ${item.title ?? slug}`}
                    draggable={false}
                    onClick={(e) => {
                      if (justDragged) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 2,
                      cursor: "pointer",
                      // opcional: durante drag desactiva eventos para mayor seguridad
                      pointerEvents: isDragging ? "none" : "auto",
                    }}
                  />
                )}
            </FilmFrame>
          );
        })}
      </div>
    </div>
  );
}
