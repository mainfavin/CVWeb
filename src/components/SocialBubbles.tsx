// src/components/SocialBubbles.tsx
import Icon from "./Icon";

type Item = {
  href: string;
  name: "instagram" | "linkedin" | "mail" | "github";
  title?: string;
};

export default function SocialBubbles({
  items = [
    { name: "instagram", href: "https://www.instagram.com/marcos__in/", title: "Instagram" },
    { name: "linkedin",  href: "https://www.linkedin.com/in/marcosinfantevin/", title: "LinkedIn" },
    { name: "mail",      href: "mailto:contact@marcosinfante.com", title: "Email" },
    { name: "github",   href: "https://github.com/mainfavin?tab=repositories", title: "GitHub" },
  ],
  top = "32px",
  right = "96px", // deja hueco para el FAB
}: {
  items?: Item[];
  top?: string;
  right?: string;
}) {
   return (
    <div
      style={{
        
        top,
        right,
        zIndex: 90,
        display: "flex",
        gap: 10,
      }}
    >
      {items.map((it) => (
        <a
          key={it.href}
          href={it.href}
          target={it.href.startsWith("http") ? "_blank" : "_self"}
          rel="noreferrer"
          title={it.title || it.name}
          style={{
            width: 44,
            height: 44,
            background: "#fff",
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
            border: "1px solid rgba(0,0,0,0.12)",
            transition: "transform .15s ease, box-shadow .15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 10px 22px rgba(0,0,0,0.28)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.25)";
          }}
        >
          <Icon name={it.name} size={20} color="#000" title={it.title} />
        </a>
      ))}
    </div>
  );
}