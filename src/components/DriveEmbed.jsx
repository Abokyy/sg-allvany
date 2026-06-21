import { SITE_CONFIG } from "../config.js";

/** Beágyazott Google Drive dokumentum a config.docs alapján. */
export default function DriveEmbed({ doc }) {
  const id = SITE_CONFIG.docs?.[doc];
  if (!id) return null;
  return (
    <div className="doc-embed">
      <iframe
        className="doc-frame"
        src={`https://drive.google.com/file/d/${id}/preview`}
        allow="autoplay"
        loading="lazy"
        title="Dokumentum"
      />
      <a
        className="btn btn--outline"
        target="_blank"
        rel="noopener noreferrer"
        href={`https://drive.google.com/file/d/${id}/view`}
      >
        Megnyitás új lapon
      </a>
    </div>
  );
}
