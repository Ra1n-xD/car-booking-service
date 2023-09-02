'use client';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { useFormik } from 'formik';
import * as yup from 'yup';

import InputField from './InputField';
import SelectCities from './SelectCities';
import CheckboxField from './CheckboxField';
import SelectAutos from './SelectAutos';

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
    const session = useSession();
    const authorized = session.status === 'authenticated' ? true : false;

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
        const { carBrand, carModel, city, driverLicense, email, firstName, lastName, middleName } = formik.values;

        console.log(carBrand, carModel, city, driverLicense, email, firstName, lastName, middleName);
    };

    return (
        <form onSubmit={handleSubmit} className="col-11 col-lg-8 col-xl-6">
            <InputField field={formik.getFieldProps('lastName')} form={formik} placeholder="Фамилия" isEdited={!authorized} />
            <InputField field={formik.getFieldProps('firstName')} form={formik} placeholder="Имя" isEdited={!authorized} />
            <InputField field={formik.getFieldProps('middleName')} form={formik} placeholder="Отчество" isEdited={!authorized} />
            <InputField field={formik.getFieldProps('email')} form={formik} placeholder="Email" isEdited={!authorized} />

            <div className="row">
                <div className="col-md-6" onChange={handleDriverLicenseChange}>
                    <InputField field={formik.getFieldProps('driverLicense')} form={formik} placeholder="Водительское удостоверение" isEdited={!authorized} />
                </div>
                <SelectCities field={formik.getFieldProps('city')} form={formik} cities={cities} isEdited={!authorized} />
            </div>

            <div className="row">
                <SelectAutos fieldBrand={formik.getFieldProps('carBrand')} fieldModel={formik.getFieldProps('carModel')} form={formik} autos={autos} isEdited={!authorized} />
            </div>

            <CheckboxField field={formik.getFieldProps('agreement')} form={formik} label="Согласие на обработку персональных данных" isEdited={!authorized} />

            {authorized ? (
                <div className="mb-4 d-flex offset justify-content-start">
                    <button type="submit" className="btn btn-primary">
                        Сохранить
                    </button>
                    <button type="submit" className="btn btn-success">
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
