import { FieldProps, FormikErrors, FormikTouched } from 'formik';

interface InputFieldProps {
    field: FieldProps['field'];
    form: {
        touched: FormikTouched<any>;
        errors: FormikErrors<any>;
    };
    placeholder: string;
    isEdited: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ field, form, placeholder, isEdited }) => {
    const isError = form.touched[field.name] && form.errors[field.name];

    return (
        <div className="mb-4">
            <input type="text" className={`form-control ${isError ? 'is-invalid' : ''}`} placeholder={placeholder} {...field} disabled={isEdited} />

            {isError && <span className="invalid-feedback">{form.errors[field.name] as string}</span>}
        </div>
    );
};

export default InputField;
