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
        <nav className="rf-breadcrumb">
          <Link to="/" className="rf-breadcrumb-link">Home</Link>
          <span className="rf-breadcrumb-separator">›</span>
          <span className="rf-breadcrumb-current">Login</span>
        </nav>

        <div className="login-header">
          <div className="header-icon-text">
            <FaEnvelope className="login-icon" />
            <div>
              <h2>Bem-vindo de volta! 🚀</h2>
              <p>Entre com seu e-mail e senha para acessar sua conta.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="emailLogin"
              placeholder="E-mail"
              value={loginData.emailLogin}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group senha-group">
            <FaLock className="input-icon" />
            <input
              type={mostrarSenha ? "text" : "password"}
              name="senhaLogin"
              placeholder="Senha"
              value={loginData.senhaLogin}
              onChange={handleChange}
              required
            />
            <span
              className="senha-toggle"
              onClick={() => setMostrarSenha(!mostrarSenha)}
            >
              {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {mensagemErro && <p className="error-message">{mensagemErro}</p>}

          <button type="submit" className="btn-login">Entrar</button>
        </form>
      </div>
    </div>
  );
}
