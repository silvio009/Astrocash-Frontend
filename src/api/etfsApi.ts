// src/api.ts
import axios from "axios";

const ALPHA_BASE_URL = "https://www.alphavantage.co/query";
const CACHE_KEY_ETF = "etfCache";

export async function fetchETFs() {
  const today = new Date().toISOString().slice(0, 10);
  const cachedDataString = localStorage.getItem(CACHE_KEY_ETF);

  if (cachedDataString) {
    const cached = JSON.parse(cachedDataString);
    if (cached.date === today) {
      console.log("🔁 Usando cache de ETFs:", cached.data);
      return cached.data;
    }
  }

  try {
    const symbols = ["SPY", "QQQ", "VTI", "DIA", "IWM"]; 
    const apiKey = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;
    const results: { nome: string; preco: string; variacao: string }[] = [];

    for (const symbol of symbols) {
      const response = await axios.get(ALPHA_BASE_URL, {
        params: {
          function: "TIME_SERIES_DAILY",
          symbol,
          apikey: apiKey,
        },
      });

      const timeSeries = response.data["Time Series (Daily)"];
      if (!timeSeries) continue;

      const lastDate = Object.keys(timeSeries)[0];
      const prevDate = Object.keys(timeSeries)[1];

      const lastClose = parseFloat(timeSeries[lastDate]["4. close"]);
      const prevClose = parseFloat(timeSeries[prevDate]["4. close"]);

      const variacao = (((lastClose - prevClose) / prevClose) * 100).toFixed(2);

      results.push({
        nome: symbol,
        preco: `$${lastClose.toFixed(2)}`,
        variacao: `${variacao}%`,
      });
    }

    localStorage.setItem(
      CACHE_KEY_ETF,
      JSON.stringify({ date: today, data: results })
    );

    console.log("📡 Dados recebidos da API (ETFs):", results);

    return results;
  } catch (error) {
    console.error("❌ Erro ao buscar ETFs:", error);
    return [];
  }
}
