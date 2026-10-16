import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import navLogo from "../img/navlogo.png";
import "./Nav.css";

const links = [
  ["/", "Home"],
  ["/Training", "Training"],
  ["/trainers", "Trainers"],
  ["/Record", "Records"],
  ["/About", "About us"],
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 981px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <nav className="sn-nav" aria-label="Main navigation">
      <NavLink to="/" className="sn-brand" aria-label="Silambam Shadows home" onClick={() => setMenuOpen(false)}>
        <img
          src={navLogo}
          alt="Silambam Shadows"
          className="sn-brand-logo"
          width="168"
          height="58"
        />
      </NavLink>

      <button
        ref={toggleRef}
        type="button"
        className={`sn-toggle${menuOpen ? " sn-toggle-open" : ""}`}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-controls="sn-navigation-links"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span /><span />
      </button>

      <div id="sn-navigation-links" className={`sn-menu${menuOpen ? " sn-menu-open" : ""}`}>
        <ul className="sn-links">
          {links.map(([path, label]) => (
            <li key={path}>
              <NavLink to={path} end={path === "/"} className={({ isActive }) => `sn-link${isActive ? " sn-link-active" : ""}`} onClick={() => setMenuOpen(false)}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <NavLink to="/contact" className="sn-join" onClick={() => setMenuOpen(false)}>
          Start your journey <span aria-hidden="true">↗</span>
        </NavLink>
      </div>
    </nav>
  );
}
