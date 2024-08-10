import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    // Dados simulados
    const locais = [
        { id: 1, nome: 'Local 1' },
        { id: 2, nome: 'Local 2' },
        { id: 3, nome: 'Local 3' },
        { id: 4, nome: 'Local 4' },
        { id: 5, nome: 'Local 5' },
    ];

    const quantidadeUsuarios = 150; // Número simulado
    const quantidadeLocais = 25; // Número simulado

    return (
        <div className={styles.dashboardContainer}>
            <aside className={styles.sidebar}>
                <nav>
                    <ul>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/usuarios">Usuarios</Link></li>
                        <li><Link to="/locais">Locais</Link></li>
                    </ul>
                </nav>
            </aside>
            <main className={styles.mainContent}>
                <h1>Dashboard</h1>
                <div className={styles.cards}>
                    <div className={`${styles.card} ${styles.cardPrimary}`}>
                        <h2>{quantidadeUsuarios}</h2>
                        <p>Usuarios</p>
                    </div>
                    <div className={`${styles.card} ${styles.cardSecondary}`}>
                        <h2>{quantidadeLocais}</h2>
                        <p>Locais</p>
                    </div>
                </div>
                <section className={styles.lastLocais}>
                    <h2>Últimos 5 Locais</h2>
                    <ul>
                        {locais.map(local => (
                            <li key={local.id}>{local.nome}</li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;