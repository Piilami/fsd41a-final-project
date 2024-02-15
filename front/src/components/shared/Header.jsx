import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar">
      <div>
        <NavLink to={"/"}>
          <img src="/vite.svg" alt="logo site et bouton retour main page" />
        </NavLink>
      </div>
      <ul className="navbar__menu">
        <li className="navbar__menu-item">
          <NavLink className="navbar__menu-link" to={"/profil"}>
            Profil
          </NavLink>
        </li>
        <li className="navbar__menu-item">
          <NavLink className="navbar__menu-link" to={"/"}>
            Accueil
          </NavLink>
        </li>
        <li className="navbar__menu-item">
          <NavLink className="navbar__menu-link" to={"/Dashboard"}>
            Modération
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
