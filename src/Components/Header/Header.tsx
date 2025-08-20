import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Header/Header.css";

import logoImg from "../../assets/logo_AstroCash.png";

interface HeaderProps {
  toggleMenu: () => void;
  menuOpen: boolean;
}

export default function Header({ toggleMenu, menuOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

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
      <div className="logo">
        <img
          src={logoImg}
          alt="AstroCash Logo"
          style={{ cursor: "pointer" }}
          onClick={handleLogoClick}
        />
      </div>

      <nav className={`menu ${menuOpen ? "active" : ""}`}>
        <a
          href="#aprenda-investir"
          onClick={(e) => {
            e.preventDefault();
            const section = document.getElementById("aprenda-investir");
            if (section) {
              const headerOffset = 85;
              const elementPosition =
                section.getBoundingClientRect().top + window.scrollY;
              const offsetPosition = elementPosition - headerOffset;

              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
              });
            }
          }}
        >
          Como Investir
        </a>
        <div className="auth-buttons">
          <a href="/login">
          <button type="button">Cadastrar-se</button>
          </a>
  
          <button type="button">Entrar</button>
        </div>
      </nav>

      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}
