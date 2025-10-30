import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import FabMenu from "./components/FabMenu";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import About from "./pages/About";
import SiteLogo from "./components/SiteLogo";

// --- IMPORTAR NUEVAS PÁGINAS ---
// Estas páginas ya contienen sus propios componentes de reemplazo (Footer, BigMarquee, etc.)
// para funcionar de forma independiente.
import Cookie from "./pages/Cookie";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import PageTransition from "./components/PageTransition";
import Work from "./pages/Work";
import ProjectPage from "./pages/ProjectPage";




function AnimatedRoutes() {
  const location = useLocation();

  const routeDefs = [
    { path: "/", element: <Home /> },
    { path: "/project/:slug", element: <ProjectPage /> },
    { path: "/contact", element: <Contact /> },
    { path: "/about", element: <About /> },
    { path: "/cookie", element: <Cookie /> },
    { path: "/privacy", element: <Privacy /> },
    { path: "/terms", element: <Terms /> },
    { path: "/work", element: <Work /> }, 
  ];

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {routeDefs.map(r => (
          <Route
            key={r.path}
            path={r.path}
            element={<PageTransition>{r.element}</PageTransition>}
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SiteLogo />
      <FabMenu />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
