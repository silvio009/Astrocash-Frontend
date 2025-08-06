import axios from "axios";

export async function fetchCurrencies() {
  try {
    const response = await axios.get(
      "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL"
    );

    const data = response.data;

    return [
      {
        nome: "Dólar",
        valor: `R$ ${parseFloat(data.USDBRL.bid).toFixed(2)}`,
        variacao: `${parseFloat(data.USDBRL.pctChange).toFixed(2)}%`,
      },
      {
        nome: "Euro",
        valor: `R$ ${parseFloat(data.EURBRL.bid).toFixed(2)}`,
        variacao: `${parseFloat(data.EURBRL.pctChange).toFixed(2)}%`,
      },
      {
        nome: "Libra",
        valor: `R$ ${parseFloat(data.GBPBRL.bid).toFixed(2)}`,
        variacao: `${parseFloat(data.GBPBRL.pctChange).toFixed(2)}%`,
      },
    ];
  } catch (error) {
    console.error("Erro ao buscar moedas:", error);
    return [];
  }
}