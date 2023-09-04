'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Loading from '@/components/Loading';
import OrderItems from '@/components/OrderItems';
import Link from 'next/link';

const Orders = () => {
    const router = useRouter();
    const session = useSession();
    const userEmail = session.data?.user?.email;

    console.log(session);

    if (session.status === 'loading') {
        return <Loading />;
    }

    if (session.status === 'unauthenticated') {
        router.push('/login');
    }

    return (
        <div className="mt-5 d-flex flex-column align-items-center">
            <h1 className="mb-1 text-center">Список заявок</h1>
            <p className="mb-2 text-center">Заявки пользователя {userEmail}</p>

            <OrderItems userEmail={session.data?.user?.email} />

            <Link href="/">
                <button type="button" className="mt-4 btn btn-primary">
                    Создать заявку
                </button>
            </Link>
        </div>
    );
};

export default Orders;
