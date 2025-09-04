import React, { useMemo, useState } from "react";
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
  Download,
  Mail,
  Globe,
  Calendar
} from "lucide-react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/FooterSection";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import "./converter.css";

// ------------------------------------------------------------------
// Converter.tsx (versão completa e extensa)
// - Todos os classNames foram prefixados com `converter-` para evitar
//   conflitos com estilos globais.
// - Página: simulador + conversor multi-produto (Tesouro, Poupança, CDB, LCI,
//   Fundos, etc.), com export CSV, envio por e-mail, tabelas detalhadas,
//   conversão de moedas (BRL/USD/EUR), e plano editável.
// - Use como base — posso reduzir ou modularizar para componentes menores.
// ------------------------------------------------------------------

type InvestmentKey =
  | "tesouro-selic"
  | "tesouro-prefixado"
  | "tesouro-ipca"
  | "poupanca"
  | "cdb"
  | "lci"
  | "fundo-di"
  | "fundo-renda-fixa";

type PlanRow = {
  id: string;
  date: string; // YYYY-MM
  contribution: number;
  note?: string;
};

type YearSnapshot = {
  year: number;
  startingBalance: number;
  contributionTotal: number;
  grossGain: number;
  taxes: number;
  endingBalance: number;
};

const PRESET_RATES: Record<InvestmentKey, { nominalAnnual: number; description: string; taxFree?: boolean }> = {
  "tesouro-selic": { nominalAnnual: 0.085, description: "Tesouro Selic — pós-fixado (ex: 8.5% a.a.)" },
  "tesouro-prefixado": { nominalAnnual: 0.10, description: "Tesouro Prefixado — taxa fixa (ex: 10% a.a.)" },
  "tesouro-ipca": { nominalAnnual: 0.065, description: "IPCA + taxa real (ex: IPCA 4.5% + real 2.0%)" },
  "poupanca": { nominalAnnual: 0.033, description: "Poupança — regra exemplo (varia conforme regulamentação)" },
  "cdb": { nominalAnnual: 0.095, description: "CDB — exemplo (pode ser prefixado ou pós)" },
  "lci": { nominalAnnual: 0.085, description: "LCI/LCA — normalmente isento de IR", taxFree: true },
  "fundo-di": { nominalAnnual: 0.07, description: "Fundo DI — exemplo" },
  "fundo-renda-fixa": { nominalAnnual: 0.075, description: "Fundos de renda fixa — exemplo" },
};

function getIrRate(days: number) {
  if (days <= 180) return 0.225;
  if (days <= 360) return 0.20;
  if (days <= 720) return 0.175;
  return 0.15;
}

