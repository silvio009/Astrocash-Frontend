import React from 'react';
import Header from '../Components/Header/Header';
import PortfolioSummary from '../Components/PortfolioSummary/PortfolioSummary';
import CryptoCards from '../Components/CryptoCards/CryptoCards';
import StockTable from '../Components/StockTable/StockTable';
import NewsSection from '../Components/NewsSection/NewsSection';
import Footer from '../Components/Footer/Footer';

import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.homeContainer}>
      <Header />
      <main className={styles.mainContent}>
        <PortfolioSummary />
        <section className={styles.marketSection}>
          <CryptoCards />
          <StockTable />
        </section>
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
}

export default Home;