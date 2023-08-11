'use client';
import { useFormik } from 'formik';
import * as yup from 'yup';

export default function Home() {
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

    return (
        <div className="container mt-5 col-lg-6 col-sm-12">
            <h1 className="mb-4 text-center">Оставить заявку</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <input
                        type="text"
                        className={`form-control ${formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''}`}
                        placeholder="Фамилия"
                        {...formik.getFieldProps('lastName')}
                    />
                    {formik.touched.lastName && formik.errors.lastName && <div className="invalid-feedback">{formik.errors.lastName}</div>}
                </div>
                <div className="mb-4">
                    <input type="text" className={`form-control ${formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''}`} placeholder="Имя" {...formik.getFieldProps('firstName')} />
                    {formik.touched.firstName && formik.errors.firstName && <div className="invalid-feedback">{formik.errors.firstName}</div>}
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        className={`form-control ${formik.touched.middleName && formik.errors.middleName ? 'is-invalid' : ''}`}
                        placeholder="Отчество"
                        {...formik.getFieldProps('middleName')}
                    />
                    {formik.touched.middleName && formik.errors.middleName && <div className="invalid-feedback">{formik.errors.middleName}</div>}
                </div>
                <div className="mb-4">
                    <input type="email" className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`} placeholder="Email" {...formik.getFieldProps('email')} />
                    {formik.touched.email && formik.errors.email && <div className="invalid-feedback">{formik.errors.email}</div>}
                </div>

                <div className="row">
                    <div className="col-md-6 mb-4">
                        <input
                            type="text"
                            className={`form-control ${formik.touched.driverLicense && formik.errors.driverLicense ? 'is-invalid' : ''}`}
                            placeholder="Водительское удостоверение"
                            {...formik.getFieldProps('driverLicense')}
                        />
                        {formik.touched.driverLicense && formik.errors.driverLicense && <div className="invalid-feedback">{formik.errors.driverLicense}</div>}
                    </div>
                    <div className="col-md-6 mb-4">
                        <select className={`form-select ${formik.touched.city && formik.errors.city ? 'is-invalid' : ''}`} {...formik.getFieldProps('city')}>
                            <option value="">Город</option>
                            <option value="city1">Город 1</option>
                            <option value="city2">Город 2</option>
                            {/* Добавьте другие города */}
                        </select>
                        {formik.touched.city && formik.errors.city && <div className="invalid-feedback">{formik.errors.city}</div>}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-4">
                        <select className={`form-select ${formik.touched.carBrand && formik.errors.carBrand ? 'is-invalid' : ''}`} {...formik.getFieldProps('carBrand')}>
                            <option value="">Марка автомобиля</option>
                            <option value="brand1">Марка 1</option>
                            <option value="brand2">Марка 2</option>
                            {/* Добавьте другие марки автомобилей */}
                        </select>
                        {formik.touched.carBrand && formik.errors.carBrand && <div className="invalid-feedback">{formik.errors.carBrand}</div>}
                    </div>
                    <div className="col-md-6 mb-4">
                        <select className={`form-select ${formik.touched.carModel && formik.errors.carModel ? 'is-invalid' : ''}`} {...formik.getFieldProps('carModel')}>
                            <option value="">Модель автомобиля</option>
                            {/* Добавьте модели в зависимости от выбора марки */}
                        </select>
                        {formik.touched.carModel && formik.errors.carModel && <div className="invalid-feedback">{formik.errors.carModel}</div>}
                    </div>
                </div>

                <div className="mb-4 form-check">
                    <input
                        type="checkbox"
                        className={`form-check-input ${formik.touched.agreement && formik.errors.agreement ? 'is-invalid' : ''}`}
                        id="agreementCheckbox"
                        {...formik.getFieldProps('agreement')}
                    />
                    <label className="form-check-label" htmlFor="agreementCheckbox">
                        Согласие на обработку персональных данных
                    </label>
                    {formik.touched.agreement && formik.errors.agreement && <div className="invalid-feedback">{formik.errors.agreement}</div>}
                </div>

                <div className="mb-4 d-flex offset justify-content-start">
                    <button type="submit" className="btn btn-primary">
                        Сохранить
                    </button>
                    <button type="submit" className="btn btn-success">
                        Отправить на регистрацию
                    </button>
                </div>
            </form>
        </div>
    );
}
