import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// FONTOS: a base határozza meg, milyen útvonalon szolgáljuk ki az oldalt.
//  - GitHub Pages teszteléshez (https://abokyy.github.io/sg-allvany/):  "/sg-allvany/"
//  - Saját domain gyökerében (https://www.sgallvany.hu/):               "/"
// Élesítéskor (amikor a domaint átállítod) csak ezt az egy sort kell "/"-re írni.
export default defineConfig({
  base: "/sg-allvany/",
  plugins: [react()],
  build: {
    outDir: "dist"
  }
});
