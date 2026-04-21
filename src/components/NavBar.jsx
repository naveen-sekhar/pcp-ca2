import { NavLink } from "react-router-dom";

const NavBar = () => (
  <header className="topbar">
    <nav className="nav-links" aria-label="Primary">
      <NavLink
        to="/orders"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Orders
      </NavLink>
      <NavLink
        to="/filter"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Filter
      </NavLink>
      <NavLink
        to="/stats"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Stats
      </NavLink>
    </nav>
  </header>
);

export default NavBar;