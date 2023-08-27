'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="container mt-5 d-flex flex-column align-items-center justify-content-center">
            <h2 className="mb-4">Авторизация</h2>

            <form onSubmit={handleSubmit} className="col-8 col-lg-4">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input type="email" className="form-control" id="email" value={email} onChange={handleEmailChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Пароль
                    </label>
                    <input type="password" className="form-control" id="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="submit" className="btn btn-primary col-12">
                    Войти
                </button>
            </form>

            <span className="mt-3 lead"> - ИЛИ - </span>

            <button type="button" className="btn btn-outline-primary mt-3 col-8 col-lg-4" onClick={() => signIn('google')}>
                Авторизоваться через Google
            </button>
        </div>
    );
};

export default Login;
