import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  AlertTriangle,
  PiggyBank,
  Calculator,
  Target,
  Landmark,
  Coins,
  ChevronDown,
  Info
} from "lucide-react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/FooterSection";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import "./ReservaEmergencia.css";

import reserva from "../../assets/reserva.png";
import emergencia from "../../assets/emergencia.png";

const Section = ({ id, title, subtitle, children }: { id?: string; title?: string; subtitle?: string; children: React.ReactNode }) => (
  <section id={id} className="emergencial-section">
    {title && (
      <div className="emergencial-section-header">
        <h2 className="emergencial-section-title">{title}</h2>
        {subtitle && <p className="emergencial-section-subtitle">{subtitle}</p>}
      </div>
    )}
    {children}
  </section>
);

export default function ReservaEmergencia() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

const faqList = [
  { q: "Qual o valor ideal para uma reserva de emergência?", a: "Recomenda-se acumular entre 6 a 12 meses das suas despesas mensais essenciais." },
  { q: "Posso investir minha reserva em ações?", a: "Não é recomendado, pois ações têm alta volatilidade. Prefira aplicações seguras e com liquidez diária." },
  { q: "Quando devo usar minha reserva de emergência?", a: "Somente em situações imprevistas e urgentes, como desemprego, emergências médicas ou grandes imprevistos." },
  { q: "A reserva de emergência deve ser usada para compras?", a: "Não. A reserva não é para consumo ou lazer, mas para proteger sua estabilidade financeira." },
  { q: "Preciso começar com um valor alto?", a: "Não. O importante é começar, mesmo que seja com pequenas quantias mensais. A consistência é mais importante que o valor inicial." },
  { q: "É melhor deixar a reserva na poupança?", a: "A poupança é segura, mas existem opções mais rentáveis e igualmente seguras, como Tesouro Selic ou CDBs com liquidez diária." },
  { q: "Devo ter mais de uma reserva de emergência?", a: "Não necessariamente. O ideal é ter uma única reserva bem estruturada. Depois disso, você pode focar em outros tipos de investimentos." },
];

  const passos = [
    { icon: Calculator, title: "Calcule suas despesas fixas", text: "Liste moradia, alimentação, transporte, saúde e contas essenciais para saber exatamente quanto você precisa guardar mensalmente. Quanto mais detalhado, melhor o planejamento." },
    { icon: Target, title: "Defina sua meta", text: "Multiplique suas despesas mensais por 6 a 12 meses para determinar o valor ideal da reserva. Ter clareza da meta ajuda a manter disciplina financeira." },
    { icon: PiggyBank, title: "Organize o fundo", text: "Separe uma conta ou aplicação exclusivamente para a reserva, sem misturar com outros objetivos financeiros. Evite usar esse fundo para gastos do dia a dia." },
    { icon: Coins, title: "Invista em segurança e liquidez", text: "Escolha investimentos seguros como Tesouro Selic, CDBs com liquidez diária ou fundos DI. O objetivo é proteger o dinheiro e permitir resgates rápidos quando necessário." },
  ];

  const ondeGuardar = [
    { icon: Landmark, title: "Tesouro Selic", text: "O investimento mais seguro do Brasil, garantido pelo Governo Federal, com liquidez diária." },
    { icon: Coins, title: "CDBs com liquidez diária", text: "Bancos oferecem CDBs que rendem acima da poupança, com resgate imediato e cobertura do FGC." },
    { icon: ShieldCheck, title: "Fundos DI de baixo custo", text: "Fundos de renda fixa que acompanham a taxa Selic, práticos e acessíveis em corretoras." },
  ];

  return (
    <div className="emergencial-container">
      <Header toggleMenu={() => {}} menuOpen={false} />

      <nav className="emergencial-breadcrumb">
        <Link to="/" className="emergencial-breadcrumb-link">Home</Link>
        <span className="emergencial-breadcrumb-separator">›</span>
        <span className="emergencial-breadcrumb-current">Reserva de Emergência</span>
      </nav>

      <main className="emergencial-main">
        {/* HERO */}
        <Section>
          <div className="emergencial-hero-grid">
            {/* Card do texto */}
            <div className="emergencial-card-hero">
              <h1>Reserva de Emergência — segurança financeira em qualquer situação</h1>
            <p>
              Uma reserva de emergência é o seu principal escudo financeiro contra imprevistos que podem ocorrer a qualquer momento. 
              Ter um fundo dedicado evita que situações inesperadas, como perda de emprego, emergências médicas ou reparos urgentes em casa, 
              comprometam sua estabilidade. Além de proteger seu patrimônio, proporciona tranquilidade mental e permite que você tome 
              decisões financeiras sem medo. Construir essa reserva exige disciplina, planejamento e conhecimento das suas despesas reais. 
              É recomendável acumular de 6 a 12 meses de gastos essenciais, mantendo o dinheiro em aplicações seguras e de alta liquidez. 
              Com uma reserva sólida, você pode enfrentar crises sem recorrer a empréstimos caros ou cartões de crédito, evitando dívidas. 
              Ela também serve como base para futuros investimentos e objetivos de longo prazo, garantindo liberdade financeira. 
              Criar hábitos consistentes de economia fortalece sua educação financeira e prepara você para situações inesperadas. 
              Lembre-se: a segurança vem da preparação, e a reserva de emergência é a ferramenta mais importante para qualquer plano financeiro bem-sucedido.
            </p>

              {/* Alert Ring mais para esquerda */}
              <div className="emergencial-alert emergencial-alert-left">
                <AlertTriangle />
                <div>
                  <strong>Atenção:</strong> use sua reserva apenas em emergências reais. Usá-la
                  indevidamente pode comprometer sua segurança financeira.
                </div>
              </div>
            </div>

            {/* Imagem separada */}
            <div className="emergencial-hero-img">
              <img src={reserva} alt="Reserva de emergência" />
            </div>
          </div>

        </Section>

        {/* COMO COMEÇAR */}
        <Section title="Como começar sua reserva" subtitle="Passo a passo detalhado para estruturar seu fundo de emergência">
          <div className="emergencial-passos-coluna">
            {passos.map((p, i) => (
              <div key={i} className="emergencial-passo-coluna">
                <div className="emergencial-passo-header-coluna">
                  <div className="emergencial-passo-icon-coluna"><p.icon /></div>
                  <h3>{p.title}</h3>
                </div>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ONDE GUARDAR */}
        <div className="emergencial-bg-gray">
          <Section title="Onde guardar seu dinheiro" subtitle="Opções seguras e acessíveis">
            <div className="emergencial-grid">
              {ondeGuardar.map((o, i) => (
                <div key={i} className="emergencial-card">
                  <div className="emergencial-card-body">
                    <div className="emergencial-card-title"><o.icon className="emergencial-icon-azul" /> {o.title}</div>
                    <p>{o.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* POR QUE GUARDAR */}
        <Section title="Por que ter uma reserva de emergência?">
          <div className="emergencial-prose-detalhado">
            <div className="emergencial-prose-texto">
              <p>Manter uma reserva de emergência é fundamental para proteger sua estabilidade financeira diante de imprevistos. Ela permite que você enfrente situações inesperadas sem recorrer a empréstimos ou cartões de crédito, evitando dívidas desnecessárias.</p>
              <p>Além da segurança imediata, a reserva dá liberdade para tomar decisões conscientes, permitindo que você invista em oportunidades sem medo de perder recursos essenciais.</p>
              <p>Com uma reserva estruturada, você pode:</p>
              <ul>
                <li>Planejar o futuro com mais confiança e tranquilidade.</li>
                <li>Evitar o estresse causado por situações financeiras inesperadas.</li>
                <li>Manter hábitos saudáveis de economia e educação financeira.</li>
                <li>Garantir liquidez em casos de emergências médicas, desemprego ou reparos urgentes.</li>
                <li>Fortalecer sua independência financeira a longo prazo.</li>
              </ul>
              <p>Investir na sua segurança financeira é investir na sua tranquilidade, permitindo que você alcance metas maiores sem comprometer o essencial do seu dia a dia.</p>
            </div>
            <div className="emergencial-prose-imagem">
              <img src={emergencia} alt="Segurança financeira" />
            </div>
          </div>

        </Section>

        {/* FAQ */}
        <Section title="Perguntas frequentes">
          <div className="emergencial-faq">
            {faqList.map((f, i) => {
              const open = faqOpen === i;
              return (
                <div key={i} className="emergencial-faq-item">
                  <div className="emergencial-faq-summary" onClick={() => setFaqOpen(open ? null : i)}>
                    <span>{f.q}</span>
                    <motion.span
                      className="emergencial-faq-icon"
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ChevronDown />
                    </motion.span>
                  </div>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        className="emergencial-faq-answer"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28 }}
                      >
                        <p>{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Section>
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  );
}
