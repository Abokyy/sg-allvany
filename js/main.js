/* =============================================================
   main.js – közös fejléc, lábléc, kapcsolati adatok, mobil menü,
   tawk.to chat buborék.
   A fejlécet és léblécet itt generáljuk, hogy ne kelljen minden
   oldalon megismételni. A szövegek data-i18n kulcsokkal jönnek a
   locales/hu.json fájlból.
   ============================================================= */
(function () {
  const cfg = window.SITE_CONFIG || {};
  const contact = cfg.contact || {};

  /* ---------- Segédfüggvények ---------- */
  function el(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }
  const primaryPhone = (contact.phones && contact.phones[0]) || null;

  /* ---------- Fejléc / navigáció ---------- */
  function buildHeader() {
    const mount = document.querySelector("[data-component='header']");
    if (!mount) return;
    const page = mount.getAttribute("data-page") || "";

    const link = (href, key, slug) =>
      `<li><a href="${href}" data-i18n="nav.${key}"${slug === page ? ' class="active"' : ""}></a></li>`;

    const callHref = primaryPhone ? `tel:${primaryPhone.tel}` : "#kapcsolat";

    mount.innerHTML = `
      <header class="site-header">
        <div class="container nav">
          <a class="brand" href="./" aria-label="SG Állvány">
            <img src="assets/logo.svg" alt="SG Állvány logó" />
            <span data-i18n="brand.name">SG Állvány</span>
          </a>
          <button class="nav__toggle" aria-label="Menü" aria-expanded="false">☰</button>
          <ul class="nav__links">
            ${link("./", "home", "home")}
            ${link("./homlokzati", "homlokzati", "homlokzati")}
            ${link("./gurulos", "gurulos", "gurulos")}
            ${link("#kapcsolat", "contact", "")}
            <li class="nav__cta">
              <a class="btn btn--primary" href="${callHref}">
                <span aria-hidden="true">📞</span>
                <span>${primaryPhone ? primaryPhone.display : ""}</span>
              </a>
            </li>
          </ul>
        </div>
      </header>`;

    const toggle = mount.querySelector(".nav__toggle");
    const links = mount.querySelector(".nav__links");
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("open"))
    );
  }

  /* ---------- Kapcsolat blokk ---------- */
  function buildContact() {
    const mount = document.querySelector("[data-component='contact']");
    if (!mount) return;

    const phonesHtml = (contact.phones || [])
      .map((p) => `<div><a href="tel:${p.tel}">${p.display}</a></div>`)
      .join("");

    const hoursHtml = (contact.hours || [])
      .map((h) => `<div class="plain">${h.days}: <strong>${h.time}</strong></div>`)
      .join("");

    const addressHtml = (contact.addressLines || [])
      .map((l) => `<div class="plain">${l}</div>`)
      .join("");

    const mapSrc =
      "https://www.google.com/maps?q=" +
      encodeURIComponent(contact.mapsQuery || "") +
      "&output=embed";

    mount.innerHTML = `
      <section class="section section--soft" id="kapcsolat">
        <div class="container">
          <h2 class="section__title" data-i18n="contact.title">Kapcsolat</h2>
          <p style="text-align:center;max-width:600px;margin:0 auto 30px" data-i18n="contact.subtitle"></p>
          <div class="contact-grid">
            <div>
              <div class="contact-item">
                <div class="label" data-i18n="contact.phoneLabel">Telefon</div>
                ${phonesHtml}
              </div>
              <div class="contact-item">
                <div class="label" data-i18n="contact.emailLabel">E-mail</div>
                <a href="mailto:${contact.email}">${contact.email}</a>
              </div>
              <div class="contact-item">
                <div class="label" data-i18n="contact.addressLabel">Cím</div>
                ${addressHtml}
              </div>
              <div class="contact-item">
                <div class="label" data-i18n="contact.hoursLabel">Nyitvatartás</div>
                ${hoursHtml}
              </div>
            </div>
            <div>
              <iframe class="map-frame" src="${mapSrc}" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Térkép" data-i18n-attr="title:contact.mapTitle"></iframe>
            </div>
          </div>
        </div>
      </section>`;
  }

  /* ---------- Lábléc ---------- */
  function buildFooter() {
    const mount = document.querySelector("[data-component='footer']");
    if (!mount) return;
    const year = new Date().getFullYear();
    const phonesHtml = (contact.phones || [])
      .map((p) => `<li><a href="tel:${p.tel}">${p.display}</a></li>`)
      .join("");

    mount.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div>
            <div class="footer-brand" data-i18n="brand.name">SG Állvány</div>
            <p data-i18n="footer.madeWith">Állványbérlés Gödöllőn és környékén</p>
          </div>
          <div>
            <h4 data-i18n="nav.menu">Menü</h4>
            <ul>
              <li><a href="./" data-i18n="nav.home">Főoldal</a></li>
              <li><a href="./homlokzati" data-i18n="nav.homlokzati">Homlokzati</a></li>
              <li><a href="./gurulos" data-i18n="nav.gurulos">Gurulós</a></li>
            </ul>
          </div>
          <div>
            <h4 data-i18n="contact.title">Kapcsolat</h4>
            <ul>
              ${phonesHtml}
              <li><a href="mailto:${contact.email}">${contact.email}</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          © ${year} <span data-i18n="brand.name">SG Állvány</span> ·
          <span data-i18n="footer.rights">Minden jog fenntartva.</span>
        </div>
      </footer>`;
  }

  /* ---------- Lebegő telefon gomb (mobil) ---------- */
  function buildFab() {
    if (!primaryPhone) return;
    const fab = el(
      `<a class="fab-call" href="tel:${primaryPhone.tel}">
         <span aria-hidden="true">📞</span><span>Hívás</span>
       </a>`
    );
    document.body.appendChild(fab);
  }

  /* ---------- Fontos tudnivalók (kaució, igazolvány) ---------- */
  function buildNotice() {
    document.querySelectorAll("[data-component='notice']").forEach((mount) => {
      mount.innerHTML = `
        <div class="notice">
          <div class="notice__icon" aria-hidden="true">!</div>
          <div class="notice__body">
            <h3 data-i18n="notice.title">Fontos tudnivalók a bérléshez</h3>
            <p data-i18n="notice.id"></p>
            <p data-i18n="notice.deposit"></p>
          </div>
        </div>`;
    });
  }

  /* ---------- Beágyazott Google Drive dokumentumok ---------- */
  function buildDriveEmbeds() {
    const docs = cfg.docs || {};
    document.querySelectorAll("[data-drive]").forEach((mount) => {
      const id = docs[mount.getAttribute("data-drive")];
      if (!id) return;
      mount.innerHTML = `
        <div class="doc-embed">
          <iframe class="doc-frame" src="https://drive.google.com/file/d/${id}/preview"
            allow="autoplay" loading="lazy" title="Dokumentum"></iframe>
          <a class="btn btn--outline" target="_blank" rel="noopener"
             href="https://drive.google.com/file/d/${id}/view">
            Megnyitás új lapon
          </a>
        </div>`;
    });
  }

  /* ---------- tawk.to chat buborék ---------- */
  function loadTawk() {
    const tk = cfg.tawk || {};
    if (!tk.propertyId) {
      console.info(
        "[tawk.to] A chat nincs beállítva. Add meg a propertyId-t a config.js -ben."
      );
      return;
    }
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();
    const s1 = document.createElement("script");
    s1.async = true;
    s1.src = "https://embed.tawk.to/" + tk.propertyId + "/" + (tk.widgetId || "default");
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    document.head.appendChild(s1);
  }

  /* ---------- Indítás ---------- */
  function init() {
    buildHeader();
    buildContact();
    buildFooter();
    buildFab();
    buildNotice();
    buildDriveEmbeds();
    // Az utólag beszúrt elemekre is alkalmazzuk a fordítást.
    if (window.applyI18n) window.applyI18n();
    loadTawk();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  // Ha az i18n később töltött be, frissítsük a beszúrt elemeket is.
  document.addEventListener("i18n:ready", () => window.applyI18n && window.applyI18n());
})();
