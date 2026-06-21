/* =============================================================
   SG Állvány – Központi konfiguráció
   Itt lehet módosítani a kapcsolati adatokat, a chat widgetet,
   a beágyazott dokumentumokat és az admin GitHub beállításait.
   ============================================================= */
export const SITE_CONFIG = {
  /* Aktív nyelv. Új nyelvhez: tedd be a fordítást a src/i18n alá. */
  lang: "hu",

  /* ---- Kapcsolati adatok ---- */
  contact: {
    phones: [
      { display: "06 30 440 6541", tel: "+36304406541" },
      { display: "06 70 943 7994", tel: "+36709437994" }
    ],
    email: "sg.allvany@gmail.com",
    addressLines: ["2100 Gödöllő, Kenyérgyári út", "KonténerTár „A” kapu"],
    mapsQuery: "Gödöllő Kenyérgyári út KonténerTár",
    hours: [
      { days: "Hétfő – Péntek", time: "7:00 – 16:00" },
      { days: "Szombat – Vasárnap", time: "Zárva" }
    ]
  },

  /* ---- tawk.to chat buborék ----
     A beágyazó kódból: https://embed.tawk.to/PROPERTY_ID/WIDGET_ID */
  tawk: {
    propertyId: "6a00d6b899d54c1c32a22ab1",
    widgetId: "1jo9kdgu8",
    apiKey: "7305ecd2322ccbab25af5c329026e183f4d3d623"
  },

  /* ---- Beágyazott Google Drive dokumentumok ----
     Csak a fájl azonosítóját kell ide írni (a megosztó linkből:
     .../d/AZONOSÍTÓ/view). Megosztás: „Bárki a linkkel megtekintheti". */
  docs: {
    gurulosTartozek: "1EoWUbCCkvToua32CbLWL7wAbwgWEAW77"
  },

  /* ---- Admin (ár-szerkesztő) GitHub beállításai ----
     Az admin a GitHub API-n keresztül commitolja az árakat a
     forrásfájlba; az Actions deploy 1-2 percen belül élesíti. */
  github: {
    owner: "",                              // <-- GitHub felhasználónév / szervezet
    repo: "",                               // <-- a repository neve
    branch: "main",
    pricesPath: "public/data/prices.json"   // a forrásfájl a repóban
  },

  /* A böngészőben futásidőben innen töltjük az árakat.
     A BASE_URL miatt a megfelelő útvonalon (gyökér vagy /sg-allvany/) tölt. */
  pricesUrl: import.meta.env.BASE_URL + "data/prices.json"
};
