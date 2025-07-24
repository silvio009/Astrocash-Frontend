import React from 'react';
import styles from './CryptoCards.module.css';

const cryptos = [
  { name: "Bitcoin", symbol: "BTC", price: 29400, change: 3.45 },
  { name: "Ethereum", symbol: "ETH", price: 1900, change: -1.2 },
  { name: "Cardano", symbol: "ADA", price: 0.45, change: 2.1 },
];

function CryptoCards() {
  return (
    <div className={styles.cryptoContainer} id="market">
      <h2>Criptomoedas em destaque</h2>
      <div className={styles.cardsGrid}>
        {cryptos.map((crypto) => (
          <div key={crypto.symbol} className={styles.card}>
            <h3>{crypto.name} ({crypto.symbol})</h3>
            <p>Preço: ${crypto.price.toLocaleString()}</p>
            <p className={crypto.change >= 0 ? styles.positive : styles.negative}>
              Variação: {crypto.change}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CryptoCards;