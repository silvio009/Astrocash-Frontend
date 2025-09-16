import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock, MapPin, Calendar, Phone } from "lucide-react";

import Footer from "../../components/Footer/FooterSection";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import "./configuracoes.css";
import UserIcon from "../../assets/user-icon.png";

const CardSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="config-card">
    <h2 className="config-card-title">{title}</h2>
    <div className="config-card-body">{children}</div>
  </div>
);

export default function Configuracao() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    cpf: "",
    endereco: "",
    dataCadastro: "",
    telefone: "",
    fotoPerfil: UserIcon, // Fixa o ícone, não vai mudar
  });

  // 🔹 Puxa dados do localStorage assim que a página monta
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const nome = localStorage.getItem("nome");
    const email = localStorage.getItem("email");
    const cpf = localStorage.getItem("cpf");
    const dataCadastro = localStorage.getItem("dataCadastro")
    const telefone = localStorage.getItem("telefone")

    console.log("Dados do localStorage: ", { token, userId, nome, email, cpf });

    if (!token || !userId) {
      console.log("Token ou userId não encontrado no localStorage");
      return;
    }

    // Preenche os dados iniciais do front
    setFormData(prev => ({
      ...prev,
      nome: nome || "",
      email: email || "",
      cpf: cpf || "",
      dataCadastro : dataCadastro || "",
      telefone : telefone || ""
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Aqui você pode colocar fetch PUT para atualizar dados
  };

  if (!formData.nome) return <p>Carregando dados do usuário...</p>;

  return (
    <div className="config-page">
      <nav className="config-breadcrumb">
        <Link to="/" className="config-breadcrumb-link">Home</Link>
        <span className="config-breadcrumb-separator">›</span>
        <span className="config-breadcrumb-current">Configurações</span>
      </nav>

      <main className="config-main">
        <div className="config-hero">
          <img src={UserIcon} alt="Perfil" className="config-avatar" />
          <h1>{formData.nome}</h1>
        </div>

        <div className="config-sections">
          <CardSection title="Informações Pessoais">
            <div className="config-item">
              <User /> <label>Nome</label>
              {isEditing ? <input name="nome" value={formData.nome} onChange={handleChange} /> : <span>{formData.nome}</span>}
            </div>
            <div className="config-item">
              <Mail /> <label>Email</label>
              {isEditing ? <input name="email" value={formData.email} onChange={handleChange} /> : <span>{formData.email}</span>}
            </div>
            <div className="config-item">
              <Phone /> <label>Telefone</label>
              {isEditing ? <input name="telefone" value={formData.telefone} onChange={handleChange} /> : <span>{formData.telefone}</span>}
            </div>
            <div className="config-item">
              <Lock /> <label>CPF</label> <span>{formData.cpf}</span>
            </div>
            <div className="config-item">
              <Calendar /> <label>Data de cadastro</label> 
              <span>
                {formData.dataCadastro
                  ? new Date(formData.dataCadastro).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </span>
            </div>
          </CardSection>

          <CardSection title="Segurança">
            <div className="config-item">
              <Lock /> <label>Senha</label>
              {isEditing ? <input type="password" name="senha" value={formData.senha} onChange={handleChange} /> : <span>********</span>}
            </div>
          </CardSection>

          <CardSection title="Endereço">
            <div className="config-item">
              <MapPin /> <label>Rua</label>
              {isEditing ? <input name="endereco" value={formData.endereco} onChange={handleChange} /> : <span>{formData.endereco}</span>}
            </div>
            <div className="config-item">
              <MapPin /> <label>Bairro</label>
              {isEditing ? <input name="endereco" value={formData.endereco} onChange={handleChange} /> : <span>{formData.endereco}</span>}
            </div>
            <div className="config-item">
              <MapPin /> <label>Número</label>
              {isEditing ? <input name="endereco" value={formData.endereco} onChange={handleChange} /> : <span>{formData.endereco}</span>}
            </div>
            <div className="config-item">
              <MapPin /> <label>CEP</label>
              {isEditing ? <input name="endereco" value={formData.endereco} onChange={handleChange} /> : <span>{formData.endereco}</span>}
            </div>


          </CardSection>
        </div>

        <div className="config-actions">
          <button onClick={() => setIsEditing(prev => !prev)} className="btn-editar">
            {isEditing ? "Cancelar" : "Editar"}
          </button>
          {isEditing && <button onClick={handleSave} className="btn-salvar">Salvar</button>}
        </div>
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  );
}
