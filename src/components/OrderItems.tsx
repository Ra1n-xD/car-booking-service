import Link from 'next/link';
import { format } from 'date-fns';
import { getStatusName, getStatusLogo } from '@/utils/statusFormat';

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

const OrderItems = ({ userEmail }: { userEmail: string | unknown }) => {
    const { data: orders, isLoading, error } = useSWR(`orders`, () => getOrders(userEmail as string));
    console.log(orders);

    if (isLoading || !orders) return <Loading />;

    if (error) return <p className="mt-3 text-danger text-center">Ошикба загрузки данных, посетите сайт позже или перезагрузите страницу</p>;

    if (orders.length <= 0) return <p className="mt-3 text-muted">СПИСОК ЗАЯВОК ПУСТ</p>;

    return (
        <div className="d-flex flex-column-reverse">
            {orders.map((order: Order, index: number) => {
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
