import { Link } from 'react-router-dom';
import styles from './LoginPage.module.css';





const Dashboard = () => {
    return (
        <main className={styles.container}>
            <div className={styles.formSignin}>
                <form>
                    <img 
                        className="mb-4" 
                        src="" 
                        alt="lab 365"  
                        height="200" 
                    />
                    <h1 className="h3 mb-3 fw-normal">Efetuar login</h1>
                    <div className="form-floating">
                        <input 
                            type="email" 
                            className="form-control" 
                            id="floatingInput" 
                            placeholder="name@example.com" 
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input 
                            type="password" 
                            className="form-control" 
                            id="floatingPassword" 
                            placeholder="Password" 
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="form-check text-start my-3">
                        <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Remember me
                        </label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit">Entrar</button>
                    <p className="mt-5 mb-3 text-body-secondary">Viagem365 &copy; 2024</p>
                    <p>
                        Não possui cadastro? <Link to="/cadastro">Cadastra-se</Link> 
                    </p>
                </form>
            </div>
        </main>
    );
};

export default Dashboard;