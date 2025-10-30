// src/hooks/useInertialReel.ts
import { useEffect, useRef, useState } from "react";

type Opts = { wheelMult?: number; dragMult?: number; friction?: number };
type FrameState = { offset: number; half: number };

export function useInertialReel(
  onFrame: (state: FrameState) => void,
  opts?: Opts
) {
  const wheelMult = opts?.wheelMult ?? 1.0;
  const dragMult  = opts?.dragMult  ?? 1.0;
  const friction  = opts?.friction  ?? 0.95;

  const trackRef = useRef<HTMLDivElement>(null);
  const offset   = useRef(0);
  const vel      = useRef(0);

  // estados internos
  const pressed     = useRef(false);
  const dragging    = useRef(false);      // solo true si se superó el umbral
  const didDrag     = useRef(false);
  const startY      = useRef(0);
  const lastY       = useRef(0);

  // estados públicos
  const [isDragging, setIsDragging]   = useState(false);
  const [justDragged, setJustDragged] = useState(false);

  const DRAG_THRESHOLD = 6;              // px para considerar que hubo drag
  const CLICK_SUPPRESS_MS = 140;         // ventana para cancelar el click

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onWheel = (e: WheelEvent) => { vel.current += e.deltaY * wheelMult; };

    const onDown  = (e: PointerEvent) => {
      pressed.current   = true;
      dragging.current  = false;
      didDrag.current   = false;
      startY.current    = e.clientY;
      lastY.current     = e.clientY;
      setIsDragging(false);
      setJustDragged(false);
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    };

    const onMove  = (e: PointerEvent) => {
      if (!pressed.current) return;

      const dy = e.clientY - lastY.current;
      lastY.current = e.clientY;
      vel.current  += -dy * dragMult;

      // activar drag solo si pasamos el umbral
      if (!dragging.current) {
        if (Math.abs(e.clientY - startY.current) > DRAG_THRESHOLD) {
          dragging.current = true;
          setIsDragging(true);
        }
      }
      if (dragging.current) didDrag.current = true;
    };

    const onUp    = () => {
      if (dragging.current) {
        // acabamos de arrastrar: activamos ventana para suprimir click
        setJustDragged(true);
        setTimeout(() => setJustDragged(false), CLICK_SUPPRESS_MS);
      }
      pressed.current  = false;
      dragging.current = false;
      setIsDragging(false);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    let raf = 0;
    const loop = () => {
      const half = track.scrollHeight / 2;

      offset.current += vel.current;
      vel.current    *= friction;

      if (offset.current >= half) offset.current -= half;
      if (offset.current < 0)     offset.current += half;

      track.style.transform = `translate3d(0, ${-offset.current}px, 0)`;
      onFrame({ offset: offset.current, half });

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
  }, [wheelMult, dragMult, friction, onFrame]);

  return { trackRef, isDragging, justDragged };
}
