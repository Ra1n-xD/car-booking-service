import { FieldProps, FormikErrors, FormikTouched } from 'formik';
import Loading from '@/components/Loading';

interface SelectCitiesProps {
    fieldCode: FieldProps['field'];
    form: {
        touched: FormikTouched<any>;
        errors: FormikErrors<any>;
        setFieldValue: (field: string, value: any) => void;
    };
    cities: any[];
    isEdited: boolean;
}

const SelectCities: React.FC<SelectCitiesProps> = ({ fieldCode, form, cities, isEdited }) => {
    if (!cities) return <Loading />;

    const isError = form.touched[fieldCode.name] && form.errors[fieldCode.name];

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCityCode = e.target.value;
        const selectedCity = cities.find((city) => city.code === selectedCityCode);

        form.setFieldValue('cityCode', selectedCityCode);
        form.setFieldValue('cityName', selectedCity.name);
    };

    return (
        <div className="col-md-6 mb-4">
            <select className={`form-select ${isError ? 'is-invalid' : ''}`} value={fieldCode.value} disabled={isEdited} onChange={handleChange}>
                <option value="" disabled>
                    Город*
                </option>
                {cities.map((city) => (
                    <option key={city._id} value={city.code}>
                        {city.name}
                    </option>
                ))}
            </select>

            {isError && <span className="invalid-feedback">{form.errors[fieldCode.name] as string}</span>}
        </div>
    );
};

export default SelectCities;
