'use client';
import { FaCheckCircle } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

const Ready = ({ params }: { params: { id: string } }) => {
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

            <p className="lead mt-2 text-center">Автомобиль: {generatedRequest.car}</p>
            <p className="lead mt-2 text-center">Дата заявки: {generatedRequest.date}</p>

            <div className="mb-4 d-flex offset justify-content-center">
                <Link href="/orders">
                    <Button variant="primary" className="mt-4">
                        К списку заявок
                    </Button>
                </Link>

                <Link href={`/orders/${params.id}/update`}>
                    <Button variant="success" className="mt-4">
                        Редактировать заявку
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Ready;
