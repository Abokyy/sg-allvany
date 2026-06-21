# SG Állvány – weboldal (React + Vite)

Állványbérlés weboldal: **React + Vite**, **GitHub Pages**-re telepítve
(GitHub Actions automatikus build + deploy). Három oldal (főoldal,
homlokzati, gurulós), magyar nyelvi fájl, kódba nem égetett, admin
felületről szerkeszthető árlista, tawk.to chat és beágyazott Google Drive
dokumentum.

## Projekt felépítése

```
public/                 statikusan kiszolgált fájlok (a build gyökerébe kerülnek)
  data/prices.json      AZ ÁRLISTA – futásidőben töltődik, admin szerkeszti
  assets/               logó, favicon, háttér
  CNAME, robots.txt, sitemap.xml, .nojekyll
src/
  config.js             MINDEN beállítás: kapcsolat, tawk.to, Drive, admin/GitHub
  styles.css            megjelenés (márkaszín: fekete / fehér / piros)
  i18n/hu.json          feliratok (fordítási katalógus)
  i18n/I18nContext.jsx  egyszerű fordítás-kezelő (useT hook)
  components/           Header, Footer, Contact, Notice, PriceTable, DriveEmbed, Tawk, …
  pages/                Home, Homlokzati, Gurulos, Admin, NotFound
.github/workflows/deploy.yml   automatikus build + Pages deploy push-ra
```

## Fejlesztés helyben

```bash
npm install
npm run dev        # http://localhost:5173  (szép URL-ek: /homlokzati, /gurulos)
```

Production build kipróbálása helyben:

```bash
npm run build      # -> dist/  (és dist/404.html a SPA útvonalakhoz)
npm run preview
```

## Közzététel GitHub Pages-en (automatikus)

1. Töltsd fel a repót a GitHubra (a `dist/` és `node_modules/` git-ignorált – ez jó).
2. A repóban: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Pushold a `main` ágat. A `.github/workflows/deploy.yml` lefordítja és kiteszi az oldalt.
4. **Saját domain:** a `public/CNAME` már tartalmazza a `www.sgallvany.hu` címet.
   A domain szolgáltatónál állíts be `CNAME` rekordot: `www` → `<felhasználó>.github.io`,
   majd a Pages → Custom domain mezőbe írd be `www.sgallvany.hu` és kapcsold be az „Enforce HTTPS"-t.

> **Szép URL-ek / frissítés:** a `dist/404.html` az `index.html` másolata, ezért a
> `/homlokzati`, `/gurulos` közvetlen megnyitása és az oldalfrissítés is működik
> a GitHub Pages-en (a React Router intézi az útvonalat).

### Miért GitHub Actions és nem a `gh-pages` csomag?
Mert így minden `main`-re pusholás (beleértve az admin felület ár-mentését is)
**automatikusan újraépíti és élesíti** az oldalt 1-2 percen belül. A `gh-pages`
csomaggal minden módosítás után kézzel kellene futtatni a deploy parancsot.

## Árak módosítása

Az árlista a [`public/data/prices.json`](public/data/prices.json) fájlban van,
és futásidőben töltődik – semmi nincs a kódba égetve. A táblázat tetszőleges
számú oszlopot kezel (`columns` + `rows`).

**Egyszerű mód:** szerkeszd a fájlt közvetlenül a GitHubon (ceruza → Commit).
Az Actions újraépít, az oldal frissül.

**Admin felülettel (`/admin`):**

1. Készíts GitHub **fine-grained personal access tokent**
   (Settings → Developer settings → Fine-grained tokens):
   - Repository access: **csak ez a repó**
   - Permissions → **Contents: Read and write**
2. A `src/config.js` `github` részébe írd be az `owner` és `repo` értéket
   (vagy add meg az admin oldalon – megjegyzi).
3. Nyisd meg az `/admin` oldalt, írd be a tokent → **Árak betöltése** →
   módosíts → **Mentés és közzététel**. A mentés commitol a
   `public/data/prices.json` fájlba, az Actions pedig élesíti.

### A „jelszavas védelem" őszintén
Statikus tárhelyen nincs valódi szerveroldali jelszó. A védelem itt a **GitHub
token**: az `/admin` oldalt bárki megnyithatja, de **menteni csak érvényes,
írásjogú tokennel lehet**, amit csak te ismersz. A token nem tárolódik a
fájlokban, csak a böngésző memóriájában a munkamenet idejére.

## tawk.to chat

A `src/config.js` `tawk` része tartalmazza a `propertyId`-t és `widgetId`-t
(a tawk.to beágyazó kódból: `https://embed.tawk.to/PROPERTY_ID/WIDGET_ID`).
Ha a `propertyId` üres, a chat egyszerűen nem jelenik meg.

## Szövegek / új nyelv

A feliratok a [`src/i18n/hu.json`](src/i18n/hu.json) fájlban vannak. Új nyelvhez
hozz létre pl. `en.json`-t, vedd fel a `src/i18n/I18nContext.jsx` `DICTS`
térképébe, és állítsd át a `src/config.js` `lang` értékét.
