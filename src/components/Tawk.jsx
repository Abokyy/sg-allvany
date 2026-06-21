import { useEffect } from "react";
import { SITE_CONFIG } from "../config.js";

/** tawk.to chat buborék – egyszer tölti be a szkriptet. */
export default function Tawk() {
  useEffect(() => {
    const { propertyId, widgetId } = SITE_CONFIG.tawk || {};
    if (!propertyId) return; // nincs beállítva -> nincs chat
    if (document.getElementById("tawk-script")) return;

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const s = document.createElement("script");
    s.id = "tawk-script";
    s.async = true;
    s.src = `https://embed.tawk.to/${propertyId}/${widgetId || "default"}`;
    s.charset = "UTF-8";
    s.setAttribute("crossorigin", "*");
    document.head.appendChild(s);
  }, []);

  return null;
}
