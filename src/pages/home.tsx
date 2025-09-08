import React, { useState, useEffect } from "react";
import "../pages/Home.css";
import {
  fetchCryptos,
  fetchCurrencies,
  fetchMarketNews,
  fetchBrazilStocks,
  fetchETFs,
  fetchStocks
} from "../api";

import Header from "../Components/Header/Header";
import HeaderLogged from "../Components/HeaderLogged/HeaderLogged";
import Carousel from "../Components/Carousel/Carousel";
import SearchAndCards from "../Components/Cards/SearchAndCards";
import MainSection from "../Components/MainSection/MainSection";
import Footer from "../Components/Footer/FooterSection";
import AprendaInvestir from "../Components/AprendaInvestir/AprendaInvestir";
import Rondo from "../Components/Rondo/Rondo";
import ScrollToTop from "../Components/ScrollToTop/ScrollToTop";

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
  const [acoesBR, setAcoesBR] = useState<
    { nome: string; preco: string; variacao: string }[]
  >([]);
  const [etfs, setEtfs] = useState<
    { nome: string; preco: string; variacao: string }[]
  >([]);
  const [stock, setStocks] = useState<
    { nome: string; preco: string; variacao: string }[]
  >([]);

  // Estado para verificar se o usuário está logado
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token atual no localStorage:", token); 
    const validToken = token && token !== "undefined" && token !== "null";
    console.log("Usuário está logado?", validToken); 
    setIsLogged(!!validToken);

    // Limpar tokens inválidos
    if (!validToken) {
      localStorage.removeItem("token");
    }
  }, []);

  useEffect(() => {
    async function loadData() {
      const today = new Date().toISOString().slice(0, 10);

      // --- Criptomoedas ---
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

      // --- Moedas ---
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

      // --- Notícias ---
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

      // --- Ações brasileiras ---
      const stocksBR = await fetchBrazilStocks();
      setAcoesBR(stocksBR);

      // --- ETFs ---
      const etfsData = await fetchETFs();
      setEtfs(etfsData);

      // --- Stocks ---
      const fetchStock = await fetchStocks();
      setStocks(fetchStock);
    }

    loadData();
  }, []);

  return (
    <>
      {isLogged ? (
        <HeaderLogged toggleMenu={toggleMenu} menuOpen={menuOpen} />
      ) : (
        <Header toggleMenu={toggleMenu} menuOpen={menuOpen} />
      )}

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
          acoes={acoesBR}
          etfs={etfs}
          stocks={stock}
          searchTerm={searchTerm}
          infoDoDia={infoDoDia}
        />
      </div>

      <AprendaInvestir />
      <Rondo />
      <Footer />
      <ScrollToTop />
    </>
  );
}
