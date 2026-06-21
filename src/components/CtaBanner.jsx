import { useT } from "../i18n/I18nContext.jsx";

export default function CtaBanner() {
  const t = useT();
  return (
    <section className="section cta-banner">
      <div className="container">
        <h2>{t("home.ctaBannerTitle")}</h2>
        <p>{t("home.ctaBannerText")}</p>
        <a className="btn btn--outline" href="#kapcsolat">
          {t("cta.quote")}
        </a>
      </div>
    </section>
  );
}
