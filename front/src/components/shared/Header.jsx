import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://127.0.0.1:5173/auth/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      localStorage.removeItem("token");

      setIsAuthenticated(false);
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <nav className="navbar">
      <div>
        <NavLink to={"/"}>
          <img src="/vite.svg" alt="logo site et bouton retour main page" />
        </NavLink>
      </div>
      <ul className="navbar__menu">
        <li className="navbar__menu-item">
          <NavLink className="navbar__menu-link" to={"/"}>
            home
          </NavLink>
        </li>
        {isAuthenticated ? (
          <>
            <li className="navbar__menu-item">
              <button className="navbar__menu-link" onClick={handleLogout}>
                Déconnexion
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="navbar__menu-item">
              <NavLink className="navbar__menu-link" to={"/register"}>
                S'inscrire
              </NavLink>
            </li>
            <li className="navbar__menu-item">
              <NavLink className="navbar__menu-link" to={"/login"}>
                Connexion
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
