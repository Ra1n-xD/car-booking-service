import Link from 'next/link';

import { FaCheckCircle, FaArchive } from 'react-icons/fa';
import { format } from 'date-fns';

import useSWR from 'swr';
import { getOrders } from '@/services/getData';

interface Order {
    _id: {
        $oid: string;
    };
    status: {
        code: string;
    };
    person: {
        lastName: string;
        firstName: string;
        secondName: string;
        driverLicense: string;
        email: string;
    };
    auto: {
        brand: string;
        model: {
            id: {
                $numberInt: string;
            };
            name: string;
        };
    };
    city: {
        code: string;
        name: string;
    };
    createDate: string;
    userId: string;
}

const OrderItems = ({ userEmail }: { userEmail: any }) => {
    const { data: orders } = useSWR(`/api/orders`, () => getOrders(userEmail));
    console.log(orders);

    return (
        <div className="d-flex flex-column justify-content-start">
            {orders &&
                orders.map((order: Order, i: number) => (
                    <div key={i} className="mt-4 offset d-flex flex-cloum">
                        <FaArchive size={45} color="#0080ff" />
                        <div className="d-flex flex-column align-items-start">
                            <Link href={{ pathname: `/orders/${order._id}`, query: { index: i + 1 } }} className="order-item">
                                Заявка №{i + 1} на автомобиль {order.auto.brand} {order.auto.model.name}
                            </Link>
                            <div className="text-muted">Статус: {order.status.code}</div>
                            <div className="text-muted">Дата: {format(new Date(order.createDate), 'dd.MM.yyyy')}</div>
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
