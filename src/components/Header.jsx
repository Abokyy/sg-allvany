import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { SITE_CONFIG } from "../config.js";
import { useT } from "../i18n/I18nContext.jsx";

export default function Header() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const phone = SITE_CONFIG.contact.phones[0];
  const close = () => setOpen(false);

  const navClass = ({ isActive }) => (isActive ? "active" : undefined);

  return (
    <header className="site-header">
      <div className="container nav">
        <Link className="brand" to="/" aria-label="SG Állvány" onClick={close}>
          <img src={import.meta.env.BASE_URL + "assets/logo.svg"} alt="SG Állvány logó" />
          <span>{t("brand.name")}</span>
        </Link>

        <button
          className="nav__toggle"
          aria-label={t("nav.menu")}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>

        <ul className={"nav__links" + (open ? " open" : "")}>
          <li>
            <NavLink to="/" end className={navClass} onClick={close}>
              {t("nav.home")}
            </NavLink>
          </li>
          <li>
            <NavLink to="/homlokzati" className={navClass} onClick={close}>
              {t("nav.homlokzati")}
            </NavLink>
          </li>
          <li>
            <NavLink to="/gurulos" className={navClass} onClick={close}>
              {t("nav.gurulos")}
            </NavLink>
          </li>
          <li>
            <a href="#kapcsolat" onClick={close}>
              {t("nav.contact")}
            </a>
          </li>
          <li className="nav__cta">
            <a className="btn btn--primary" href={`tel:${phone.tel}`}>
              <span aria-hidden="true">📞</span>
              <span> {phone.display}</span>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
