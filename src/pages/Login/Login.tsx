import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import logo_login from "../../assets/logo_login.jpg";

export default function Login() {
  const [loginData, setLoginData] = useState({ emailLogin: "", senhaLogin: "" });
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.emailLogin || !loginData.senhaLogin) {
      setMensagemErro("Por favor, preencha todos os campos.");
      return;
    }
    setMensagemErro("");
    alert("Login realizado com sucesso! 🚀");
  };

  return (
    <div className="login-container">
      {/* Lado Esquerdo */}
      <div className="login-left">
        <img src={logo_login} alt="Investimento" />
      </div>

      {/* Lado Direito */}
      <div className="login-right">
        <nav className="login-breadcrumb">
          <Link to="/" className="login-breadcrumb-link">Home</Link>
          <span className="login-breadcrumb-separator">›</span>
          <span className="login-breadcrumb-current">Login</span>
        </nav>

        <div className="login-header">
          <div className="login-header-icon-text">
            <FaEnvelope className="login-icon" />
            <div>
              <h2>Bem-vindo de volta! 🚀</h2>
              <p>Entre com seu e-mail e senha para acessar sua conta.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-input-group">
            <FaEnvelope className="login-input-icon" />
            <input
              type="email"
              name="emailLogin"
              placeholder="E-mail"
              value={loginData.emailLogin}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login-input-group login-senha-group">
            <FaLock className="login-input-icon" />
            <input
              type={mostrarSenha ? "text" : "password"}
              name="senhaLogin"
              placeholder="Senha"
              value={loginData.senhaLogin}
              onChange={handleChange}
              required
            />
            <span
              className="login-senha-toggle"
              onClick={() => setMostrarSenha(!mostrarSenha)}
            >
              {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {mensagemErro && <p className="login-error-message">{mensagemErro}</p>}

          <button type="submit" className="login-btn">Entrar</button>
        </form>
      </div>
    </div>
  );
}
