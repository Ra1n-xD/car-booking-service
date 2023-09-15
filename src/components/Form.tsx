'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { useFormik } from 'formik';
import { validationSchema, initialValues } from '@/utils/validationForm';

import InputField from './InputField';
import SelectCities from './SelectCities';
import CheckboxField from './CheckboxField';
import SelectAutos from './SelectAutos';
import Loading from './Loading';

type Auto = {
    _id: string;
    brand: string;
    models: object[];
};

type City = {
    _id: string;
    code: string;
    name: string;
};

interface FormProps {
    autos: Auto[];
    cities: City[];
}

const Form = ({ autos, cities }: FormProps) => {
    const router = useRouter();

    const session = useSession();
    const authorized = session.status === 'authenticated';
    const isLoading = session.status === 'loading';

    console.log(session);
    // console.log(autos, cities);

    const [submitStatus, setSubmitStatus] = useState<null | string>(null);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values);

            const orderData = {
                status: { code: submitStatus },
                person: {
                    lastName: formik.values.lastName,
                    firstName: formik.values.firstName,
                    middleName: formik.values.middleName,
                    email: formik.values.email,
                    driverLicense: formik.values.driverLicense
                },
                auto: {
                    brand: formik.values.carBrand,
                    model: {
                        id: formik.values.carModelId,
                        name: formik.values.carModel
                    }
                },
                city: {
                    code: formik.values.cityCode,
                    name: formik.values.cityName
                },
                userId: session.data?.user?.email,
                createDate: new Date().toISOString()
            };

            const addOrder = await fetch('/api/orders', {
                method: 'POST',
                body: JSON.stringify(orderData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const newOrder = await addOrder.json();

            setSubmitStatus(null);

            router.push(`/orders/${newOrder._id}`);
        }
    });

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

    if (isLoading) {
        return <Loading />;
    }

    return (
        <form onSubmit={handleSubmit} className="col-11 col-lg-8 col-xl-6">
            <InputField field={formik.getFieldProps('lastName')} form={formik} placeholder="Фамилия" isEdited={!authorized} />
            <InputField field={formik.getFieldProps('firstName')} form={formik} placeholder="Имя" isEdited={!authorized} />
            <InputField field={formik.getFieldProps('middleName')} form={formik} placeholder="Отчество" isEdited={!authorized} isRequired={false} />
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

            {authorized ? (
                <div className="mb-4 d-flex offset justify-content-start">
                    <button type="submit" className="btn btn-primary" onClick={() => setSubmitStatus('DRAFT')}>
                        Сохранить
                    </button>
                    <button type="submit" className="btn btn-success" onClick={() => setSubmitStatus('PROCESSING')}>
                        Отправить заявку
                    </button>
                </div>
            ) : (
                <div className="mb-4 text-danger text-center h6">Чтобы оставить заявку необходимо быть авторизованным</div>
            )}
        </form>
    );
};

export default Form;
