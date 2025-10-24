import { useEffect, useRef } from "react";

type Props = {
  images: string[];
  gapVh?: number;
  wheelMult?: number;
  dragMult?: number;
  friction?: number;   // 0.9..0.99 (inercia)
  parallax?: number;   // 0..1 cuánto “reacciona” la imagen interna al centro
  baseDrift?: number;  // 0..1 cuánto se mueve SIEMPRE con el scroll (todas)
};

export default function SliderVertical({
  images,
  gapVh = 8,
  wheelMult = 1.0,
  dragMult = 1.0,
  friction = 0.94,
  parallax = 0.35,
  baseDrift = 0.06,
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
    const onPointerUp = () => { isDragging.current = false; };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("blur", onPointerUp);

    let raf = 0;
    const tick = () => {
      const half = track.scrollHeight / 2;

      offset.current += velocity.current;
      velocity.current *= friction;

      if (offset.current >= half) offset.current -= half;
      if (offset.current < 0)     offset.current += half;

      track.style.transform = `translate3d(0, ${-offset.current}px, 0)`;

      // PARALLAX interno para TODAS:
      const slides = Array.from(track.children) as HTMLElement[];
      const vh = window.innerHeight;
      const center = vh / 2;

      for (const slide of slides) {
        const rect = slide.getBoundingClientRect();
        const slideCenter = rect.top + rect.height / 2;
        const dist = slideCenter - center;

        // desplazamiento base ligado al scroll total (todas se mueven)
        const base = -offset.current * baseDrift;

        // desplazamiento por distancia al centro (efecto “estabilización”)
        const maxShift = rect.height * 0.15;
        const react = -dist * parallax;

        let shift = base + react;
        if (shift >  maxShift) shift =  maxShift;
        if (shift < -maxShift) shift = -maxShift;

        const img = slide.querySelector("img") as HTMLImageElement | null;
        if (img) {
          img.style.transform = `translate3d(0, ${shift}px, 0) scale(1.22)`;
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
      window.removeEventListener("blur", onPointerUp);
    };
  }, [wheelMult, dragMult, friction, parallax, baseDrift]);

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
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
              width: "min(92vw, 1100px)",
              height: "min(78vh, 700px)",
              overflow: "hidden",
              borderRadius: 24,
              background: "#141414",
              boxShadow: "0 14px 44px rgba(0,0,0,0.48)",
            }}
          >
            <img
              src={src}
              alt={`slide-${i}`}
              draggable={false}
              style={{
                width: "122%",
                height: "122%",
                objectFit: "cover",
                position: "absolute",
                top: "-11%",
                left: "-11%",
                filter: "brightness(0.94)",
                transform: "scale(1.22)",
                transition: "filter 0.25s ease",
                willChange: "transform",
              }}
            />

            {/* Vignette + gradiente por IMAGEN (no en la ventana) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                // borde oscurecido suave + top/bottom fade
                background:
                  "radial-gradient(120% 80% at 50% 50%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.35) 100%), " +
                  "linear-gradient(to bottom, rgba(0,0,0,0.55), transparent 35%, rgba(0,0,0,0.55))",
                pointerEvents: "none",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
