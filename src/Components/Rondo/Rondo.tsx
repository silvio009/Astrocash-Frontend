import React, { useState } from "react";
import "./Rondo.css";
import { useNavigate } from "react-router-dom";

const Rondo: React.FC = () => {
  const navigate = useNavigate();

  const [valor, setValor] = useState<string>(""); 
  const [anos, setAnos] = useState<string>("");  
  const [tipo, setTipo] = useState<string>("")
  const [resultado, setResultado] = useState<number | null>(null);

    const taxas: Record<string, number> = {
    tesouro: 0.13,        // Tesouro Direto Selic ~13% a.a.
    poupanca: 0.065,      // Poupança ~6,5% a.a.
    cdb: 0.085,           // CDB Conservador ~8,5% a.a.
    lci: 0.07,            // LCI ~7% a.a.
    lca: 0.07,            // LCA ~7% a.a.
    fundoDI: 0.08,        // Fundos DI ~8% a.a.
    fundoRF: 0.07,        // Fundos de Renda Fixa ~7% a.a.
    debenture: 0.09,      // Debêntures Incentivadas ~9% a.a.
    previdencia: 0.06,    // Previdência Privada Conservadora ~6% a.a.
    rdc: 0.065            // RDC ~6,5% a.a.
    };

  const handleValorFocus = () => {
    setValor(valor.replace(/^R\$\s?/, ""));
  };

  const handleAnosFocus = () => {
    setAnos(anos.replace(/\sanos$/, ""));
  };

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^0-9.,]/g, ""); 
    setValor(input);
  };

  const handleAnosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^0-9]/g, ""); 
    setAnos(input);
  };

  const handleValorBlur = () => {
    if (valor) {
      let num = Number(valor.replace(",", "."));
      setValor(`R$ ${num.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
    }
  };

  const handleAnosBlur = () => {
    if (anos) {
      setAnos(`${anos} anos`);
    }
  };
    const calcular = () => {
    const mensal = Number(
        valor.replace(/[R$\s]/g, "").replace(/\./g, "").replace(",", ".")
    );

    const anosNum = Number(anos.replace(/\s?anos/i, ""));

    if (!mensal || mensal <= 0 || !anosNum || anosNum <= 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const taxaAnual = taxas[tipo] ?? 0;
    const i = taxaAnual / 12;       
    const n = anosNum * 12;          
    let valorFinal: number;
    if (i === 0) {
        valorFinal = mensal * n;
    } else {
        valorFinal = mensal * ((Math.pow(1 + i, n) - 1) / i);
    }

    setResultado(valorFinal);
    };

  return (
    <div className="rondo-container">
      <h2>Simule seu Investimento</h2>

      <div className="rondo-form">
        <input
          type="text"
          placeholder="Valor mensal investido (R$)"
          value={valor}
          onFocus={handleValorFocus}
          onBlur={handleValorBlur}
          onChange={handleValorChange}
        />

        <input
          type="text"
          placeholder="Tempo (anos)"
          value={anos}
          onFocus={handleAnosFocus}
          onBlur={handleAnosBlur}
          onChange={handleAnosChange}
        />

        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="" disabled selected>Escolha o seu investimento</option>
            <option value="tesouro">Tesouro Direto</option>
            <option value="poupanca">Poupança</option>
            <option value="cdb">CDB</option>
            <option value="lci">LCI</option>
            <option value="lca">LCA</option>
            <option value="fundoDI">Fundos DI</option>
            <option value="fundoRF">Fundos de Renda Fixa</option>
            <option value="debenture">Debêntures Incentivadas</option>
            <option value="previdencia">Previdência Privada Conservadora</option>
            <option value="rdc">RDC</option>
        </select>

        <button className="btn-calcular" onClick={calcular}>
          Calcular
        </button>
      </div>

      {resultado !== null && (
        <div className="rondo-resultado fade-in">
          <p>Em {anos}, você terá aproximadamente:</p>
          <h3>
            {resultado.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
            })}
          </h3>
        </div>
      )}
    </div>
  );
};

export default Rondo;
