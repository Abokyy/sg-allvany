/* =============================================================
   SG Állvány – Központi konfiguráció
   -------------------------------------------------------------
   Itt lehet módosítani a kapcsolati adatokat, a chat widgetet
   és az ár-szerkesztő admin oldal beállításait.
   Ez az EGYETLEN hely, ahol ezeket állítani kell.
   ============================================================= */
window.SITE_CONFIG = {
  /* Aktív nyelv. Új nyelvhez: másold a locales/hu.json fájlt
     (pl. en.json) és írd ide a kódját. */
  lang: "hu",

  /* ---- Kapcsolati adatok (minden oldalon ezek jelennek meg) ---- */
  contact: {
    phones: [
      { display: "06 30 440 6541", tel: "+36304406541" },
      { display: "06 70 943 7994", tel: "+36709437994" }
    ],
    email: "sg.allvany@gmail.com",
    addressLines: ["2100 Gödöllő, Kenyérgyári út", "KonténerTár „A” kapu"],
    // Google Maps kereséshez használt szöveg
    mapsQuery: "Gödöllő Kenyérgyári út KonténerTár",
    hours: [
      { days: "Hétfő – Péntek", time: "7:00 – 16:00" },
      { days: "Szombat – Vasárnap", time: "Zárva" }
    ]
  },

  /* ---- tawk.to chat buborék ----
     A propertyId és widgetId a tawk.to fiókodban:
     Admin → Administration → Channels → Chat Widget alatt,
     a beágyazó (embed) kódban: https://embed.tawk.to/PROPERTY_ID/WIDGET_ID
     Ezt a két értéket kell ide beírni, hogy a chat megjelenjen. */
  tawk: {
    propertyId: "6a00d6b899d54c1c32a22ab1",
    widgetId: "1jo9kdgu8",
    apiKey: "7305ecd2322ccbab25af5c329026e183f4d3d623"
  },

  /* ---- Beágyazott Google Drive dokumentumok ----
     Csak a fájl azonosítóját kell ide írni (a Drive megosztó
     linkből: .../d/AZONOSÍTÓ/view). A fájl megosztása legyen
     „Bárki a linkkel megtekintheti". */
  docs: {
    gurulosTartozek: "1EoWUbCCkvToua32CbLWL7wAbwgWEAW77"
  },

  /* ---- Admin (ár-szerkesztő) GitHub beállításai ----
     Az admin oldal a GitHub API-n keresztül menti az árakat.
     owner = GitHub felhasználóneved, repo = a tároló neve. */
  github: {
    owner: "",                    // <-- GitHub felhasználónév / szervezet
    repo: "",                     // <-- a repository neve
    branch: "main",
    pricesPath: "data/prices.json"
  }
};
