import React, { useState } from "react";
import "./Cadastro.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaIdCard, FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import logoCadastro from "../../assets/logo_login.jpg";

export default function CadastroFinal() {
  const navigate = useNavigate();

  const [dadosCadastro, setDadosCadastro] = useState({
    cadastroNome: "",
    cadastroEmail: "",
    cadastroCPF: "",
    cadastroSenha: "",
    cadastroRepetirSenha: "",
  });

  const [mostrarRequisitos, setMostrarRequisitos] = useState(false);
  const [requisitosSenha, setRequisitosSenha] = useState({
    comprimento: false,
    maiuscula: false,
    minuscula: false,
    numero: false,
    especial: false,
  });
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarRepetirSenha, setMostrarRepetirSenha] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCadastroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDadosCadastro({ ...dadosCadastro, [e.target.name]: e.target.value });
  };

  const verificarRequisitos = (senha: string) => {
    setRequisitosSenha({
      comprimento: senha.length >= 8,
      maiuscula: /[A-Z]/.test(senha),
      minuscula: /[a-z]/.test(senha),
      numero: /\d/.test(senha),
      especial: /[@$!%*?&]/.test(senha),
    });
  };

  const validarSenha = (senha: string) => {
    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(senha);
  };

  const handleCadastroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarSenha(dadosCadastro.cadastroSenha)) {
      Swal.fire({
        icon: "error",
        title: "Senha inválida",
        text: "A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial.",
      });
      return;
    }

    if (dadosCadastro.cadastroSenha !== dadosCadastro.cadastroRepetirSenha) {
      Swal.fire({
        icon: "error",
        title: "Senha não confere",
        text: "As senhas não coincidem.",
      });
      return;
    }

    setLoading(true);

    try {
      // Cadastro
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: dadosCadastro.cadastroNome,
          email: dadosCadastro.cadastroEmail,
          cpf: dadosCadastro.cadastroCPF,
          senha: dadosCadastro.cadastroSenha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Erro ao criar conta",
          text: data.erro || "Ocorreu um erro no cadastro.",
        });
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Login automático após cadastro
      const loginResponse = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: dadosCadastro.cadastroEmail,
          senha: dadosCadastro.cadastroSenha,
        }),
      });

      const loginData = await loginResponse.json();

      if (loginResponse.ok && loginData.token) {
        // Salvar tudo no localStorage
        localStorage.setItem("token", loginData.token);
        localStorage.setItem("userId", loginData.id);
        localStorage.setItem("nome", loginData.nome);
        localStorage.setItem("email", loginData.email);
        localStorage.setItem("cpf", loginData.cpf);
        localStorage.setItem("dataCadastro", loginData.dataCadastro || "");

        await Swal.fire({
          icon: "success",
          title: "Conta criada com sucesso!",
          html: `Parabéns <strong>${dadosCadastro.cadastroNome}</strong>! 🎉<br>Agora você já está logado e pode começar a investir no seu futuro financeiro 🚀💰`,
          confirmButtonText: "Começar agora!",
          timer: 5000,
          timerProgressBar: true,
        });

        navigate("/"); 
      } else {
        Swal.fire({
          icon: "error",
          title: "Erro no login automático",
          text: "Conta criada, mas não conseguimos logar automaticamente. Faça login manualmente.",
        });
        navigate("/login");
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Erro ao criar conta",
        text: "Ocorreu um erro ao conectar com o servidor.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-left">
        <img src={logoCadastro} alt="Investimento" />
      </div>

      <div className="cadastro-right">
        <nav className="cadastro-breadcrumb">
          <Link to="/" className="cadastro-breadcrumb-link">
            Home
          </Link>
          <span className="cadastro-breadcrumb-separator">›</span>
          <span className="cadastro-breadcrumb-current">Cadastrar-se</span>
        </nav>

        <div className="cadastro-header">
          <FaUser className="cadastro-header-icon" />
          <h2>Invista no seu futuro 🚀</h2>
          <p>Comece hoje a transformar sua vida financeira!</p>
        </div>

        <form onSubmit={handleCadastroSubmit} className="cadastro-form">
          <div className="cadastro-input-group">
            <FaUser className="cadastro-input-icon" />
            <input
              type="text"
              name="cadastroNome"
              placeholder="Nome completo"
              value={dadosCadastro.cadastroNome}
              onChange={handleCadastroChange}
              required
            />
          </div>

          <div className="cadastro-input-group">
            <FaEnvelope className="cadastro-input-icon" />
            <input
              type="email"
              name="cadastroEmail"
              placeholder="E-mail"
              value={dadosCadastro.cadastroEmail}
              onChange={handleCadastroChange}
              required
            />
          </div>

          <div className="cadastro-input-group">
            <FaIdCard className="cadastro-input-icon" />
            <input
              type="text"
              name="cadastroCPF"
              placeholder="CPF"
              value={dadosCadastro.cadastroCPF}
              onChange={handleCadastroChange}
              required
            />
          </div>

          <div className="cadastro-input-group cadastro-senha-group">
            <FaLock className="cadastro-input-icon" />
            <input
              type={mostrarSenha ? "text" : "password"}
              name="cadastroSenha"
              placeholder="Senha"
              value={dadosCadastro.cadastroSenha}
              onChange={(e) => {
                handleCadastroChange(e);
                verificarRequisitos(e.target.value);
              }}
              onFocus={() => setMostrarRequisitos(true)}
              onBlur={() => setMostrarRequisitos(false)}
              required
            />
            <span
              className="cadastro-senha-toggle"
              onClick={() => setMostrarSenha(!mostrarSenha)}
            >
              {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {mostrarRequisitos && (
            <div className="cadastro-password-popup">
              <p className={requisitosSenha.comprimento ? "ok" : "erro"}>
                • Pelo menos 8 dígitos
              </p>
              <p className={requisitosSenha.maiuscula ? "ok" : "erro"}>
                • 1 letra maiúscula
              </p>
              <p className={requisitosSenha.minuscula ? "ok" : "erro"}>
                • 1 letra minúscula
              </p>
              <p className={requisitosSenha.numero ? "ok" : "erro"}>• 1 número</p>
              <p className={requisitosSenha.especial ? "ok" : "erro"}>
                • 1 caractere especial (@$!%*?&)
              </p>
            </div>
          )}

          <div className="cadastro-input-group cadastro-senha-group">
            <FaLock className="cadastro-input-icon" />
            <input
              type={mostrarRepetirSenha ? "text" : "password"}
              name="cadastroRepetirSenha"
              placeholder="Confirmar senha"
              value={dadosCadastro.cadastroRepetirSenha}
              onChange={handleCadastroChange}
              required
            />
            <span
              className="cadastro-senha-toggle"
              onClick={() => setMostrarRepetirSenha(!mostrarRepetirSenha)}
            >
              {mostrarRepetirSenha ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="cadastro-btn-cadastrar" disabled={loading}>
            {loading ? (
              <div className="login-loader">
                <span></span>
                <span></span>
                <span></span>
              </div>
            ) : (
              "Cadastrar-se"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
