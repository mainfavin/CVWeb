import { useEffect, useRef } from "react";

type Props = {
  images: string[];
  gapVh?: number;
  wheelMult?: number;
  dragMult?: number;
  friction?: number;     // 0.90..0.98 inercia
  scaleAmp?: number;     // amplitud del zoom extra
  moveAmp?: number;      // amplitud del movimiento interno (px por px)
};

export default function SliderVertical({
  images,
  gapVh = 6,
  wheelMult = 1.0,
  dragMult = 1.0,
  friction = 0.95,
  scaleAmp = 0.12,   // 0.10–0.18
  moveAmp = 0.25,    // 0.20–0.35
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offset   = useRef(0);
  const vel      = useRef(0);
  const dragging = useRef(false);
  const lastY    = useRef(0);

  useEffect(() => {
    const track = trackRef.current!;
    const onWheel = (e: WheelEvent) => (vel.current += e.deltaY * wheelMult);
    const onDown  = (e: PointerEvent) => { dragging.current = true; lastY.current = e.clientY; (e.target as HTMLElement).setPointerCapture?.(e.pointerId); };
    const onMove  = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dy = e.clientY - lastY.current;
      lastY.current = e.clientY;
      vel.current += -dy * dragMult;
    };
    const onUp    = () => (dragging.current = false);

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    let raf = 0;
    const loop = () => {
      const half = track.scrollHeight / 2;

      offset.current += vel.current;
      vel.current *= friction;

      // loop infinito protegido
      if (offset.current >= half) offset.current -= half;
      if (offset.current < 0)     offset.current += half;

      track.style.transform = `translate3d(0, ${-offset.current}px, 0)`;

      // === Parallax interno estable (clamp) ===
      const slides = Array.from(track.children) as HTMLElement[];
      const vh = window.innerHeight;
      const center = vh / 2;

      for (const slide of slides) {
        const img = slide.querySelector("img") as HTMLImageElement | null;
        if (!img) continue;

        const r = slide.getBoundingClientRect();
        const slideCenter = r.top + r.height / 2;
        const dist = slideCenter - center;          // px (positivo si está abajo)
        const norm = Math.min(Math.abs(dist) / (vh * 0.7), 1); // 0..1 (suave)

        // zoom: máximo en el centro, menor en extremos (pero NUNCA < base)
        const baseScale = 1.18;                     // zoom base para tapar bordes
        const extra     = (1 - norm) * scaleAmp;    // 0..scaleAmp
        const scale     = baseScale + extra;        // [1.18 .. 1.30 aprox]

        // movimiento vertical interno: contramovimiento suave
        const rawShift  = -dist * moveAmp;          // px
        const maxShift  = r.height * 0.12;          // límite 12% de la altura
        const shift     = Math.max(-maxShift, Math.min(maxShift, rawShift));

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
  }, [wheelMult, dragMult, friction, scaleAmp, moveAmp]);

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
              width: "100vw",                 // ocupa todo el ancho
              height: "min(80vh, 800px)",
              margin: 0,
              overflow: "hidden",
              borderRadius: 36,
              background: "#111",
              boxShadow: "0 18px 60px rgba(0,0,0,0.55)",
            }}
          >
            {/* Imagen SIEMPRE centrada; el parallax añade translateY + scale */}
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
                transform: "translate(-50%,-50%) scale(1.18)",
                transformOrigin: "center center",
                willChange: "transform",
                filter: "brightness(0.95)",
                transition: "filter 0.25s ease",
              }}
            />

            {/* Vignette + marco superior/inferior, por TARJETA */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(120% 80% at 50% 50%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.45) 100%), " +
                  "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0) 35%, rgba(0,0,0,0.6))",
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
