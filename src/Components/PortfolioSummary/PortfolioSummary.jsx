import React from 'react';
import styles from './PortfolioSummary.module.css';

function PortfolioSummary() {
  const totalInvested = 12000;
  const profitLoss = 1850;
  const profitPercent = (profitLoss / totalInvested) * 100;

  return (
    <section id="portfolio" className={styles.summaryContainer}>
      <h2>Resumo da Carteira</h2>
      <div className={styles.stats}>
        <div className={styles.statBox}>
          <span className={styles.statLabel}>Total Investido</span>
          <span className={styles.statValue}>R$ {totalInvested.toFixed(2)}</span>
        </div>
        <div className={`${styles.statBox} ${profitLoss >= 0 ? styles.positive : styles.negative}`}>
          <span className={styles.statLabel}>Lucro / Prejuízo</span>
          <span className={styles.statValue}>
            R$ {profitLoss.toFixed(2)} ({profitPercent.toFixed(2)}%)
          </span>
        </div>
      </div>
    </section>
  );
}

export default PortfolioSummary;