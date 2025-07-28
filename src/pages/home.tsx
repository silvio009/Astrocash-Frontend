import React, { useState } from "react";
import "./Home.css";


interface Item {
  nome: string;
  preco: string;
  variacao: string;
}
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import required modules from "swiper/modules"
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Dados
  const criptomoedas = [
    { nome: "Bitcoin", preco: "R$150.000", variacao: "+3.5%" },
    { nome: "Ethereum", preco: "R$10.000", variacao: "-1.2%" },
    { nome: "Solana", preco: "R$800", variacao: "+2.1%" },
    { nome: "Cardano", preco: "R$3,50", variacao: "-0.8%" },
    { nome: "XRP", preco: "R$2,10", variacao: "+0.6%" }
  ];

  const acoes = [
    { nome: "PETR4", preco: "R$34,20", variacao: "+1.5%" },
    { nome: "VALE3", preco: "R$67,00", variacao: "-0.7%" },
    { nome: "ITUB4", preco: "R$28,15", variacao: "+0.3%" },
    { nome: "BBDC4", preco: "R$22,10", variacao: "-1.1%" },
    { nome: "BBAS3", preco: "R$41,80", variacao: "+2.0%" }
  ];

  const etfs = [
    { nome: "BOVA11", preco: "R$110,00", variacao: "+0.9%" },
    { nome: "SMAL11", preco: "R$120,00", variacao: "-0.2%" },
    { nome: "IVVB11", preco: "R$280,00", variacao: "+1.1%" },
    { nome: "DIVO11", preco: "R$105,00", variacao: "-0.4%" },
    { nome: "HASH11", preco: "R$30,00", variacao: "+3.2%" }
  ];

  const stocks = [
    { nome: "AAPL", preco: "US$180,00", variacao: "+1.2%" },
    { nome: "MSFT", preco: "US$310,00", variacao: "-0.5%" },
    { nome: "GOOGL", preco: "US$135,00", variacao: "+0.7%" },
    { nome: "AMZN", preco: "US$125,00", variacao: "-1.3%" },
    { nome: "TSLA", preco: "US$700,00", variacao: "+2.8%" }
  ];

  const infoDoDia = [
    "Bitcoin atinge nova máxima no ano",
    "Ethereum sofre queda após atualização",
    "Ações da Petrobras disparam com alta do petróleo",
    "ETFs de tecnologia registram forte valorização",
    "Alta na inflação americana preocupa investidores"
  ];

  // Dados dos 3 cards pequenos (dólar, Ibovespa, Nasdaq)
  const pequenosCards = [
    { nome: "Dólar", valor: "R$5,10", variacao: "+0.8%" },
    { nome: "Ibovespa", valor: "130.000", variacao: "-0.3%" },
    { nome: "Nasdaq", valor: "14.000", variacao: "+1.2%" }
  ];

  // Filtrar listas pelo termo de busca (case insensitive)
  const filtro = (lista: { nome: string }[]) =>
    lista.filter(item =>
      item.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <>
      <header className="navbar">
        <div className="logo">AstroCash</div>

        <nav className={`menu ${menuOpen ? "active" : ""}`}>
          <a href="/como-investir">Como Investir</a>
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

      {/* Carrossel Swiper */}
      <section className="carousel-section">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          spaceBetween={30}
          slidesPerView={1}
          loop
        >
          {[{
            img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
            title: "Invista com segurança",
            description: "Tenha as melhores análises e dados para seus investimentos."
          }, {
            img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
            title: "Mercados globais",
            description: "Acompanhe ações, ETFs e criptomoedas em tempo real."
          }, {
            img: "https://images.unsplash.com/photo-1515169067865-5387ec356754?auto=format&fit=crop&w=1600&q=80",
            title: "Tecnologia de ponta",
            description: "Ferramentas modernas para você tomar decisões inteligentes."
          }].map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="carousel-slide" style={{ backgroundImage: `url(${slide.img})` }}>
                <div className="carousel-text">
                  <h2>{slide.title}</h2>
                  <p>{slide.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Busca com lupa e cards pequenos */}
      <section className="search-and-small-cards">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar ações, ETFs, criptomoedas e stocks"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button" aria-label="Buscar">
            {/* Ícone de lupa azul SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="#3b82f6"
              viewBox="0 0 24 24"
            >
              <path d="M10 2a8 8 0 105.293 14.293l5.414 5.414 1.414-1.414-5.414-5.414A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
            </svg>
          </button>
        </div>

        <div className="small-cards-container">
          {pequenosCards.map(({ nome, valor, variacao }, i) => (
            <div className="small-card" key={i}>
              <h5>{nome}</h5>
              <p>{valor}</p>
              <p className={`small-card-variation ${variacao.includes('+') ? 'positive' : 'negative'}`}>
                {variacao}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Section - Cards filtrados */}
      <main className="main-section">
        {[
          { title: "Criptomoedas", list: filtro(criptomoedas) },
          { title: "Ações", list: filtro(acoes) },
          { title: "ETFs", list: filtro(etfs) },
          { title: "Stocks", list: filtro(stocks) }
        ].map((sec, index) => (
          <div className="list-container" key={index}>
            <h2>{sec.title}</h2>
            <ul>
              {(sec.list as Item[]).map((item, i) => (
                <li key={i} className="list-item">
                  <span>{item.nome}</span>
                  <span>{item.preco}</span>
                  <span className={`variation ${item.variacao.includes('+') ? 'up' : 'down'}`}>{item.variacao}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </main>

      {/* Informações do dia */}
      <section className="info-dia-card">
        <h2>Informações do Dia</h2>
        <ul>
          {infoDoDia.map((info, i) => (
            <li key={i}>{info}</li>
          ))}
        </ul>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-section">
            <h4>AstroCash</h4>
            <p>Transformando dados em decisões inteligentes de investimento.</p>
          </div>
          <div className="footer-section">
            <h4>Links úteis</h4>
            <ul>
              <li><a href="#">Como investir</a></li>
              <li><a href="#">Termos de uso</a></li>
              <li><a href="#">Contato</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contato</h4>
            <p>Email: contato@astrocash.com</p>
            <p>WhatsApp: (11) 91234-5678</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 AstroCash. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}
