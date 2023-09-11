'use client';
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

import Loading from '@/components/Loading';

const Login = () => {
    const isNewUser = useSearchParams().get('success');

    const router = useRouter();
    const session = useSession();
    console.log(session);

    const [error, setError] = useState(false);

    if (session.status === 'loading') {
        return <Loading />;
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const res = await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false
        });
        console.log(res);

        if (res && !res.error) {
            setError(false);
            router.push('/orders');
        } else {
            setError(true);
        }
    };

    return (
        <div className="container mt-5 d-flex flex-column align-items-center justify-content-center">
            <h2 className="mb-4">Авторизация</h2>
            {isNewUser && <span className="mb-3 text-success text-center">Вы зарегистрировались, теперь можете войти в аккаунт</span>}

            <form onSubmit={handleSubmit} className="mb-2 col-12 col-md-8 col-lg-6 col-xl-5">
                <input type="email" name="email" className={`mb-4 form-control ${error ? 'is-invalid' : ''}`} placeholder="Email" required />
                <input type="password" name="password" className={`mb-3 form-control ${error ? 'is-invalid' : ''}`} placeholder="Пароль" required />

                {error && <div className="mb-3 text-danger">Неправильная почта или пароль</div>}

                <button type="submit" className="btn btn-primary col-12">
                    Войти
                </button>
            </form>

            <span className="mb-2 lead text-center"> - ИЛИ - </span>

            <button type="button" className="mb-3 btn btn-outline-primary col-12 col-md-8 col-lg-6 col-xl-5" onClick={() => signIn('google')}>
                Авторизоваться через Google
            </button>

            <span className="text-center">
                У вас еще нет аккаунта? <Link href="/register">Создать аккаунт</Link>
            </span>
        </div>
    );
};

export default Login;
