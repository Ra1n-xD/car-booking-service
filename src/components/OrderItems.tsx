import Link from 'next/link';

import { FaCheckCircle, FaArchive, FaUndo } from 'react-icons/fa';
import { format } from 'date-fns';

import useSWR from 'swr';
import { getOrders } from '@/services/getData';

import Loading from './Loading';

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

const getStatusName = (statusCode: string) => {
    switch (statusCode) {
        case 'SUCCESS':
            return 'Успех';
        case 'PROCESSING':
            return 'В обработке';
        case 'DRAFT':
            return 'Черновик';
        default:
            return 'Неизвестный статус';
    }
};

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

const OrderItems = ({ userEmail }: { userEmail: string | unknown }) => {
    const { data: orders, isLoading } = useSWR(`orders`, () => getOrders(userEmail as string));
    console.log(orders);

    if (isLoading) {
        return <Loading />;
    }

    if (orders.length <= 0) {
        return <p className="mt-3 text-muted">СПИСОК ЗАЯВОК ПУСТ</p>;
    }

    return (
        <div className="d-flex flex-column-reverse">
            {orders &&
                orders.map((order: Order, index: number) => {
                    return (
                        <div key={index} className="mt-4 offset d-flex flex-row">
                            {getStatusLogo(order.status.code)}
                            <div className="d-flex flex-column align-items-start">
                                <Link href={`/orders/${order._id}`} className="order-item">
                                    Заявка на {order.auto.brand} {order.auto.model.name} от {format(new Date(order.createDate), 'dd.MM.yyyy')}
                                </Link>

                                <div className="text-muted">Город: {order.city.name}</div>
                                <div className="text-muted">Статус: {getStatusName(order.status.code)}</div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default OrderItems;
