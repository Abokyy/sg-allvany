import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout.jsx";
import Tawk from "./components/Tawk.jsx";
import Home from "./pages/Home.jsx";
import Homlokzati from "./pages/Homlokzati.jsx";
import Gurulos from "./pages/Gurulos.jsx";
import Admin from "./pages/Admin.jsx";
import NotFound from "./pages/NotFound.jsx";

// Oldalváltáskor görgessünk a tetejére (kivéve, ha #horgony van).
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/homlokzati" element={<Homlokzati />} />
          <Route path="/gurulos" element={<Gurulos />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* Az admin külön, fejléc/lábléc nélkül */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Tawk />
    </>
  );
}
