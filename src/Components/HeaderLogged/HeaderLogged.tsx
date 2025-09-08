import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Header/Header.css";

import logoImg from "../../assets/logo_AstroCash.png";
import { FaUser, FaWallet, FaChartLine, FaCoins } from "react-icons/fa";

interface HeaderProps {
  toggleMenu: () => void;
  menuOpen: boolean;
}

export default function HeaderLogged({ toggleMenu, menuOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
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
        <a href="/perfil"><FaUser /> Meu Perfil</a>
        <a href="/carteira"><FaWallet /> Minha Carteira</a>
        <a href="/ativos"><FaChartLine /> Meus Ativos</a>
        <a href="/investimentos"><FaCoins /> Investimentos</a>
        <a href="/comprar-ativos"><FaCoins /> Comprar Ativos</a>
      </nav>

      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}
