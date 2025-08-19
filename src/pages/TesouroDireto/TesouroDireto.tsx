
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
} from "lucide-react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/FooterSection";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import "./tesourodireto.css";

const Section = ({ id, title, subtitle, children }: { id?: string; title?: string; subtitle?: string; children: React.ReactNode }) => (
  <section id={id} className="td-section">
    {title && (
      <div className="td-section-header">
        <h2 className="td-section-title">{title}</h2>
        {subtitle && <p className="td-section-subtitle">{subtitle}</p>}
      </div>
    )}
    {children}
  </section>
);

const Stat = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="td-stat">
    <div className="td-stat-icon"><Icon /></div>
    <div>
      <div className="td-stat-label">{label}</div>
      <div className="td-stat-value">{value}</div>
    </div>
  </div>
);

export default function TesouroDireto() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const faqList = [
    {
      q: "Qual é o mínimo para começar a investir no Tesouro Direto?",
      a: "Hoje é possível investir em frações de títulos — normalmente a partir de cerca de R$ 30 (pode variar conforme o título e momento).",
    },
    {
      q: "Posso resgatar antes do vencimento?",
      a: "Sim. O Tesouro recomprará seu título diariamente, mas o preço pode variar conforme as taxas de juros — portanto você pode ter perda se vender no momento errado.",
    },
    {
      q: "Como funciona a tributação?",
      a: "Incide Imposto de Renda sobre o ganho segundo tabela regressiva: 22,5% até 180 dias; 20% de 181 a 360 dias; 17,5% de 361 a 720 dias; 15% acima de 721 dias. Também há taxa de custódia da B3 (verifique valor atual).",
    },
    {
      q: "Onde posso acompanhar preços e comprar?",
      a: "Pelo site/app do Tesouro Direto e por corretoras e bancos habilitados. Link oficial: https://www.tesourodireto.com.br/",
    },
    {
      q: "Quais os riscos principais?",
      a: "Risco de mercado (variação do preço), risco de inflação para prefixados e risco de liquidez secundária. Risco de crédito do Tesouro é baixíssimo (garantia do governo).",
    },
  ];

  const tipos = [
    {
      icon: TrendingUp,
      title: "Tesouro Selic",
      subtitle: "Pós-fixado — acompanha a Selic",
      text: "Rendimento acompanhado pela taxa Selic (mais seguro e com liquidez diária). Ideal para reserva de emergência e quando se deseja menor volatilidade no curto prazo.",
      badge: "Liquidez diária",
    },
    {
      icon: Calculator,
      title: "Tesouro Prefixado",
      subtitle: "Taxa fixa",
      text: "Taxa conhecida no momento da compra: você sabe quanto receberá se mantiver até o vencimento. Bom para cenários de queda de juros ou para planejamento financeiro com prazo definido.",
      badge: "Taxa fixa",
    },
    {
      icon: ShieldCheck,
      title: "Tesouro IPCA+",
      subtitle: "Híbrido — IPCA + taxa fixa",
      text: "Proteção contra a inflação: paga IPCA + uma taxa real, preservando o poder de compra no longo prazo. Muito indicado para objetivos de longo prazo (aposentadoria, metas futuras).",
      badge: "Proteção contra inflação",
    },
  ];

  const ondeInvestir = [
    {
      icon: Landmark,
      title: "Corretoras e bancos",
      text: "A maioria das corretoras e bancos habilitados oferecem compra e acompanhamento dos títulos via site ou app. Compare taxas e UX da plataforma.",
      img: "https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=1200&auto=format&fit=crop",
    },
    {
      icon: Coins,
      title: "Portal e app do Tesouro Direto",
      text: "Acesse informações oficiais, cotações, histórico e documentação. É a fonte primária de dados sobre os títulos.",
      img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1200&auto=format&fit=crop",
    },
    {
      icon: ShieldCheck,
      title: "Instituições e assessorias",
      text: "Plataformas de investimento, robôs e assessorias também intermediam compras, com layouts e relatórios diferentes — avalie custos e confiabilidade.",
      img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <div className="td-container">
      <Header toggleMenu={() => {}} menuOpen={false} />

      <nav className="td-breadcrumb">
        <Link to="/" className="td-breadcrumb-link">Home</Link>
        <span className="td-breadcrumb-separator">›</span>
        <span className="td-breadcrumb-current">Tesouro Direto</span>
      </nav>

      <main className="td-main">
        {/* HERO */}
        <div className="td-hero">
          <Section>
            <div className="td-hero-grid">
              <div className="td-hero-text">
                <h1>Tesouro Direto — guia completo para investir em títulos públicos</h1>
                <p>Um programa que facilita o acesso do investidor pessoa física aos títulos públicos federais. Segurança, previsibilidade e opções para curto, médio e longo prazo.</p>

                <div className="td-stats-grid">
                  <Stat icon={ShieldCheck} label="Perfil" value="Conservador a Moderado" />
                  <Stat icon={TrendingUp} label="Retorno" value="Prefixado, Selic, IPCA+" />
                  <Stat icon={Timer} label="Liquidez" value="Venda diária ao Tesouro" />
                  <Stat icon={Landmark} label="Tributação" value="IR regressivo" />
                </div>
              </div>

              <div className="td-hero-card">
                <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1600&auto=format&fit=crop" alt="Tesouro Direto" />
                <div className="td-hero-card-body td-card-body-dark">
                  <h3><Info /> O que você vai aprender aqui</h3>
                  <ul>
                    <li>História e quem criou o Tesouro Direto.</li>
                    <li>Diferença entre Tesouro Selic, Prefixado e IPCA+.</li>
                    <li>Onde e como investir, corretoras habilitadas e link oficial.</li>
                    <li>Tributação, prazos, liquidez e cuidados práticos.</li>
                    <li>Perguntas frequentes atualizadas para iniciantes.</li>
                  </ul>
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* O QUE É */}
        <Section id="o-que-e" title="O que é o Tesouro Direto?" subtitle="Investimento em títulos públicos do Governo Federal">
          <div className="td-grid-2-expanded">
            <div className="td-prose-expanded">
              <p>
                O <strong>Tesouro Direto</strong> foi lançado em 2002 pelo Tesouro Nacional em parceria com a B3 (antiga BM&FBovespa) com o objetivo de democratizar o acesso aos títulos públicos federais.
                Antes disso, o investidor pessoa física tinha dificuldade de acessar diretamente os títulos — o programa possibilitou compra online e fracionada de forma prática.
              </p>

              <h4>Quem criou e onde é regulamentado</h4>
              <p>
                Criado pelo Tesouro Nacional e operacionalizado em conjunto com a B3, o Tesouro Direto segue normas da <strong>Secretaria do Tesouro Nacional</strong>, da <strong>CVM</strong> e do <strong>Banco Central</strong>.
              </p>

              <h4>Tipos de rendimento</h4>
              <ul>
                <li><strong>Pré-fixado:</strong> taxa fixa definida na compra.</li>
                <li><strong>Pós-fixado (Selic):</strong> rendimento atrelado à taxa Selic — menor volatilidade.</li>
                <li><strong>IPCA+:</strong> combina inflação (IPCA) + taxa fixa — protege o poder de compra.</li>
              </ul>

              <h4>Prazos e liquidez</h4>
              <p>
                Os títulos têm vencimentos que podem variar de poucos anos até mais de 30 anos. Embora exista recompra diária (liquidez), o preço de mercado varia conforme as taxas de juros; quem segura o título até o vencimento recebe o valor contratado (menos tributos).
              </p>

              <h4>Onde checar e como investir</h4>
              <p>
                A lista de corretoras habilitadas e informações oficiais estão no site do Tesouro Direto. Recomendo consultar o site oficial para cotações e materiais educativos:
              </p>
              <p><a href="https://www.tesourodireto.com.br/" target="_blank" rel="noreferrer">Tesouro Direto — site oficial</a></p>

              <div className="td-alert-expanded">
                <AlertTriangle />
                <div>
                  <strong>Cuidado</strong>
                  <div className="td-alert-items"> Avalie objetivo, prazo, imposto, custo de custódia e o impacto da inflação antes de escolher o título.</div>
                </div>
              </div>
            </div>

            <img className="td-img-card-expanded" src="https://images.unsplash.com/photo-1565372911362-20eb77c48b11?q=80&w=1400&auto=format&fit=crop" alt="Tesouro Direto explicação" />
          </div>
        </Section>

        {/* TIPOS DE TÍTULOS */}
        <div className="td-section-gray">
          <Section title="Principais tipos de títulos">
            <div className="td-types-grid">
              {tipos.map((t, i) => (
                <div key={i} className="td-type td-type-rich">
                  <div className="td-type-header">
                    <div className="td-type-icon"><t.icon /></div>
                    <div>
                      <h3>{t.title}</h3>
                      <div className="td-type-sub">{t.subtitle}</div>
                    </div>
                  </div>
                  <p>{t.text}</p>
                  <div className="td-type-badge">{t.badge}</div>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* ONDE INVESTIR - forçar 3 colunas em linha */}
        <Section title="Onde investir" subtitle="Canais e plataformas para comprar títulos">
          <div className="td-grid-3">
            {ondeInvestir.map((c, i) => (
              <div className="td-card td-card-horizontal" key={i}>
                <img src={c.img} alt={c.title} className="td-img-card" />
                <div className="td-card-body">
                  <div className="td-card-title"><c.icon /> {c.title}</div>
                  <p>{c.text}</p>
                  <div className="td-card-footer">Verificar taxas, experiência do app e suporte.</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* LEGISLAÇÃO E CUIDADOS */}
        <Section title="Legislação e cuidados" subtitle="O que observar antes de aplicar">
          <div className="td-prose">
            <h4>Regulamentação</h4>
            <p>O Tesouro Direto é regulamentado e fiscalizado por órgãos oficiais (Tesouro Nacional, B3, CVM e Banco Central). As regras de negociação, custódia e registro são públicas.</p>

            <h4>Taxas e custos</h4>
            <ul>
              <li>Taxa de custódia da B3 (verificar valor atual no site oficial).</li>
              <li>Possível cobrança de taxa pela corretora — comparar antes de abrir conta.</li>
            </ul>

            <h4>Cuidados práticos</h4>
            <ul>
              <li>Defina o objetivo e o prazo antes de escolher o título.</li>
              <li>Atenção ao vender antes do vencimento: possível variação negativa.</li>
              <li>Considere a tributação na simulação de retorno.</li>
              <li>Mantenha documentos e acesso seguros (2FA nas corretoras).</li>
            </ul>

            <p>Para legislação e documentos oficiais, consulte a página de documentação no site do Tesouro Direto.</p>
          </div>
        </Section>

        {/* FAQ */}
        <Section title="Perguntas frequentes" subtitle="Dúvidas comuns sobre Tesouro Direto">
          <div className="td-faq">
            {faqList.map((f, i) => {
              const open = faqOpen === i;
              return (
                <div key={i} className="td-faq-item">
                  <div className="td-faq-summary" onClick={() => setFaqOpen(open ? null : i)}>
                    <span>{f.q}</span>
                    <motion.span
                      className="td-faq-icon"
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ChevronDown />
                    </motion.span>
                  </div>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        className="td-faq-answer"
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
