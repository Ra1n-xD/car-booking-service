import Link from 'next/link';
import { format } from 'date-fns';

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

const OrderDetails = ({ id, order, statusIcon }: any) => {
    return (
        <div className="mt-5 d-flex flex-column align-items-center">
            <div className="mb-3 d-flex flex-row offset align-items-end">
                {statusIcon}
                <h1 className="h2">
                    Заявка на {order.auto.brand} {order.auto.model.name}
                </h1>
            </div>

            <div className="mb-2 d-flex flex-column justify-content-start align-items-start">
                <p className="lead">
                    Заказчик: {order.person.lastName} {order.person.firstName} {order.person.secondName}
                </p>
                <p className="lead">Email: {order.person.email}</p>
                <p className="lead">Удостоверение: {order.person.driverLicense}</p>
                <p className="lead">Статус заявки: {getStatusName(order.status.code)}</p>
                <p className="lead">Город: {order.city.name}</p>
                <p className="lead">Дата заявки: {format(new Date(order.createDate), 'dd.MM.yyyy')}</p>
            </div>

            <div className="mb-2 d-flex offset justify-content-center">
                <Link href="/orders" className="mt-4 btn btn-primary">
                    К списку заявок
                </Link>

                <Link href={`/orders/${id}/update`} className="mt-4 btn btn-success">
                    Редактировать заявку
                </Link>
            </div>
        </div>
    );
};

export default OrderDetails;
