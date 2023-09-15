import * as yup from 'yup';

const validationSchema = yup.object({
    lastName: yup
        .string()
        .required('Обязательное поле')
        .matches(/^[А-Яа-я]+$/, 'Только кириллица'),
    firstName: yup
        .string()
        .required('Обязательное поле')
        .matches(/^[А-Яа-я]+$/, 'Только кириллица'),
    secondName: yup.string().matches(/^[А-Яа-я]+$/, 'Только кириллица'),
    email: yup.string().email('Некорректный email').required('Обязательное поле'),
    driverLicense: yup
        .string()
        .matches(/^\d{4}\s\d{6}$/, 'Формат: 9999 999999')
        .required('Обязательное поле'),
    cityCode: yup.string().required('Обязательное поле'),
    carBrand: yup.string().required('Обязательное поле'),
    carModel: yup.string().required('Обязательное поле'),
    agreement: yup.boolean().oneOf([true], 'Необходимо согласие на обработку данных').required('Необходимо согласие на обработку данных')
});

function initialValues(order: any) {
    console.log(order);
    if (order) {
        return {
            lastName: order.person.lastName,
            firstName: order.person.firstName,
            secondName: order.person.secondName,
            email: order.person.email,
            driverLicense: order.person.driverLicense,
            cityCode: order.city.code,
            cityName: order.city.name,
            carBrand: order.auto.brand,
            carModel: order.auto.model.name,
            carModelId: order.auto.model.id,
            agreement: false
        };
    }

    return {
        lastName: '',
        firstName: '',
        secondName: '',
        email: '',
        driverLicense: '',
        cityCode: '',
        cityName: '',
        carBrand: '',
        carModel: '',
        carModelId: '',
        agreement: false
    };
}

export { validationSchema, initialValues };
