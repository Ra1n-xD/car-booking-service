'use client';
import { FaCheckCircle } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

const Ready = () => {
    const generatedRequest = {
        car: 'Марка и модель автомобиля',
        date: new Date().getFullYear()
    };

    return (
        <div className="mt-5 text-center">
            <div className="d-flex justify-content-center align-items-center offset">
                <FaCheckCircle size={50} color="#0080ff" />
                <h2 className="">Ваша заявка готова!</h2>
            </div>
            <p className="lead mt-2">Автомобиль: {generatedRequest.car}</p>
            <p className="lead mt-2">Дата заявки: {generatedRequest.date}</p>
            <Link href="/orders">
                <Button variant="primary" className="mt-4">
                    К списку заявок
                </Button>
            </Link>
        </div>
    );
};

export default Ready;
