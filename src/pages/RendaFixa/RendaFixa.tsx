import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { ShieldCheck, TrendingUp, Timer, Landmark, BookOpen, AlertTriangle, Coins, Calculator, Info } from "lucide-react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/FooterSection";
import "./RendaFixa.css";

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const Section = ({ id, title, subtitle, children }: { id?: string; title?: string; subtitle?: string; children: React.ReactNode }) => (
  <section id={id} className="rf-section">
    {title && (
      <div className="rf-section-header">
        <h2 className="rf-section-title">{title}</h2>
        {subtitle && <p className="rf-section-subtitle">{subtitle}</p>}
      </div>
    )}
    {children}
  </section>
);

const Stat = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="rf-stat">
    <div className="rf-stat-icon"><Icon /></div>
    <div>
      <div className="rf-stat-label">{label}</div>
      <div className="rf-stat-value">{value}</div>
    </div>
  </div>
);

export default function RendaFixa() {
  const [aporteInicial, setAporteInicial] = useState(1000);
  const [aporteMensal, setAporteMensal] = useState(200);
  const [taxaAnual, setTaxaAnual] = useState(10);
  const [meses, setMeses] = useState(36);
  const [aliquotaIR, setAliquotaIR] = useState(17.5);

  const taxaMensal = useMemo(() => Math.pow(1 + taxaAnual / 100, 1 / 12) - 1, [taxaAnual]);

  const simulacao = useMemo(() => {
    const data: { mes: number; bruto: number; aporte: number; liquido: number }[] = [];
    let saldo = aporteInicial;
    let totalAportes = aporteInicial;

    for (let m = 1; m <= meses; m++) {
      saldo = saldo * (1 + taxaMensal) + aporteMensal;
      totalAportes += aporteMensal;
      const rendimentoBruto = saldo - totalAportes;
      const imposto = Math.max(rendimentoBruto, 0) * (aliquotaIR / 100);
      const saldoLiquido = saldo - imposto;
      data.push({ mes: m, bruto: saldo, aporte: totalAportes, liquido: saldoLiquido });
    }
    return data;
  }, [aporteInicial, aporteMensal, taxaMensal, meses, aliquotaIR]);

  const final = simulacao[simulacao.length - 1];

  return (
    <div className="rf-container">
      <Header />
      <motion.main className="rf-main" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        
        {/* HERO */}
        <div className="rf-hero">
        <Section>
            <div className="rf-hero-grid">
            <div className="rf-hero-text">
                <h1>Renda Fixa: guia completo para investir com segurança</h1>
                <p>Entenda o que é, como funciona, onde investir, fórmulas essenciais, tributação, riscos e um simulador prático.</p>
                <div className="rf-stats-grid">
                <Stat icon={ShieldCheck} label="Perfil" value="Conservador a Moderado" />
                <Stat icon={TrendingUp} label="Retorno" value="Prevísivel (pós, pré, IPCA)" />
                <Stat icon={Timer} label="Liquidez" value="D+0 até D+30+" />
                <Stat icon={Landmark} label="Tributação" value="IR regressivo" />
                </div>
            </div>

            <div className="rf-hero-card">
                <img src="https://images.unsplash.com/photo-1604594849809-dfedbc827105?q=80&w=1600&auto=format&fit=crop" alt="Investimentos" />
                <div className="rf-hero-card-body rf-card-body-dark">
                <h3><Info /> O que você vai aprender aqui</h3>
                <ul>
                    <li>Conceitos e tipos de renda fixa (pós, pré, IPCA+).</li>
                    <li>Onde investir: Tesouro Direto, CDB/LCI/LCA, LC, Debêntures.</li>
                    <li>Fórmulas de juros simples e compostos e cálculo de rentabilidade.</li>
                    <li>Tributação, prazos, liquidez e cuidados de risco.</li>
                    <li>Simulador interativo com aportes.</li>
                </ul>
                </div>
            </div>

            </div>
        </Section>
        </div>

        {/* O QUE É */}
        <Section id="o-que-e" title="O que é renda fixa?" subtitle="Investimentos com regras de remuneração definidas no momento da aplicação.">
          <div className="rf-grid-2">
            <div className="rf-prose">
              <p>Renda fixa é a classe de investimentos em que a forma de remuneração é conhecida desde o início. Pode ser <strong>pós-fixada</strong>, <strong>pré-fixada</strong> ou <strong>híbrida</strong>.</p>
              <h4>Principais variações</h4>
              <ul>
                <li><strong>Pós-fixado (CDI/Selic)</strong>: Tesouro Selic, CDB 100% CDI.</li>
                <li><strong>Pré-fixado</strong>: Taxa fixa, ex.: 12% a.a.</li>
                <li><strong>IPCA+</strong>: Protege da inflação + ganho real.</li>
              </ul>
              <div className="rf-alert">
                <AlertTriangle /> Mesmo na renda fixa existem riscos: <strong>crédito</strong>, <strong>mercado</strong>, <strong>liquidez</strong> e <strong>indexadores</strong>.
              </div>
            </div>
            <img src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1400&auto=format&fit=crop" alt="Gráfico" className="rf-img-card" />
          </div>
        </Section>

        {/* ONDE INVESTIR */}
        <Section id="onde-investir" title="Onde investir" subtitle="Conheça os principais produtos.">
          <div className="rf-grid-3">
            {[{
              icon: Landmark,
              title: "Tesouro Direto",
              text: "Títulos públicos: Selic, Prefixado, IPCA+.",
              img: "https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=1200&auto=format&fit=crop"
            },{
              icon: Coins,
              title: "CDB / LCI / LCA / LC",
              text: "Bancos e financeiras. CDB tributa IR; LCI/LCA isentos. FGC até R$ 250 mil.",
              img: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1200&auto=format&fit=crop"
            },{
              icon: ShieldCheck,
              title: "Debêntures",
              text: "Títulos de dívidas de empresas. IPCA+ ou pré, incentivadas isentas de IR.",
              img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200&auto=format&fit=crop"
            }].map((c, i) => (
              <div key={i} className="rf-card">
                <img src={c.img} alt={c.title} className="rf-img-card" />
                <div className="rf-card-body">
                  <div className="rf-card-title"><c.icon /> {c.title}</div>
                  <p>{c.text}</p>
                  <div className="rf-card-footer">Avalie emissor, taxa, prazo e liquidez.</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* FÓRMULAS + SIMULADOR */}
        <Section id="formulas" title="Fórmulas essenciais" subtitle="Como calcular juros e comparar investimentos.">
          <div className="rf-grid-2">
            <div className="rf-prose">
              <h4>Juros simples</h4>
              <pre>{`J = P * i * n\nM = P + J\nOnde: P = principal, i = taxa, n = períodos`}</pre>
              <h4>Juros compostos</h4>
              <pre>{`M = P * (1 + i)^n\nRendimento = M - P\nTaxa mensal = (1 + i_anual)^(1/12) - 1`}</pre>
              <h4>Taxa real (IPCA+)</h4>
              <pre>{`i_real ≈ i_nominal - inflação`}</pre>
              <h4>Rentabilidade líquida</h4>
              <pre>{`IR regressivo: 22,5%, 20%, 17,5%, 15%\nLíquido = Bruto - (Rendimento * alíquota)`}</pre>
            </div>
            <div className="rf-card rf-simulador">
              <h4><Calculator /> Simulador rápido</h4>
              <div className="rf-input-grid">
                <label>Aporte inicial<input type="number" value={aporteInicial} onChange={(e)=>setAporteInicial(Number(e.target.value) || 0)} /></label>
                <label>Aporte mensal<input type="number" value={aporteMensal} onChange={(e)=>setAporteMensal(Number(e.target.value) || 0)} /></label>
                <label>Taxa anual (%)<input type="number" value={taxaAnual} onChange={(e)=>setTaxaAnual(Number(e.target.value) || 0)} /></label>
                <label>Prazo (meses)<input type="number" value={meses} onChange={(e)=>setMeses(Number(e.target.value) || 0)} /></label>
                <label>Alíquota IR (%)<input type="number" value={aliquotaIR} onChange={(e)=>setAliquotaIR(Number(e.target.value) || 0)} /></label>
              </div>

              <div className="rf-stats-grid">
                <Stat icon={Coins} label="Aportes totais" value={brl((aporteInicial + aporteMensal * meses))} />
                <Stat icon={TrendingUp} label="Montante bruto" value={final? brl(final.bruto) : brl(0)} />
                <Stat icon={ShieldCheck} label="Montante líquido" value={final? brl(final.liquido) : brl(0)} />
              </div>

              <div className="rf-chart">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={simulacao}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" tickFormatter={(v)=>`${v}m`} />
                    <YAxis tickFormatter={(v)=>brl(v)} width={80} />
                    <Tooltip formatter={(v: any)=>brl(Number(v))} labelFormatter={(l)=>`Mês ${l}`} />
                    <Legend />
                    <Line type="monotone" dataKey="aporte" name="Aportes" dot={false} />
                    <Line type="monotone" dataKey="bruto" name="Bruto" dot={false} />
                    <Line type="monotone" dataKey="liquido" name="Líquido" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Section>

      </motion.main>
      <Footer />
    </div>
  );
}
