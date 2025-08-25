import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  TrendingUp,
  Timer,
  Info,
  BookOpen,
  AlertTriangle,
  PieChart,
  BarChart3,
  ChevronDown
} from "lucide-react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/FooterSection";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import "./acoesEtfs.css";

import HeroImg from "../../assets/stock.jpg"; // Foto no HERO
import AcoesImg from "../../assets/AcoesCrescimento.png";
import EtfImg from "../../assets/dividendos.png";

const Section = ({ id, title, subtitle, children }: { id?: string; title?: string; subtitle?: string; children: React.ReactNode }) => (
  <section id={id} className="acoes-section">
    {title && (
      <div className="acoes-section-header">
        <h2 className="acoes-section-title">{title}</h2>
        {subtitle && <p className="acoes-section-subtitle">{subtitle}</p>}
      </div>
    )}
    {children}
  </section>
);

const Stat = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="acoes-stat">
    <div className="acoes-stat-icon"><Icon /></div>
    <div>
      <div className="acoes-stat-label">{label}</div>
      <div className="acoes-stat-value">{value}</div>
    </div>
  </div>
);

export default function AcoesETFs() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const faqList = [
    { q: "ETFs pagam dividendos?", a: "Sim, mas depende do fundo. Alguns ETFs distribuem dividendos recebidos das empresas da carteira, outros reinvestem automaticamente." },
    { q: "Qual é mais seguro: ação ou ETF?", a: "ETFs geralmente oferecem maior segurança por serem diversificados, enquanto ações individuais são mais voláteis e arriscadas." },
    { q: "Qual tem maior potencial de valorização?", a: "Ações individuais podem gerar ganhos maiores, mas também trazem riscos mais altos. ETFs tendem a ter retornos mais consistentes." },
    { q: "Qual o investimento mínimo?", a: "Ambos podem ser comprados em corretoras que permitem fracionamento. ETFs normalmente têm preços mais acessíveis." },
    { q: "Posso ter ações e ETFs na mesma carteira?", a: "Sim, inclusive essa é uma das estratégias mais comuns: usar ETFs para base sólida e ações para buscar crescimento extra." },
  ];

  return (
    <div className="acoes-container">
      <Header toggleMenu={() => {}} menuOpen={false} />

      <nav className="acoes-breadcrumb">
        <Link to="/" className="acoes-breadcrumb-link">Home</Link>
        <span className="acoes-breadcrumb-separator">›</span>
        <span className="acoes-breadcrumb-current">Investindo em Ações e ETFs</span>
      </nav>

      <main className="acoes-main">
        {/* HERO */}
        <div className="acoes-hero">
          <Section>
            <div className="acoes-hero-grid">
              <div className="acoes-hero-text">
                <h1>Investindo em Ações e ETFs</h1>
                <p>Aprenda as diferenças, riscos e benefícios de ações e ETFs, e como usá-los para montar uma carteira equilibrada.</p>

                <div className="acoes-stats-grid">
                  <Stat icon={TrendingUp} label="Ações" value="Maior risco e potencial de retorno" />
                  <Stat icon={PieChart} label="ETFs" value="Diversificação e menor risco" />
                  <Stat icon={Timer} label="Liquidez" value="Ambos negociados em Bolsa" />
                  <Stat icon={ShieldCheck} label="Segurança" value="ETFs mais estáveis" />
                </div>
              </div>

              <div className="acoes-hero-card">
                <img src={HeroImg} alt="Investimento" />
                <div className="acoes-hero-card-body acoes-card-body-dark">
                  <h3><Info /> O que você vai aprender aqui</h3>
                  <ul>
                    <li>O que são ações e ETFs.</li>
                    <li>Diferenças de risco, retorno e liquidez.</li>
                    <li>Como escolher entre investir em cada um.</li>
                    <li>Estratégias de diversificação e renda passiva.</li>
                  </ul>
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* DIFERENÇAS */}
        <Section title="O que são e como funcionam">
          <div className="acoes-prose-enhanced">
            <div className="acoes-bloco">
              <h4><BarChart3 className="acoes-icon" /> Ações</h4>
              <p>
                Ações representam uma <strong>fração de propriedade</strong> de uma empresa. Ao comprá-las, você se torna sócio, participando de lucros, dividendos e valorização do preço da ação. 
                São mais voláteis e possuem risco concentrado, mas oferecem potencial de retorno elevado.
                É importante analisar setor, histórico da empresa, governança e liquidez antes de investir.
              </p>
              <p>
                Exemplos: Petrobras, Vale, Apple, Tesla. O número de ações emitidas varia por empresa, podendo afetar liquidez e volatilidade. Para iniciantes, recomenda-se estudar o histórico e começar com pequenas quantidades.
              </p>
            </div>

            <div className="acoes-bloco">
              <h4><PieChart className="acoes-icon" /> ETFs</h4>
              <p>
                ETFs são <strong>fundos de índice</strong> que reúnem diversas ações em um único ativo. Isso gera diversificação automática, reduzindo risco e aumentando estabilidade. 
                ETFs acompanham índices como o Ibovespa, S&P 500 ou Nasdaq 100.
              </p>
              <p>
                Exemplo famoso: IVVB11 (ETF que replica o S&P 500 no Brasil). Ele possui dezenas de ações americanas, distribuindo risco e facilitando o acesso ao mercado internacional. ETFs podem pagar dividendos ou reinvesti-los automaticamente.
              </p>
            </div>
          </div>
        </Section>

        {/* RESUMO */}
        <Section title="Resumo Ações e ETFs">
        <div className="acoes-resumo-card">
            <p>
            ETFs são ideais para quem deseja começar a investir com segurança, oferecendo diversificação e menor risco. 
            Ações individuais proporcionam maior potencial de valorização, mas exigem análise detalhada de cada empresa. 
            Uma estratégia equilibrada combina ETFs para estabilidade e ações para crescimento. 
            Avalie sempre seu perfil, objetivos financeiros e tolerância a risco antes de tomar decisões. 
            Considere a liquidez dos ativos, custos de corretagem e possíveis impostos sobre ganhos. 
            Reinvista dividendos de forma estratégica para aumentar o patrimônio ao longo do tempo. 
            Use ETFs para acompanhar índices de mercado e ações para explorar oportunidades específicas. 
            Monitore periodicamente sua carteira e ajuste conforme mudanças no mercado ou nos seus objetivos.
            </p>

        </div>
            <div className="acoes-alert acoes-alert-large">
            <AlertTriangle className="acoes-alert-icon" />
            <p>
                <strong>Antes de investir:</strong> verifique liquidez, histórico da empresa/fundo, volatilidade e custos de corretagem. 
                Diversifique para reduzir riscos e acompanhe resultados periodicamente. 
                Analise notícias do setor e relatórios de desempenho. 
                Não coloque todo seu capital em um único ativo. 
                Planeje aportes regulares e defina metas de curto e longo prazo.
            </p>
            </div>
        </Section>

        {/* TOP AÇÕES, ETFs E CORRETORAS */}
        <Section title="Melhores do momento" subtitle="Melhores ações, ETFs e corretoras do momento">
        <div className="acoes-tops-grid">
            <div className="acoes-top-card">
            <h4><TrendingUp className="acoes-top-icon" /> Ações</h4>
            <ul>
                <li>Microsoft</li>
                <li>Apple</li>
                <li>Tesla</li>
                <li>Petrobras</li>
                <li>Vale</li>
            </ul>
            </div>
            <div className="acoes-top-card">
            <h4><PieChart className="acoes-top-icon" /> ETFs</h4>
            <ul>
                <li>IVVB11 (S&P 500)</li>
                <li>NASDAQ QQQ</li>
                <li>BOVA11 (Ibovespa)</li>
                <li>SPY</li>
                <li>VTI</li>
            </ul>
            </div>
            <div className="acoes-top-card">
            <h4><ShieldCheck className="acoes-top-icon" /> Corretoras</h4>
            <ul>
                <li>Avenue</li>
                <li>Nomad</li>
                <li>XP Investimentos</li>
                <li>Clear</li>
                <li>Rico</li>
            </ul>
            </div>
        </div>
        </Section>

        {/* FAQ */}
            <Section title="Perguntas frequentes sobre Ações e ETFs">
            <div className="acoes-faq">
                {[
                ...faqList,
                { q: "Posso investir apenas em ETFs?", a: "Sim, é possível ter apenas ETFs na carteira, garantindo diversificação automática sem escolher ações individuais." },
                { q: "Como os ETFs acompanham o índice?", a: "ETFs replicam a composição do índice escolhido, comprando ações na mesma proporção do índice." },
                { q: "Qual a diferença de custos entre Ações e ETFs?", a: "Ações podem ter corretagem e taxas de custódia, enquanto ETFs podem ter taxa de administração anual do fundo." },
                { q: "Posso vender ETFs a qualquer momento?", a: "Sim, ETFs são negociados em bolsa como ações, podendo ser vendidos durante o pregão." },
                ].map((f, i) => {
                const open = faqOpen === i;
                return (
                    <div key={i} className="acoes-faq-item">
                    <div className="acoes-faq-summary" onClick={() => setFaqOpen(open ? null : i)}>
                        <span>{f.q}</span>
                        <motion.span
                        className="acoes-faq-icon"
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        >
                        <ChevronDown />
                        </motion.span>
                    </div>

                    <AnimatePresence initial={false}>
                        {open && (
                        <motion.div
                            className="acoes-faq-answer"
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
