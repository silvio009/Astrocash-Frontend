import React, { useState } from "react";
import "../pages/Home.css";

import Header from "../Components/Header/Header";
import Carousel from "../Components/Carousel/Carousel";
import SearchAndCards from "../Components/Cards/SearchAndCards";
import MainSection from "../Components/MainSection/MainSection";
import Footer from "../Components/Footer/FooterSection";

export default function Home() {
  // Estado para controle do menu hamburguer
  const [menuOpen, setMenuOpen] = useState(false);

  // Função para alternar menu
  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  // Estado para busca
  const [searchTerm, setSearchTerm] = useState("");

  // Dados exemplo para cards pequenos
  const pequenosCards = [
    { nome: "Ação 1", valor: "R$ 10,00", variacao: "+2%" },
    { nome: "ETF 2", valor: "R$ 20,00", variacao: "-1%" },
    { nome: "Cripto 3", valor: "R$ 15,50", variacao: "+0.5%" },
  ];

  const infoDoDia = [
  "Mercado em alta hoje.",
  "Bitcoin subiu 5%.",
  "Ações da Petrobras estão estáveis.",
];

  // Dados exemplo para MainSection
  const criptomoedas = [
    { nome: "Bitcoin", preco: "R$ 120.000", variacao: "+5%" },
    { nome: "Ethereum", preco: "R$ 8.000", variacao: "-2%" },
  ];
  const acoes = [
    { nome: "Petrobras", preco: "R$ 30,00", variacao: "+1%" },
    { nome: "Vale", preco: "R$ 60,00", variacao: "-0.5%" },
  ];
  const etfs = [
    { nome: "IVVB11", preco: "R$ 110", variacao: "+0.3%" },
    { nome: "BOVA11", preco: "R$ 90", variacao: "-1%" },
  ];
  const stocks = [
    { nome: "Apple", preco: "$145", variacao: "+1.2%" },
    { nome: "Google", preco: "$2.500", variacao: "+0.8%" },
  ];

  return (
    <>
      <Header toggleMenu={toggleMenu} menuOpen={menuOpen} />
      <Carousel />
      <SearchAndCards
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        pequenosCards={pequenosCards}
      />
      <MainSection
        criptomoedas={criptomoedas}
        acoes={acoes}
        etfs={etfs}
        stocks={stocks}
        searchTerm={searchTerm}
        infoDoDia={infoDoDia}
      />
      <Footer />
    </>
  );
}