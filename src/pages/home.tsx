import React from 'react';
import CardResumo from '../components/CardResumo';
import GraficoMercado from '../components/GraficoMercado';

export default function Home() {
  return (
    <main className="p-6 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Bem-vindo ao Astrocash</h1>
        <p className="text-gray-600 mt-2">Resumo das suas ações e criptomoedas.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <CardResumo titulo="Ação XYZ" preco="R$ 150,00" variacao="+2,5% hoje" positivo={true} />
        <CardResumo titulo="Cripto BTC" preco="R$ 110.000,00" variacao="-0,8% hoje" positivo={false} />
        <CardResumo titulo="Ação ABC" preco="R$ 75,00" variacao="+1,2% hoje" positivo={true} />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Gráfico do Mercado</h2>
        <div className="bg-white shadow rounded-lg p-6">
            <GraficoMercado />
        </div>
        </section>
    </main>
  );
}