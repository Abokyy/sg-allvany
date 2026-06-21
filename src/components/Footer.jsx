import { Link } from "react-router-dom";
import { SITE_CONFIG } from "../config.js";
import { useT } from "../i18n/I18nContext.jsx";

export default function Footer() {
  const t = useT();
  const { phones, email } = SITE_CONFIG.contact;
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">{t("brand.name")}</div>
          <p>{t("footer.madeWith")}</p>
        </div>
        <div>
          <h4>{t("nav.menu")}</h4>
          <ul>
            <li><Link to="/">{t("nav.home")}</Link></li>
            <li><Link to="/homlokzati">{t("nav.homlokzati")}</Link></li>
            <li><Link to="/gurulos">{t("nav.gurulos")}</Link></li>
          </ul>
        </div>
        <div>
          <h4>{t("contact.title")}</h4>
          <ul>
            {phones.map((p) => (
              <li key={p.tel}><a href={`tel:${p.tel}`}>{p.display}</a></li>
            ))}
            <li><a href={`mailto:${email}`}>{email}</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        © {year} {t("brand.name")} · {t("footer.rights")}
      </div>
    </footer>
  );
}
