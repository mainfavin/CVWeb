import { motion } from "framer-motion";
import Footer from "../components/Footer";

export default function Terms() {
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
            Terms of Use 
          </h1>

          <p style={{ opacity: 0.85, marginBottom: "2.5rem" }}>
            By using this website, you agree to the following terms and
            conditions.
          </p>

          <div style={{ textAlign: "left" }}>
            <h3 style={{ marginTop: "2rem", opacity: 0.9 }}>1. Content ownership</h3>
            <p style={{ opacity: 0.8 }}>
              All text, photography, and personal content featured on this site belong to Marcos Infante.  
              You may not reproduce or redistribute this material without permission.
            </p>

            <h3 style={{ marginTop: "2rem", opacity: 0.9 }}>2. Source code and use</h3>
            <p style={{ opacity: 0.8 }}>
              The source code for this website is publicly available.  
              You are free to explore, reuse, or adapt it for your own projects — as long as you do not use or impersonate my personal identity, data, or likeness.
            </p>

            <h3 style={{ marginTop: "2rem", opacity: 0.9 }}>3. Liability</h3>
            <p style={{ opacity: 0.8 }}>
              This website is provided “as is.”  
              I make no guarantees about availability or accuracy and am not responsible for any damages or losses resulting from its use.
            </p>

            <h3 style={{ marginTop: "2rem", opacity: 0.9 }}>4. Changes</h3>
            <p style={{ opacity: 0.8 }}>
              These terms may be updated occasionally.  
              Continued use of the site implies acceptance of the latest version.
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
