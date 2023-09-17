'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, redirect } from 'next/navigation';
import Link from 'next/link';

import useSWR from 'swr';
import { getAutos, getCities } from '@/services/getData';

import { useFormik } from 'formik';
import { validationSchema, initialValues } from '@/utils/validationForm';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import InputField from './InputField';
import SelectCities from './SelectCities';
import CheckboxField from './CheckboxField';
import SelectAutos from './SelectAutos';
import Loading from './Loading';

const Form = ({ order, task, orderId }: any) => {
    const { data: autos } = useSWR(`autos`, () => getAutos());
    const { data: cities } = useSWR(`cities`, () => getCities());

    const router = useRouter();

    const session = useSession();
    const authorized = session.status === 'authenticated';
    const isLoading = session.status === 'loading';

    console.log(session);
    // console.log(autos, cities);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    const handleShowDeleteModal = () => setShowDeleteModal(true);

    const [submitStatus, setSubmitStatus] = useState('DRAFT');

    const formik = useFormik({
        initialValues: initialValues(order),
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const orderData = {
                status: { code: submitStatus },
                person: {
                    lastName: values.lastName,
                    firstName: values.firstName,
                    secondName: values.secondName,
                    email: values.email,
                    driverLicense: values.driverLicense
                },
                auto: {
                    brand: values.carBrand,
                    model: {
                        id: values.carModelId,
                        name: values.carModel
                    }
                },
                city: {
                    code: values.cityCode,
                    name: values.cityName
                },
                userId: session.data?.user?.email,
                createDate: new Date().toISOString()
            };

            console.log(orderData);

            setSubmitStatus('DRAFT');

            if (task === 'create') {
                const addOrder = await fetch('/api/orders', {
                    method: 'POST',
                    body: JSON.stringify(orderData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const newOrder = await addOrder.json();

                router.push(`/orders/${newOrder._id}`);
            } else if (task === 'update') {
                const updateOrder = await fetch(`/api/orders/${orderId}`, {
                    method: 'PUT',
                    body: JSON.stringify(orderData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const updatedOrder = await updateOrder.json();
                console.log(updatedOrder); // ну ошибка тут хули

                router.refresh();
                router.push(`/orders/${orderId}`);
            }
        }
    });

    if (isLoading) {
        return <Loading />;
    }

    const handleDriverLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value.replace(/\D/g, '');
        if (input.length > 10) {
            input = input.substr(0, 10);
        }

        const formattedInput = input.replace(/(\d{4})(\d{0,6})/, '$1 $2');
        formik.setFieldValue('driverLicense', formattedInput);
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        formik.handleSubmit();
    };

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

    let formButtons = null;
    if (task === 'create') {
        formButtons = (
            <div className="mb-4 d-flex offset flex-column flex-md-row w-100 justify-content-start">
                <button type="submit" className="btn btn-primary" onClick={() => setSubmitStatus('DRAFT')}>
                    Сохранить
                </button>
                <button type="submit" className="btn btn-success" onClick={() => setSubmitStatus('PROCESSING')}>
                    Отправить заявку
                </button>
            </div>
        );
    } else if (task === 'update') {
        formButtons = (
            <div className="mb-4 d-flex justify-content-start">
                <div className="d-flex flex-column flex-md-row w-100 offset">
                    <Link className="btn btn-primary" href={`/orders/${orderId}`}>
                        К заявке
                    </Link>
                    <button type="submit" className="btn btn-success">
                        Обновить данные
                    </button>
                    <button type="button" className="btn btn-danger" onClick={handleShowDeleteModal}>
                        Удалить заявку
                    </button>
                </div>

                <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Удаление заявки</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Вы точно уверены, что хотите удалить заявку?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDeleteModal}>
                            Нет
                        </Button>

                        <Button variant="danger" onClick={() => handleDelete(orderId)}>
                            Да, удалить заявку
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="col-11 col-lg-8 col-xl-6">
            <InputField field={formik.getFieldProps('lastName')} form={formik} placeholder="Фамилия" isEdited={!authorized} />
            <InputField field={formik.getFieldProps('firstName')} form={formik} placeholder="Имя" isEdited={!authorized} />
            <InputField field={formik.getFieldProps('secondName')} form={formik} placeholder="Отчество" isEdited={!authorized} isRequired={false} />
            <InputField field={formik.getFieldProps('email')} form={formik} placeholder="Email" isEdited={!authorized} />

            <div className="row">
                <div className="col-md-6" onChange={handleDriverLicenseChange}>
                    <InputField field={formik.getFieldProps('driverLicense')} form={formik} placeholder="Водительское удостоверение" isEdited={!authorized} />
                </div>
                <SelectCities fieldCode={formik.getFieldProps('cityCode')} form={formik} cities={cities} isEdited={!authorized} />
            </div>

            <div className="row">
                <SelectAutos
                    fieldBrand={formik.getFieldProps('carBrand')}
                    fieldModel={formik.getFieldProps('carModel')}
                    fieldModelId={formik.getFieldProps('carModelId')}
                    form={formik}
                    autos={autos}
                    isEdited={!authorized}
                />
            </div>

            <CheckboxField field={formik.getFieldProps('agreement')} form={formik} label="Согласие на обработку персональных данных" isEdited={!authorized} />

            {authorized ? formButtons : <div className="mb-4 text-danger text-center h6">Чтобы оставить заявку необходимо быть авторизованным</div>}
        </form>
    );
};

export default Form;
