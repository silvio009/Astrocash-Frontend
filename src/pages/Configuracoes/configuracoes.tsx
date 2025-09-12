import { useState } from "react";
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
    nome: "João Silva",
    email: "joao.silva@email.com",
    senha: "",
    cpf: "123.456.789-00",
    endereco: "Rua Exemplo, 123, São Paulo - SP",
    dataCadastro: "01/01/2022",
    telefone: "(11) 91234-5678",
    fotoPerfil: "https://via.placeholder.com/200",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Chamada de API para salvar alterações
  };

  return (
    <div className="config-page">

      {/* Breadcrumb */}
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
          {/* CARD INFORMAÇÕES PESSOAIS */}
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
              <MapPin /> <label>Endereço</label>
              {isEditing ? <input name="endereco" value={formData.endereco} onChange={handleChange} /> : <span>{formData.endereco}</span>}
            </div>
          </CardSection>

          {/* CARD SEGURANÇA */}
          <CardSection title="Segurança">
            <div className="config-item">
              <Lock /> <label>Senha</label>
              {isEditing ? <input type="password" name="senha" value={formData.senha} onChange={handleChange} /> : <span>********</span>}
            </div>
            <div className="config-item">
              <Lock /> <label>CPF</label> <span>{formData.cpf}</span>
            </div>
            <div className="config-item">
              <Calendar /> <label>Data de cadastro</label> <span>{formData.dataCadastro}</span>
            </div>
          </CardSection>
        </div>

        {/* BOTÕES */}
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
