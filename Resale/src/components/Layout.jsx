// src/components/Layout.js
import { Outlet, Link } from "react-router-dom";
import { navLinks } from "@/utils/navLinks";

const Layout = () => (
  <div className="min-h-screen section">
    <header className="header">
      <nav className="nav">
        <h1 className="logo">My App</h1>
        <div className="nav-links">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="nav-link">
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
    <main className="main">
      <Outlet />
    </main>
    <footer className="footer">© 2025 My App</footer>
  </div>
);

export default Layout;
