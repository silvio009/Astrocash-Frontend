import React, { useState, useEffect } from "react";
import "../pages/Home.css";
import {
  fetchCryptos,
  fetchCurrencies,
  fetchMarketNews,
} from "../api";

import Header from "../Components/Header/Header";
import Carousel from "../Components/Carousel/Carousel";
import SearchAndCards from "../Components/Cards/SearchAndCards";
import MainSection from "../Components/MainSection/MainSection";
import Footer from "../Components/Footer/FooterSection";

interface NewsItem {
  title: string;
  url: string;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const [searchTerm, setSearchTerm] = useState("");
  const [criptomoedas, setCriptomoedas] = useState<
    { nome: string; preco: string; variacao: string }[]
  >([]);
  const [pequenosCards, setPequenosCards] = useState<
    { nome: string; valor: string; variacao: string }[]
  >([]);
  const [infoDoDia, setInfoDoDia] = useState<NewsItem[]>([]);

  useEffect(() => {
    async function loadData() {
      const today = new Date().toISOString().slice(0, 10);

      // Criptomoedas
      const cryptoCache = localStorage.getItem("cryptoCache");
      const cryptoCacheDate = localStorage.getItem("cryptoCacheDate");

      if (cryptoCache && cryptoCacheDate === today) {
        setCriptomoedas(JSON.parse(cryptoCache));
      } else {
        try {
          const cryptos = await fetchCryptos();
          setCriptomoedas(cryptos);
          localStorage.setItem("cryptoCache", JSON.stringify(cryptos));
          localStorage.setItem("cryptoCacheDate", today);
        } catch (error) {
          console.error("Erro ao buscar criptomoedas:", error);
        }
      }

      // Moedas
      const currencyCache = localStorage.getItem("currencyCache");
      const currencyCacheDate = localStorage.getItem("currencyCacheDate");

      if (currencyCache && currencyCacheDate === today) {
        setPequenosCards(JSON.parse(currencyCache));
      } else {
        try {
          const currencies = await fetchCurrencies();
          setPequenosCards(currencies);
          localStorage.setItem("currencyCache", JSON.stringify(currencies));
          localStorage.setItem("currencyCacheDate", today);
        } catch (error) {
          console.error("Erro ao buscar moedas:", error);
        }
      }

      // Notícias
      const newsCache = localStorage.getItem("newsCache");
      const newsCacheDate = localStorage.getItem("newsCacheDate");

      if (newsCache && newsCacheDate === today) {
        setInfoDoDia(JSON.parse(newsCache));
      } else {
        try {
          const news = await fetchMarketNews();
          setInfoDoDia(news);
          localStorage.setItem("newsCache", JSON.stringify(news));
          localStorage.setItem("newsCacheDate", today);
        } catch (error) {
          console.error("Erro ao buscar notícias:", error);
          setInfoDoDia([
            {
              title: "Erro ao carregar notícias do mercado.",
              url: "#",
            },
          ]);
        }
      }
    }

    loadData();
  }, []);

  const acoes = [
    { nome: "Petrobras", preco: "R$ 30,00", variacao: "+1%" },
    { nome: "Vale", preco: "R$ 60,00", variacao: "-0.5%" },
    { nome: "Itaú", preco: "R$ 28,00", variacao: "+0.3%" },
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
          criptomoedas={criptomoedas}
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