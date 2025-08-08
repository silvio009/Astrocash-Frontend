import React, { useState, useEffect } from "react";
import "../Header/Header.css";

// Importa a imagem do logo
import logoImg from "../../assets/logo_AstroCash.png";

interface HeaderProps {
  toggleMenu: () => void;
  menuOpen: boolean;
}

export default function Header({ toggleMenu, menuOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Limpeza do event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="logo">
        <img src={logoImg} alt="AstroCash Logo" />
      </div>

      <nav className={`menu ${menuOpen ? "active" : ""}`}>
        <a href="/como-investir">Como Investir</a>
        <div className="auth-buttons">
          <button type="button">Cadastrar-se</button>
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