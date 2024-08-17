import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './CadastroLocais.module.css';


function CadastroLocais() {
  const { id } = useParams(); // Pega o ID da URL, se houver
  const [local, setLocal] = useState({
    nomeLocal: '',
    descricaoLocal: '',
    endereco: '',
    latitude: '',
    longitude: '',
    cep: '', // Adicionando o campo CEP
  });
  

  useEffect(() => {
    if (id) {
      // Se houver um ID na URL, estamos no modo de edição
      fetch(`http://localhost:3000/locais/${id}`)
        .then((response) => response.json())
        .then((data) => setLocal(data)) // Carrega os dados do local existente
        .catch((error) => console.error('Erro ao buscar local:', error));
    }
  }, [id]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setLocal({ ...local, [name]: value });

    if (name === 'cep' && value.length === 8) { // Verifica se o CEP tem 8 dígitos
      try {
        const response = await fetch(`https://cep.awesomeapi.com.br/json/${value}`);
        const data = await response.json();
        console.log('Dados do CEP:', data);
        setLocal({
          ...local,
          endereco: `${data.address}, ${data.district}, ${data.city} - ${data.state}`,
          latitude: data.lat,
          longitude: data.lng,
          cep: value, // Mantém o CEP atualizado
        });
      } catch (error) {
        console.error('Erro ao buscar informações do CEP:', error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST'; // Usa PUT para edição e POST para criação
    const url = id
      ? `http://localhost:3000/locais/${id}`
      : 'http://localhost:3000/locais';
  
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(local),
    })
      .then(() => {
        alert('Cadastro de local realizado com sucesso!'); // Exibe o alerta
        // Limpa o formulário após o alerta, se necessário
        setLocal({
          nome: '',
          descricao: '',
          endereco: '',
          latitude: '',
          longitude: '',
          cep: '', // Limpa o campo CEP
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
              maxLength="8" // Garante que o CEP terá no máximo 8 dígitos
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
              readOnly // Torna o campo de endereço somente leitura
            />
          </div>
          <div className="formGroup">
            <label>Latitude</label>
            <input
              type="text"
              name="latitude"
              value={local.latitude}
              onChange={handleChange}
              readOnly // Torna o campo de latitude somente leitura
            />
          </div>
          <div className="formGroup">
            <label>Longitude</label>
            <input
              type="text"
              name="longitude"
              value={local.longitude}
              onChange={handleChange}
              readOnly // Torna o campo de longitude somente leitura
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
