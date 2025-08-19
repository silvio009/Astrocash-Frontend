import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import RendaFixa from "./pages/RendaFixa/RendaFixa";
import TesouroDireto from './pages/TesouroDireto/TesouroDireto';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/renda_fixa" element={<RendaFixa />} />
        <Route path="/tesouro_direto" element={<TesouroDireto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