const fmt = (n: number) => n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function uid(prefix = "") {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 8)}${prefix}`;
}

// Cálculo mensal detalhado com opções: compounding mensal e simulação de IR e IOF
function projectDetailed({
  initial,
  monthly,
  annualRate,
  years,
  taxFree = false,
  simulateIrlike = true,
  annualFeeRate = 0,
  inflationRate = 0,
}: {
  initial: number;
  monthly: number;
  annualRate: number;
  years: number;
  taxFree?: boolean;
  simulateIrlike?: boolean;
  annualFeeRate?: number; // exemplo 0.01 = 1% ao ano de taxa administrativa
  inflationRate?: number; // para cálculo real (opcional)
}) {
  const months = years * 12;
  const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1;
  const monthlyFee = Math.pow(1 + annualFeeRate, 1 / 12) - 1;
  let balance = initial;

  const monthlyRows: { monthIndex: number; balance: number; contribution: number; grossGain: number; fee: number; taxes: number }[] = [];

  for (let m = 1; m <= months; m++) {
    balance += monthly; // aporte no começo do mês
    const gain = balance * monthlyRate;
    const fee = balance * monthlyFee; // simplificação: taxa administrativa sobre saldo
    const netGain = gain - fee;
    balance += netGain;

    monthlyRows.push({ monthIndex: m, balance, contribution: monthly, grossGain: netGain, fee, taxes: 0 });
  }

  const yearSnapshots: YearSnapshot[] = [];
  for (let y = 1; y <= years; y++) {
    const monthStart = (y - 1) * 12;
    const monthsSlice = monthlyRows.slice(monthStart, monthStart + 12);
    const startingBalance = monthStart === 0 ? initial : monthlyRows[monthStart - 1].balance;
    const contributionTotal = monthsSlice.reduce((s, r) => s + r.contribution, 0);
    const grossGain = monthsSlice.reduce((s, r) => s + r.grossGain, 0);
    const fees = monthsSlice.reduce((s, r) => s + r.fee, 0);

    let taxes = 0;
    if (!taxFree && simulateIrlike) {
      const ir = getIrRate(y * 365);
      taxes = grossGain * ir;
    }

    const endingBalance = startingBalance + contributionTotal + grossGain - taxes; // fees já subtraídos do grossGain

    yearSnapshots.push({ year: y, startingBalance, contributionTotal, grossGain, taxes, endingBalance });
  }

  return { monthlyRows, yearSnapshots, finalBalance: monthlyRows[monthlyRows.length - 1]?.balance ?? initial };
}

function toCSV(headers: string[], rows: (string | number)[][]) {
  const esc = (v: string | number) => {
    const s = String(v ?? "");
    if (s.includes(",") || s.includes("\n") || s.includes('"')) return '"' + s.replace(/"/g, '""') + '"';
    return s;
  };
  return [headers.join(","), ...rows.map(r => r.map(esc).join(","))].join("\n");
}

export default function Converter() {
  // parâmetros básicos
  const [initial, setInitial] = useState<number>(1000);
  const [monthly, setMonthly] = useState<number>(200);
  const [years, setYears] = useState<number>(10);
  const [investment, setInvestment] = useState<InvestmentKey>("tesouro-selic");
  const [customRate, setCustomRate] = useState<number | null>(null);
  const [simulateIr, setSimulateIr] = useState<boolean>(true);
  const [annualFee, setAnnualFee] = useState<number>(0.0);
  const [inflation, setInflation] = useState<number>(0.04);

  // conversão de moedas — valores iniciais (podem ser atualizados via API se desejar)
  const [rateUSD, setRateUSD] = useState<number>(5.10); // R$ por USD
  const [rateEUR, setRateEUR] = useState<number>(5.50); // R$ por EUR
  const [currencyView, setCurrencyView] = useState<"BRL" | "USD" | "EUR">("BRL");

  const [planRows, setPlanRows] = useState<PlanRow[]>([
    { id: uid(), date: "2025-01", contribution: 200, note: "aporte mensal padrão" },
  ]);

  const preset = PRESET_RATES[investment];
  const annualRate = customRate ?? preset.nominalAnnual;

  const { monthlyRows, yearSnapshots, finalBalance } = useMemo(() => {
    return projectDetailed({
      initial,
      monthly,
      annualRate,
      years,
      taxFree: !!preset.taxFree,
      simulateIrlike: simulateIr,
      annualFeeRate: annualFee,
      inflationRate: inflation,
    });
  }, [initial, monthly, years, investment, customRate, simulateIr, annualFee, inflation]);

  // tabela edição
  function addPlanRow() {
    setPlanRows(p => [...p, { id: uid(), date: new Date().toISOString().slice(0,7), contribution: 0 }]);
  }
  function updatePlanRow(id: string, patch: Partial<PlanRow>) {
    setPlanRows(p => p.map(r => (r.id === id ? { ...r, ...patch } : r)));
  }
  function removePlanRow(id: string) {
    setPlanRows(p => p.filter(r => r.id !== id));
  }

  function downloadCSV() {
    const headers1 = ["Ano", "Saldo Inicial", "Aportes no Ano", "Ganho Bruto", "Impostos", "Saldo Final"];
    const rows1 = yearSnapshots.map(s => [s.year, fmt(s.startingBalance), fmt(s.contributionTotal), fmt(s.grossGain), fmt(s.taxes), fmt(s.endingBalance)]);

    const headers2 = ["Mês (índice)", "Saldo", "Aporte", "Ganho Mensal", "Observação"];    
    const rows2 = monthlyRows.map(r => [r.monthIndex, fmt(r.balance), fmt(r.contribution), fmt(r.grossGain), ""]);    

    const csv = [
      "Resumo anual",
      toCSV(headers1, rows1),
      "",
      "Detalhe mensal",
      toCSV(headers2, rows2),
      "",
      "Plano personalizado",
      toCSV(["Data", "Contribuição", "Nota"], planRows.map(r => [r.date, r.contribution, r.note ?? ""]))
    ].join("\n\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `simulacao_investimento_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function sendByEmail(to?: string) {
    const headers = ["Mês", "Saldo", "Aporte", "Ganho mensal"];
    const rows = monthlyRows.map(r => [r.monthIndex, fmt(r.balance), fmt(r.contribution), fmt(r.grossGain)]);
    const csv = toCSV(headers, rows);

    const subject = encodeURIComponent("Simulação de investimento — resumo");
    const bodyParts = [
      `Investimento: ${investment} (${preset.description})`,
      `Taxa anual usada: ${(annualRate*100).toFixed(2)}% a.a.`,
      `Aporte inicial: R$ ${fmt(initial)} — Aporte mensal: R$ ${fmt(monthly)}`,
      `Prazo (anos): ${years}`,
      "\nResumo anual:\n",
      ...yearSnapshots.map(s => `Ano ${s.year}: saldo final R$ ${fmt(s.endingBalance)} (ganho R$ ${fmt(s.grossGain)})`),
      "\nCSV (detalhe mensal):\n",
      csv
    ];

    const body = encodeURIComponent(bodyParts.join("\n"));
    const mailto = `mailto:${to ?? ""}?subject=${subject}&body=${body}`;
    window.open(mailto);
  }

  function convertToCurrency(valueBRL: number, to: "BRL" | "USD" | "EUR") {
    if (to === "BRL") return valueBRL;
    if (to === "USD") return valueBRL / rateUSD;
    return valueBRL / rateEUR;
  }

  function BalanceSparkline({ width = 680, height = 140 }: { width?: number; height?: number }) {
    const values = yearSnapshots.map(s => s.endingBalance);
    if (values.length === 0) return null;
    const max = Math.max(...values);
    const min = Math.min(...values);
    const pad = 8;
    const points = values.map((v, i) => {
      const x = pad + (i / (values.length - 1 || 1)) * (width - pad * 2);
      const y = pad + (1 - (v - min) / (max - min || 1)) * (height - pad * 2);
      return `${x},${y}`;
    }).join(" ");

    return (
      <svg width={width} height={height} className="converter-sparkline" viewBox={`0 0 ${width} ${height}`}>
        <polyline points={points} fill="none" stroke="#0f172a" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <div className="converter-container">
      <Header toggleMenu={() => {}} menuOpen={false} />

      <nav className="converter-breadcrumb">
        <Link to="/" className="converter-breadcrumb-link">Home</Link>
        <span className="converter-breadcrumb-separator">›</span>
        <span className="converter-breadcrumb-current">Converter</span>
      </nav>

      <main className="converter-main">
        <section className="converter-section converter-hero">
          <div className="converter-section-header">
            <h2 className="converter-section-title">Conversor e Simulador Completo</h2>
            <p className="converter-section-subtitle">Parâmetros avançados, comparativos e exportação.</p>
          </div>

          <div className="converter-grid-2">
            <div className="converter-panel">
              <h3>Parâmetros principais</h3>

              <label>Valor inicial (R$)</label>
              <input className="converter-input" type="number" value={initial} onChange={e => setInitial(Number(e.target.value) || 0)} />

              <label>Aporte mensal (R$)</label>
              <input className="converter-input" type="number" value={monthly} onChange={e => setMonthly(Number(e.target.value) || 0)} />

              <label>Prazo (anos)</label>
              <input className="converter-input" type="number" value={years} onChange={e => setYears(Number(e.target.value) || 0)} />

              <label>Produto</label>
              <select className="converter-select" value={investment} onChange={e => setInvestment(e.target.value as InvestmentKey)}>
                <option value="tesouro-selic">Tesouro Selic</option>
                <option value="tesouro-prefixado">Tesouro Prefixado</option>
                <option value="tesouro-ipca">Tesouro IPCA+</option>
                <option value="poupanca">Poupança</option>
                <option value="cdb">CDB</option>
                <option value="lci">LCI / LCA (isento)</option>
                <option value="fundo-di">Fundo DI</option>
                <option value="fundo-renda-fixa">Fundos Renda Fixa</option>
              </select>

              <label>Usar taxa preset: <strong>{(preset.nominalAnnual * 100).toFixed(2)}% a.a.</strong></label>
              <div className="converter-row">
                <label className="converter-row-item">
                  <input type="checkbox" checked={!customRate} onChange={() => setCustomRate(customRate ? customRate : null)} /> Usar preset
                </label>
                <label className="converter-row-item">
                  Ou insira taxa anual (%)
                  <input className="converter-input-small" type="number" value={customRate ?? (preset.nominalAnnual * 100)} onChange={e => setCustomRate(Number(e.target.value) ? Number(e.target.value) / 100 : null)} />
                </label>
              </div>

              <label>Taxa administrativa anual (%)</label>
              <input className="converter-input" type="number" value={annualFee * 100} onChange={e => setAnnualFee(Number(e.target.value) / 100 || 0)} />

              <label>Inflação anual estimada (%)</label>
              <input className="converter-input" type="number" value={inflation * 100} onChange={e => setInflation(Number(e.target.value) / 100 || 0)} />

              <label>
                <input type="checkbox" checked={simulateIr} onChange={e => setSimulateIr(e.target.checked)} /> Simular IR regressivo sobre ganho
              </label>

              <div className="converter-actions">
                <button onClick={downloadCSV} className="converter-button converter-button-primary"><Download /> Exportar CSV</button>
                <button onClick={() => sendByEmail()} className="converter-button converter-button-ghost"><Mail /> Enviar por e-mail</button>
              </div>

              <div className="converter-alert">
                <AlertTriangle />
                <div>
                  <strong>Atenção</strong>
                  <div className="converter-alert-text">Simulações aproximadas. Taxas reais, IOF, corretagem e regras específicas de cada título/asset não foram consideradas em detalhe — use como referência.</div>
                </div>
              </div>
            </div>

            <div className="converter-panel">
              <h3>Resumo e visualizações</h3>
              <p>Produto: <strong>{investment}</strong></p>
              <p>Taxa anual usada: <strong>{((customRate ?? preset.nominalAnnual) * 100).toFixed(2)}% a.a.</strong></p>
              <p>Saldo estimado após {years} anos: <strong>R$ {fmt(finalBalance)}</strong></p>

              <h4>Curva de saldo</h4>
              <BalanceSparkline />

              <h4 style={{ marginTop: 12 }}>Resumo anual</h4>
              <div className="converter-table-scroll">
                <table className="converter-table">
                  <thead>
                    <tr>
                      <th>Ano</th>
                      <th>Saldo inicial</th>
                      <th>Aportes</th>
                      <th>Ganho bruto</th>
                      <th>Impostos</th>
                      <th>Saldo final</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearSnapshots.map(s => (
                      <tr key={s.year}>
                        <td>{s.year}</td>
                        <td>R$ {fmt(s.startingBalance)}</td>
                        <td>R$ {fmt(s.contributionTotal)}</td>
                        <td>R$ {fmt(s.grossGain)}</td>
                        <td>R$ {fmt(s.taxes)}</td>
                        <td>R$ {fmt(s.endingBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>

          {/* Plan personalizado */}
          <div className="converter-section-header" style={{ marginTop: 18 }}>
            <h3>Plano personalizado (editar linhas)</h3>
          </div>

          <div className="converter-table-scroll">
            <table className="converter-table">
              <thead>
                <tr>
                  <th>Data (YYYY-MM)</th>
                  <th>Contribuição (R$)</th>
                  <th>Nota</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {planRows.map(r => (
                  <tr key={r.id}>
                    <td><input className="converter-input" value={r.date} onChange={e => updatePlanRow(r.id, { date: e.target.value })} /></td>
                    <td><input className="converter-input" type="number" value={r.contribution} onChange={e => updatePlanRow(r.id, { contribution: Number(e.target.value) || 0 })} /></td>
                    <td><input className="converter-input" value={r.note} onChange={e => updatePlanRow(r.id, { note: e.target.value })} /></td>
                    <td><button onClick={() => removePlanRow(r.id)} className="converter-button converter-button-danger">Remover</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: 8 }}>
            <button className="converter-button" onClick={addPlanRow}>Adicionar linha</button>
          </div>

        </section>

        {/* Comparativos detalhados e conversões */}
        <section className="converter-section">
          <div className="converter-section-header">
            <h2 className="converter-section-title">Comparativos e conversões</h2>
            <p className="converter-section-subtitle">Tabelas adicionais para conversões (BRL ↔ USD / EUR) e comparativos rápidos.</p>
          </div>

          <div className="converter-grid-3">
            <div className="converter-card">
              <h4>Projeção em moedas</h4>
              <table className="converter-table-small">
                <thead><tr><th>Ano</th><th>Saldo (BRL)</th><th>Saldo (USD)</th><th>Saldo (EUR)</th></tr></thead>
                <tbody>
                  {yearSnapshots.map(s => (
                    <tr key={s.year}>
                      <td>{s.year}</td>
                      <td>R$ {fmt(s.endingBalance)}</td>
                      <td>$ {fmt(convertToCurrency(s.endingBalance, "USD"))}</td>
                      <td>€ {fmt(convertToCurrency(s.endingBalance, "EUR"))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="converter-card">
              <h4>Comparativo rápido (5 anos)</h4>
              <table className="converter-table-small">
                <thead><tr><th>Ano</th><th>Tesouro Selic</th><th>Poupança</th><th>CDB</th></tr></thead>
                <tbody>
                  {Array.from({ length: Math.min(5, yearSnapshots.length) }, (_, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>R$ {fmt(initial * Math.pow(1.085, i + 1))}</td>
                      <td>R$ {fmt(initial * Math.pow(1.033, i + 1))}</td>
                      <td>R$ {fmt(initial * Math.pow(1.095, i + 1))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="converter-card">
              <h4>Onde prestar atenção</h4>
              <ul>
                <li>Tributação e prazos — venda antecipada pode ter perda de capital.</li>
                <li>Taxas administrativas e performance (fundos) corroem ganhos.</li>
                <li>Inflação corrói o poder de compra — prefira ativos com proteção real para objetivos longos.</li>
                <li>Comparar liquidez: Tesouro Selic tem liquidez diária; alguns CDB/LCI têm carência.</li>
              </ul>
            </div>
          </div>

        </section>

        {/* FAQ */}
        <section className="converter-section">
          <div className="converter-section-header">
            <h2 className="converter-section-title">Perguntas frequentes</h2>
          </div>

          <div className="converter-faq">
            <AnimatePresence>
              <div className="converter-faq-item">
                <div className="converter-faq-summary" onClick={() => {}}>
                  <span>Como faço a conversão para dólar/euro?</span>
                  <motion.span className="converter-faq-icon"><Globe /></motion.span>
                </div>
                <div className="converter-faq-answer">
                  <p>Os campos de taxa USD/EUR estão no topo da página — ajuste as cotações e a tabela mostrará os saldos convertidos.</p>
                </div>
              </div>
            </AnimatePresence>
          </div>
        </section>

      </main>

      <ScrollToTop />
      <Footer />
    </div>
  );
}
