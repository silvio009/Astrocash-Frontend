import axios from "axios";

const BASE_URL = "https://brapi.dev/api";
const CACHE_KEY = "brStocksCache";
const CACHE_DURATION_MINUTES = 1440; // 1 dia

export async function fetchBrazilStocks() {
  const cachedDataString = localStorage.getItem(CACHE_KEY);
  const today = new Date().toISOString().slice(0, 10);

  if (cachedDataString) {
    const cached = JSON.parse(cachedDataString);
    if (cached.date === today) {
      console.log("🔁 Usando cache de ações brasileiras:", cached.data);
      return cached.data;
    }
  }

  try {
    const tickers = ["PETR4", "VALE3", "ITUB4", "BBAS3", "BBDC4"];
    const apiKey = import.meta.env.VITE_BRAPI_API_KEY;
    const results: any[] = [];

    for (const ticker of tickers) {
      const response = await axios.get(`${BASE_URL}/quote/${ticker}`, {
        params: { range: "1d", interval: "1d" },
        headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : {},
      });

      const item = response.data?.results?.[0];
      if (item) {
        const words = (item.longName || item.symbol).split(" ");
        const shortName = words.slice(0, 3).join(" "); // limitar a 3 palavras
        results.push({
          nome: shortName,
          preco: `R$ ${item.regularMarketPrice?.toLocaleString("pt-BR") ?? "N/A"}`,
          variacao:
            item.regularMarketChangePercent != null
              ? `${item.regularMarketChangePercent.toFixed(2)}%`
              : "0%",
        });
      }
    }

    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ date: today, data: results })
    );

    console.log("📡 Dados recebidos da API (ações brasileiras):", results);

    return results;
  } catch (error) {
    console.error("❌ Erro ao buscar ações brasileiras:", error);
    return [];
  }
}
