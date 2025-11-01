import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

export default function Terms() {
  const { t } = useTranslation("terms");

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
            {t("terms.title")}
          </h1>

          <p style={{ opacity: 0.85 }}>{t("terms.subtitle")}</p>

          <div style={{ textAlign: "left" }}>
            <h3 style={{ marginTop: "2rem", opacity: 0.9 }}>
              {t("terms.section1.title")}
            </h3>
            <p style={{ opacity: 0.8 }}>{t("terms.section1.body")}</p>

            <h3 style={{ marginTop: "2rem", opacity: 0.9 }}>
              {t("terms.section2.title")}
            </h3>
            <p style={{ opacity: 0.8 }}>{t("terms.section2.body")}</p>

            <h3 style={{ marginTop: "2rem", opacity: 0.9 }}>
              {t("terms.section3.title")}
            </h3>
            <p style={{ opacity: 0.8 }}>{t("terms.section3.body")}</p>

            <h3 style={{ marginTop: "2rem", opacity: 0.9 }}>
              {t("terms.section4.title")}
            </h3>
            <p style={{ opacity: 0.8 }}>{t("terms.section4.body")}</p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}