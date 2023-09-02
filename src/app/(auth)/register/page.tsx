'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Register = () => {
    const router = useRouter();
    const [error, setError] = useState(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });
            res.status === 201 && router.push('/login?success=Account has been created');
        } catch (err: any) {
            setError(err);
            console.log(err);
        }
    };

    return (
        <div className="container mt-5 d-flex flex-column align-items-center justify-content-center">
            <h2 className="mb-4">Регистрация</h2>

            <form onSubmit={handleSubmit} className="col-8 col-lg-4">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Имя
                    </label>
                    <input type="name" className="form-control" required id="name" value={name} onChange={handleNameChange} />
                </div>

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

                <button type="submit" className="btn btn-primary col-12 mt-2">
                    Зарегистрироваться
                </button>

                {error && <div className="mb-2 text-danger">Ошибка. Проверьте данные</div>}
            </form>
        </div>
    );
};

export default Register;
