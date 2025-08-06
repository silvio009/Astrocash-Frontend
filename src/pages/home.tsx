import React, { useState, useEffect } from "react";
import "../pages/Home.css";
import { fetchCryptos } from "../api"; // só importe a função de criptos

import Header from "../Components/Header/Header";
import Carousel from "../Components/Carousel/Carousel";
import SearchAndCards from "../Components/Cards/SearchAndCards";
import MainSection from "../Components/MainSection/MainSection";
import Footer from "../Components/Footer/FooterSection";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  const [searchTerm, setSearchTerm] = useState("");

  // State dinâmico para criptomoedas (vazio no início)
  const [criptomoedas, setCriptomoedas] = useState<
    { nome: string; preco: string; variacao: string }[]
  >([]);

  // Carregar criptomoedas da API só uma vez
  useEffect(() => {
    async function loadCryptos() {
      const data = await fetchCryptos();
      setCriptomoedas(data);
    }
    loadCryptos();
  }, []);

  // Dados fixos que não devem mudar
  const pequenosCards = [
    { nome: "Ação 1", valor: "R$ 10,00", variacao: "+2%" },
    { nome: "ETF 2", valor: "R$ 20,00", variacao: "-1%" },
    { nome: "Cripto 3", valor: "R$ 15,50", variacao: "+0.5%" },
    { nome: "Cripto 3", valor: "R$ 15,50", variacao: "+0.5%" },
    { nome: "Cripto 3", valor: "R$ 15,50", variacao: "+0.5%" },
  ];

  const infoDoDia = [
    "Mercado em alta hoje.",
    "Bitcoin subiu 5%.",
    "Ações da Petrobras estão estáveis.",
    "Ações da Petrobras estão estáveis.",
    "Ações da Petrobras estão estáveis.",
  ];

  const acoes = [
    { nome: "Petrobras", preco: "R$ 30,00", variacao: "+1%" },
    { nome: "Vale", preco: "R$ 60,00", variacao: "-0.5%" },
    { nome: "Vale", preco: "R$ 60,00", variacao: "-0.5%" },
    { nome: "Vale", preco: "R$ 60,00", variacao: "-0.5%" },
    { nome: "Vale", preco: "R$ 60,00", variacao: "-0.5%" },
  ];

  const etfs = [
    { nome: "IVVB11", preco: "R$ 110", variacao: "+0.3%" },
    { nome: "BOVA11", preco: "R$ 90", variacao: "-1%" },
    { nome: "BOVA11", preco: "R$ 90", variacao: "-1%" },
    { nome: "BOVA11", preco: "R$ 90", variacao: "-1%" },
    { nome: "BOVA11", preco: "R$ 90", variacao: "-1%" },
  ];

  const stocks = [
    { nome: "Apple", preco: "$145", variacao: "+1.2%" },
    { nome: "Google", preco: "$2.500", variacao: "+0.8%" },
    { nome: "Google", preco: "$2.500", variacao: "+0.8%" },
    { nome: "Google", preco: "$2.500", variacao: "+0.8%" },
    { nome: "Google", preco: "$2.500", variacao: "+0.8%" },
    { nome: "Google", preco: "$2.500", variacao: "+0.8%" },
  ];

  return (
    <>
      <Header toggleMenu={toggleMenu} menuOpen={menuOpen} />

      <div className="carousel-wrapper">
        <Carousel />
      </div>

      <div className="page-container">
        <SearchAndCards
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          pequenosCards={pequenosCards}
        />
        <MainSection
          criptomoedas={criptomoedas} // aqui com dados da API
          acoes={acoes}
          etfs={etfs}
          stocks={stocks}
          searchTerm={searchTerm}
          infoDoDia={infoDoDia}
        />
      </div>
      <Footer />
    </>
  );
}
