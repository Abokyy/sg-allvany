import { useT } from "../i18n/I18nContext.jsx";
import PriceTable from "../components/PriceTable.jsx";
import Notice from "../components/Notice.jsx";
import CtaBanner from "../components/CtaBanner.jsx";

export default function Homlokzati() {
  const t = useT();
  return (
    <>
      <section className="hero hero--page">
        <div className="container hero__inner">
          <h1>{t("homlokzati.title")}</h1>
          <p>{t("homlokzati.subtitle")}</p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#kapcsolat">{t("cta.quote")}</a>
            <a className="btn btn--ghost" href="#arak">{t("cta.viewPrices")}</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <h2>{t("homlokzati.introTitle")}</h2>
          <p>{t("homlokzati.introText")}</p>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <h2 className="section__title">{t("homlokzati.featuresTitle")}</h2>
          <ul className="checklist checklist--center">
            <li>{t("homlokzati.feature1")}</li>
            <li>{t("homlokzati.feature2")}</li>
            <li>{t("homlokzati.feature3")}</li>
            <li>{t("homlokzati.feature4")}</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section__title">{t("homlokzati.condTitle")}</h2>
          <ol className="cond-list">
            <li className="cond-item"><span className="cond-num">1</span><p>{t("homlokzati.cond1")}</p></li>
            <li className="cond-item"><span className="cond-num">2</span><p>{t("homlokzati.cond2")}</p></li>
            <li className="cond-item"><span className="cond-num">3</span><p>{t("homlokzati.cond3")}</p></li>
            <li className="cond-item"><span className="cond-num">4</span><p>{t("homlokzati.cond4")}</p></li>
          </ol>
        </div>
      </section>

      <Notice />

      <section className="section" id="arak">
        <div className="container">
          <h2 className="section__title">{t("homlokzati.pricesTitle")}</h2>
          <PriceTable category="homlokzati" />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
