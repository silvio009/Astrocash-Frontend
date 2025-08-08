import React from "react";
import "../Header/Header.css";

// Importa a imagem do logo
import logoImg from "../../assets/logo_AstroCash.png";

interface HeaderProps {
  toggleMenu: () => void;
  menuOpen: boolean;
}

export default function Header({ toggleMenu, menuOpen }: HeaderProps) {
  return (
    <header className="navbar">
      {/* Substitui o texto pela imagem */}
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