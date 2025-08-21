import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  TrendingUp,
  Timer,
  Landmark,
  Info,
  BookOpen,
  Calculator,
  AlertTriangle,
  Coins,
  ChevronDown,
  CreditCard
} from "lucide-react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/FooterSection";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import "./bolsaAmericana.css";

import BolsaAmericanaImg from "../../assets/stock.jpg";

const Section = ({ id, title, subtitle, children }: { id?: string; title?: string; subtitle?: string; children: React.ReactNode }) => (
  <section id={id} className="american-section">
    {title && (
      <div className="american-section-header">
        <h2 className="american-section-title">{title}</h2>
        {subtitle && <p className="american-section-subtitle">{subtitle}</p>}
      </div>
    )}
    {children}
  </section>
);

const Stat = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="american-stat">
    <div className="american-stat-icon"><Icon /></div>
    <div>
      <div className="american-stat-label">{label}</div>
      <div className="american-stat-value">{value}</div>
    </div>
  </div>
);

export default function BolsaAmericana() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const faqList = [
    { q: "Qual o valor mínimo para começar a investir na Bolsa Americana?", a: "Depende da corretora e do ativo. Algumas corretoras permitem comprar frações de ações (fractional shares), permitindo começar com valores baixos, a partir de $1." },
    { q: "Quais corretoras são recomendadas?", a: "Algumas corretoras populares incluem Venue, Nomad, Interactive Brokers e Avenue. Avalie taxas, suporte e interface antes de escolher." },
    { q: "Como funciona a corretagem?", a: "A corretagem é a taxa que a corretora cobra por cada operação de compra ou venda. Algumas corretoras oferecem corretagem zero para ações, enquanto outras cobram valores fixos ou percentuais. Sempre verifique antes de investir." },
    { q: "O que são ETFs e REITs?", a: "ETFs são fundos de índice que replicam a performance de um índice. REITs são fundos imobiliários dos EUA, que distribuem dividendos e permitem investir em imóveis indiretamente." },
    { q: "Como escolher uma ação ou ativo?", a: "Analise valor de mercado, liquidez, histórico financeiro, setor e crescimento. Diversifique para reduzir riscos." },
    { q: "Existem riscos?", a: "Sim. Risco de mercado, variação cambial, risco de liquidez e risco específico de cada empresa ou fundo." },
  ];

  const passoAPasso = [
    { icon: Landmark, title: "Escolha da corretora", text: "Selecione uma corretora confiável que permita investir nos EUA. Compare taxas de corretagem, câmbio, custódia, suporte, segurança e interface do app. Algumas permitem compra de frações de ações (fractional shares), ideal para começar com valores baixos."},
    { icon: Coins, title: "Abrir conta e depositar fundos", text: "Cadastre-se enviando os documentos exigidos pela corretora. Deposite fundos em reais ou dólares. Verifique limites mínimos, taxas e tempo de compensação de depósitos antes de investir."},
    { icon: TrendingUp, title: "Escolher ativos", text: "Decida entre ações individuais, ETFs ou REITs. Avalie dividendos, valor de mercado, setor, risco e liquidez. Para ações de dividendos, veja a periodicidade dos pagamentos. Para ações de crescimento, foque no potencial de valorização."},
    { icon: Calculator, title: "Montar carteira e diversificar", text: "Crie uma carteira equilibrada entre diferentes setores e tipos de ativos. Use ETFs para diversificação instantânea. Rebalanceie periodicamente para reduzir riscos e ajustar à sua estratégia." },
    { icon: ShieldCheck, title: "Acompanhar e revisar", text: "Monitore desempenho, dividendos, valor de mercado e câmbio. Ajuste carteira conforme metas, cenário econômico e riscos. Evite decisões impulsivas baseadas em notícias passageiras.", img: "https://images.unsplash.com/photo-1581091215366-1d85c9a94760?q=80&w=1200&auto=format&fit=crop" },
  ];

  return (
    <div className="american-container">
      <Header toggleMenu={() => {}} menuOpen={false} />

      <nav className="american-breadcrumb">
        <Link to="/" className="american-breadcrumb-link">Home</Link>
        <span className="american-breadcrumb-separator">›</span>
        <span className="american-breadcrumb-current">Bolsa Americana</span>
      </nav>

      <main className="american-main">
        {/* HERO */}
        <div className="american-hero">
          <Section>
            <div className="american-hero-grid">
              <div className="american-hero-text">
                <h1>Bolsa Americana — guia completo para investir</h1>
                <p>Aprenda passo a passo como investir em ações, ETFs e REITs nos EUA. Segurança, diversificação e oportunidades para todos os perfis.</p>

                <div className="american-stats-grid">
                  <Stat icon={ShieldCheck} label="Perfil" value="Conservador a Agressivo" />
                  <Stat icon={TrendingUp} label="Retorno" value="Dividendos e valorização" />
                  <Stat icon={Timer} label="Liquidez" value="Depende do ativo" />
                  <Stat icon={Landmark} label="Tributação" value="IR sobre ganhos e dividendos" />
                </div>
              </div>

              <div className="american-hero-card">
                <img src={BolsaAmericanaImg} alt="Bolsa Americana" />
                <div className="american-hero-card-body american-card-body-dark">
                  <h3><Info /> O que você vai aprender aqui</h3>
                  <ul>
                    <li>Como abrir conta em corretoras internacionais.</li>
                    <li>Tipos de ativos: ações, ETFs, REITs.</li>
                    <li>Como montar carteira diversificada.</li>
                    <li>Cuidados com tributação, câmbio e liquidez dos ativos.</li>
                    <li>Dicas práticas para acompanhar dividendos e crescimento.</li>
                    <li>Perguntas frequentes sobre investimentos nos EUA.</li>
                  </ul>
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* PASSO A PASSO DETALHADO */}
        <Section title="Passo a passo completo para investir na Bolsa Americana">
          <div className="american-passo-text">
            {passoAPasso.map((p, i) => (
              <div key={i} className="american-passo-item">
                <h3>{i + 1}. {p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}

            <div className="american-alert">
              <AlertTriangle className="american-alert-icon" />
              <p>
                <strong>Riscos principais:</strong> volatilidade do mercado, variação cambial, liquidez de ativos, risco de crédito das empresas e tributação sobre dividendos e ganhos. 
                Planeje sua estratégia, diversifique investimentos e consulte informações oficiais antes de investir.
              </p>
            </div>
          </div>
        </Section>

        {/* CORRETORAS E TRIBUTAÇÃO */}
        <Section title="Corretoras, tributação e cuidados fiscais">
          <div className="american-prose-enhanced">
            <h4><ShieldCheck className="american-icon" /> Corretoras internacionais</h4>
            <p>
              Corretoras como <strong>Venue, Nomad, Avenue e Interactive Brokers</strong> permitem investir no mercado americano. Compare taxas, segurança, suporte e interface antes de abrir conta.
            </p>

            <h4><CreditCard className="american-icon" /> Taxas e custos</h4>
            <ul>
              <li>Taxas de corretagem e câmbio.</li>
              <li>Custos de custódia em algumas corretoras.</li>
              <li>Impostos sobre ganhos de capital e dividendos.</li>
              <li>Impactos fiscais ao converter reais para dólares.</li>
            </ul>

            <h4><AlertTriangle className="american-icon" /> Cuidados práticos</h4>
            <ul>
              <li>Verifique liquidez e valor de mercado do ativo.</li>
              <li>Diversifique carteira entre ETFs, ações e REITs.</li>
              <li>Monitore câmbio, taxas e impactos fiscais.</li>
              <li>Utilize corretoras seguras e confiáveis.</li>
            </ul>

            <h4><BookOpen className="american-icon" /> Referências e documentação</h4>
            <p>
              Consulte guias oficiais das corretoras internacionais, NYSE, NASDAQ e ETFs para instruções detalhadas.
            </p>
          </div>
        </Section>

        {/* DIVIDENDOS E CRESCIMENTO */}
        <Section title="Dividendos e ações de crescimento">
          <div className="american-prose-enhanced">
            <div className="american-dividendos">
              <img src="https://images.unsplash.com/photo-1615550336221-9457888b2ef6?q=80&w=1200&auto=format&fit=crop" alt="Dividendos" />
              <h4><Coins className="american-icon" /> Ações pagadoras de dividendos</h4>
              <p>
                Dividendos são pagamentos periódicos feitos aos acionistas a partir do lucro da empresa. Empresas maduras costumam distribuir dividendos regularmente, podendo ser <strong>mensal, trimestral ou anual</strong>. Exemplos incluem empresas de energia, bancos e grandes conglomerados americanos. Dividendos geram <strong>renda passiva</strong> e estabilidade, mas estão sujeitos à tributação. Avalie o histórico e a saúde financeira antes de investir.
              </p>
            </div>

            <div className="american-crescimento">
              <img src="https://images.unsplash.com/photo-1600140454795-3e8634e5b5f1?q=80&w=1200&auto=format&fit=crop" alt="Ações de crescimento" />
              <h4><TrendingUp className="american-icon" /> Ações de crescimento</h4>
              <p>
                Ações de crescimento pertencem a empresas que reinvestem lucros para expandir operações. Geralmente não pagam dividendos, mas oferecem potencial de valorização do preço da ação a longo prazo. Exemplos incluem empresas de tecnologia, startups e setores em expansão. Investidores focam na valorização do capital, mas devem estar cientes da volatilidade e risco de mercado.
              </p>
            </div>
          </div>
        </Section>

        {/* FAQ */}
        <Section title="Perguntas frequentes">
          <div className="american-faq">
            {faqList.map((f, i) => {
              const open = faqOpen === i;
              return (
                <div key={i} className="american-faq-item">
                  <div className="american-faq-summary" onClick={() => setFaqOpen(open ? null : i)}>
                    <span>{f.q}</span>
                    <motion.span
                      className="american-faq-icon"
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ChevronDown />
                    </motion.span>
                  </div>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        className="american-faq-answer"
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
