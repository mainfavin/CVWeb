import Icon from "./Icon";

type Item = { id: string; label: string; icon?: "github" };
type Props = {
  items: Item[];
  activeId?: string | null;
  offsetTop?: number; // para compensar cabeceras fijas
};

export default function ProjectMenu({ items, activeId, offsetTop = 0 }: Props) {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const y = window.scrollY + rect.top - offsetTop;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Project sections"
      style={{
        position: "sticky",
        top: 16,
        alignSelf: "start",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {items.map((it) => {
        const active = activeId === it.id;
        return (
          <a
            key={it.id}
            href={`#${it.id}`}
            onClick={(e) => onClick(e, it.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              borderRadius: 9999,
              textDecoration: "none",
              background: active ? "#fff" : "#181818",
              color: active ? "#000" : "#fff",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 3px 12px rgba(0,0,0,0.18)",
              transform: "translateY(0)",
              transition: "transform .18s ease, background .18s ease, color .18s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            {it.icon && <Icon name={it.icon} size={16} color={active ? "#000" : "#fff"} />}
            <span>{it.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
