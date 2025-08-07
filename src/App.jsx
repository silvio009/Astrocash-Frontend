import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Coloque outras rotas aqui, por exemplo: */}
        {/* <Route path="/acoes" element={<PaginaAcoes />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
