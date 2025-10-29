import BigMarquee from "../components/BigMarquee";
import Footer from "../components/Footer";
import HoverPreviewLinks from "../components/HoverPreviewLinks";
import { FxLink, FxText } from "../components/HoverFx";

export default function Contact() {
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
        {/* Cabecera minimal distinta a la referencia */}
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
            MARCOS&nbsp;INFANTE
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
            <FxLink href="/about">ABOUT</FxLink>
            <FxLink href="/#work">WORK</FxLink>
            <FxLink href="/contact">CONTACT</FxLink>
          </nav>

         
        </header>

        {/* Doble columna: izquierda copy/índice; derecha datos + hover previews */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(260px, 0.9fr) 1.2fr",
            gap: "min(6vw, 80px)",
            alignItems: "start",
          }}
        >
          {/* COPY IZQUIERDA – con FxText/FxLink para dar vida sin abusar */}
          <aside>
            <h1 style={{ margin: 0, fontSize: "clamp(28px, 4.6vw, 54px)", lineHeight: 1.05 }}>
              <FxText>Let’s build thoughtful, cinematic web experiences.</FxText>
            </h1>

            <p style={{ marginTop: 18, lineHeight: 1.7, maxWidth: 540, opacity: 0.9 }}>
              <FxText>
                Disponible para proyectos de portfolio, motion, sites para marcas y páginas
                personales con intención editorial. También puedo ayudarte a migrar tu dominio de
                Squarespace a una implementación moderna en React/Vite.
              </FxText>
            </p>

            <div style={{ marginTop: 18 }}>
              <FxLink href="/#services">Ver servicios</FxLink>
              <span style={{ opacity: 0.4, margin: "0 10px" }}>·</span>
              <FxLink href="/project/moon-in-the-12th">Último trabajo</FxLink>
            </div>

            <div style={{ marginTop: 26, fontSize: 13, opacity: 0.7 }}>
              <FxText>Madrid, España · GMT+1</FxText>
            </div>
          </aside>

          {/* DERECHA – datos y redes con preview al cursor */}
          <section>
            <div style={{ display: "grid", gap: "1.2rem" }}>
              <div style={{ fontSize: "clamp(22px, 3.2vw, 42px)", fontWeight: 800 }}>
                <FxText>ES +34 644 98 33 44</FxText>
              </div>
             
              <div style={{ fontSize: "clamp(22px, 3.2vw, 42px)", fontWeight: 800 }}>
                <FxText>NL +31 06 20127319</FxText>
              </div>   
                
                
              

              <FxLink href="mailto:hola@tudominio.com" style={{ fontSize: "clamp(22px, 3.2vw, 42px)", fontWeight: 800 }}>
                hola@tudominio.com
              </FxLink>

              <div style={{ marginTop: "1.2rem" }}>
                <HoverPreviewLinks
                  items={[
                    { label: "INSTAGRAM", href: "https://instagram.com/tuuser", preview: "/previews/instagram.jpg", external: true },
                    { label: "LINKEDIN",  href: "https://linkedin.com/in/tu",   preview: "/previews/linkedin.jpg",  external: true },
                    { label: "GITHUB",   href: "https://behance.net/tu",       preview: "/previews/github.jpg",   external: true },
                  ]}
                />
              </div>

              <div style={{ marginTop: "1.8rem", fontSize: 12, opacity: 0.7 }}>
                <div><FxText>Billing / Studio</FxText></div>
                <div><FxText>Kantershof 402, 1104GW · Amsterdam</FxText></div>
                <div><FxText>The Netherlands</FxText></div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Firma gigante propia (reacciona al cursor) */}
      <BigMarquee text="MARCOS INFANTE VIÑUELA" height="24vh" speed={24} contrast={0.06} />

     

      <Footer />
    </main>
  );
}
