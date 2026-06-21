import { useT } from "../i18n/I18nContext.jsx";

/** Fontos tudnivalók (kaució, igazolvány) – homlokzati és gurulós oldalon. */
export default function Notice() {
  const t = useT();
  return (
    <section className="section">
      <div className="container">
        <div className="notice">
          <div className="notice__icon" aria-hidden="true">!</div>
          <div className="notice__body">
            <h3>{t("notice.title")}</h3>
            <p>{t("notice.id")}</p>
            <p>{t("notice.deposit")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
