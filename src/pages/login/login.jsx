import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    async function onSubmit(dados) {
        try {
            const response = await fetch('http://localhost:3000/users');
            const data = await response.json();
            const user = data.find(user => user.email === dados.email && user.password === dados.password);

            if (user) {
                navigate('/dashboard');
            } else {
                throw new Error("Email/Senha inválidos");
            }
        } catch (error) {
            console.error("Erro na autenticação:", error.message);
            alert(error.message);
        }
    }

    return (
        <main className={styles.container}>
            <div className={styles.formSignin}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <img 
                        className="mb-4" 
                        src="https://abracomex.org/wp-content/uploads/2017/07/n120140312143408.jpg" 
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
                            {...register("email", { 
                                required: {
                                    value: true,
                                    message: "Esse campo é obrigatório"
                                },
                            })}
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    {errors.email && <span className='text-danger text-sm'>{errors.email.message}</span>}
                    <div className="form-floating">
                        <input 
                            type="password" 
                            className="form-control" 
                            id="floatingPassword" 
                            placeholder="Password" 
                            {...register("password", { 
                                required: {
                                    value: true,
                                    message: "Esse campo é obrigatório"
                                },
                            })}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="form-check text-start my-3">
                        <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Remember me
                        </label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Carregando...': 'Entrar'}</button>
                    <p className="mt-5 mb-3 text-body-secondary">Viagem365 &copy; 2024</p>
                    <p>
                        Não possui cadastro? <Link to="/cadastro">Cadastra-se</Link> 
                    </p>
                </form>
            </div>
        </main>
    );
};

export default LoginPage;