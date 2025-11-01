import BigMarquee from "../components/BigMarquee";
import Footer from "../components/Footer";
import HoverPreviewLinks from "../components/HoverPreviewLinks";
import { FxLink, FxText } from "../components/HoverFx";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation("contact");

  return (
    <main style={{ background: "#0e0e0e", color: "#111" }}>
      {/* Sección clara principal */}
      <section
        style={{
          background: "#f4f4f1",
          color: "#111",
          minHeight: "72vh",
          padding: "clamp(20px, 4vw, 48px)",
          borderBottom: "1px solid #e5e2da",
        }}
      >
        {/* Cabecera minimal */}
        <header
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            gap: 16,
            alignItems: "center",
            marginBottom: "min(6vh, 64px)",
          }}
        >
          <a href="/" style={{ fontWeight: 800, textDecoration: "none", color: "inherit" }}>
            {t("contact.brand")}
          </a>

          <nav
            style={{
              display: "flex",
              gap: "2rem",
              justifyContent: "center",
              fontSize: 14,
              opacity: 0.85,
              flexWrap: "wrap",
            }}
          >
            <FxLink href="/about">{t("contact.nav.about")}</FxLink>
            <FxLink href="/work">{t("contact.nav.work")}</FxLink>
            <FxLink href="/contact">{t("contact.nav.contact")}</FxLink>
          </nav>
        </header>

        {/* Doble columna */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(260px, 0.9fr) 1.2fr",
            gap: "min(6vw, 80px)",
            alignItems: "start",
          }}
        >
          {/* COPY IZQUIERDA */}
          <aside>
            <h1 style={{ margin: 0, fontSize: "clamp(28px, 4.6vw, 54px)", lineHeight: 1.05 }}>
              <FxText>{t("contact.hero.title")}</FxText>
            </h1>

            <p style={{ marginTop: 18, lineHeight: 1.7, maxWidth: 540, opacity: 0.9 }}>
              <FxText>{t("contact.hero.paragraph")}</FxText>
            </p>

            <div style={{ marginTop: 18 }}>
              <FxLink href="/about">{t("contact.links.services")}</FxLink>
              <span style={{ opacity: 0.4, margin: "0 10px" }}>·</span>
              <FxLink href="/work">{t("contact.links.latestWork")}</FxLink>
            </div>

            <div style={{ marginTop: 26, fontSize: 13, opacity: 0.7 }}>
              <FxText>{t("contact.location")}</FxText>
            </div>
          </aside>

          {/* DERECHA – datos y redes */}
          <section>
            <div style={{ display: "grid", gap: "1.2rem" }}>
              <div style={{ fontSize: "clamp(22px, 3.2vw, 42px)", fontWeight: 800 }}>
                <FxText>{t("contact.phone.es")}</FxText>
              </div>

              <div style={{ fontSize: "clamp(22px, 3.2vw, 42px)", fontWeight: 800 }}>
                <FxText>{t("contact.phone.nl")}</FxText>
              </div>

              <FxLink
                href="mailto:contact@marcosinfante.com"
                style={{ fontSize: "clamp(22px, 3.2vw, 42px)", fontWeight: 800 }}
              >
                {t("contact.email")}
              </FxLink>

              <div style={{ marginTop: "1.2rem" }}>
                <HoverPreviewLinks
                  items={[
                    {
                      label: t("contact.social.instagram"),
                      href: "https://www.instagram.com/marcos__in/",
                      preview: "/previews/instagram.jpg",
                      external: true,
                    },
                    {
                      label: t("contact.social.linkedin"),
                      href: "https://www.linkedin.com/in/marcosinfantevin/",
                      preview: "/previews/linkedin.jpg",
                      external: true,
                    },
                    {
                      label: t("contact.social.github"),
                      href: "https://github.com/mainfavin?tab=repositories",
                      preview: "/previews/github.jpg",
                      external: true,
                    },
                  ]}
                />
              </div>

              <div style={{ marginTop: "1.8rem", fontSize: 12, opacity: 0.7 }}>
                <div>
                  <FxText>{t("contact.billing.title")}</FxText>
                </div>
                <div>
                  <FxText>{t("contact.billing.address1")}</FxText>
                </div>
                <div>
                  <FxText>{t("contact.billing.address2")}</FxText>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Firma / marquee */}
      <BigMarquee
        text={t("contact.signature")}
        height="24vh"
        speed={24}
        contrast={0.8}
        fill="solid"
        strokeWidth={1}
      />

      <Footer />
    </main>
  );
}
