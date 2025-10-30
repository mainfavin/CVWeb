import React from "react";

type FilmFrameProps = {
  children: React.ReactNode;
  width?: string;   // ej: "100%" o "clamp(720px, 92vw, 2500px)"
  height?: string;  // ej: "min(80vh, 850px)"
  curveX?: number;  // radio horizontal borde
  curveY?: number;  // radio vertical borde
  vignette?: number; // 0..1 fuerza de viñeta
  style?: React.CSSProperties;
};

export default function FilmFrame({
  children,
  width = "clamp(720px, 92vw, 2500px)",
  height = "min(80vh, 850px)",
  curveX = 60,
  curveY = 80,
  vignette = 0.6,
  style,
}: FilmFrameProps) {
  const clip = `inset(0 round ${curveX}px / ${curveY}px)`;
  const vignetteBg =
    `radial-gradient(120% 80% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,${vignette}) 100%),` +
    `linear-gradient(to bottom, rgba(0,0,0,${Math.min(vignette + 0.2, 1)}), rgba(0,0,0,0) 30%, rgba(0,0,0,${Math.min(vignette + 0.2, 1)}))`;

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        overflow: "hidden",
        borderRadius: `${curveX}px / ${curveY}px`,
        clipPath: clip,
        background: "#111",
        boxShadow: "0 18px 60px rgba(0,0,0,0.65)",
        ...style,
      }}
    >
      {children}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: vignetteBg,
          mixBlendMode: "multiply",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
