/* =============================================================
   prices.js – az árlistát a data/prices.json fájlból tölti be és
   kirajzolja egy táblázatba. Semmilyen ár nincs a kódban beégetve.
   A táblázat tetszőleges számú oszlopot kezel (a JSON "columns"
   mezője adja a fejlécet, a "rows" pedig a sorokat).
   Használat a HTML-ben:
     <div data-prices="gurulos"></div>
   ============================================================= */
(function () {
  const mounts = document.querySelectorAll("[data-prices]");
  if (!mounts.length) return;

  function tr(key, fallback) {
    const v = window.t && window.t(key);
    return typeof v === "string" ? v : fallback;
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function render(data) {
    const updated = data.meta && data.meta.updated;
    mounts.forEach((mount) => {
      const catId = mount.getAttribute("data-prices");
      const cat = data.categories && data.categories[catId];
      if (!cat) return;

      const columns = cat.columns || ["Szolgáltatás", "Ár"];
      const head =
        "<tr>" + columns.map((c) => `<th>${escapeHtml(c)}</th>`).join("") + "</tr>";

      const body = (cat.rows || [])
        .map(
          (row) =>
            "<tr>" +
            columns
              .map((_, i) => `<td>${escapeHtml(row[i])}</td>`)
              .join("") +
            "</tr>"
        )
        .join("");

      mount.innerHTML = `
        <div class="price-block">
          <div class="table-scroll">
            <table class="price-table">
              <thead>${head}</thead>
              <tbody>${body}</tbody>
            </table>
          </div>
          ${cat.note ? `<p class="price-note">${escapeHtml(cat.note)}</p>` : ""}
          ${updated ? `<p class="price-updated">${tr("prices.updated", "Frissítve")}: ${escapeHtml(updated)}</p>` : ""}
        </div>`;
    });
  }

  function load() {
    // cache-busting, hogy a friss árak azonnal látszódjanak
    fetch("data/prices.json?v=" + Date.now())
      .then((r) => r.json())
      .then(render)
      .catch(() => {
        mounts.forEach((m) => {
          m.innerHTML = `<p class="price-note">${tr(
            "prices.loadError",
            "Az árakat most nem sikerült betölteni. Kérjük, hívjon minket."
          )}</p>`;
        });
      });
  }

  if (window.__I18N__) load();
  else {
    document.addEventListener("i18n:ready", load, { once: true });
    setTimeout(() => {
      if (!window.__I18N__) load();
    }, 1200);
  }
})();
