import { FieldProps, FormikErrors, FormikTouched } from 'formik';

interface CheckboxFieldProps {
    field: FieldProps['field'];
    form: {
        touched: FormikTouched<any>;
        errors: FormikErrors<any>;
    };
    label: string;
    isEdited: boolean;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ field, form, label, isEdited }) => {
    const isError = form.touched[field.name] && form.errors[field.name];

    return (
        <div className="mb-4 form-check">
            <input type="checkbox" className={`form-check-input ${isError ? 'is-invalid' : ''}`} id={field.name} {...field} disabled={isEdited} />
            <label className="form-check-label" htmlFor={field.name}>
                {label}
            </label>

            {isError && <span className="invalid-feedback">{form.errors[field.name] as string}</span>}
        </div>
    );
};

export default CheckboxField;
