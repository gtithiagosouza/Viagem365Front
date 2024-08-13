import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Cadastro.module.css';

const Cadastro = () => {
    const [formData, setFormData] = useState({
        nome: '',
        sexo: '',
        cpf: '',
        dataNascimento: '',
        email: '',
        password: '',
        cep: '',
        endereco: '',
        latitude: '',
        longitude: ''
    });

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

        try {
            // Verifica se o CPF ou o email já estão cadastrados
            const response = await fetch('http://localhost:3000/users');
            const users = await response.json();

            const cpfExists = users.some(user => user.cpf === formData.cpf);
            const emailExists = users.some(user => user.email === formData.email);

            if (cpfExists || emailExists) {
                alert('CPF ou Email já cadastrados.');
                return; // Impede o envio do formulário
            }

            // Se CPF e email forem únicos, prosseguir com o cadastro
            await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            alert('Cadastro realizado com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar o cadastro:', error);
        }
    };


    return (
        <div className={styles.cadastroContainer}>
            <aside className={styles.sidebar}>
                <nav>
                    <ul>
                        <li><a href="/dashboard">Dashboard</a></li>
                        <li><a href="/usuarios">Usuarios</a></li>
                        <li><a href="/locais">Locais</a></li>
                        <li><Link to="/">Sair</Link></li>
                    </ul>
                </nav>
            </aside>
            <main className={styles.mainContent}>
                <h1>Cadastro</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Nome:</label>
                        <input 
                            type="text" 
                            name="nome" 
                            value={formData.nome} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Sexo:</label>
                        <select 
                            name="sexo" 
                            value={formData.sexo} 
                            onChange={handleInputChange} 
                            required
                        >
                            <option value="">Selecione</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label>CPF:</label>
                        <input 
                            type="text" 
                            name="cpf" 
                            value={formData.cpf} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Data de Nascimento:</label>
                        <input 
                            type="date" 
                            name="dataNascimento" 
                            value={formData.dataNascimento} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>E-mail:</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Senha:</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={formData.password} 
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
                    <button type="submit" className={styles.submitButton}>Cadastrar</button>
                </form>
            </main>
        </div>
    );
};

export default Cadastro;
 