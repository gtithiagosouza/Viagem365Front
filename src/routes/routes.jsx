import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/login/login';
import Dashboard from '../pages/dashboard/dashboard'; // Ajuste o caminho conforme necessário
import Cadastro from '../pages/cadastro/cadastro';



function App() {
  return (



    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Usuarios" element={<Cadastro />} />
        </Routes>
    </Router>
  );
}

export default App;