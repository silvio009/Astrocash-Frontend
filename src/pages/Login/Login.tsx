import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import logo_login from "../../assets/logo_login.jpg";

export default function Login() {
  const [loginData, setLoginData] = useState({ emailLogin: "", senhaLogin: "" });
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginData.emailLogin || !loginData.senhaLogin) {
      setMensagemErro("Por favor, preencha todos os campos.");
      return;
    }

    try {
      setLoading(true); // inicia loading
      setMensagemErro("");

      // Simula delay de 2 segundos
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginData.emailLogin,
          senha: loginData.senhaLogin,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Credenciais inválidas.");
      }

      const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.id); // do backend
        localStorage.setItem("nome", data.nome);
        localStorage.setItem("email", data.email);
        localStorage.setItem("cpf", data.cpf);
        localStorage.setItem("dataCadastro", data.dataCadastro);

      navigate("/");
    } catch (error: any) {
      setMensagemErro(error.message || "Erro ao conectar com o servidor.");
    } finally {
      setLoading(false); 
    }
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

          {/* Botão com loader */}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? (
              <div className="login-loader">
                <span></span>
                <span></span>
                <span></span>
              </div>
            ) : (
              "Entrar"
            )}
          </button>

          {mensagemErro && <p className="login-error-message">{mensagemErro}</p>}
        </form>
      </div>
    </div>
  );
}
