import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/login/login';
import Dashboard from '../pages/dashboard/dashboard'; // Ajuste o caminho conforme necessário



function App() {
  return (



    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
    </Router>
  );
}

export default App;