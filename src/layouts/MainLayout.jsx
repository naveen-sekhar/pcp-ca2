import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const MainLayout = () => (
  <div className="app-shell">
    <NavBar />
    <main className="app-main">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default MainLayout;