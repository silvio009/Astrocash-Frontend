import React, { useState, useContext } from "react";
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
  CreditCard,
  Building,
  Home,
  FileText,
  LineChart,
  Layers
} from "lucide-react";

import { AuthContext } from "../../contexts/AuthContext";
import Header from "../../components/Header/Header";
import HeaderLogged from "../../components/HeaderLogged/HeaderLogged";
import Footer from "../../components/Footer/FooterSection";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import "./fundosimobiliarios.css";

import FIIHeroImg from "../../assets/fundosImobiliarios.png"; 

// ======= Componentes com nomes voltados a Imobiliário =======
const SectionImobiliario = ({ id, title, subtitle, children }: { id?: string; title?: string; subtitle?: string; children: React.ReactNode }) => (
  <section id={id} className="fundos-section">
    {title && (
      <div className="fundos-section-header">
        <h2 className="fundos-section-title">{title}</h2>
        {subtitle && <p className="fundos-section-subtitle">{subtitle}</p>}
      </div>
    )}
    {children}
  </section>
);

const StatEye = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="fundos-stat">
    <div className="fundos-stat-icon"><Icon /></div>
    <div>
      <div className="fundos-stat-label">{label}</div>
      <div className="fundos-stat-value">{value}</div>
    </div>
  </div>
);

