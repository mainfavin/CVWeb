import Icon from "./Icon";

export type SocialItem = {
  href: string;
  name: "instagram" | "linkedin" | "mail" | "github";
  title?: string;
};

type Props = {
  items?: SocialItem[];
  fixed?: boolean;
  direction?: "row" | "column";
  gap?: number;
  bubbleSize?: number;
  iconSize?: number;
  bubbleBg?: string;
  iconColor?: string;
  brandHover?: boolean;
  top?: string;
  right?: string;
};

const BRAND_COLORS: Record<string, string> = {
  instagram: "#E1306C",
  linkedin:  "#0A66C2",
  mail:      "#810000ff",
  github:    "#242424f7",
};

export default function SocialBubbles({
  items = [
    { name: "instagram", href: "https://www.instagram.com/marcos__in/" },
    { name: "linkedin",  href: "https://www.linkedin.com/in/marcosinfantevin/"  },
    { name: "mail",      href: "mailto:contact@marcosinfante.com" },
    { name: "github",   href: "https://github.com/mainfavin?tab=repositories" },
  
  ],
  fixed = false,
  direction = "row",
  gap = 14,
  bubbleSize = 60,
  iconSize = 22,
  bubbleBg = "#fff",
  iconColor = "#000",
  brandHover = false,
  top,
  right,
}: Props) {
  const wrapStyle: React.CSSProperties = fixed
    ? {
        position: "fixed",
        top: top ?? "auto",
        right: right ?? "auto",
        zIndex: 20,
        display: "flex",
        flexDirection: direction,
        gap,
      }
    : {
        display: "flex",
        flexDirection: direction,
        gap,
      };

  return (
    <div style={wrapStyle}>
      {items.map((it) => (
        <a
          key={it.href + it.name}
          href={it.href}
          target="_blank"
          rel="noreferrer"
          title={it.title ?? it.name}
          style={{
            "--icon-color": iconColor,
            width: bubbleSize,
            height: bubbleSize,
            borderRadius: "50%",
            background: bubbleBg,
            boxShadow: "0 6px 18px rgba(0,0,0,0.20)",
            display: "grid",
            placeItems: "center",
            transition: "transform .18s ease, background .18s ease",
          } as React.CSSProperties}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
            if (brandHover) {
              (e.currentTarget as HTMLAnchorElement).style.background = BRAND_COLORS[it.name] ?? bubbleBg;
              (e.currentTarget as HTMLAnchorElement).style.setProperty("--icon-color", "#fff");
            }
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLAnchorElement).style.background = bubbleBg;
            (e.currentTarget as HTMLAnchorElement).style.setProperty("--icon-color", iconColor);
          }}
        >
          <Icon
            name={it.name}
            size={iconSize}
            
            color="var(--icon-color)"
          />
        </a>
      ))}
    </div>
  );
}
