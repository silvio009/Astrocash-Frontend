export async function fetchMarketNews(): Promise<string[]> {
  const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;
  const url = `https://gnews.io/api/v4/search?q=mercado%20financeiro&lang=pt&country=br&token=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.articles || !Array.isArray(data.articles)) {
      throw new Error("Resposta da API inválida ou sem artigos.");
    }

    return data.articles.map((article: any) => article.title);
  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
    return ["Erro ao carregar notícias do mercado."];
  }
}