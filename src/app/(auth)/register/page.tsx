'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Register = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');

        if (!email || !password) {
            setError('Введите данные');
            return;
        }

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (res.status === 201) {
                setError(null);
                router.push('/login?success=Account has been created');
            } else {
                setError('Данная почта уже зарегистрирована');
            }
        } catch (err: any) {
            throw new Error(err);
        }
    };

    return (
        <div className="container mt-5 d-flex flex-column align-items-center justify-content-center">
            <h2 className="mb-4">Регистрация</h2>

            <form onSubmit={handleSubmit} className="col-12 col-md-8 col-lg-6 col-xl-5">
                <input type="email" name="email" className={`mb-4 form-control ${error ? 'is-invalid' : ''}`} placeholder="Email" />
                <input type="password" name="password" className={`mb-3 form-control ${error ? 'is-invalid' : ''}`} placeholder="Пароль" />

                {error && <div className="mb-2 text-danger">{error}</div>}

                <button type="submit" className="btn btn-primary col-12 mt-2">
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
};

export default Register;
