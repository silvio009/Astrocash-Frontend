interface NewsArticle {
  title: string;
  url: string;
}

export async function fetchMarketNews(): Promise<NewsArticle[]> {
  const API_KEY = import.meta.env.VITE_GNEWS_API_KEY; // ou sua variável de ambiente correta
  const url = `https://gnews.io/api/v4/search?q=mercado%20financeiro&lang=pt&country=br&token=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.articles || !Array.isArray(data.articles)) {
      throw new Error("Formato de dados inesperado");
    }

    // Aqui mapeamos só os artigos que possuem title e url válidos,
    // e filtramos possíveis duplicados
    const uniqueArticlesMap = new Map<string, NewsArticle>();

    data.articles.forEach((article: any) => {
      if (typeof article.title === "string" && typeof article.url === "string") {
        if (!uniqueArticlesMap.has(article.title)) {
          uniqueArticlesMap.set(article.title, {
            title: article.title,
            url: article.url,
          });
        }
      }
    });

    return Array.from(uniqueArticlesMap.values());
  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
    return [];
  }
}
