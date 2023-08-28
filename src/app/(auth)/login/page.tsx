'use client';
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Loading from '@/components/Loading';

const Login = () => {
    const session = useSession();
    console.log(session);
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (session.status === 'loading') {
        return <Loading />;
    }

    if (session.status === 'authenticated') {
        router.push('/orders');
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        signIn('credentials', { email, password });
    };

    return (
        <div className="container mt-5 d-flex flex-column align-items-center justify-content-center">
            <h2 className="mb-4">Авторизация</h2>

            <form onSubmit={handleSubmit} className="col-8 col-lg-4">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input type="email" className="form-control" required id="email" value={email} onChange={handleEmailChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Пароль
                    </label>
                    <input type="password" className="form-control" required id="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="submit" className="btn btn-primary col-12">
                    Войти
                </button>
            </form>

            <span className="mt-3 lead"> - ИЛИ - </span>

            <button type="button" className="btn btn-outline-primary mt-3 col-8 col-lg-4" onClick={() => signIn('google')}>
                Авторизоваться через Google
            </button>

            <p className="mt-4">
                У вас еще нет аккаунта? <Link href="/register">Создать аккаунт</Link>
            </p>
        </div>
    );
};

export default Login;
