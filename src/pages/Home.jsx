import { Link } from "react-router-dom";
import { useT } from "../i18n/I18nContext.jsx";
import CtaBanner from "../components/CtaBanner.jsx";

export default function Home() {
  const t = useT();
  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <h1>{t("home.heroTitle")}</h1>
          <p>{t("home.heroSubtitle")}</p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#kapcsolat">{t("cta.quote")}</a>
            <a className="btn btn--ghost" href="#tipusok">{t("cta.more")}</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section__title">{t("home.introTitle")}</h2>
          <p style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
            {t("home.introText")}
          </p>
        </div>
      </section>

      <section className="section section--soft" id="tipusok">
        <div className="container">
          <h2 className="section__title">{t("home.productsTitle")}</h2>
          <div className="grid grid--2">
            <div className="card">
              <span className="product-card__tag">{t("nav.homlokzati")}</span>
              <h3>{t("homlokzati.title")}</h3>
              <p>{t("home.homlokzatiCardText")}</p>
              <Link className="btn btn--outline" to="/homlokzati">{t("cta.more")}</Link>
            </div>
            <div className="card">
              <span className="product-card__tag">{t("nav.gurulos")}</span>
              <h3>{t("gurulos.title")}</h3>
              <p>{t("home.gurulosCardText")}</p>
              <Link className="btn btn--outline" to="/gurulos">{t("cta.more")}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section__title">{t("home.whyTitle")}</h2>
          <div className="grid grid--4">
            <div className="feature">
              <div className="feature__icon" aria-hidden="true">🛡️</div>
              <h3>{t("home.why1Title")}</h3>
              <p>{t("home.why1Text")}</p>
            </div>
            <div className="feature">
              <div className="feature__icon" aria-hidden="true">⚡</div>
              <h3>{t("home.why2Title")}</h3>
              <p>{t("home.why2Text")}</p>
            </div>
            <div className="feature">
              <div className="feature__icon" aria-hidden="true">🤝</div>
              <h3>{t("home.why3Title")}</h3>
              <p>{t("home.why3Text")}</p>
            </div>
            <div className="feature">
              <div className="feature__icon" aria-hidden="true">👷</div>
              <h3>{t("home.why4Title")}</h3>
              <p>{t("home.why4Text")}</p>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
