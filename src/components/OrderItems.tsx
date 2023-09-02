import Link from 'next/link';

import { FaCheckCircle, FaArchive } from 'react-icons/fa';
import { format } from 'date-fns';

import { getOrders } from '@/services/getData';

const OrderItems = async ({ userEmail }: { userEmail: string | null | undefined }) => {
    const orders = await getOrders(userEmail);

    return (
        <div className="d-flex flex-column justify-content-start">
            {orders.map((order: any, i: number) => (
                <div key={i} className="mt-4 offset d-flex flex-cloum">
                    <FaArchive size={45} color="#0080ff" />
                    <div className="d-flex flex-column align-items-start">
                        <Link href={`/orders/${order._id}`} className="order-item">
                            Заявка №{i + 1} на автомобиль {order.auto.brand} {order.auto.model.name}
                        </Link>
                        <p className="text-muted">Статус: {order.status.code}</p>
                        <p className="text-muted">Дата: {format(new Date(order.createDate), 'dd.MM.yyyy')}</p>
                    </div>
                </div>
            ))}

            <Link href="/">
                <button type="submit" className="mt-4 btn btn-primary">
                    Создать заявку
                </button>
            </Link>
        </div>
    );
};

export default OrderItems;
