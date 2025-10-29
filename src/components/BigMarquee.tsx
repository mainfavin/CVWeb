import { useEffect, useMemo, useRef } from "react";

type FillMode = "auto" | "solid" | "image";

type Props = {
  text: string;
  height?: number | string;
  speed?: number;        // segundos por ciclo de scroll
  contrast?: number;     // 0..1 fondo oscuro bajo el marquee
  maxSkew?: number;      // grados máx. con el mouse
  parallax?: number;     // px máx. con el mouse
  // Relleno del texto
  fill?: FillMode;       // "image" | "solid" | "auto"
  imageSrc?: string;     // si fill="image"
  color?: string;        // si fill="solid"
  strokeColor?: string;  // contorno opcional
  strokeWidth?: number;  // contorno opcional
  // Tipografía
  minFont?: number;      // px mínimos del texto
  prefVw?: number;       // vw preferido
  maxFont?: number;      // px máximos del texto
};

export default function BigMarquee({
  text,
  height = "24vh",
  speed = 24,
  contrast = 0.06,
  maxSkew = 6,
  parallax = 10,
  fill = "auto",
  imageSrc,
  color = "#111",
  strokeColor = "#fff",
  strokeWidth = 1,
  minFont = 120,
  prefVw = 18,
  maxFont = 260,
}: Props) {
  const id = useMemo(() => "marq_" + Math.random().toString(36).slice(2), []);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useRef<number>(0);
  const mouseY = useRef<number>(0);
  const skew = useRef<number>(0);
  const yoff = useRef<number>(0);
  const raf = useRef<number | null>(null);

  // Interacción con el ratón: skew + parallax
  useEffect(() => {
    const root = wrapRef.current?.parentElement;
    if (!root) return;

    const onMove = (e: MouseEvent) => {
      const r = root.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const nx = (e.clientX - cx) / (r.width / 2);
      const ny = (e.clientY - cy) / (r.height / 2);
      mouseX.current = Math.max(-1, Math.min(1, nx));
      mouseY.current = Math.max(-1, Math.min(1, ny));
    };

    const tick = () => {
      skew.current += ((mouseX.current * maxSkew) - skew.current) * 0.08;
      yoff.current += ((mouseY.current * parallax) - yoff.current) * 0.08;

      if (wrapRef.current) {
        wrapRef.current.style.transform = `translateY(calc(-50% + ${yoff.current}px)) skewX(${skew.current}deg)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    root.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(tick);

    return () => {
      root.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [maxSkew, parallax]);

  const wantImage = fill === "image" || (fill === "auto" && imageSrc);

  const spanStyle: React.CSSProperties = {
    display: "inline-block", // importante para background-clip en algunos navegadores
    fontWeight: 800,
    letterSpacing: "-0.01em",
    fontSize: `clamp(${minFont}px, ${prefVw}vw, ${maxFont}px)`,
    lineHeight: 1,
    // contorno
    WebkitTextStroke: strokeWidth ? `${strokeWidth}px ${strokeColor}` : undefined,
    // Relleno con imagen
    ...(wantImage && imageSrc
      ? {
          color: "transparent",
          WebkitTextFillColor: "transparent",
          backgroundImage: `url(${imageSrc})`,
          backgroundRepeat: "repeat",
          backgroundSize: "auto 100%",
          backgroundPosition: "center",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }
      : {
          color, // relleno sólido
        }),
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",                 // ocupa todo el ancho del viewport
        left: "50%",
        transform: "translateX(-50%)",  // evita 1px de bleed por scrollbars
        height,
        overflow: "hidden",
        background: `rgba(0,0,0,${contrast})`, // pon 0 para quitar el fondo
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
          {[0, 1, 2].map((i) => (
            <span key={i} style={spanStyle}>
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
