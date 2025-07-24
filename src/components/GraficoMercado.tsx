import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const dados = [
  { name: 'Jan', valor: 100 },
  { name: 'Fev', valor: 120 },
  { name: 'Mar', valor: 115 },
  { name: 'Abr', valor: 130 },
  { name: 'Mai', valor: 125 },
  { name: 'Jun', valor: 140 },
];

export default function GraficoMercado() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={dados} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="valor" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}