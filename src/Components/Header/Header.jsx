import React from 'react';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Astrocash</div>
      <nav>
        <ul className={styles.navList}>
          <li><a href="#portfolio">Carteira</a></li>
          <li><a href="#market">Mercado</a></li>
          <li><a href="#news">Notícias</a></li>
          <li><a href="#about">Sobre</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;