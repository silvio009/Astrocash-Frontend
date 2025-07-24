import React from 'react';

interface CardResumoProps {
  titulo: string;
  preco: string;
  variacao: string;
  positivo?: boolean; // para colorir verde ou vermelho
}

export default function CardResumo({ titulo, preco, variacao, positivo = true }: CardResumoProps) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold">{titulo}</h2>
      <p className={`text-2xl font-bold ${positivo ? 'text-green-600' : 'text-red-600'}`}>{preco}</p>
      <p className="text-sm text-gray-500">{variacao}</p>
    </div>
  );
}