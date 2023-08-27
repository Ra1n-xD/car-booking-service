import { FieldProps, FormikErrors, FormikTouched } from 'formik';

interface SelectCitiesProps {
    field: FieldProps['field'];
    form: {
        touched: FormikTouched<any>;
        errors: FormikErrors<any>;
    };
    cities: any[];
}

const SelectCities: React.FC<SelectCitiesProps> = ({ field, form, cities }) => {
    const isError = form.touched[field.name] && form.errors[field.name];

    return (
        <div className="col-md-6 mb-4">
            <select className={`form-select ${isError ? 'is-invalid' : ''}`} {...field}>
                <option value="" disabled>
                    Город
                </option>
                {cities.map((city) => (
                    <option key={city._id} value={city.code}>
                        {city.name}
                    </option>
                ))}
            </select>

            {isError && <span className="invalid-feedback">{form.errors[field.name] as string}</span>}
        </div>
    );
};

export default SelectCities;
