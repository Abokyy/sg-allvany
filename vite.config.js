import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Saját domain (www.sgallvany.hu) a gyökérben fut, ezért base: "/".
// Ha mégis a felhasznalo.github.io/sg-allvany/ alatt futna, írd át "/sg-allvany/"-re.
export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    outDir: "dist"
  }
});
