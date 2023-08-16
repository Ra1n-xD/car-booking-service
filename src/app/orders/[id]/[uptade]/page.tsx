'use client';

import Link from 'next/link';
import { Button } from 'react-bootstrap';

const UpdateOrder = ({ params }: { params: { id: string } }) => {
    return (
        <div>
            <h1 className="h1 mt-4 text-center">нереальная обнова заявки #{params.id}</h1>
            <h2 className="text-center">тут будет форма обновы</h2>

            <div className="mb-4 d-flex offset justify-content-center">
                <Link href={`/orders/${params.id}`}>
                    <Button variant="primary" className="mt-4">
                        К заявке
                    </Button>
                </Link>

                <Link href="/">
                    <Button variant="danger" className="mt-4">
                        Удалить заявку
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default UpdateOrder;
