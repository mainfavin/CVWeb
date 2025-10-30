import type { CSSProperties, PropsWithChildren } from "react";

/**
 * Subrayado elástico + leve tracking en hover.
 * Úsalo para enlaces o texto enfatizado.
 */
export function FxLink(props: PropsWithChildren<{ href: string; external?: boolean; style?: CSSProperties }>) {
  const { href, external, style, children } = props;
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      style={{
        position: "relative",
        display: "inline-block",
        color: "inherit",
        textDecoration: "none",
        paddingBottom: 3,
        // subrayado “propio”
        background:
          "linear-gradient(currentColor, currentColor) left bottom / 0 2px no-repeat",
        transition: "background-size .25s ease, letter-spacing .25s ease, transform .25s ease, opacity .25s ease",
        letterSpacing: "0.02em",
        ...style,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLAnchorElement).style.backgroundSize = "100% 2px";
        (e.currentTarget as HTMLAnchorElement).style.letterSpacing = "0.06em";
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLAnchorElement).style.backgroundSize = "0 2px";
        (e.currentTarget as HTMLAnchorElement).style.letterSpacing = "0.02em";
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
      }}
    >
      {children}
    </a>
  );
}

/**
 * Texto “normal” con realce suave al pasar el ratón:
 * sube un poco el peso, gana contraste y micro-sombra.
 */
export function FxText(props: PropsWithChildren<{ style?: CSSProperties }>) {
  const { style, children } = props;
  return (
    <span
      style={{
        transition: "color .22s ease, text-shadow .22s ease, letter-spacing .22s ease, transform .22s ease",
        letterSpacing: "0.01em",
        ...style,
      }}
      onMouseEnter={e => {
        const t = e.currentTarget as HTMLSpanElement;
        t.style.color = "rgba(17,17,17,1)";
        t.style.textShadow = "0 0 0 rgba(0,0,0,0), 0 10px 30px rgba(0,0,0,.12)";
        t.style.letterSpacing = "0.02em";
        t.style.transform = "translateY(-0.5px)";
      }}
      onMouseLeave={e => {
        const t = e.currentTarget as HTMLSpanElement;
        t.style.color = "";
        t.style.textShadow = "none";
        t.style.letterSpacing = "0.01em";
        t.style.transform = "translateY(0)";
      }}
    >
      {children}
    </span>
  );
}
