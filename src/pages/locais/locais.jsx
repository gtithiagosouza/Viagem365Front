import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CadastroLocais.module.css';

const CadastroLocais = () => {
    const [formData, setFormData] = useState({
        nomeLocal: '',
        descricaoLocal: '',
        identificadorUsuario: '',
        cep: '',
        endereco: '',
        latitude: '',
        longitude: ''
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCepBlur = async () => {
        if (formData.cep.length === 8) {
            try {
                const response = await fetch(`https://cep.awesomeapi.com.br/json/${formData.cep}`);
                const data = await response.json();
                setFormData({
                    ...formData,
                    endereco: `${data.address}, ${data.district}, ${data.city} - ${data.state}`,
                    latitude: data.lat,
                    longitude: data.lng
                });
            } catch (error) {
                console.error('Erro ao buscar o endereço:', error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simples validação
        if (!formData.nomeLocal || !formData.descricaoLocal || !formData.identificadorUsuario) {
            setErrors({ message: 'Todos os campos são obrigatórios.' });
            return;
        }

        try {
            await fetch('http://localhost:3000/locais', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            alert('Cadastro de local realizado com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar o cadastro do local:', error);
        }
    };

    return (
        <div className={styles.cadastroContainer}>
            <aside className={styles.sidebar}>
                <nav>
                    <ul>
                        <li><a href="/dashboard">Dashboard</a></li>
                        <li><a href="/usuarios">Usuários</a></li>
                        <li><a href="/locais">Locais</a></li>
                        <li><Link to="/">Sair</Link></li>
                    </ul>
                </nav>
            </aside>
            <main className={styles.mainContent}>
                <h1>Cadastro de Locais</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Nome do Local:</label>
                        <input 
                            type="text" 
                            name="nomeLocal" 
                            value={formData.nomeLocal} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Descrição do Local:</label>
                        <input 
                            type="text" 
                            name="descricaoLocal" 
                            value={formData.descricaoLocal} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Identificador do Usuário:</label>
                        <input 
                            type="text" 
                            name="identificadorUsuario" 
                            value={formData.identificadorUsuario} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>CEP:</label>
                        <input 
                            type="text" 
                            name="cep" 
                            value={formData.cep} 
                            onChange={handleInputChange} 
                            onBlur={handleCepBlur} 
                            required 
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Endereço:</label>
                        <input 
                            type="text" 
                            name="endereco" 
                            value={formData.endereco} 
                            onChange={handleInputChange} 
                            readOnly 
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Latitude:</label>
                        <input 
                            type="text" 
                            name="latitude" 
                            value={formData.latitude} 
                            onChange={handleInputChange} 
                            readOnly 
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Longitude:</label>
                        <input 
                            type="text" 
                            name="longitude" 
                            value={formData.longitude} 
                            onChange={handleInputChange} 
                            readOnly 
                        />
                    </div>
                    {errors.message && <span className={styles.error}>{errors.message}</span>}
                    <button type="submit" className={styles.submitButton}>Cadastrar Local</button>
                </form>
            </main>
        </div>
    );
};

export default CadastroLocais;
