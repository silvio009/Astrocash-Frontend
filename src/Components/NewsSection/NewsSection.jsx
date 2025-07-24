import React from 'react';
import styles from './NewsSection.module.css';

const newsList = [
  {
    title: "Mercado de ações sobe após relatório positivo",
    date: "21/07/2025",
    source: "InvestNews",
    url: "#",
  },
  {
    title: "Bitcoin registra alta histórica",
    date: "20/07/2025",
    source: "CryptoDaily",
    url: "#",
  },
  {
    title: "Novas regulamentações impactam setor financeiro",
    date: "19/07/2025",
    source: "Finance Times",
    url: "#",
  },
];

function NewsSection() {
  return (
    <section id="news" className={styles.newsContainer}>
      <h2>Últimas Notícias</h2>
      <ul className={styles.newsList}>
        {newsList.map((news, index) => (
          <li key={index} className={styles.newsItem}>
            <a href={news.url} target="_blank" rel="noopener noreferrer">
              <h3>{news.title}</h3>
              <p>{news.date} - {news.source}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default NewsSection;