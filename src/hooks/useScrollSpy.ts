import { useEffect, useState } from "react";

type Options = { rootMarginTop?: number };

/**
 * Devuelve el id de la sección visible.
 * Usa IntersectionObserver (sincondiciones → sin warnings).
 */
export function useScrollSpy(ids: string[], opts?: Options) {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    const elements = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (elements.length === 0) return;

    const margin = opts?.rootMarginTop ?? 100;
    const io = new IntersectionObserver(
      (entries) => {
        // elegimos la entrada más cercana a la parte superior que esté intersectando
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];

        if (visible) setActive(visible.target.id);
      },
      { root: null, threshold: 0.2, rootMargin: `-${margin}px 0px -65% 0px` }
    );

    elements.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [ids, opts?.rootMarginTop]);

  return active;
}
