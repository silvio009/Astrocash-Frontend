import React, { useState } from "react";
import "./Cadastro.css";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaIdCard, FaEye, FaEyeSlash } from "react-icons/fa";
import logoCadastro from "../../assets/logo_login.jpg";

export default function CadastroFinal() {
  const [dadosCadastro, setDadosCadastro] = useState({
    cadastroNome: "",
    cadastroEmail: "",
    cadastroCPF: "",
    cadastroSenha: "",
    cadastroRepetirSenha: "",
  });

  // Verifica senha

  const [mostrarRequisitos, setMostrarRequisitos] = useState(false);

  const [requisitosSenha, setRequisitosSenha] = useState({
    comprimento: false,
    maiuscula: false,
    minuscula: false,
    numero: false,
    especial: false,
  });
  const verificarRequisitos = (senha: string) => {
  setRequisitosSenha({
    comprimento: senha.length >= 8,
    maiuscula: /[A-Z]/.test(senha),
    minuscula: /[a-z]/.test(senha),
    numero: /\d/.test(senha),
    especial: /[@$!%*?&]/.test(senha),
  });
};
  // mostra senha
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarRepetirSenha, setMostrarRepetirSenha] = useState(false);
  const [erroCadastro, setErroCadastro] = useState("");

  const handleCadastroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDadosCadastro({ ...dadosCadastro, [e.target.name]: e.target.value });
  };

  const validarSenha = (senha: string) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(senha);
  };

  const handleCadastroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarSenha(dadosCadastro.cadastroSenha)) {
      setErroCadastro(
        "A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial."
      );
      return;
    }
    if (dadosCadastro.cadastroSenha !== dadosCadastro.cadastroRepetirSenha) {
      setErroCadastro("As senhas não coincidem.");
      return;
    }
    setErroCadastro("");
    alert("Cadastro realizado com sucesso! 🚀");
    // integração com backend
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-left">
        <img src={logoCadastro} alt="Investimento" />
      </div>

      <div className="cadastro-right">
        <nav className="cadastro-breadcrumb">
          <Link to="/" className="cadastro-breadcrumb-link">Home</Link>
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
                if (e.target.name === "cadastroSenha") {
                  verificarRequisitos(e.target.value);
                }
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
              <p className={requisitosSenha.comprimento ? "ok" : "erro"}>• Pelo menos 8 dígitos</p>
              <p className={requisitosSenha.maiuscula ? "ok" : "erro"}>• 1 letra maiúscula</p>
              <p className={requisitosSenha.minuscula ? "ok" : "erro"}>• 1 letra minúscula</p>
              <p className={requisitosSenha.numero ? "ok" : "erro"}>• 1 número</p>
              <p className={requisitosSenha.especial ? "ok" : "erro"}>• 1 caractere especial (@$!%*?&)</p>
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

          {erroCadastro && <p className="cadastro-error-message">{erroCadastro}</p>}

          <button type="submit" className="cadastro-btn-cadastrar">
            Cadastrar-se
          </button>
        </form>
      </div>
    </div>
  );
}
