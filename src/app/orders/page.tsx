'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

import Loading from '@/components/Loading';
import OrderItems from '@/components/OrderItems';

const Orders = () => {
    const session = useSession();
    console.log(session);

    if (session.status === 'loading') {
        return <Loading />;
    }

    if (session.status === 'unauthenticated') {
        redirect('/login');
    }

    return (
        <div className="mt-5 d-flex flex-column align-items-center">
            <h1 className="mb-1 text-center">Список заявок</h1>
            <p className="mb-3 text-center">Ваши заявки на покупку автомобилей</p>

            <OrderItems userEmail={session.data?.user?.email} />
        </div>
    );
};

export default Orders;
