/* =============================================================
   Egyszerű fordítás-kezelő React-hez.
   A szövegek a src/i18n/<lang>.json fájlból jönnek.
   Használat:  const t = useT();  t("home.heroTitle")
   Új nyelv:   importáld a json-t és tedd be a DICTS térképbe,
               majd állítsd a config.lang értékét.
   ============================================================= */
import { createContext, useContext } from "react";
import { SITE_CONFIG } from "../config.js";
import hu from "./hu.json";

const DICTS = { hu };

function lookup(dict, path) {
  return path.split(".").reduce((o, k) => (o == null ? o : o[k]), dict);
}

const I18nContext = createContext({ lang: "hu", dict: hu });

export function I18nProvider({ children }) {
  const lang = SITE_CONFIG.lang || "hu";
  const dict = DICTS[lang] || hu;
  return (
    <I18nContext.Provider value={{ lang, dict }}>{children}</I18nContext.Provider>
  );
}

/** t("kulcs.ut") -> a fordított szöveg, vagy maga a kulcs, ha hiányzik. */
export function useT() {
  const { dict } = useContext(I18nContext);
  return (key) => {
    const v = lookup(dict, key);
    return typeof v === "string" ? v : key;
  };
}
