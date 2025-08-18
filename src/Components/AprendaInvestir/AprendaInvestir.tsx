import './AprendaInvestir.css';

const AprendaInvestir = () => {
  const cards = [
    {
      titulo: "O que é Renda Fixa?",
      descricao: "Aprenda os conceitos básicos de renda fixa e como investir com segurança.",
      link: "/renda_fixa"
    },
    {
      titulo: "Diferença entre Ações e ETFs",
      descricao: "Entenda as principais diferenças e saiba onde investir.",
      link: "/acoes_vs_etfs"
    },
    {
      titulo: "Como funciona o Tesouro Direto?",
      descricao: "Veja como aplicar em títulos públicos e garantir retorno a longo prazo.",
      link: "/tesouro_direto"
    },
    {
      titulo: "Fundos Imobiliários Explicados",
      descricao: "Descubra como investir em imóveis sem comprá-los fisicamente.",
      link: "/fundos_imobiliarios"
    },
    {
      titulo: "Como investir em ações dos EUA",
      descricao: "Passo a passo para investir na bolsa americana.",
      link: "/acoes_eua"
    },
    {
      titulo: "Reserva de Emergência",
      descricao: "A importância de ter um fundo para imprevistos e como começar.",
      link: "/reserva_emergencia"
    },
  ];

  return (
  <section id="aprenda-investir" className="aprender-section">
    <div className="cards-container">
      {cards.map((card, index) => (
        <a 
          href={card.link} 
          key={index} 
          className={`investir-card color-group-${Math.floor(index / 2) + 1}`}
        >
          <h3>{card.titulo}</h3>
          <p>{card.descricao}</p>
        </a>
      ))}
    </div>
  </section>
  );
};

export default AprendaInvestir;
