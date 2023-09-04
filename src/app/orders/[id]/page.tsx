import { getOrder } from '@/services/getData';
import { authConfig } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

import { FaCheckCircle, FaArchive, FaUndo } from 'react-icons/fa';

import OrderDetails from '@/components/OrderDetails';

const getStatusLogo = (statusCode: string) => {
    switch (statusCode) {
        case 'PROCESSING':
            return <FaUndo size={40} color="#0080ff" className="spinner m-1" />;
        case 'SUCCESS':
            return <FaCheckCircle size={40} color="#0080ff" className="m-1" />;
        case 'DRAFT':
            return <FaArchive size={40} color="#0080ff" className="m-1" />;
        default:
            return null;
    }
};

const OrderPage = async ({ params }: { params: { id: string } }) => {
    const order = await getOrder(params.id);
    const session = await getServerSession(authConfig);

    if (session?.user?.email !== order.userId) {
        redirect('/login');
    }

    return <OrderDetails id={params.id} order={order} statusIcon={getStatusLogo(order.status.code)} />;
};

export default OrderPage;
