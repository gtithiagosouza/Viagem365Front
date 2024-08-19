import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './CadastroLocais.module.css';


function CadastroLocais() {
  const { id } = useParams(); 
  const [local, setLocal] = useState({
    nomeLocal: '',
    descricaoLocal: '',
    endereco: '',
    latitude: '',
    longitude: '',
    cep: '',
  });
  

  useEffect(() => {
    if (id) {
        fetch(`http://localhost:3000/locais/${id}`)
        .then((response) => response.json())
        .then((data) => setLocal(data)) 
        .catch((error) => console.error('Erro ao buscar local:', error));
    }
  }, [id]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setLocal({ ...local, [name]: value });

    if (name === 'cep' && value.length === 8) { 
      try {
        const response = await fetch(`https://cep.awesomeapi.com.br/json/${value}`);
        const data = await response.json();
        console.log('Dados do CEP:', data);
        setLocal({
          ...local,
          endereco: `${data.address}, ${data.district}, ${data.city} - ${data.state}`,
          latitude: data.lat,
          longitude: data.lng,
          cep: value, 
        });
      } catch (error) {
        console.error('Erro ao buscar informações do CEP:', error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST'; 
    const url = id
      ? `http://localhost:3000/locais/${id}`
      : 'http://localhost:3000/locais';
  
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(local),
    })
      .then(() => {
        alert('Cadastro de local realizado com sucesso!')
        
        setLocal({
          nome: '',
          descricao: '',
          endereco: '',
          latitude: '',
          longitude: '',
          cep: '', 
        });
      })
      .catch((error) => console.error('Erro ao salvar local:', error));
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
        <h1>{id ? 'Editar Local' : 'Cadastrar Novo Local'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label>Nome do Local</label>
            <input
              type="text"
              name="nomeLocal"
              value={local.nomeLocal}
              onChange={handleChange}
              required
            />
          </div>
          <div className="formGroup">
            <label>Descrição do Local</label>
            <textarea
              name="descricaoLocal"
              value={local.descricaoLocal}
              onChange={handleChange}
              required
            />
          </div>
          <div className="formGroup">
            <label>CEP</label>
            <input
              type="text"
              name="cep"
              value={local.cep}
              onChange={handleChange}
              required
              maxLength="8" 
            />
          </div>
          <div className="formGroup">
            <label>Endereço</label>
            <input
              type="text"
              name="endereco"
              value={local.endereco}
              onChange={handleChange}
              required
              readOnly 
            />
          </div>
          <div className="formGroup">
            <label>Latitude</label>
            <input
              type="text"
              name="latitude"
              value={local.latitude}
              onChange={handleChange}
              readOnly 
            />
          </div>
          <div className="formGroup">
            <label>Longitude</label>
            <input
              type="text"
              name="longitude"
              value={local.longitude}
              onChange={handleChange}
              readOnly 
            />
          </div>
          <button type="submit" className="submitButton">
            {id ? 'Salvar Alterações' : 'Cadastrar Local'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CadastroLocais;
