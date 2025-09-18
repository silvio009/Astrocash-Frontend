import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  MapPin,
  Calendar,
  Phone,
  Edit3,
  Pen 
} from "lucide-react";

import Footer from "../../components/Footer/FooterSection";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import "./configuracoes.css";
import UserIcon from "../../assets/user-icon.png";

type Endereco = {
  rua: string;
  bairro: string;
  numero: string;
  cidade: string;
  estado: string;
  cep: string;
};

const CardSection = ({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit?: () => void;
  children: React.ReactNode;
}) => (
  <div className="config-card">
    <div className="config-card-header">
      <h2 className="config-card-title">{title}</h2>
      {onEdit && (
      <button className="edit-btn" onClick={onEdit}>
        Editar <Pen size={16} />
      </button>
      )}
    </div>
    <div className="config-card-body">{children}</div>
  </div>
);

export default function Configuracao() {
  const userId = localStorage.getItem("userId") || "";
  const token = localStorage.getItem("token") || "";

  const [formData, setFormData] = useState({
    nome: localStorage.getItem("nome") || "",
    email: localStorage.getItem("email") || "",
    cpf: localStorage.getItem("cpf") || "",
    dataCadastro: localStorage.getItem("dataCadastro") || "",
    telefone: localStorage.getItem("telefone") || "",
    fotoPerfil: UserIcon,
    endereco: {
      rua: "",
      bairro: "",
      numero: "",
      cidade: "",
      estado: "",
      cep: "",
    } as Endereco,
  });

  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingEndereco, setIsEditingEndereco] = useState(false);
  const [isEditingSecurity, setIsEditingSecurity] = useState(false);

  // Puxa dados do backend sem perder valores existentes
  useEffect(() => {
    if (!token || !userId) return;

    const fetchUserData = async () => {
      try {
        const res = await fetch(`http://localhost:8080/users/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Erro ao buscar dados do usuário");

        const data = await res.json();

        setFormData((prev) => ({
          ...prev,
          nome: data.nome || prev.nome,
          email: data.email || prev.email,
          cpf: data.cpf || prev.cpf,
          dataCadastro: data.dataCadastro || prev.dataCadastro,
          telefone: data.telefone || prev.telefone,
          endereco: {
            rua: data.endereco?.rua || prev.endereco.rua,
            bairro: data.endereco?.bairro || prev.endereco.bairro,
            numero: data.endereco?.numero || prev.endereco.numero,
            cidade: data.endereco?.cidade || prev.endereco.cidade,
            estado: data.endereco?.estado || prev.endereco.estado,
            cep: data.endereco?.cep || prev.endereco.cep,
          },
        }));
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, [userId, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (["rua", "bairro", "numero", "cidade", "estado", "cep"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        endereco: { ...prev.endereco, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePut = async (url: string, body: object) => {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("Erro ao atualizar dados");
    return res.json();
  };

  const handleSaveInfo = async () => {
    try {
      await handlePut(`http://localhost:8080/users/${userId}`, {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
      });
      alert("Informações pessoais atualizadas!");
      setIsEditingInfo(false);
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar informações pessoais");
    }
  };

  const handleSaveEndereco = async () => {
    try {
      await handlePut(
        `http://localhost:8080/users/${userId}/endereco`,
        formData.endereco
      );
      alert("Endereço atualizado!");
      setIsEditingEndereco(false);
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar endereço");
    }
  };

  if (!formData.nome) return <p>Carregando dados do usuário...</p>;

  return (
    <div className="config-page">
      <nav className="config-breadcrumb">
        <Link to="/" className="config-breadcrumb-link">
          Home
        </Link>
        <span className="config-breadcrumb-separator">›</span>
        <span className="config-breadcrumb-current">Configurações</span>
      </nav>

      <main className="config-main">
        <div className="config-hero">
          <img
            src={formData.fotoPerfil}
            alt="Perfil"
            className="config-avatar"
          />
          <h1>{formData.nome}</h1>
        </div>

        <div className="config-sections">
          {/* Informações Pessoais */}
          <CardSection
            title="Informações Pessoais"
            onEdit={() => setIsEditingInfo(!isEditingInfo)}
          >
            <div className="config-item">
              <User /> <label>Nome</label>
              {isEditingInfo ? (
                <input
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                />
              ) : (
                <span>{formData.nome}</span>
              )}
            </div>
            <div className="config-item">
              <Mail /> <label>Email</label>
              {isEditingInfo ? (
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              ) : (
                <span>{formData.email}</span>
              )}
            </div>
            <div className="config-item">
              <Phone /> <label>Telefone</label>
              {isEditingInfo ? (
                <input
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                />
              ) : (
                <span>{formData.telefone}</span>
              )}
            </div>
            <div className="config-item">
              <Lock /> <label>CPF</label> <span>{formData.cpf}</span>
            </div>
            <div className="config-item">
              <Calendar /> <label>Data de cadastro</label>
              <span>
                {formData.dataCadastro
                  ? new Date(formData.dataCadastro).toLocaleString("pt-BR")
                  : ""}
              </span>
            </div>
            {isEditingInfo && (
              <div className="config-actions">
                <span className="link-editar salvar" onClick={handleSaveInfo}>
                  Salvar
                </span>
                <span
                  className="link-editar cancelar"
                  onClick={() => setIsEditingInfo(false)}
                >
                  Cancelar
                </span>
              </div>
            )}
          </CardSection>

          {/* Segurança */}
          <CardSection
            title="Segurança"
            onEdit={() => setIsEditingSecurity(!isEditingSecurity)}
          >
            <div className="config-item">
              <Mail /> <label>Email</label>
              <span>{formData.email}</span>
            </div>
            <div className="config-item">
              <Lock /> <label>Senha</label>
              {isEditingSecurity ? (
                <input type="password" placeholder="Nova senha" />
              ) : (
                <span>************</span>
              )}
            </div>
          </CardSection>

          {/* Endereço */}
          <CardSection
            title="Endereço"
            onEdit={() => setIsEditingEndereco(!isEditingEndereco)}
          >
            {["rua", "bairro", "numero", "cidade", "estado", "cep"].map(
              (field) => (
                <div className="config-item" key={field}>
                  <MapPin />{" "}
                  <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  {isEditingEndereco ? (
                    <input
                      name={field}
                      value={formData.endereco[field as keyof Endereco]}
                      onChange={handleChange}
                    />
                  ) : (
                    <span>{formData.endereco[field as keyof Endereco]}</span>
                  )}
                </div>
              )
            )}

            {isEditingEndereco && (
              <div className="config-actions">
                <span
                  className="link-editar salvar"
                  onClick={handleSaveEndereco}
                >
                  Salvar
                </span>
                <span
                  className="link-editar cancelar"
                  onClick={() => setIsEditingEndereco(false)}
                >
                  Cancelar
                </span>
              </div>
            )}
          </CardSection>
        </div>
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  );
}
