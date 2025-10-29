import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { FxLink } from "../components/HoverFx";

export default function Privacy() {
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
            Privacy Policy 
          </h1>

          <p style={{ opacity: 0.85 }}>
            I respect your privacy. This website does not collect personal data
            or analytics information.
          </p>

          <div style={{ textAlign: "left", marginTop: "2.5rem" }}>
            <h3 style={{ opacity: 0.9 }}>1. Data collection</h3>
            <p style={{ opacity: 0.8 }}>
              No personal data, tracking information, or usage statistics are
              stored, processed, or analyzed.  
              This site is a static portfolio with no login or analytics tools.
            </p>

            <h3 style={{ marginTop: "2rem", opacity: 0.9 }}>2. External links</h3>
            <p style={{ opacity: 0.8 }}>
              This site may link to external pages (LinkedIn, GitHub, etc.).  
              Those services may process data according to their own privacy policies.
            </p>

            <h3 style={{ marginTop: "2rem", opacity: 0.9 }}>3. Contact</h3>
            <p style={{ opacity: 0.8 }}>
              If you reach me via email, your message and email address will
              only be used to respond to your inquiry — never stored, shared, or reused.
              Feel free to contact me with any questions about this policy.
            </p>
            <FxLink href="mailto:contact@marcosinfante.com" style={{ fontSize: "clamp(22px, 3.2vw, 42px)", fontWeight: 800 }}>
               contact@marcosinfante.com
             </FxLink>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
