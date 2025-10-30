// src/components/TextOverlay.tsx


type TextOverlayProps = {
  title?: string;
  subtitle?: string;
  opacity?: number;   // 0..1
  scale?: number;     // 1..1.1
  shiftY?: number;    // px
};

export default function TextOverlay({
  title,
  subtitle,
  opacity = 1,
  scale = 1,
  shiftY = 0,
}: TextOverlayProps) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        color: "#fff",
        padding: "0 4vw",
        opacity,
        transform: `translate3d(0, ${shiftY}px, 0) scale(${scale})`,
        willChange: "transform, opacity",
        transition: "opacity .2s ease, transform .2s ease",
        pointerEvents: "none",
      }}
      data-text
    >
      <div>
        {title && (
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(28px, 5vw, 72px)",
              letterSpacing: "0.02em",
              fontWeight: 800,
              textShadow: "0 2px 12px rgba(0,0,0,0.4)",
            }}
          >
            {title}
          </h2>
        )}
        {subtitle && (
          <p
            style={{
              marginTop: "0.8rem",
              fontSize: "clamp(14px, 2vw, 22px)",
              opacity: 0.9,
              textShadow: "0 1px 8px rgba(0,0,0,0.35)",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
