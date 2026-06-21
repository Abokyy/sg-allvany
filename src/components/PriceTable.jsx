import { useEffect, useState } from "react";
import { SITE_CONFIG } from "../config.js";
import { useT } from "../i18n/I18nContext.jsx";

/**
 * Az árlistát futásidőben tölti a /data/prices.json fájlból, így az
 * admin felületen mentett változások (újraépítés után) megjelennek.
 * Tetszőleges számú oszlopot kezel (columns + rows a JSON-ban).
 */
export default function PriceTable({ category }) {
  const t = useT();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(SITE_CONFIG.pricesUrl + "?v=" + Date.now())
      .then((r) => {
        if (!r.ok) throw new Error("http " + r.status);
        return r.json();
      })
      .then((json) => alive && setData(json))
      .catch(() => alive && setError(true));
    return () => {
      alive = false;
    };
  }, []);

  if (error) {
    return <p className="price-note">{t("prices.loadError")}</p>;
  }
  if (!data) {
    return <p className="price-note">…</p>;
  }

  const cat = data.categories?.[category];
  if (!cat) return null;

  const columns = cat.columns?.length ? cat.columns : ["Szolgáltatás", "Ár"];
  const updated = data.meta?.updated;

  return (
    <div className="price-block">
      <div className="table-scroll">
        <table className="price-table">
          <thead>
            <tr>
              {columns.map((c, i) => (
                <th key={i}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(cat.rows || []).map((row, ri) => (
              <tr key={ri}>
                {columns.map((col, ci) => (
                  <td key={ci} data-label={col}>{row[ci]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {cat.note && <p className="price-note">{cat.note}</p>}
      {updated && (
        <p className="price-updated">
          {t("prices.updated")}: {updated}
        </p>
      )}
    </div>
  );
}
