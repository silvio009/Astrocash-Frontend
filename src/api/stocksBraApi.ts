import axios from "axios";

const BASE_URL = "https://brapi.dev/api";
const CACHE_KEY = "brazil_stocks_cache";
const CACHE_DURATION_MINUTES = 30;

export async function fetchBrazilStocks() {
  const cachedDataString = localStorage.getItem(CACHE_KEY);

  if (cachedDataString) {
    const cached = JSON.parse(cachedDataString);
    const now = Date.now();
    const diffMinutes = (now - cached.timestamp) / 1000 / 60;

    if (diffMinutes < CACHE_DURATION_MINUTES) {
      console.log("🔁 Usando dados do cache");
      return cached.data;
    }
  }

  try {
    const symbols = "PETR4,VALE3,ITUB4,BBAS3,BBDC4";
    const apiKey = import.meta.env.VITE_BRAPI_API_KEY;

    const response = await axios.get(`${BASE_URL}/quote/${symbols}`, {
      params: {
        range: "1d",
        interval: "1d",
      },
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const mapped = response.data.results.map((item: any) => ({
      nome: item.longName || item.symbol,
      preco: `R$ ${item.regularMarketPrice.toLocaleString("pt-BR")}`,
      variacao:
        item.regularMarketChangePercent !== null
          ? `${item.regularMarketChangePercent.toFixed(2)}%`
          : "0%",
    }));

    // Salvar no cache
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), data: mapped })
    );

    return mapped;
  } catch (error) {
    console.error("Erro ao buscar ações brasileiras:", error);
    return [];
  }
}
