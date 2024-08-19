import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './editdeletlocais.css'

function ListaLocais() {
  const [locais, setLocais] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
       fetch('http://localhost:3000/locais')
      .then(response => response.json())
      .then(data => setLocais(data))
      .catch(error => console.error('Erro ao buscar locais:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/locais/${id}`, {
      method: 'DELETE',
    })
      .then(() => setLocais(locais.filter(local => local.id !== id)))
      .catch(error => console.error('Erro ao deletar local:', error));
  };

  const handleEdit = (id) => {
    navigate(`/locais/${id}`);
  };

  return (
    <div className="cadastroContainer">
      <div className="sidebar">
      <ul>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/usuarios">Usuários</Link></li>
                        <li><Link to="/locais">Locais</Link></li>
                        <li><Link to="/editdeletlocais">Listagem Locais</Link></li>
                        <li><Link to="/">Sair</Link></li>
                    </ul>
      </div>
      <div className="mainContent">
        <h1>Lista de Locais</h1>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {locais.map(local => (
              <tr key={local.id}>
                <td>{local.id}</td>
                <td>{local.nomeLocal}</td>
                <td>{local.endereco}</td>
                <td>
                  <button onClick={() => handleEdit(local.id)}>Editar</button>
                  <button onClick={() => handleDelete(local.id)}>Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaLocais;
