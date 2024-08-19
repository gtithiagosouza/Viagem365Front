import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';
import { useState, useEffect } from 'react';

const Dashboard = () => {
    const [locais, setLocais] = useState([]);
    const [users, setUsers] = useState([]);

    async function buscarLocais() {
        try {
            const response = await fetch('http://localhost:3000/locais');
            if (response.ok) {
                const data = await response.json();
                setLocais(data);
            } else {
                console.error("Locais não encontrados");
            }
        } catch (error) {
            console.error("Erro ao localizar locais", error);
        }
    }

    async function buscarUsuarios() {
        try {
            const response = await fetch('http://localhost:3000/users');
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                console.error("Usuários não encontrados");
            }
        } catch (error) {
            console.error("Erro ao buscar usuários", error);
        }
    }

    useEffect(() => {
        buscarLocais();
        buscarUsuarios();
    }, []); 

    return (
        <div className={styles.dashboardContainer}>
            <aside className={styles.sidebar}>
                <nav>
                    <ul>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/usuarios">Usuários</Link></li>
                        <li><Link to="/locais">Locais</Link></li>
                        <li><Link to="/editdeletlocais">Listagem Locais</Link></li>
                        <li><Link to="/">Sair</Link></li>
                    </ul>
                </nav>
            </aside>
            <main className={styles.mainContent}>
                <h1>Dashboard</h1>
                <div className={styles.cards}>
                    <div className={`${styles.card} ${styles.cardPrimary}`}>
                        <h2>{users.length}</h2>
                        <p>Usuarios</p>
                    </div>
                    <div className={`${styles.card} ${styles.cardSecondary}`}>
                        <h2>{locais.length}</h2>
                        <p>Locais</p>
                    </div>
                </div>
                <section className={styles.tableContainer}>
                     <table>
                        <thead>
                            <tr>
                                <th>Últimos Locais</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locais.slice(-5).map((local, index) => (
                                <tr key={index}>
                                    <td>{local.nomeLocal}</td>
                                    <td>{local.latitude}</td>
                                    <td>{local.longitude}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;