import { useTranslation } from "react-i18next";

export type LanguageItem = {
  name: "en" | "es" | "nl" | "fr";
  title?: string;
};

type Props = {
  items?: LanguageItem[];
  fixed?: boolean;
  direction?: "row" | "column";
  gap?: number;
  bubbleSize?: number;     // diámetro
  top?: string;
  right?: string;
  closeMenuOnChange?: () => void;
};

export default function LanguageBubbles({
  items = [{ name: "en" }, { name: "es" }, { name: "nl" }, { name: "fr" }],
  fixed = false,
  direction = "column",
  gap = 14,
  bubbleSize = 36,
  top,
  right,
  closeMenuOnChange,
}: Props) {
  const { i18n } = useTranslation();

  const wrapStyle: React.CSSProperties = fixed
    ? { position: "fixed", top, right, zIndex: 20, display: "flex", flexDirection: direction, gap }
    : { display: "flex", flexDirection: direction, gap };

  return (
    <div style={wrapStyle} aria-label="Language selector">
      {items.map((it) => {
        const active = i18n.language === it.name;
        const url = `/images/icons/${it.name}.svg`; // asegúrate de que existen en /public

        return (
          <button
            key={it.name}
            type="button"
            aria-pressed={active}
            title={it.title ?? it.name.toUpperCase()}
            onClick={() => {
              i18n.changeLanguage(it.name);
              try { localStorage.setItem("lang", it.name); } catch {/* */}
              closeMenuOnChange?.();
            }}
            style={{
              width: bubbleSize,
              height: bubbleSize,
              borderRadius: "50%",
              border: "1px solid rgba(0,0,0,0.12)",
              backgroundImage: `url(${url})`,   // ← bandera como fondo
              backgroundSize: "cover",          // ← rellena el círculo
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              boxShadow: "0 6px 18px rgba(0,0,0,.20)",
              cursor: "pointer",
              transition: "transform .18s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            }}
          />
        );
      })}
    </div>
  );
}
