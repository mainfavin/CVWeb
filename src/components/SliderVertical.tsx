import { useEffect, useRef } from "react";

type Props = {
  images: string[];
  gapVh?: number;
  wheelMult?: number;
  dragMult?: number;
  friction?: number;
  parallax?: number; // intensidad del efecto (zoom y desplazamiento)
};

export default function SliderVertical({
  images,
  gapVh = 8,
  wheelMult = 1.0,
  dragMult = 1.0,
  friction = 0.94,
  parallax = 0.4,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const velocity = useRef(0);
  const isDragging = useRef(false);
  const dragStartY = useRef(0);

  useEffect(() => {
    const track = trackRef.current!;
    const onWheel = (e: WheelEvent) => {
      velocity.current += e.deltaY * wheelMult;
    };
    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      dragStartY.current = e.clientY;
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dy = e.clientY - dragStartY.current;
      dragStartY.current = e.clientY;
      velocity.current += -dy * dragMult;
    };
    const onPointerUp = () => (isDragging.current = false);

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    let raf = 0;
    const tick = () => {
      const half = track.scrollHeight / 2;
      offset.current += velocity.current;
      velocity.current *= friction;
      if (offset.current >= half) offset.current -= half;
      if (offset.current < 0) offset.current += half;

      track.style.transform = `translate3d(0, ${-offset.current}px, 0)`;

      // Parallax dinámico con zoom
      const slides = Array.from(track.children) as HTMLElement[];
      const vh = window.innerHeight;
      const center = vh / 2;

      for (const slide of slides) {
        const rect = slide.getBoundingClientRect();
        const slideCenter = rect.top + rect.height / 2;
        const dist = slideCenter - center;

        // Escala basada en distancia al centro
        const t = Math.min(Math.abs(dist / vh), 1); // 0..1
        const scale = 1.1 - t * parallax * 0.3; // zoom-out al alejarse
        const translateY = -dist * parallax * 0.3; // pequeño desplazamiento

        const img = slide.querySelector("img") as HTMLImageElement | null;
        if (img) {
          img.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [wheelMult, dragMult, friction, parallax]);

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        background: "#0e0e0e",
      }}
    >
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
        }}
      >
        {[...images, ...images].map((src, i) => (
          <div
            key={i}
            style={{
              position: "relative",
              width: "min(90vw, 1100px)",
              height: "min(80vh, 720px)",
              overflow: "hidden",
              borderRadius: "28px",
              background: "#111",
              boxShadow: "0 18px 60px rgba(0,0,0,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Imagen interna */}
            <img
              src={src}
              alt={`slide-${i}`}
              draggable={false}
              style={{
                width: "110%",
                height: "110%",
                objectFit: "cover",
                transition: "filter 0.3s ease",
                willChange: "transform",
                transformOrigin: "center center",
                filter: "brightness(0.92)",
              }}
            />

            {/* Máscara y vignette cinematográfica */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(140% 100% at 50% 50%, rgba(0,0,0,0.0) 65%, rgba(0,0,0,0.4) 100%)," +
                  "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0) 35%, rgba(0,0,0,0.5))",
                pointerEvents: "none",
                mixBlendMode: "multiply",
              }}
            />

            {/* Borde curvado superior/inferior tipo proyección */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "30px",
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "30px",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
