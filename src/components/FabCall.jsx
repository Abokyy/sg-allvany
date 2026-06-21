import { SITE_CONFIG } from "../config.js";

/** Lebegő telefon gomb (csak mobilon látszik, CSS dönt róla). */
export default function FabCall() {
  const phone = SITE_CONFIG.contact.phones[0];
  if (!phone) return null;
  return (
    <a className="fab-call" href={`tel:${phone.tel}`}>
      <span aria-hidden="true">📞</span>
      <span>Hívás</span>
    </a>
  );
}
