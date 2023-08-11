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
        <div className="mt-5 text-center">
            <h2>Список заявок</h2>
            <p className="mb-3">Ваши заявки на покупку автомобилей</p>

            <div className="d-flex flex-column align-items-center">
                {userRequests.map((request) => (
                    <div key={request.id} className="mt-4 offset d-flex flex-row">
                        <FaArchive size={45} color="#0080ff" />
                        <div className="d-flex flex-column align-items-start">
                            <strong>
                                <p className="">
                                    Заявка №{request.id}: {request.car}
                                </p>
                            </strong>
                            <p className="text-muted">Автомобиль : {request.status}</p>
                            <p className="text-muted">Дата заявки: {request.date}</p>
                        </div>
                    </div>
                ))}
            </div>

            <Link href="/">
                <Button variant="primary" className="mt-4">
                    Создать заявку
                </Button>
            </Link>
        </div>
    );
};

export default Orders;
