# SG Állvány – weboldal

Statikus weboldal (HTML / CSS / JavaScript), build-folyamat nélkül. Bárhol
működik, ami statikus fájlokat szolgál ki: **GitHub Pages**, Cloudflare Pages,
Netlify. Nincs szükség keretrendszerre vagy npm-re.

## Mit tartalmaz

| Oldal | Fájl | URL |
|------|------|-----|
| Főoldal | `index.html` | `/` |
| Homlokzati állvány | `homlokzati.html` | `/homlokzati` |
| Gurulós állvány | `gurulos.html` | `/gurulos` |
| Ár szerkesztő (admin) | `admin.html` | `/admin.html` |

Fő mappák:

- `config.js` – **minden beállítás itt**: kapcsolati adatok, tawk.to chat, admin GitHub adatok
- `locales/hu.json` – a feliratok (fordítási katalógus). Új nyelvhez másold le (pl. `en.json`)
- `data/prices.json` – az **árlista** (nincs beégetve a kódba)
- `css/styles.css` – megjelenés (márkaszínek: fekete / fehér / piros)
- `js/` – `i18n.js` (fordítás), `main.js` (fejléc/lábléc/chat), `prices.js` (ártáblázat), `admin.js` (ár szerkesztő)
- `assets/` – logó, favicon, háttér

## 1. Közzététel GitHub Pages-en

1. Töltsd fel ezt a mappát egy GitHub repóba (pl. `sg-allvany`).
2. A repóban: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch: `main`, mappa: `/ (root)`. Mentés.
3. Pár perc múlva él a `https://<felhasználó>.github.io/<repo>/` címen.
4. **Saját domain (sgallvany.hu):** a `CNAME` fájl már tartalmazza a `www.sgallvany.hu` címet. A domain szolgáltatódnál állíts be egy `CNAME` rekordot: `www` → `<felhasználó>.github.io`. A Pages → Custom domain mezőbe írd be: `www.sgallvany.hu`, és kapcsold be az „Enforce HTTPS"-t.

> A `/homlokzati` és `/gurulos` „szép" URL-eket a GitHub Pages magától kiszolgálja a `homlokzati.html` / `gurulos.html` fájlokból.

### Jobb-e más, mint a GitHub Pages?
A GitHub Pages ingyenes és tökéletes ehhez az oldalhoz. Ha később valódi
bejelentkezős admin felületet szeretnél (nem token-alapút), a **Cloudflare Pages**
vagy a **Netlify** ingyenes csomagja kínál szerver nélküli funkciókat és
beépített beléptetést (pl. Decap/Netlify CMS). Az oldal mindháromban változtatás
nélkül fut. Egyelőre a GitHub Pages + token-alapú admin a legegyszerűbb, ingyenes út.

## 2. tawk.to chat buborék beállítása

A chat kódja kész, csak a fiók azonosítóit kell megadni:

1. Lépj be a tawk.to fiókba → **Admin → Administration → Channels → Chat Widget**.
2. A beágyazó (embed) kódban ilyesmit látsz: `https://embed.tawk.to/PROPERTY_ID/WIDGET_ID`.
3. Ezt a két értéket írd be a `config.js` `tawk` részébe:
   ```js
   tawk: {
     propertyId: "ide_a_property_id",
     widgetId: "default",
     apiKey: "7305ecd2322ccbab25af5c329026e183f4d3d623"
   }
   ```

Amíg a `propertyId` üres, a chat egyszerűen nem jelenik meg (az oldal hibátlanul működik).

## 3. Árak módosítása

**Egyszerű mód:** szerkeszd a `data/prices.json` fájlt közvetlenül a GitHubon
(ceruza ikon → Commit). Az oldal pár percen belül frissül.

**Admin felülettel (`/admin.html`):**

1. Készíts GitHub **fine-grained personal access tokent**:
   GitHub → Settings → Developer settings → Fine-grained tokens → Generate.
   - Repository access: **csak ez a repó**
   - Permissions → **Contents: Read and write**
2. A `config.js` `github` részébe (kényelmi okból) beírhatod az `owner` és `repo`
   értéket, vagy megadod az admin oldalon.
3. Nyisd meg az `/admin.html` oldalt, írd be a tokent, **Árak betöltése**,
   módosíts, majd **Mentés és közzététel**. A mentés egy commitot készít, és az
   oldal automatikusan frissül.

### A „jelszavas védelem" őszintén
Ingyenes statikus tárhelyen (GitHub Pages) **nincs valódi szerveroldali jelszó** –
a forráskód publikus. A védelem itt maga a **GitHub token**: az admin oldalt bárki
megnyithatja, de **menteni csak érvényes, írásjogú tokennel lehet**, amit csak te
ismersz. A token nem tárolódik a fájlokban, csak a böngésződ memóriájában a
munkamenet idejére. Ne add ki és ne commitold soha.
Ha valódi belépés kell, lásd a Netlify/Cloudflare alternatívát fent.

## 4. Szövegek módosítása

Az oldalak szövegei a `locales/hu.json` fájlban vannak (kulcs–érték párok).
A HTML-ben lévő szöveg csak tartalék, ha a JavaScript nem töltene be. A szöveg
módosításához a `locales/hu.json` a mérvadó. Új nyelvhez másold le `en.json`-ként,
fordítsd le, és állítsd át a `config.js` `lang` értékét.

## Helyi futtatás (fejlesztéshez)

A `fetch` miatt fájlrendszerről (`file://`) nem tölt – indíts helyi szervert.
Használd a mellékelt `dev-server.py`-t, ez ugyanúgy kezeli a „szép" URL-eket
(`/homlokzati`, `/gurulos`), mint a GitHub Pages:

```bash
python3 dev-server.py
# majd nyisd meg: http://localhost:8000
```

(A sima `python3 -m http.server 8000` is működik, de ott a `.html` végződést is
ki kell írni: `http://localhost:8000/homlokzati.html`.)
