import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Header/Header.css";

import logoImg from "../../assets/logo_AstroCash.png";
import { FaUserCircle, FaWallet, FaCoins, FaCog, FaSignOutAlt } from "react-icons/fa";

interface HeaderProps {
  toggleMenu: () => void;
  menuOpen: boolean;
}

export default function HeaderLogged({ toggleMenu, menuOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);


    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setProfileMenuOpen(false);
    navigate("/", { replace: true });
    window.location.reload();
  };

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      {/* Logo */}
      <div className="logo-container">
        <img src={logoImg} alt="AstroCash Logo" onClick={handleLogoClick} />
      </div>

      {/* Menu + Perfil */}
      <div className="menu-right">
        <nav className={`menu ${menuOpen ? "active" : ""}`}>
          <a href="/carteira" className="menu-item">
            <FaWallet /> Minha Carteira
          </a>
          <a href="/comprar-ativos" className="menu-item">
            <FaCoins /> Comprar Ativos
          </a>
        </nav>

        {/* Perfil */}
        <div className="profile-container">
          <button
            className="profile-icon"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          >
            <FaUserCircle size={30} />
          </button>
          <span className="tooltip">Perfil</span>

          {profileMenuOpen && (
            <div className="profile-menu">
              <button onClick={() => navigate("/configuracoes")}>
                <FaCog /> Configurações
              </button>
              <button onClick={handleLogout}>
                <FaSignOutAlt /> Sair
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hamburger */}
      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}
