'use client';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { useFormik } from 'formik';
import * as yup from 'yup';

import InputField from './InputField';
import SelectCities from './SelectCities';
import CheckboxField from './CheckboxField';
import SelectAutos from './SelectAutos';

interface Auto {
    _id: string;
    brand: string;
    models: object[];
}

interface City {
    _id: string;
    code: string;
    name: string;
}

const Form = ({ autos, cities }: { autos: Auto[]; cities: City[] }) => {
    const session = useSession();
    // console.log(autos);

    const validationSchema = yup.object({
        lastName: yup
            .string()
            .required('Обязательное поле')
            .matches(/^[А-Яа-я]+$/, 'Только кириллица'),
        firstName: yup
            .string()
            .required('Обязательное поле')
            .matches(/^[А-Яа-я]+$/, 'Только кириллица'),
        middleName: yup.string().matches(/^[А-Яа-я]+$/, 'Только кириллица'),
        email: yup.string().email('Некорректный email').required('Обязательное поле'),
        driverLicense: yup
            .string()
            .matches(/^\d{4}\s\d{6}$/, 'Формат: 9999 999999')
            .required('Обязательное поле'),
        city: yup.string().required('Обязательное поле'),
        carBrand: yup.string().required('Обязательное поле'),
        carModel: yup.string().required('Обязательное поле'),
        agreement: yup.boolean().oneOf([true], 'Необходимо согласие на обработку данных').required('Необходимо согласие на обработку данных')
    });

    const formik = useFormik({
        initialValues: {
            lastName: '',
            firstName: '',
            middleName: '',
            email: '',
            driverLicense: '',
            city: '',
            carBrand: '',
            carModel: '',
            agreement: false
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        formik.handleSubmit();
    };

    return (
        <form onSubmit={handleSubmit} className="col-11 col-lg-8 col-xl-6">
            <InputField field={formik.getFieldProps('lastName')} form={formik} placeholder="Фамилия" />
            <InputField field={formik.getFieldProps('firstName')} form={formik} placeholder="Имя" />
            <InputField field={formik.getFieldProps('middleName')} form={formik} placeholder="Отчество" />
            <InputField field={formik.getFieldProps('email')} form={formik} placeholder="Email" />

            <div className="row">
                <div className="col-md-6" onChange={handleDriverLicenseChange}>
                    <InputField field={formik.getFieldProps('driverLicense')} form={formik} placeholder="Водительское удостоверение" />
                </div>
                <SelectCities field={formik.getFieldProps('city')} form={formik} cities={cities} />
            </div>

            <div className="row">
                <SelectAutos fieldBrand={formik.getFieldProps('carBrand')} fieldModel={formik.getFieldProps('carModel')} form={formik} autos={autos} />
            </div>

            <CheckboxField field={formik.getFieldProps('agreement')} form={formik} label="Согласие на обработку персональных данных" />

            {session.status === 'authenticated' ? (
                <div className="mb-4 d-flex offset justify-content-start">
                    <button type="submit" className="btn btn-primary">
                        Сохранить
                    </button>
                    <button type="submit" className="btn btn-success">
                        Отправить заявку
                    </button>
                    <Link href="/orders/id">имитация отправки</Link>
                </div>
            ) : (
                <div className="mb-4 text-danger text-center h6">Чтобы оставить заявку необходимо быть авторизованным</div>
            )}
        </form>
    );
};

export default Form;
