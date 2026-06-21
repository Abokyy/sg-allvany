import { useT } from "../i18n/I18nContext.jsx";
import PriceTable from "../components/PriceTable.jsx";
import Notice from "../components/Notice.jsx";
import DriveEmbed from "../components/DriveEmbed.jsx";
import CtaBanner from "../components/CtaBanner.jsx";

export default function Gurulos() {
  const t = useT();
  return (
    <>
      <section className="hero hero--page">
        <div className="container hero__inner">
          <h1>{t("gurulos.title")}</h1>
          <p>{t("gurulos.subtitle")}</p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#kapcsolat">{t("cta.quote")}</a>
            <a className="btn btn--ghost" href="#arak">{t("cta.viewPrices")}</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <h2>{t("gurulos.introTitle")}</h2>
          <p>{t("gurulos.introText")}</p>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container grid grid--2">
          <div>
            <h2>{t("gurulos.featuresTitle")}</h2>
            <ul className="checklist">
              <li>{t("gurulos.feature1")}</li>
              <li>{t("gurulos.feature2")}</li>
              <li>{t("gurulos.feature3")}</li>
              <li>{t("gurulos.feature4")}</li>
            </ul>
          </div>
          <div>
            <h2>{t("gurulos.termsTitle")}</h2>
            <ul className="checklist">
              <li>{t("gurulos.term1")}</li>
              <li>{t("gurulos.term2")}</li>
              <li>{t("gurulos.term4")}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section__title">{t("gurulos.heightTitle")}</h2>
          <div className="grid grid--2 height-explainer">
            <p>{t("gurulos.heightText")}</p>
            <figure className="height-figure">
              <img
                src="/assets/munkamagassag.svg"
                alt="A munkamagasság szemléltetése: a munkaszint magassága plusz körülbelül 2 méter."
              />
            </figure>
          </div>
        </div>
      </section>

      <Notice />

      <section className="section" id="arak">
        <div className="container">
          <h2 className="section__title">{t("gurulos.pricesTitle")}</h2>
          <PriceTable category="gurulos" />
        </div>
      </section>

      <section className="section section--soft" id="tartozekok">
        <div className="container">
          <h2 className="section__title">{t("gurulos.docTitle")}</h2>
          <p style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 24px" }}>
            {t("gurulos.docText")}
          </p>
          <DriveEmbed doc="gurulosTartozek" />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
