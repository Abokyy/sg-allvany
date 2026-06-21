/* =============================================================
   admin.js – Ár szerkesztő
   A data/prices.json fájlt szerkeszti és menti a GitHub API-n át.
   A "jelszó" itt a GitHub hozzáférési token: enélkül a mentés
   nem működik. A token csak a böngésző memóriájában él (nem
   tárolódik), a felhasználónevet/repót kényelmi okból megjegyezzük.
   ============================================================= */
(function () {
  const cfg = (window.SITE_CONFIG && window.SITE_CONFIG.github) || {};
  const PATH = cfg.pricesPath || "data/prices.json";
  const BRANCH = cfg.branch || "main";
  const LS = "sg_admin_repo";

  const $ = (id) => document.getElementById(id);
  const ownerEl = $("gh-owner");
  const repoEl = $("gh-repo");
  const tokenEl = $("gh-token");
  const statusEl = $("status");
  const editorEl = $("editor");
  const bodyEl = $("editor-body");

  let currentSha = null;
  let model = null; // a teljes JSON objektum

  /* ---- előzőleg megadott owner/repo visszatöltése ---- */
  (function restore() {
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(LS) || "{}"); } catch (e) {}
    ownerEl.value = saved.owner || cfg.owner || "";
    repoEl.value = saved.repo || cfg.repo || "";
  })();

  function tr(key, fallback) {
    const v = window.t && window.t(key);
    return typeof v === "string" ? v : fallback;
  }

  function setStatus(msg, kind) {
    statusEl.textContent = msg;
    statusEl.className = "admin-status show " + (kind || "");
  }
  function clearStatus() { statusEl.className = "admin-status"; }

  /* ---- UTF-8 biztos base64 (ékezetek miatt) ---- */
  function b64encode(str) {
    const bytes = new TextEncoder().encode(str);
    let bin = "";
    bytes.forEach((b) => (bin += String.fromCharCode(b)));
    return btoa(bin);
  }
  function b64decode(b64) {
    const bin = atob(b64.replace(/\n/g, ""));
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }

  function apiBase() {
    return (
      "https://api.github.com/repos/" +
      encodeURIComponent(ownerEl.value.trim()) +
      "/" +
      encodeURIComponent(repoEl.value.trim()) +
      "/contents/" +
      PATH
    );
  }

  function headers() {
    return {
      Authorization: "Bearer " + tokenEl.value.trim(),
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28"
    };
  }

  function validate() {
    if (!ownerEl.value.trim() || !repoEl.value.trim()) {
      setStatus("Adja meg a GitHub felhasználót és a repository nevét.", "err");
      return false;
    }
    if (!tokenEl.value.trim()) {
      setStatus("Adja meg a GitHub hozzáférési tokent.", "err");
      return false;
    }
    return true;
  }

  /* ---- Betöltés ---- */
  async function load() {
    if (!validate()) return;
    localStorage.setItem(LS, JSON.stringify({ owner: ownerEl.value.trim(), repo: repoEl.value.trim() }));
    setStatus("Betöltés…", "");
    try {
      const res = await fetch(apiBase() + "?ref=" + encodeURIComponent(BRANCH), {
        headers: headers(),
        cache: "no-store"
      });
      if (!res.ok) throw new Error(await describeError(res));
      const data = await res.json();
      currentSha = data.sha;
      model = JSON.parse(b64decode(data.content));
      renderEditor();
      editorEl.style.display = "block";
      clearStatus();
    } catch (err) {
      editorEl.style.display = "none";
      setStatus("Hiba a betöltéskor: " + err.message, "err");
    }
  }

  async function describeError(res) {
    let detail = "";
    try { detail = (await res.json()).message || ""; } catch (e) {}
    if (res.status === 401) return "Érvénytelen token (401). Ellenőrizze a tokent.";
    if (res.status === 404) return "Nem található a fájl vagy a repó (404). Ellenőrizze az adatokat és a token jogosultságát.";
    if (res.status === 403) return "Hozzáférés megtagadva (403). " + detail;
    return res.status + " " + detail;
  }

  /* ---- Szerkesztő felépítése a modellből ---- */
  function gridCols(n) { return "repeat(" + n + ", 1fr) 46px"; }

  function renderEditor() {
    bodyEl.innerHTML = "";
    const cats = (model && model.categories) || {};
    Object.keys(cats).forEach((catId) => {
      const cat = cats[catId];
      const columns = (cat.columns && cat.columns.length ? cat.columns : ["Szolgáltatás", "Ár"]).slice();
      const ncols = columns.length;

      const card = document.createElement("div");
      card.className = "admin-card";
      card.dataset.cat = catId;

      const h = document.createElement("h2");
      h.className = "cat-title";
      h.textContent = cat.title || catId;
      card.appendChild(h);

      // oszlopfejlécek (szerkeszthető)
      const head = document.createElement("div");
      head.className = "price-editor-row price-editor-head";
      head.style.gridTemplateColumns = gridCols(ncols);
      columns.forEach((c) => {
        const inp = document.createElement("input");
        inp.type = "text"; inp.className = "col"; inp.value = c; inp.placeholder = "Oszlop neve";
        head.appendChild(inp);
      });
      head.appendChild(document.createElement("span")); // térkitöltő a törlés gomb helyén
      card.appendChild(head);

      // adatsorok
      const rowsWrap = document.createElement("div");
      rowsWrap.className = "rows-wrap";
      (cat.rows || []).forEach((r) => rowsWrap.appendChild(rowEl(r, ncols)));
      card.appendChild(rowsWrap);

      // új sor gomb
      const addBtn = document.createElement("button");
      addBtn.type = "button";
      addBtn.className = "btn btn--outline";
      addBtn.textContent = tr("admin.addRow", "+ Új sor");
      addBtn.addEventListener("click", () => rowsWrap.appendChild(rowEl([], ncols)));
      card.appendChild(addBtn);

      // megjegyzés
      const noteField = document.createElement("div");
      noteField.className = "field";
      noteField.style.marginTop = "18px";
      noteField.innerHTML =
        "<label>" + tr("admin.noteLabel", "Megjegyzés") + "</label>" +
        '<textarea rows="2" class="cat-note"></textarea>';
      noteField.querySelector("textarea").value = cat.note || "";
      card.appendChild(noteField);

      bodyEl.appendChild(card);
    });
  }

  function rowEl(cells, ncols) {
    const row = document.createElement("div");
    row.className = "price-editor-row";
    row.style.gridTemplateColumns = gridCols(ncols);
    for (let i = 0; i < ncols; i++) {
      const inp = document.createElement("input");
      inp.type = "text"; inp.className = "cell";
      inp.value = (cells && cells[i] != null) ? cells[i] : "";
      row.appendChild(inp);
    }
    const del = document.createElement("button");
    del.type = "button"; del.className = "icon-btn"; del.title = tr("admin.remove", "Törlés");
    del.textContent = "🗑";
    del.addEventListener("click", () => row.remove());
    row.appendChild(del);
    return row;
  }

  /* ---- Modell visszaolvasása a mezőkből ---- */
  function collect() {
    bodyEl.querySelectorAll("[data-cat]").forEach((card) => {
      const catId = card.dataset.cat;
      const cat = model.categories[catId];
      cat.columns = Array.from(card.querySelectorAll(".price-editor-head .col"))
        .map((i) => i.value.trim());
      cat.rows = Array.from(card.querySelectorAll(".rows-wrap .price-editor-row"))
        .map((row) => Array.from(row.querySelectorAll(".cell")).map((i) => i.value.trim()))
        .filter((cells) => cells.some((v) => v !== ""));
      const note = card.querySelector(".cat-note");
      cat.note = note ? note.value.trim() : "";
    });
    if (!model.meta) model.meta = {};
    model.meta.updated = new Date().toISOString().slice(0, 10);
  }

  /* ---- Mentés (commit a GitHub API-n) ---- */
  async function save(e) {
    e.preventDefault();
    if (!model) { setStatus(tr("admin.loadFirst", "Először töltse be az árakat."), "err"); return; }
    if (!validate()) return;
    collect();
    setStatus("Mentés…", "");
    try {
      const content = b64encode(JSON.stringify(model, null, 2) + "\n");
      const res = await fetch(apiBase(), {
        method: "PUT",
        headers: Object.assign({ "Content-Type": "application/json" }, headers()),
        body: JSON.stringify({
          message: "Árlista frissítése az admin felületről",
          content: content,
          sha: currentSha,
          branch: BRANCH
        })
      });
      if (!res.ok) throw new Error(await describeError(res));
      const out = await res.json();
      currentSha = out.content && out.content.sha;
      setStatus(tr("admin.saved", "Elmentve! A weboldal pár percen belül frissül."), "ok");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setStatus("Hiba a mentéskor: " + err.message, "err");
    }
  }

  $("btn-load").addEventListener("click", load);
  editorEl.addEventListener("submit", save);
})();
