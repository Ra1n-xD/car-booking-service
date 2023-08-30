import { FaCheckCircle } from 'react-icons/fa';
import { format } from 'date-fns';

import Link from 'next/link';

async function getOrder(id: string) {
    const orders = await fetch(`http://localhost:3000/api/orders/${id}`, { method: 'GET' });

    if (!orders.ok) {
        throw new Error('Failed to fetch data');
    }

    return orders.json();
}

const OrderPage = async ({ params }: { params: { id: string } }) => {
    const order = await getOrder(params.id);
    console.log(order);

    const generatedRequest = {
        car: 'Марка и модель автомобиля',
        date: new Date().getFullYear()
    };

    return (
        <div className="mt-5">
            <div className="mb-3 d-flex justify-content-center align-items-center offset">
                <FaCheckCircle size={50} color="#0080ff" />
                <h2>Ваша заявка #{params.id} готова!</h2>
            </div>

            <p className="lead mt-2 text-center">
                Автомобиль: {order.auto.brand} {order.auto.model.name}
            </p>
            <p className="lead mt-2 text-center">Дата заявки: {format(new Date(order.createDate), 'dd.MM.yyyy')}</p>

            <div className="mb-4 d-flex offset justify-content-center">
                <Link href="/orders">
                    <button type="submit" className="mt-4 btn btn-primary">
                        К списку заявок
                    </button>
                </Link>

                <Link href={`/orders/${params.id}/update`}>
                    <button type="submit" className="mt-4 btn btn-success">
                        Редактировать заявку
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default OrderPage;
