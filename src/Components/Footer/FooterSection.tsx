import React from "react";
import "../Footer/Footer.css";


export default function FooterSection() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>AstroCash</h4>
          <p>Transformando dados em decisões inteligentes de investimento.</p>
        </div>
        <div className="footer-section">
          <h4>Links úteis</h4>
          <ul>
            <li><a href="#">Como investir</a></li>
            <li><a href="#">Termos de uso</a></li>
            <li><a href="#">Contato</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contato</h4>
          <p>Email: contato@astrocash.com</p>
          <p>WhatsApp: (11) 91234-5678</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 AstroCash. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
