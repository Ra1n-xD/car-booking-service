'use client';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/app/redux/store';
import { increment, decrement, incAmount } from '@/app/redux/features/counter/counterSlice';

import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import CheckboxField from '../components/CheckboxField';
import Link from 'next/link';

const Form = () => {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

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

    const cityOptions = [
        { value: 'city1', label: 'Город 1' },
        { value: 'city2', label: 'Город 2' }
        // ...
    ];

    const carBrandOptions = [
        { value: 'brand1', label: 'Марка 1' },
        { value: 'brand2', label: 'Марка 2' }
        // ...
    ];

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
            }}
            className="col-11 col-lg-8 col-xl-6"
        >
            <InputField field={formik.getFieldProps('lastName')} form={formik} placeholder="Фамилия" />
            <InputField field={formik.getFieldProps('firstName')} form={formik} placeholder="Имя" />
            <InputField field={formik.getFieldProps('middleName')} form={formik} placeholder="Отчество" />
            <InputField field={formik.getFieldProps('email')} form={formik} placeholder="Email" />

            <div className="row ">
                <div className="col-md-6" onChange={handleDriverLicenseChange}>
                    <InputField field={formik.getFieldProps('driverLicense')} form={formik} placeholder="Водительское удостоверение" />
                </div>
                <SelectField field={formik.getFieldProps('city')} form={formik} options={cityOptions} placeholder="Город" />
            </div>

            <div className="row">
                <SelectField field={formik.getFieldProps('carBrand')} form={formik} options={carBrandOptions} placeholder="Марка автомобиля" />
                <SelectField field={formik.getFieldProps('carModel')} form={formik} options={carBrandOptions} placeholder="Модель автомобиля" />
            </div>

            <CheckboxField field={formik.getFieldProps('agreement')} form={formik} label="Согласие на обработку персональных данных" />

            <div className="mb-4 d-flex offset justify-content-start">
                <Link href="/orders/id">
                    <button type="submit" className="btn btn-primary">
                        Сохранить
                    </button>
                </Link>
                <button type="submit" className="btn btn-success" onClick={() => dispatch(incAmount(123))}>
                    Отправить заявку
                </button>
                <span>{count}</span>
            </div>
        </form>
    );
};

export default Form;
