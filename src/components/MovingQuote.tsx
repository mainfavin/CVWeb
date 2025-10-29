import React from 'react';

// Definición de las props para hacer el componente configurable
type MovingQuoteProps = {
  quote: string;
  speed?: number; // Duración de la animación en segundos (por defecto 4s)
  fontSize?: string; // Por ejemplo, "clamp(1.5rem, 4vw, 2.2rem)"
  fontFamily?: string; // Por ejemplo, "serif" o "sans-serif"
};

export default function MovingQuote({
  quote = "“The only constant in life is change, never stop moving.”",
  speed = 4, // 4 segundos por defecto
  fontSize = "clamp(1.5rem, 4vw, 2.2rem)",
  fontFamily = "serif",
}: MovingQuoteProps) {

  // Usamos el valor de 'speed' de las props en la definición de la animación CSS
  const animationStyle = `moveAndLoop ${speed}s ease-in-out infinite alternate`;
  
  // Modificamos el porcentaje de movimiento en los keyframes para ser más sutil en varias líneas.
  // Usamos un div intermedio para centrar y aplicar el movimiento al texto multi-línea.

  return (
    <section
      style={{
        width: "min(1400px, 92vw)",
        margin: "3.2rem auto 2rem",
        padding: "30px 0",
        overflow: "hidden", // Sigue ocultando el desplazamiento horizontal no deseado
      }}
    >
      <div 
        style={{
          display: 'flex', 
          justifyContent: 'center', 
          width: '100%',
        }}
      >
        {/* El párrafo con la animación continua y **sin** white-space: nowrap */}
        <p
          style={{
            fontFamily: fontFamily,
            fontSize: fontSize,
            fontWeight: 300,
            fontStyle: "italic",
            opacity: 0.9,
            // Aumentamos el ancho máximo para dar más espacio horizontal al movimiento
            width: "min(800px, 90%)", 
            lineHeight: 1.3,
            textAlign: "center",
            textShadow: "0 0 10px rgba(255, 255, 255, 0.15), 0 0 5px rgba(255, 255, 255, 0.1)",
            
            // Aplicamos la animación
            animation: animationStyle,
          }}
        >
          {quote}
        </p>
      </div>

      {/* Definiciones CSS para la animación */}
      <style>{`
        /* Keyframes de animación para el movimiento más notorio */
        @keyframes moveAndLoop {
          /* Ahora se mueve 3% hacia la izquierda y 3% hacia la derecha */
          0% { transform: translateX(-3%); } 
          100% { transform: translateX(3%); } 
        }
      `}</style>
    </section>
  );
}
