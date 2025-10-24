import { useEffect, useRef } from "react";

type Props = {
  images: string[];
  gapVh?: number;
  wheelMult?: number;   // sensibilidad rueda
  dragMult?: number;    // sensibilidad arrastre
  friction?: number;    // 0.90..0.98 inercia
  scaleAmp?: number;    // amplitud del zoom extra (al centrarse)
  moveAmp?: number;     // amplitud del movimiento interno (px por px)
};

export default function SliderVertical({
  images,
  gapVh = 6,
  wheelMult = 1.0,
  dragMult = 1.0,
  friction = 0.95,
  scaleAmp = 0.12, // 0.10–0.18
  moveAmp = 0.25,  // 0.20–0.35
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  // Estado físico
  const offset = useRef(0);
  const vel = useRef(0);
  const dragging = useRef(false);
  const lastY = useRef(0);

  // Zoom base dinámico según viewport (se recalcula en resize)
  const baseScaleRef = useRef(1.18);
  const computeBaseScale = () => {
    //  ≤1000px → ~1.16 ; ≥2000px → ~1.32 (ajusta si quieres más/menos zoom)
    const w = window.innerWidth;
    const t = Math.min(Math.max((w - 1000) / 1000, 0), 1); // 0..1
    return 1.16 + t * 0.16;
  };

  // Respeto a reduce motion
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Recalcula baseScale en resize
  useEffect(() => {
    const onResize = () => {
      baseScaleRef.current = computeBaseScale();
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const track = trackRef.current!;
    if (!track) return;

    const onWheel = (e: WheelEvent) => {
      if (prefersReduced) return; // opcional: sin inercia con reduce motion
      vel.current += e.deltaY * wheelMult;
    };

    const onDown = (e: PointerEvent) => {
      dragging.current = true;
      lastY.current = e.clientY;
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dy = e.clientY - lastY.current;
      lastY.current = e.clientY;
      vel.current += -dy * dragMult;
    };

    const onUp = () => {
      dragging.current = false;
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    let raf = 0;
    const loop = () => {
      const half = track.scrollHeight / 2; // duplicamos lista → mitad es un ciclo

      // Avanza posición
      offset.current += vel.current;
      vel.current *= prefersReduced ? 0.85 : friction;

      // Loop infinito protegido
      if (offset.current >= half) offset.current -= half;
      if (offset.current < 0) offset.current += half;

      // Mueve el track
      track.style.transform = `translate3d(0, ${-offset.current}px, 0)`;

      // === Parallax interno (clamp, estable) ===
      const slides = Array.from(track.children) as HTMLElement[];
      const vh = window.innerHeight;
      const center = vh / 2;

      for (const slide of slides) {
        const img = slide.querySelector("img") as HTMLImageElement | null;
        if (!img) continue;

        // Solo pedimos rect una vez por slide en este frame
        const r = slide.getBoundingClientRect();
        const slideCenter = r.top + r.height / 2;
        const dist = slideCenter - center; // px (+ abajo, - arriba)

        // Normalización suave (0..1)
        const norm = Math.min(Math.abs(dist) / (vh * 0.7), 1);

        // Zoom base dinámico + extra al centrarse
        const base = baseScaleRef.current;   // dinámico
        const extra = (1 - norm) * scaleAmp; // 0..scaleAmp
        const scale = base + extra;          // nunca baja de base

        // Contramovimiento vertical interior con límite
        const rawShift = -dist * moveAmp;      // px
        const maxShift = slide.clientHeight * 0.12; // 12% de la altura
        const shift = Math.max(-maxShift, Math.min(maxShift, rawShift));

        // Mantén SIEMPRE el translate(-50%,-50%) para centrar el bitmap
        img.style.transform = `translate(-50%,-50%) translateY(${shift}px) scale(${scale})`;
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [wheelMult, dragMult, friction, scaleAmp, moveAmp, prefersReduced]);

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
          gap: `${gapVh}vh`,
          alignItems: "center",           // centra los slides → borde simétrico
          willChange: "transform",
          touchAction: "none",
          userSelect: "none",
        }}
      >
        {[...images, ...images].map((src, i) => (
          <div
            key={`${i}-${src}`}
            style={{
              position: "relative",
              width: "clamp(720px, 92vw, 2500px)", // controla borde lateral y máximo
              height: "min(80vh, 850px)",
              margin: 0,
              overflow: "hidden",
              borderRadius: "60px / 80px",
              background: "#111",
              boxShadow: "0 18px 60px rgba(0,0,0,0.65)",
              clipPath: "inset(0 round 60px / 80px)", // máscara curva tipo film
            }}
          >
            {/* Imagen centrada; el loop añade translateY + scale */}
            <img
              src={src}
              alt={`slide-${i}`}
              draggable={false}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "120%",
                height: "120%",
                objectFit: "cover",
                transform: "translate(-50%,-50%) scale(1.18)", // se sobrescribe en loop
                transformOrigin: "center center",
                willChange: "transform",
                filter: "brightness(0.95)",
                transition: "filter 0.25s ease",
              }}
            />

            {/* Vignette y gradiente por tarjeta (no global) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(100% 50% at 50% 50%, rgba(0,0,0,0) 75%, rgba(0,0,0,0.6) 100%), " +
                  "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0) 50%, rgba(0,0,0,0.8))",
                mixBlendMode: "multiply",
                pointerEvents: "none",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
