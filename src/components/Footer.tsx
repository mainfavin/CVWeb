import Icon from "./Icon";
import { FxLink } from "./HoverFx";

type LinkItem = { href: string; label: string };
type Social = { name: "instagram" | "linkedin" | "mail" | "github"; href: string };

type Props = {
  socials?: Social[];
  legal?: LinkItem[];
  copy?: string;
};

export default function Footer({
  socials = [
    { name: "instagram", href: "https://instagram.com" },
    { name: "linkedin",  href: "https://www.linkedin.com/in/marcosinfantevin/"  },
    { name: "mail",      href: "mailto:hola@tudominio.com" },
    { name: "github",   href: "https://github.com/mainfavin?tab=repositories" },
  
  ],
  legal = [
    { href: "/cookie",  label: "COOKIE"  },
    { href: "/privacy", label: "PRIVACY" },
    { href: "/terms",   label: "TERMS"   },
  ],
  copy = `©${new Date().getFullYear()} · MARCOS INFANTE VIÑUELA`,
}: Props) {
  return (
    <footer
      style={{
        marginTop: "8vh",
        paddingTop: "6vh",
        borderTop: "1px dotted rgba(255,255,255,0.25)",
        width: "100vw",             // 👈 ocupa todo el ancho
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: 12,
          paddingInline: "clamp(12px, 3vw, 28px)",
          boxSizing: "border-box",
        }}
      >
        {/* Redes (con hover del enlace, el icono queda blanco) */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          {socials.map(s => (
            <FxLink
              key={s.name}
              href={s.href}
              external={s.href.startsWith("http")}
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <Icon name={s.name} size={20} />
            </FxLink>
          ))}
        </div>

        {/* Copy centrado */}
        <div style={{ textAlign: "center", opacity: 0.8, fontSize: 12, whiteSpace: "nowrap", color: "#fff" }}>
          {copy}
        </div>

        {/* Legales con efecto hover */}
        <div style={{ display: "flex", gap: 18, justifyContent: "flex-end", flexWrap: "wrap" }}>
          {legal.map(l => (
            <FxLink key={l.href} href={l.href} style={{ color: "#fff", fontSize: 12 }}>
              {l.label}
            </FxLink>
          ))}
        </div>
      </div>
    </footer>
  );
}
