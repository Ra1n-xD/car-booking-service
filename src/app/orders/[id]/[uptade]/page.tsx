'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const UpdateOrder = ({ params }: { params: { id: string } }) => {
    const router = useRouter();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async (id: string) => {
        try {
            await fetch(`/api/orders/${id}`, {
                method: 'DELETE'
            });
            router.push('/orders');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1 className="h1 mt-4 text-center">нереальная обнова заявки #{params.id}</h1>
            <h2 className="text-center">тут будет форма обновы</h2>

            <div className="mb-4 d-flex offset justify-content-center">
                <Link href={`/orders/${params.id}`}>
                    <button className="mt-4 btn btn-primary">К заявке</button>
                </Link>

                <Button variant="danger" onClick={handleShow} className="mt-4">
                    Удалить заявку
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Удаление заявки</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Вы точно уверены, что хотите удалить заявку?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Нет
                        </Button>
                        <Button variant="danger" onClick={() => handleDelete(params.id)}>
                            Да, удалить заявку
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default UpdateOrder;
