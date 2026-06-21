import { useState } from "react";
import { Link } from "react-router-dom";
import { SITE_CONFIG } from "../config.js";
import { useT } from "../i18n/I18nContext.jsx";

const GH = SITE_CONFIG.github;
const LS = "sg_admin_repo";

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

export default function Admin() {
  const t = useT();
  const saved = readSaved();
  const [owner, setOwner] = useState(saved.owner || GH.owner || "");
  const [repo, setRepo] = useState(saved.repo || GH.repo || "");
  const [token, setToken] = useState("");
  const [model, setModel] = useState(null);
  const [sha, setSha] = useState(null);
  const [status, setStatus] = useState(null); // { msg, kind }
  const [busy, setBusy] = useState(false);

  function apiUrl() {
    return (
      "https://api.github.com/repos/" +
      encodeURIComponent(owner.trim()) +
      "/" +
      encodeURIComponent(repo.trim()) +
      "/contents/" +
      GH.pricesPath
    );
  }
  function headers() {
    return {
      Authorization: "Bearer " + token.trim(),
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28"
    };
  }
  function validate() {
    if (!owner.trim() || !repo.trim()) {
      setStatus({ msg: "Adja meg a GitHub felhasználót és a repository nevét.", kind: "err" });
      return false;
    }
    if (!token.trim()) {
      setStatus({ msg: "Adja meg a GitHub hozzáférési tokent.", kind: "err" });
      return false;
    }
    return true;
  }
  async function describeError(res) {
    let detail = "";
    try { detail = (await res.json()).message || ""; } catch { /* ignore */ }
    if (res.status === 401) return "Érvénytelen token (401). Ellenőrizze a tokent.";
    if (res.status === 404) return "Nem található a fájl vagy a repó (404). Ellenőrizze az adatokat és a token jogosultságát.";
    if (res.status === 403) return "Hozzáférés megtagadva (403). " + detail;
    return res.status + " " + detail;
  }

  async function load() {
    if (!validate()) return;
    localStorage.setItem(LS, JSON.stringify({ owner: owner.trim(), repo: repo.trim() }));
    setBusy(true);
    setStatus({ msg: "Betöltés…", kind: "" });
    try {
      const res = await fetch(apiUrl() + "?ref=" + encodeURIComponent(GH.branch), {
        headers: headers(),
        cache: "no-store"
      });
      if (!res.ok) throw new Error(await describeError(res));
      const data = await res.json();
      setSha(data.sha);
      setModel(JSON.parse(b64decode(data.content)));
      setStatus(null);
    } catch (err) {
      setModel(null);
      setStatus({ msg: "Hiba a betöltéskor: " + err.message, kind: "err" });
    } finally {
      setBusy(false);
    }
  }

  async function save(e) {
    e.preventDefault();
    if (!model) { setStatus({ msg: t("admin.loadFirst"), kind: "err" }); return; }
    if (!validate()) return;
    setBusy(true);
    setStatus({ msg: "Mentés…", kind: "" });
    try {
      const out = structuredClone(model);
      out.meta = out.meta || {};
      out.meta.updated = new Date().toISOString().slice(0, 10);
      // üres sorok kiszűrése
      Object.values(out.categories || {}).forEach((cat) => {
        cat.rows = (cat.rows || []).filter((cells) => cells.some((v) => String(v).trim() !== ""));
      });
      const content = b64encode(JSON.stringify(out, null, 2) + "\n");
      const res = await fetch(apiUrl(), {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...headers() },
        body: JSON.stringify({
          message: "Árlista frissítése az admin felületről",
          content,
          sha,
          branch: GH.branch
        })
      });
      if (!res.ok) throw new Error(await describeError(res));
      const data = await res.json();
      setSha(data.content?.sha);
      setStatus({ msg: t("admin.saved"), kind: "ok" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setStatus({ msg: "Hiba a mentéskor: " + err.message, kind: "err" });
    } finally {
      setBusy(false);
    }
  }

  /* ---- model szerkesztők (immutábilis frissítés) ---- */
  function edit(fn) {
    setModel((prev) => {
      const next = structuredClone(prev);
      fn(next);
      return next;
    });
  }
  const setCol = (cat, ci, v) => edit((m) => (m.categories[cat].columns[ci] = v));
  const setCell = (cat, ri, ci, v) => edit((m) => (m.categories[cat].rows[ri][ci] = v));
  const setNote = (cat, v) => edit((m) => (m.categories[cat].note = v));
  const addRow = (cat) =>
    edit((m) => m.categories[cat].rows.push(new Array(m.categories[cat].columns.length).fill("")));
  const removeRow = (cat, ri) => edit((m) => m.categories[cat].rows.splice(ri, 1));

  return (
    <>
      <header className="site-header">
        <div className="container nav">
          <Link className="brand" to="/">
            <img src={import.meta.env.BASE_URL + "assets/logo.svg"} alt="SG Állvány" /> <span>{t("brand.name")}</span>
          </Link>
          <Link className="btn btn--outline" to="/">Vissza az oldalra</Link>
        </div>
      </header>

      <div className="admin-wrap">
        <h1>{t("admin.title")}</h1>
        <p>{t("admin.intro")}</p>

        <div className="admin-card">
          <div className="field">
            <label htmlFor="gh-owner">GitHub felhasználó / szervezet</label>
            <input id="gh-owner" type="text" autoComplete="off" value={owner}
              onChange={(e) => setOwner(e.target.value)} placeholder="pl. varsanyi-botond" />
          </div>
          <div className="field">
            <label htmlFor="gh-repo">Repository neve</label>
            <input id="gh-repo" type="text" autoComplete="off" value={repo}
              onChange={(e) => setRepo(e.target.value)} placeholder="pl. sg-allvany" />
          </div>
          <div className="field">
            <label htmlFor="gh-token">{t("admin.tokenLabel")}</label>
            <input id="gh-token" type="password" autoComplete="off" value={token}
              onChange={(e) => setToken(e.target.value)} placeholder="github_pat_..." />
            <div className="help">{t("admin.tokenHelp")}</div>
          </div>
          <button className="btn btn--dark" type="button" onClick={load} disabled={busy}>
            {t("admin.load")}
          </button>
        </div>

        {status && <div className={"admin-status show " + status.kind}>{status.msg}</div>}

        {model && (
          <form onSubmit={save}>
            {Object.entries(model.categories || {}).map(([catId, cat]) => {
              const columns = cat.columns?.length ? cat.columns : ["Szolgáltatás", "Ár"];
              const grid = `repeat(${columns.length}, 1fr) 46px`;
              return (
                <div className="admin-card" key={catId}>
                  <h2 className="cat-title">{cat.title || catId}</h2>

                  <div className="price-editor-row price-editor-head" style={{ gridTemplateColumns: grid }}>
                    {columns.map((c, ci) => (
                      <input key={ci} type="text" className="col" value={c}
                        onChange={(e) => setCol(catId, ci, e.target.value)} placeholder="Oszlop neve" />
                    ))}
                    <span />
                  </div>

                  {(cat.rows || []).map((row, ri) => (
                    <div className="price-editor-row" key={ri} style={{ gridTemplateColumns: grid }}>
                      {columns.map((_, ci) => (
                        <input key={ci} type="text" className="cell" value={row[ci] ?? ""}
                          onChange={(e) => setCell(catId, ri, ci, e.target.value)} />
                      ))}
                      <button type="button" className="icon-btn" title={t("admin.remove")}
                        onClick={() => removeRow(catId, ri)}>🗑</button>
                    </div>
                  ))}

                  <button type="button" className="btn btn--outline" onClick={() => addRow(catId)}>
                    {t("admin.addRow")}
                  </button>

                  <div className="field" style={{ marginTop: 18 }}>
                    <label>{t("admin.noteLabel")}</label>
                    <textarea rows="2" value={cat.note || ""}
                      onChange={(e) => setNote(catId, e.target.value)} />
                  </div>
                </div>
              );
            })}

            <button className="btn btn--primary btn--block" type="submit" disabled={busy}>
              {t("admin.save")}
            </button>
          </form>
        )}
      </div>
    </>
  );
}

function readSaved() {
  try { return JSON.parse(localStorage.getItem(LS) || "{}"); } catch { return {}; }
}
