// src/components/Layout.js
import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "./index";

const Layout = () => (
  <div className="section">
    <Navbar />
    <main className="main mx-auto px-6">
      <Outlet />
      <Footer />
    </main>
  </div>
);

export default Layout;
