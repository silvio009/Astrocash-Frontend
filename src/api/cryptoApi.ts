
import axios from "axios";
import { Await } from "react-router-dom";

const BASE_URL = "https://api.coingecko.com/api/v3";

export async function fetchCryptos() {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: "brl",
        order: "market_cap_desc",
        per_page: 5,
        page: 1,
        sparkline: false,
      },
    });
    // Mapear para o formato que seus componentes usam
    return response.data.map((item: any) => ({
      nome: item.name,
      preco: `R$ ${item.current_price.toLocaleString("pt-BR")}`,
      variacao: `${item.price_change_percentage_24h.toFixed(2)}%`,
    }));
  } catch (error) {
    console.error("Erro ao buscar criptoMoedas: ", error);
    return [];
  }
}