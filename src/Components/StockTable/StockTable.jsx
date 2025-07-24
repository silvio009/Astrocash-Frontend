import React from 'react';
import styles from './StockTable.module.css';

const stocks = [
  { symbol: "AAPL", name: "Apple", price: 165, change: 1.2 },
  { symbol: "TSLA", name: "Tesla", price: 625, change: -0.5 },
  { symbol: "AMZN", name: "Amazon", price: 3300, change: 0.8 },
];

function StockTable() {
  return (
    <section className={styles.tableContainer}>
      <h2>Ações em destaque</h2>
      <table className={styles.stockTable}>
        <thead>
          <tr>
            <th>Símbolo</th>
            <th>Empresa</th>
            <th>Preço</th>
            <th>Variação</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map(stock => (
            <tr key={stock.symbol}>
              <td>{stock.symbol}</td>
              <td>{stock.name}</td>
              <td>${stock.price.toLocaleString()}</td>
              <td className={stock.change >= 0 ? styles.positive : styles.negative}>
                {stock.change}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default StockTable;