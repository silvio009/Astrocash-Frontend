import React, { useState } from "react";
import "./Home.css"; 

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Dados mock para exemplo (vai puxar da API depois)
  const criptomoedas = [
    { nome: "Bitcoin", preco: "R$ 150.000", variacao: "+2.5%" },
    { nome: "Ethereum", preco: "R$ 12.000", variacao: "-1.2%" },
    { nome: "Cardano", preco: "R$ 3,50", variacao: "+0.7%" },
    { nome: "Solana", preco: "R$ 500", variacao: "+4.1%" },
    { nome: "Polkadot", preco: "R$ 40", variacao: "-0.3%" },
  ];

  const acoes = [
    { nome: "Vale", preco: "R$ 100", variacao: "+1.8%" },
    { nome: "Petrobras", preco: "R$ 30", variacao: "-0.5%" },
    { nome: "Ambev", preco: "R$ 16", variacao: "+0.2%" },
    { nome: "Itaú", preco: "R$ 28", variacao: "+1.1%" },
    { nome: "Magazine Luiza", preco: "R$ 12", variacao: "-2.3%" },
  ];

  const etfs = [
    { nome: "IVVB11", preco: "R$ 120", variacao: "+1.0%" },
    { nome: "BOVA11", preco: "R$ 110", variacao: "-0.7%" },
    { nome: "SMAL11", preco: "R$ 45", variacao: "+0.9%" },
    { nome: "XFIX11", preco: "R$ 130", variacao: "+1.4%" },
    { nome: "DIVO11", preco: "R$ 70", variacao: "+0.5%" },
  ];

  const stocks = [
    { nome: "Apple", preco: "US$ 190", variacao: "+1.5%" },
    { nome: "Tesla", preco: "US$ 700", variacao: "-0.8%" },
    { nome: "Amazon", preco: "US$ 3.300", variacao: "+0.3%" },
    { nome: "Google", preco: "US$ 2.800", variacao: "+2.0%" },
    { nome: "Microsoft", preco: "US$ 290", variacao: "+1.1%" },
  ];

  const infoDoDia = [
    "Ethereum cai 1.2% com atualizações da rede.",
    "Petrobras anuncia aumento do preço do combustível.",
    "Apple apresenta resultados financeiros acima do esperado.",
    "Bitcoin ultrapassa a barreira dos R$ 150.000.",
    "ETF BOVA11 sobe 0.7% no pregão de hoje.",
  ];

  return (
    <>
      <header className="navbar">
        <div className="logo">AstroCash</div>

        <nav className={`menu ${menuOpen ? "active" : ""}`}>
          <a href="#">Home</a>
          <a href="#">Sobre</a>
          <a href="#">Contato</a>
          <div className="auth-buttons">
            <button type="button">Cadastrar-se</button>
            <button type="button">Entrar</button>
          </div>
        </nav>

        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>

      <section className="hero-section">
        <div className="overlay"></div>
        <div className="hero-text">
          <h1>Bem-vindo ao AstroCash</h1>
          <p>As melhores informações sobre ações, criptomoedas, ETFs e stocks dos EUA.</p>
        </div>
      </section>

      <main className="main-section">
        {/* Cards */}
        <div className="list-container">
          <h2>Criptomoedas</h2>
          <ul>
            {criptomoedas.map((item, i) => (
              <li className="list-item" key={i}>
                <span>{item.nome}</span>
                <span>{item.preco}</span>
                <span className={`variation ${item.variacao.startsWith("+") ? "up" : "down"}`}>
                  {item.variacao}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="list-container">
          <h2>Ações</h2>
          <ul>
            {acoes.map((item, i) => (
              <li className="list-item" key={i}>
                <span>{item.nome}</span>
                <span>{item.preco}</span>
                <span className={`variation ${item.variacao.startsWith("+") ? "up" : "down"}`}>
                  {item.variacao}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="list-container">
          <h2>ETFs</h2>
          <ul>
            {etfs.map((item, i) => (
              <li className="list-item" key={i}>
                <span>{item.nome}</span>
                <span>{item.preco}</span>
                <span className={`variation ${item.variacao.startsWith("+") ? "up" : "down"}`}>
                  {item.variacao}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="list-container">
          <h2>Stocks (EUA)</h2>
          <ul>
            {stocks.map((item, i) => (
              <li className="list-item" key={i}>
                <span>{item.nome}</span>
                <span>{item.preco}</span>
                <span className={`variation ${item.variacao.startsWith("+") ? "up" : "down"}`}>
                  {item.variacao}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <section className="info-dia-card">
        <h2>Informações do Dia</h2>
        <ul>
          {infoDoDia.map((info, i) => (
            <li key={i}>{info}</li>
          ))}
        </ul>
      </section>

      <footer className="footer">
        &copy; 2025 AstroCash - Todos os direitos reservados.
      </footer>
    </>
  );
}
