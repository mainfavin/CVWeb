import { useEffect, useMemo, useRef } from "react";

type Props = {
  text: string;
  height?: number | string;
  speed?: number;     // segundos por ciclo (menor = más rápido)
  contrast?: number;  // 0..1 fondo oscuro
  maxSkew?: number;   // grados máximos de skew según cursor
  parallax?: number;  // px máx. de movimiento vertical con cursor
};

export default function BigMarquee({
  text,
  height = "26vh",
  speed = 26,
  contrast = 0.06,
  maxSkew = 6,
  parallax = 10,
}: Props) {
  const id = useMemo(() => "marquee_" + Math.random().toString(36).slice(2), []);
  const wrapRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const skew = useRef(0);
  const yoff = useRef(0);
  const raf = useRef<number>(0);

  // cursor → skew + parallax (suavizado)
  useEffect(() => {
    const el = wrapRef.current?.parentElement as HTMLElement | null;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = (e.clientX - cx) / (rect.width / 2);   // -1..1
      const ny = (e.clientY - cy) / (rect.height / 2);  // -1..1
      mouseX.current = Math.max(-1, Math.min(1, nx));
      mouseY.current = Math.max(-1, Math.min(1, ny));
    };

    const tick = () => {
      // amortiguación (lerp)
      skew.current += ((mouseX.current * maxSkew) - skew.current) * 0.08;
      yoff.current += ((mouseY.current * parallax) - yoff.current) * 0.08;

      if (wrapRef.current) {
        wrapRef.current.style.transform = `translateY(calc(-50% + ${yoff.current}px)) skewX(${skew.current}deg)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    el.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(tick);
    return () => {
      el.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [maxSkew, parallax]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height,
        overflow: "hidden",
        background: `rgba(0,0,0,${contrast})`,
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        ref={wrapRef}
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          willChange: "transform",
        }}
      >
        <div
          className={id}
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            gap: "6vw",
            animation: `${id}_slide ${speed}s linear infinite`,
          }}
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              style={{
                fontWeight: 800,
                letterSpacing: "-0.02em",
                fontSize: "min(22vw, 260px)",
                lineHeight: 1,
                color: "#111",
                WebkitTextStroke: "1px #fff",
                //textStroke: "1px #fff",
              }}
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      <style>
        {`
        @keyframes ${id}_slide {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .${id}:hover { animation-duration: ${Math.max(8, speed * 0.5)}s; }
        `}
      </style>
    </div>
  );
}
