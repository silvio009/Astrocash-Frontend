import axios from "axios";

const BASE_URL = "https://brapi.dev/api";

export async function fetchEtfs() {
  try {
    const response = await axios.get(`${BASE_URL}/etf/list`, {
      params: {
        sortBy: "market_cap",
        sortOrder: "desc",
        limit: 5,
      },
    });

    // Pega os ETFs do campo que existir
    const etfs = response.data.etfs ?? response.data.results ?? [];

    console.log("ETFs recebidos:", etfs);

    if (!etfs.length) {
      console.warn("ATENÇÃO: lista de ETFs está vazia.");
    }

    return etfs.map((item: any) => ({
      nome: item.name || item.symbol || "Nome indisponível",
      preco: item.close ? `R$ ${item.close.toLocaleString("pt-BR")}` : "R$ 0",
      variacao:
        item.change_percent !== null && item.change_percent !== undefined
          ? `${item.change_percent.toFixed(2)}%`
          : "0%",
    }));
  } catch (error) {
    console.error("Erro ao buscar ETFs:", error);
    return [];
  }
}