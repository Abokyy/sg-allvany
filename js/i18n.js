/* =============================================================
   i18n – egyszerű fordítás-kezelő
   A szövegek a locales/<lang>.json fájlból jönnek.
   Használat a HTML-ben:
     <h1 data-i18n="home.heroTitle"></h1>
     <a data-i18n-attr="title:contact.mapTitle"></a>  (attribútumhoz)
   Új nyelv: másold a hu.json fájlt (pl. en.json) és állítsd be
   a config.js -ben a lang értékét.
   ============================================================= */
(function () {
  const cfg = window.SITE_CONFIG || {};
  const lang = cfg.lang || "hu";

  function get(obj, path) {
    return path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
  }

  function apply(dict) {
    // Szöveges tartalom
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const val = get(dict, el.getAttribute("data-i18n"));
      if (typeof val === "string") el.textContent = val;
    });
    // Attribútumok: data-i18n-attr="placeholder:key;title:key"
    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      el.getAttribute("data-i18n-attr").split(";").forEach((pair) => {
        const [attr, key] = pair.split(":").map((s) => s.trim());
        const val = get(dict, key);
        if (attr && typeof val === "string") el.setAttribute(attr, val);
      });
    });
    document.documentElement.lang = lang;
    // Jelezzük, hogy kész – a body felfedhető
    document.documentElement.classList.add("i18n-ready");
  }

  window.t = function (key) {
    return get(window.__I18N__ || {}, key);
  };

  // Újra-alkalmazás, ha a JS utólag adott hozzá elemeket (pl. fejléc).
  window.applyI18n = function () {
    if (window.__I18N__) apply(window.__I18N__);
  };

  fetch("locales/" + lang + ".json")
    .then((r) => r.json())
    .then((dict) => {
      window.__I18N__ = dict;
      apply(dict);
      document.dispatchEvent(new CustomEvent("i18n:ready", { detail: dict }));
    })
    .catch(() => {
      // Ha nem tölt be, akkor is felfedjük az oldalt
      document.documentElement.classList.add("i18n-ready");
    });
})();
