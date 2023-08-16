'use client';
import { FaCheckCircle, FaArchive } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

const Orders = () => {
    const userRequests = [
        { id: 1, car: 'Марка и модель авто 1', status: 'Успех', date: '2023-08-10' },
        { id: 2, car: 'Марка и модель авто 2', status: 'Успех', date: '2023-08-09' }
    ];

    return (
        <div className="mt-5 d-flex flex-column align-items-center">
            <h1 className="mb-1 text-center">Список заявок</h1>
            <p className="mb-3 text-center">Ваши заявки на покупку автомобилей</p>

            {userRequests.map((request) => (
                <div key={request.id} className="mt-4 offset d-flex colum">
                    <FaArchive size={45} color="#0080ff" />
                    <div className="d-flex flex-column align-items-start">
                        <Link href={`/orders/${request.id}`} className="navigation-item">
                            <strong>
                                Заявка №{request.id}: {request.car}
                            </strong>
                        </Link>

                        <p className="text-muted">Автомобиль : {request.status}</p>
                        <p className="text-muted">Дата заявки: {request.date}</p>
                    </div>
                </div>
            ))}

            <Link href="/">
                <Button variant="primary" className="mt-4">
                    Создать заявку
                </Button>
            </Link>
        </div>
    );
};

export default Orders;
