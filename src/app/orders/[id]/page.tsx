import Link from 'next/link';

import { FaCheckCircle } from 'react-icons/fa';
import { format } from 'date-fns';

import { getOrder } from '@/services/getData';
import { authConfig } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

export const getServerSideProps = (context: any) => {
    console.log(context.query);
    return {
        props: {
            index: context.query.index
        }
    };
};

const OrderPage = async ({ params, searchParams }: any) => {
    const currentOrder = await getOrder(params.id);
    const session = await getServerSession(authConfig);

    if (session?.user?.email !== currentOrder.userId) {
        redirect('/');
    }

    return (
        <div className="mt-5">
            <div className="mb-2 d-flex justify-content-center align-items-end offset">
                <FaCheckCircle size={50} color="#0080ff" />
                <h2>Ваша заявка №{searchParams.index}</h2>
            </div>

            <div className="lead mt-2 text-center ">
                Автомобиль: {currentOrder.auto.brand} {currentOrder.auto.model.name}
            </div>
            <div className="lead mt-2 text-center ">Статус заявки: {currentOrder.status.code}</div>
            <div className="lead mt-2 text-center">Дата заявки: {format(new Date(currentOrder.createDate), 'dd.MM.yyyy')}</div>

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
