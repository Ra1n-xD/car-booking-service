import { FieldProps, FormikErrors, FormikTouched } from 'formik';

interface Option {
    value: string;
    label: string;
}

interface SelectFieldProps {
    field: FieldProps['field'];
    form: {
        touched: FormikTouched<any>;
        errors: FormikErrors<any>;
    };
    options: Option[];
    placeholder: string;
}

const SelectField: React.FC<SelectFieldProps> = ({ field, form, options, placeholder }) => {
    const isError = form.touched[field.name] && form.errors[field.name];

    return (
        <div className="col-md-6 mb-4">
            <select className={`form-select ${isError ? 'is-invalid' : ''}`} {...field}>
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {isError && <span className="invalid-feedback">{form.errors[field.name] as string}</span>}
        </div>
    );
};

export default SelectField;
