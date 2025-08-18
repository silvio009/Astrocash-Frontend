import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import RendaFixa from "./pages/RendaFixa/RendaFixa";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/renda_fixa" element={<RendaFixa />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
