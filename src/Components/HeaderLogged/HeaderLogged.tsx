import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../Header/Header.css";

import logoImg from "../../assets/logo_AstroCash.png";
import {
  FaUserCircle,
  FaWallet,
  FaCoins,
  FaCog,
  FaSignOutAlt,
  FaBell,
} from "react-icons/fa";

interface HeaderProps {
  toggleMenu: () => void;
  menuOpen: boolean;
}

interface Notificacao {
  id: number | string;
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

  const loadUserProfile = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (userId && token) {
      try {
        const res = await fetch(`http://localhost:8080/users/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          const endereco = data.endereco || {
            rua: "",
            bairro: "",
            numero: "",
            cidade: "",
            estado: "",
            cep: "",
          };
          setFormData((prev: any) => ({ ...prev, ...data, endereco }));
          localStorage.setItem("userProfile", JSON.stringify({ ...data, endereco }));
          return;
        }
      } catch (err) {
        console.warn("Erro ao buscar profile no backend:", err);
      }
    }

    const local = localStorage.getItem("userProfile");
    if (local) {
      try {
        const parsed = JSON.parse(local);
        parsed.endereco = parsed.endereco || {
          rua: "",
          bairro: "",
          numero: "",
          cidade: "",
          estado: "",
          cep: "",
        };
        setFormData((prev: any) => ({ ...prev, ...parsed }));
      } catch (e) {
        console.warn("userProfile no localStorage está inválido:", e);
      }
    }
  };

  useEffect(() => {
    loadUserProfile();

    const onUserProfileUpdated = () => {
      loadUserProfile();
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === "userProfile") {
        loadUserProfile();
      }
      if (e.key === "welcomeSeen") {
        loadUserProfile();
      }
    };

    window.addEventListener("userProfileUpdated", onUserProfileUpdated as EventListener);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("userProfileUpdated", onUserProfileUpdated as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

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

    if (!welcomeSeen) {
      novasNotificacoes.push({
        id: "welcome",
        mensagem: "👋 Bem-vindo ao seu futuro financeiro!",
        visto: false,
      });
    }

    const endereco = formData?.endereco;
    const enderecoPreenchido =
      endereco &&
      Object.values(endereco).every(
        (val) =>
          val !== null && val !== undefined && val.toString().trim() !== ""
      );
    if (!enderecoPreenchido) {
      novasNotificacoes.push({
        id: "endereco",
        mensagem: "🔔 Quase lá! Complete seu perfil para aproveitar todos os recursos.",
        link: "/configuracoes",
        visto: false,
      });
    }

    setNotificacoes(novasNotificacoes);
  }, [formData]);
  
  const handleOpenNotifications = () => {
    setNotificationOpen((prev) => !prev);
    setProfileMenuOpen(false);

    if (!notificationOpen) {
      const hasWelcome = notificacoes.find((n) => n.id === "welcome");
      if (hasWelcome) {
        localStorage.setItem("welcomeSeen", "true");
        setNotificacoes((prev) => prev.filter((n) => n.id !== "welcome"));
      }
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

  // ✅ Clique no logo
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
          {/* 🔔 Ícone do sino */}
          <div className="notification-container">
            <button
              ref={notificationBtnRef}
              className="notification-icon"
              title="Notificações"
              onClick={handleOpenNotifications}
            >
              <FaBell size={27} />
              {notificacoes.length > 0 && (
                <span className="notification-badge">
                  {notificacoes.length}
                </span>
              )}
            </button>

            {notificationOpen && (
              <div ref={notificationPopupRef} className="notification-popup">
                <h4>Notificações</h4>
                {notificacoes.length === 0 ? (
                  <p className="text-sm text-gray-500">Nenhuma notificação.</p>
                ) : (
                  notificacoes.map((notif) => (
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
                  ))
                )}
              </div>
            )}
          </div>

          {/* 👤 Ícone do perfil */}
          <button
            ref={profileBtnRef}
            className="profile-icon"
            title="Perfil"
            onClick={() => {
              setProfileMenuOpen((prev) => !prev);
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
