import { format } from 'date-fns';
import { getOrder } from '@/services/getData';

import Loading from '@/components/Loading';
import Form from '@/components/Form';

const UpdateOrder = async ({ params }: { params: { id: string } }) => {
    const order = await getOrder(params.id);

    if (!order) return <Loading />;

    if (order.error) return <p className="mt-3 text-danger text-center">Ошикба загрузки данных, посетите сайт позже или перезагрузите страницу</p>;

    return (
        <div className="mt-5 d-flex flex-column align-items-center">
            <h1 className="h2 mb-1 text-center">Редактирование заявки</h1>
            <p className="mb-4 text-center">
                {order.auto.brand} {order.auto.model.name} от {format(new Date(order.createDate), 'dd.MM.yyyy')}
            </p>

            <Form order={order} orderId={params.id} task={'update'} />
        </div>
    );
};

export default UpdateOrder;
