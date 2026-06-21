import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section" style={{ textAlign: "center", padding: "80px 0" }}>
      <div className="container">
        <h1 style={{ fontSize: "3rem", color: "var(--red)" }}>404</h1>
        <h2>Ez az oldal nem található</h2>
        <p>Lehet, hogy elírás történt, vagy az oldal megszűnt.</p>
        <Link className="btn btn--primary" to="/">Vissza a főoldalra</Link>
      </div>
    </section>
  );
}
