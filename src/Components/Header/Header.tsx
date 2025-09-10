import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Header/Header.css";

import logoImg from "../../assets/logo_AstroCash.png";
import { AuthContext } from "../../contexts/AuthContext";
import HeaderLogged from "../HeaderLogged/HeaderLogged";

interface HeaderProps {
  toggleMenu: () => void;
  menuOpen: boolean;
}

export default function Header({ toggleMenu, menuOpen }: HeaderProps) {
  const { isLogged, isInitialized } = useContext(AuthContext);
  if (!isInitialized) return null;
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="logo-container">
        <img src={logoImg} alt="AstroCash Logo" onClick={handleLogoClick} />
      </div>

      {isLogged ? (
        <HeaderLogged toggleMenu={toggleMenu} menuOpen={menuOpen} />
      ) : (
        <nav className={`menu ${menuOpen ? "active" : ""}`}>
          <a
            href="#aprenda-investir"
            className="menu-item"
            onClick={(e) => {
              e.preventDefault();
              const section = document.getElementById("aprenda-investir");
              if (section) {
                const headerOffset = 60;
                const elementPosition =
                  section.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
              }
            }}
          >
            Como Investir
          </a>

          <div className="auth-buttons">
            <a href="/Cadastrar-se">
              <button type="button">Cadastrar-se</button>
            </a>
            <a href="/Login">
              <button type="button">Entrar</button>
            </a>
          </div>
        </nav>
      )}

      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}
