import { SITE_CONFIG } from "../config.js";
import { useT } from "../i18n/I18nContext.jsx";

export default function Contact() {
  const t = useT();
  const { phones, email, addressLines, hours, mapsQuery } = SITE_CONFIG.contact;
  const mapSrc =
    "https://www.google.com/maps?q=" + encodeURIComponent(mapsQuery) + "&output=embed";

  return (
    <section className="section section--soft" id="kapcsolat">
      <div className="container">
        <h2 className="section__title">{t("contact.title")}</h2>
        <p style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 30px" }}>
          {t("contact.subtitle")}
        </p>
        <div className="contact-grid">
          <div>
            <div className="contact-item">
              <div className="label">{t("contact.phoneLabel")}</div>
              {phones.map((p) => (
                <div key={p.tel}><a href={`tel:${p.tel}`}>{p.display}</a></div>
              ))}
            </div>
            <div className="contact-item">
              <div className="label">{t("contact.emailLabel")}</div>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
            <div className="contact-item">
              <div className="label">{t("contact.addressLabel")}</div>
              {addressLines.map((l, i) => (
                <div className="plain" key={i}>{l}</div>
              ))}
            </div>
            <div className="contact-item">
              <div className="label">{t("contact.hoursLabel")}</div>
              {hours.map((h, i) => (
                <div className="plain" key={i}>
                  {h.days}: <strong>{h.time}</strong>
                </div>
              ))}
            </div>
          </div>
          <div>
            <iframe
              className="map-frame"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t("contact.mapTitle")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
