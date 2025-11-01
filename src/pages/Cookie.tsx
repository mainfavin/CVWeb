import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";

export default function Cookie() {
  const { t } = useTranslation("cookie");

  return (
    <main
      style={{
        background: "#0e0e0e",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10vh 4vw 6vh",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            maxWidth: "820px",
            width: "100%",
            textAlign: "center",
            lineHeight: 1.7,
          }}
        >
          <h1
            style={{
              fontSize: "clamp(32px, 6vw, 56px)",
              letterSpacing: "0.06em",
              marginBottom: "1.2rem",
            }}
          >
            {t("cookie.title")}
          </h1>

          <p style={{ opacity: 0.85 }}>{t("cookie.subtitle")}</p>

          <div style={{ textAlign: "left", marginTop: "2.5rem" }}>
            <h3 style={{ opacity: 0.9 }}>{t("cookie.section1.title")}</h3>
            <p style={{ opacity: 0.8 }}>{t("cookie.section1.body")}</p>

            <h3 style={{ marginTop: "2rem", opacity: 0.9 }}>
              {t("cookie.section2.title")}
            </h3>
            <p style={{ opacity: 0.8 }}>{t("cookie.section2.body")}</p>

            <h3 style={{ marginTop: "2rem", opacity: 0.9 }}>
              {t("cookie.section3.title")}
            </h3>
            <p style={{ opacity: 0.8 }}>{t("cookie.section3.body")}</p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}