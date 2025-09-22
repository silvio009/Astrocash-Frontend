import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../Header/Header.css";

import logoImg from "../../assets/logo_AstroCash.png";
import { FaUserCircle, FaWallet, FaCoins, FaCog, FaSignOutAlt, FaBell } from "react-icons/fa";

interface HeaderProps {
  toggleMenu: () => void;
  menuOpen: boolean;
}

interface Notificacao {
  id: number;
  mensagem: string;
  link?: string;
  visto?: boolean;
}

export default function HeaderLogged({ toggleMenu, menuOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);

  const location = useLocation();
  const navigate = useNavigate();

  // Form data vindo do backend/localStorage
  const [formData, setFormData] = useState<any>({
    endereco: {
      rua: "",
      bairro: "",
      numero: "",
      cidade: "",
      estado: "",
      cep: "",
    },
  });

  const notificationBtnRef = useRef<HTMLButtonElement | null>(null);
  const notificationPopupRef = useRef<HTMLDivElement | null>(null);
  const profileBtnRef = useRef<HTMLButtonElement | null>(null);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (notificationOpen) {
        const clickedInsideNotification =
          notificationBtnRef.current?.contains(target) ||
          notificationPopupRef.current?.contains(target);
        if (!clickedInsideNotification) setNotificationOpen(false);
      }
      if (profileMenuOpen) {
        const clickedInsideProfile =
          profileBtnRef.current?.contains(target) ||
          profileMenuRef.current?.contains(target);
        if (!clickedInsideProfile) setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notificationOpen, profileMenuOpen]);

  useEffect(() => {
    const novasNotificacoes: Notificacao[] = [];

    const welcomeSeen = localStorage.getItem("welcomeSeen") === "true";
    novasNotificacoes.push({
      id: 1,
      mensagem: "👋 Bem-vindo ao seu futuro financeiro!",
      visto: welcomeSeen,
    });

    const endereco = formData?.endereco;
    const enderecoPreenchido =
      endereco &&
      Object.values(endereco).every(
        (val) => val !== null && val !== undefined && val.toString().trim() !== ""
      );

    if (!enderecoPreenchido) {
      novasNotificacoes.push({
        id: 2,
        mensagem: "⚠️ Você ainda não configurou o seu endereço.",
        link: "/configuracoes",
        visto: false,
      });
    }

    setNotificacoes(novasNotificacoes);
  }, [formData]);

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Você tem certeza que deseja sair?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        setProfileMenuOpen(false);
        navigate("/", { replace: true });
        window.location.reload();
      } else {
        setProfileMenuOpen(false);
      }
    });
  };

  const handleOpenNotifications = () => {
    setNotificationOpen((p) => !p);
    setProfileMenuOpen(false);
    if (notificacoes.some((n) => n.id === 1 && !n.visto)) {
      localStorage.setItem("welcomeSeen", "true");
      setNotificacoes((prev) =>
        prev.map((n) => (n.id === 1 ? { ...n, visto: true } : n))
      );
    }
  };

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="logo-container">
        <img src={logoImg} alt="AstroCash Logo" onClick={handleLogoClick} />
      </div>

      <div className="menu-right">
        <nav className={`menu ${menuOpen ? "active" : ""}`}>
          <a href="/carteira" className="menu-item">
            <FaWallet /> Minha Carteira
          </a>
          <a href="/comprar-ativos" className="menu-item">
            <FaCoins /> Comprar Ativos
          </a>
        </nav>

        <div className="profile-container">
          {/* Ícone do sininho */}
          <div className="notification-container">
            <button
              ref={notificationBtnRef}
              className="notification-icon"
              title="Notificações"
              onClick={handleOpenNotifications}
            >
              <FaBell size={27} />
              {/* Badge conta apenas notificações não vistas */}
              {notificacoes.some((n) => !n.visto) && (
                <span className="notification-badge">
                  {notificacoes.filter((n) => !n.visto).length}
                </span>
              )}
            </button>

            {notificationOpen && (
              <div ref={notificationPopupRef} className="notification-popup">
                <h4>Notificações</h4>
                {notificacoes.map((notif) => {
                  // Não renderiza notificação de endereço se preenchido
                  if (
                    notif.id === 2 &&
                    formData.endereco &&
                    Object.values(formData.endereco).every(
                      (val) => val !== null && val !== undefined && val.toString().trim() !== ""
                    )
                  ) {
                    return null;
                  }

                  return (
                    <div
                      key={notif.id}
                      className={`notification-item ${
                        notif.visto ? "notification-read" : ""
                      }`}
                      onClick={() => {
                        if (notif.link) navigate(notif.link);
                      }}
                    >
                      {notif.mensagem}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Ícone do usuário */}
          <button
            ref={profileBtnRef}
            className="profile-icon"
            title="Perfil"
            onClick={() => {
              setProfileMenuOpen((p) => !p);
              setNotificationOpen(false);
            }}
          >
            <FaUserCircle size={30} />
          </button>

          {profileMenuOpen && (
            <div ref={profileMenuRef} className="profile-menu">
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

      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}