export default function FundosImobiliarios() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const { isLogged } = useContext(AuthContext);

  // ======= FAQ =======
  const faqList = [
    {
      q: "Qual é o mínimo para começar em FIIs?",
      a: "Não há valor mínimo fixo: você compra no mínimo 1 cota pelo preço de mercado (geralmente entre ~R$ 8 e R$ 1.000, conforme o fundo). É possível investir pela internet via corretoras/Home Broker.",
    },
    {
      q: "Os rendimentos mensais (\"aluguéis\") pagam Imposto de Renda?",
      a: "P/ pessoa física, normalmente são isentos se o FII tiver 50+ cotistas, for negociado em bolsa/mercado organizado e o investidor não tiver 10% ou mais das cotas. Ganho na venda de cotas é tributado (alíquota padrão 20%). Verifique regras atuais.",
    },
    {
      q: "Existe carência ou prazo mínimo?",
      a: "Não. As cotas são negociadas na B3 em pregão regular. Liquidez depende do fundo: FIIs maiores e mais populares tendem a ter maior volume.",
    },
    {
      q: "Como declaro FIIs no IRPF?",
      a: "Rendimentos isentos vão na ficha de rendimentos isentos; posição de cotas na ficha de bens e direitos; ganhos de capital com venda tributam 20% via DARF (código 6015) até o último dia útil do mês seguinte.",
    },
    {
      q: "Quais os principais riscos?",
      a: "Vacância/inadimplência (tijolo), risco de crédito (papel/CRI), risco de juros (marcação a mercado), gestão, concentração de ativos/locatários e iliquidez em fundos pequenos.",
    },
    {
      q: "Preciso ir ao banco ou cartório para investir?",
      a: "Não. Toda a negociação de cotas pode ser feita 100% online por corretoras habilitadas, via Home Broker ou app. Para comprar imóvel direto, aí sim há cartório, ITBI, escritura e registro.",
    },
    {
      q: "O que mudou na regulamentação dos fundos?",
      a: "Os FIIs são regidos pela Lei 8.668/1993 e pelas regras da CVM (Resolução 175, Anexo específico para FIIs). Consulte sempre materiais oficiais para atualizações.",
    }
  ];

  // ======= Tipos de FIIs =======
  const tipos = [
    {
      icon: Building,
      title: "FIIs de Tijolo",
      subtitle: "Imóveis físicos (lajes, shoppings, galpões etc.)",
      text: "Receita costuma vir de aluguéis e reajustes contratuais (IGP-M/IPCA). Pode ter vacância e renegociação de contratos; em contrapartida, é o mais próximo do imóvel real.",
      badge: "Renda de aluguéis",
    },
    {
      icon: FileText,
      title: "FIIs de Papel",
      subtitle: "Títulos lastreados no setor (CRI/LCI etc.)",
      text: "Foco em recebíveis imobiliários (CRIs e outros). Receita por juros/correção monetária. Sensíveis a juros e risco de crédito dos emissores/devedores.",
      badge: "Juros/Inflação",
    },
    {
      icon: Layers,
      title: "FIIs Híbridos & FOFs",
      subtitle: "Carteiras mistas / Fundos de Fundos",
      text: "Misturam tijolo e papel ou investem em outros FIIs para diversificação. Podem ajustar alocação conforme ciclos do mercado imobiliário.",
      badge: "Diversificação",
    },
    {
      icon: Home,
      title: "Desenvolvimento",
      subtitle: "Projetos em construção",
      text: "Potencial de retorno maior com risco elevado (obras, licenças, vendas). Normalmente indicados a perfis que toleram maior volatilidade.",
      badge: "Risco elevado",
    },
  ];

  // ======= Onde investir (3 colunas) =======
  const ondeInvestir = [
    {
      icon: Landmark,
      title: "Corretoras (Home Broker)",
      text: "Abra conta em uma corretora, transfira recursos e negocie cotas na B3 pelo Home Broker/app. Compare taxas (corretagem), experiência e relatórios.",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
    },
    {
      icon: LineChart,
      title: "Plataformas e apps",
      text: "Plataformas de investimento reúnem cotações, livros de ofertas e ferramentas. A liquidez e o preço são os do mercado (pregão B3).",
      img: "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1200&auto=format&fit=crop",
    },
    {
      icon: ShieldCheck,
      title: "Relatórios e casas de análise",
      text: "Relatórios ajudam a entender qualidade dos imóveis, contratos, indexadores e riscos. Use como apoio, sempre lendo o relatório gerencial do FII.",
      img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <div className="fundos-container">
      {/* Aqui escolhe qual Header mostrar */}
      {isLogged ? (
        <HeaderLogged toggleMenu={() => {}} menuOpen={false} />
      ) : (
        <Header toggleMenu={() => {}} menuOpen={false} />
      )}

      <nav className="fundos-breadcrumb">
        <Link to="/" className="fundos-breadcrumb-link">Home</Link>
        <span className="fundos-breadcrumb-separator">›</span>
        <span className="fundos-breadcrumb-current">Fundos Imobiliários</span>
      </nav>

      <main className="fundos-main">
        {/* HERO */}
      <div className="fundos-hero">
        <SectionImobiliario>
          <div className="fundos-hero-grid proportionate">
            
            {/* Texto principal */}
            <div className="fundos-hero-text">
              <h1>Fundos Imobiliários (FIIs) — guia completo e prático</h1>
              <p>
                Como investir em imóveis sem comprá-los diretamente, como funcionam as cotas, tributação, riscos, legislação e também um passo a passo de compra de imóvel físico para você comparar.
              </p>

              <div className="fundos-stats-grid">
                <StatEye icon={ShieldCheck} label="Perfil" value="Conservador a Moderado" />
                <StatEye icon={TrendingUp} label="Renda" value="Aluguéis + ganhos de capital" />
                <StatEye icon={Timer} label="Liquidez" value="Negociação diária na B3" />
                <StatEye icon={Landmark} label="Tributação" value="Rend. isentos* / 20% GC" />
              </div>
              <small className="fundos-small-note">
                *Isenção típica p/ PF se o FII tiver 50+ cotistas, negociação em bolsa e investidor &lt; 10% das cotas. Verifique regras atuais.
              </small>
            </div>

            {/* Card com imagem e conteúdo */}
            <div className="fundos-hero-card">
              <div className="fundos-hero-bg">
                <img
                  src={FIIHeroImg || "https://images.unsplash.com/photo-1600585154340-1e68b2f6cf0f?q=80&w=1600&auto=format&fit=crop"}
                  alt="Fundos Imobiliários"
                />
              </div>
              <div className="fundos-hero-card-body">
                <h3><Info /> O que você vai aprender aqui</h3>
                <ul>
                  <li>O que são FIIs e os principais tipos (tijolo, papel, híbridos/FOFs, desenvolvimento).</li>
                  <li>Como investir pela internet (corretora, Home Broker, horários, custos).</li>
                  <li>Tributação na prática: rendimentos, ganhos de capital e declaração.</li>
                  <li>Legislação, governança e onde ler documentos oficiais.</li>
                  <li>Comparativo: investir em imóveis via FIIs vs. comprar um imóvel diretamente.</li>
                </ul>
              </div>
            </div>

          </div>
        </SectionImobiliario>
      </div>


        {/* O QUE É */}
        <SectionImobiliario id="o-que-e" title="O que é um Fundo Imobiliário?">
          <div className="fundos-grid-2-expanded">
            <div className="fundos-prose-expanded">
              <p>
                <strong>Fundos Imobiliários (FIIs)</strong> são veículos coletivos que reúnem recursos de diversos investidores para aplicar no setor imobiliário — em imóveis prontos, projetos, ou títulos com lastro no mercado imobiliário. Em troca, o investidor recebe <em>cotas</em> do fundo e participa dos resultados conforme sua proporção.
              </p>

              <h4>Quem cria e como é regulamentado ? </h4>
              <p>
                Os FIIs são constituídos por instituições financeiras e administrados por um <strong>administrador</strong> e um <strong>gestor</strong>. O arcabouço legal básico vem da <strong>Lei 8.668/1993</strong> e das normas da CVM (hoje consolidadas na <strong>Resolução 175</strong>, Anexo específico para FIIs). As cotas são registradas/negociadas na <strong>B3</strong>.
              </p>

              <h4>Como os FIIs geram resultado ?</h4>
              <ul>
                <li><strong>Renda recorrente:</strong> aluguéis e juros/correções (no caso de recebíveis).</li>
                <li><strong>Ganhos de capital:</strong> venda de ativos acima do custo, reavaliações e reciclagem de portfólio.</li>
                <li><strong>Distribuições:</strong> fundos costumam distribuir periodicamente (muitos pagam mensalmente), conforme regulamento.</li>
              </ul>

              <div className="fundos-alert-expanded">
                <AlertTriangle />
                <div>
                  <strong>Importante</strong>
                  <div className="fundos-alert-items">Rendimento não é garantido. Há risco de vacância, renegociação de contratos, crédito (no caso de CRIs), marcação a mercado e gestão.</div>
                </div>
              </div>
            </div>

            <img className="fundos-img-card-expanded" src={"https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1600&auto=format&fit=crop"} alt="Explicação FIIs" />
          </div>
        </SectionImobiliario>

        {/* TIPOS */}
                {/* TIPOS */}
        <div className="fundos-section-gray">
          <SectionImobiliario title="Principais tipos de FIIs">
            <div className="fundos-types-grid">
              {tipos.map((t, i) => (
                <div key={i} className="fundos-type fundos-type-rich">
                  <div className="fundos-type-header">
                    <div className="fundos-type-icon"><t.icon /></div>
                    <div>
                      <h3>{t.title}</h3>
                      <div className="fundos-type-sub">{t.subtitle}</div>
                    </div>
                  </div>
                  <p>{t.text}</p>
                  <div className="fundos-type-badge">{t.badge}</div>
                </div>
              ))}
            </div>
          </SectionImobiliario>
        </div>

        {/* COMO INVESTIR EM IMÓVEIS SEM COMPRÁ-LOS */}
        <SectionImobiliario title="Como investir em imóveis sem comprá-los" subtitle="Usando Fundos Imobiliários (100% online)">
          <div className="fundos-grid-3">
            {[{
              icon: Landmark,
              title: "Abra conta numa corretora",
              text: "Preencha cadastro, faça a transferência via TED/PIX e habilite o Home Broker. Compare custos de corretagem e qualidade da plataforma.",
              img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
            },{
              icon: LineChart,
              title: "Pesquise os FIIs",
              text: "Leia o regulamento e o relatório gerencial, veja vacância, contratos, indexadores (IPCA/IGP-M), prazos, concentração e histórico de distribuição.",
              img: "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1600&auto=format&fit=crop"
            },{
              icon: Coins,
              title: "Negocie na B3",
              text: "Com o código do FII, envie ordens de compra/venda no pregão. Você pode começar com 1 cota. Recebimentos são creditados na sua conta da corretora.",
              img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop"
            }].map((c, i) => (
              <div className="fundos-card fundos-card-horizontal" key={i}>
                <img src={c.img} alt={c.title} className="fundos-img-card" />
                <div className="fundos-card-body">
                  <div className="fundos-card-title"><c.icon /> {c.title}</div>
                  <p>{c.text}</p>
                  <div className="fundos-card-footer">Pregão regular; liquidez varia conforme o fundo.</div>
                </div>
              </div>
            ))}
          </div>
        </SectionImobiliario>

        {/* COMO INVESTIR EM IMÓVEIS COMPRANDO O IMÓVEL */}
        <SectionImobiliario title="Como investir comprando o imóvel (passo a passo)" subtitle="Escritura, ITBI, registro e financiamento">
          <div className="fundos-prose-enhanced">
            <h4><Home className="fundos-icon" /> Etapas essenciais</h4>
            <ol>
              <li><strong>Escolha e análise do imóvel:</strong> verifique matrícula atualizada, certidões do vendedor e eventuais ônus.</li>
              <li><strong>Proposta e contrato:</strong> sinal/arras; em compra financiada, o <em>instrumento particular</em> com alienação fiduciária substitui a escritura.</li>
              <li><strong>Escritura pública (à vista):</strong> lavrada em cartório de notas.</li>
              <li><strong>Registro no Cartório de Imóveis:</strong> só com o registro a propriedade é transferida de fato.</li>
              <li><strong>Financiamento (se houver):</strong> análise de crédito, avaliação do bem e assinatura do contrato (SFH/SFI).</li>
            </ol>

            <h4><CreditCard className="fundos-icon" /> Custos típicos</h4>
            <ul>
              <li><strong>ITBI:</strong> alíquota definida pela prefeitura local; em capitais comuns, ~2%–3% sobre o valor do imóvel.</li>
              <li><strong>Escritura e registro:</strong> tabelados por estado e variam conforme o valor do imóvel; consulte a tabela do seu cartório e calcule antes.</li>
              <li><strong>Taxas bancárias/avaliação:</strong> em compras financiadas.</li>
            </ul>

            <div className="fundos-alert-enhanced">
              <AlertTriangle />
              <div>
                <strong>Atenção</strong>
                <div className="fundos-alert-items">Comprar imóvel direto exige capital maior, custos iniciais e tempo de cartório. FIIs simplificam e dividem os riscos com menor ticket.</div>
              </div>
            </div>
          </div>
        </SectionImobiliario>

        {/* TRIBUTAÇÃO E REGRAS */}
        <SectionImobiliario title="Tributação na prática" subtitle="O que incide em FIIs e na compra de imóvel físico">
          <div className="fundos-grid-2-expanded">
            <div className="fundos-prose-expanded">
              <h2><Coins className="fundos-icon" /> FIIs</h2>
              <ul>
                <li><strong>Rendimentos (\"aluguéis\"):</strong> usualmente isentos para pessoa física quando o FII cumpre requisitos (50+ cotistas; negociação em bolsa/mercado organizado; investidor &lt; 10% das cotas).</li>
                <li><strong>Venda de cotas com lucro:</strong> imposto de renda de 20% (sem a isenção de R$ 20 mil/mês que existe em ações). DARF 6015 até o último dia útil do mês seguinte.</li>
                <li><strong>Sem come-cotas:</strong> FIIs não têm come-cotas.</li>
              </ul>

              <h2><Building className="fundos-icon" /> Imóvel físico</h2>
              <ul>
                <li><strong>ITBI:</strong> imposto municipal pago na transferência.</li>
                <li><strong>Escritura/Registro:</strong> emolumentos de cartório (tabelas estaduais).</li>
                <li><strong>Ganho de capital na venda do imóvel:</strong> tributação específica para pessoa física com possíveis isenções (ex.: venda de único imóvel até limite legal, prazos etc.).</li>
              </ul>

              <div className="fundos-alert-expanded">
                <AlertTriangle />
                <div>
                  <strong>Regra pode mudar</strong>
                  <div className="fundos-alert-items">Acompanhe possíveis alterações legais/tributárias para FIIs (há debates periódicos sobre isenções e alíquotas). Consulte as fontes oficiais antes de investir.</div>
                </div>
              </div>
            </div>

            <img className="fundos-img-card-expanded" src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1600&auto=format&fit=crop" alt="Tributação e regras" />
          </div>
        </SectionImobiliario>

        {/* LEGISLAÇÃO E CUIDADOS */}
        <SectionImobiliario title="Legislação e cuidados" subtitle="Entenda as regras e como reduzir riscos">
          <div className="fundos-prose-enhanced">
            <h4><ShieldCheck className="fundos-icon" /> Regulamentação</h4>
            <p>
              Leia o regulamento e o prospecto do FII. A legislação-base é a <strong>Lei 8.668/1993</strong> e as regras da <strong>CVM</strong> (Res. 175 – Anexo específico para FIIs). As cotas são negociadas e custodiadas com registro na <strong>B3</strong>.
            </p>

            <h4><Calculator className="fundos-icon" /> Taxas e custos</h4>
            <ul>
              <li>Corretagem (quando houver) e emolumentos/taxas de negociação da B3.</li>
              <li>Taxa de administração/gestão do fundo (ver no regulamento/relatório gerencial).</li>
              <li>Impostos conforme descrito acima.</li>
            </ul>

            <h4><AlertTriangle className="fundos-icon" /> Cuidados práticos</h4>
            <ul>
              <li>Defina objetivos (renda x valorização) e prazo.</li>
              <li>Analise vacância, qualidade dos inquilinos, contratos (típico/atípico), indexadores e concentração por ativo/locatário.</li>
              <li>Diversifique entre tipos de FIIs.</li>
              <li>Leia o <em>Relatório Gerencial</em> mensal e o <em>Fato Relevante</em> quando houver.</li>
            </ul>

            <h4><BookOpen className="fundos-icon" /> Onde estudar mais</h4>
            <p>
              Consulte materiais da B3, CVM e o site do seu fundo. Use cursos e guias confiáveis para se aprofundar.
            </p>
          </div>
        </SectionImobiliario>

        {/* ONDE INVESTIR - 3 colunas */}
        <SectionImobiliario title="Onde investir" subtitle="Canais e plataformas para comprar cotas de FIIs">
          <div className="fundos-grid-3">
            {ondeInvestir.map((c, i) => (
              <div className="fundos-card fundos-card-horizontal" key={i}>
                <img src={c.img} alt={c.title} className="fundos-img-card" />
                <div className="fundos-card-body">
                  <div className="fundos-card-title"><c.icon /> {c.title}</div>
                  <p>{c.text}</p>
                  <div className="fundos-card-footer">Verifique custos, UX e relatórios do app.</div>
                </div>
              </div>
            ))}
          </div>
        </SectionImobiliario>

        {/* FAQ */}
       <SectionImobiliario id="faq" title="Perguntas frequentes">
          <div className="fundos-faq">
            {faqList.map((item, i) => (
              <div key={i} className={`fundos-faq-item ${faqOpen === i ? "open" : ""}`}>
                <div className="fundos-faq-summary" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                  {item.q}
                  <div className="fundos-faq-icon"><ChevronDown /></div>
                </div>
                <AnimatePresence>
                  {faqOpen === i && (
                    <motion.div
                      className="fundos-faq-answer"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <p>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </SectionImobiliario>

      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

