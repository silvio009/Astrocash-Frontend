import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext";

import './App.css';
import Home from './pages/Home';
import RendaFixa from "./pages/RendaFixa/RendaFixa";
import TesouroDireto from './pages/TesouroDireto/TesouroDireto';
import Cadastro from "./pages/Cadastro/Cadastro";
import Login from './pages/Login/login';
import BolsaAmericana from './pages/BolsaAmerica/BolsaAmericana';
import AcoesETFs from './pages/AcoesEtfs/AcoesEtfs';
import ReservaEmergencia from './pages/ReservaEmergencial/ReservaEmergencia';
import FundosImobiliarios from './pages/FundosImobiliarios/fundosImobiliarios'; 

import Header from './Components/Header/Header';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />  

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/renda_fixa" element={<RendaFixa />} />
          <Route path="/tesouro_direto" element={<TesouroDireto />} />
          <Route path="/Cadastrar-se" element={<Cadastro />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/acoes_eua" element={<BolsaAmericana />} />
          <Route path="/acoes_etfs" element={<AcoesETFs />} />
          <Route path="/reserva_emergencia" element={<ReservaEmergencia />} />
          <Route path="/fundos_imobiliarios" element={<FundosImobiliarios />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
