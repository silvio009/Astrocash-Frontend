import React from "react";
import "../MainSection/MainSection.css";

interface Item {
  nome: string;
  preco: string;
  variacao: string;
}

interface InfoItem {
  title: string;
  url: string;
}

interface SectionProps {
  title: string;
  list: Item[];
}

const SectionCard: React.FC<SectionProps> = ({ title, list }) => (
  <div className="list-container">
    <h2>{title}</h2>
    <ul>
      {list.map((item, i) => (
        <li key={i} className="list-item">
          <span>{item.nome}</span>
          <span>{item.preco}</span>
          <span
            className={`variation ${
              item.variacao.trim().startsWith("-") ? "down" : "up"
            }`}
          >
            {item.variacao}
          </span>
        </li>
      ))}
    </ul>
  </div>
);


interface MainSectionProps {
  criptomoedas: Item[];
  acoes: Item[];
  etfs: Item[];
  stocks: Item[];
  searchTerm: string;
  infoDoDia?: InfoItem[];
}

const MainSection: React.FC<MainSectionProps> = ({
  criptomoedas,
  acoes,
  etfs,
  stocks,
  searchTerm,
  infoDoDia = [], // valor padrão vazio
}) => {
  const filtro = (lista: Item[]) =>
    lista.filter((item) =>
      item.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <>
      <main className="main-section">
        <SectionCard title="Criptomoedas" list={filtro(criptomoedas)} />
        <SectionCard title="Ações (BRA)" list={filtro(acoes)} />
        <SectionCard title="ETFs" list={filtro(etfs)} />
        <SectionCard title="Ações (EUA)" list={filtro(stocks)} />
      </main>

    <section className="info-dia-card">
      <h2 style={{ textAlign: "center" }}>
        <span role="img" aria-label="gráfico subindo" style={{ marginRight: "8px" }}>📈</span>
        Informações do Dia
      </h2>
      <ul>
        {infoDoDia.map((info, i) => (
          <li key={i}>
            <a
              href={info.url}
              target="_blank"
              rel="noopener noreferrer"
              className="info-link"
            >
              {info.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
    </>
  );
};

export default MainSection;
