import React from "react";
import "../Cards/Cads.css";

interface CardProps {
  nome: string;
  valor: string;
  variacao: string;
}

interface SearchAndCardsProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  pequenosCards?: CardProps[];
}

export default function SearchAndCards({
  searchTerm,
  setSearchTerm,
  pequenosCards = []
}: SearchAndCardsProps) {
  return (
    <section className="search-and-small-cards">
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar ações, ETFs, criptomoedas e stocks"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" aria-label="Buscar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="#3b82f6"
            viewBox="0 0 24 24"
          >
            <path d="M10 2a8 8 0 105.293 14.293l5.414 5.414 1.414-1.414-5.414-5.414A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
          </svg>
        </button>
      </div>

      <div className="small-cards-container">
        {pequenosCards.map(({ nome, valor, variacao }, i) => {
          const variacaoTrim = variacao.trim();
          const isNegative = variacaoTrim.startsWith("-");


          return (
            <div className="small-card" key={i}>
              <h5>{nome}</h5>
              <p>{valor}</p>
              <p
                className={`small-card-variation ${isNegative ? "negative" : "positive"}`}
              >
                {variacao}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
