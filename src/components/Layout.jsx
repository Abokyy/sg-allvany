import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Contact from "./Contact.jsx";
import FabCall from "./FabCall.jsx";

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <Contact />
      </main>
      <Footer />
      <FabCall />
    </>
  );
}
