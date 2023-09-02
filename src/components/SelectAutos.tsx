import { FieldProps, FormikErrors, FormikTouched } from 'formik';

interface SelectAutosProps {
    fieldBrand: FieldProps['field'];
    fieldModel: FieldProps['field'];
    form: {
        touched: FormikTouched<any>;
        errors: FormikErrors<any>;
    };
    autos: any[];
    isEdited: boolean;
}

const SelectAutos: React.FC<SelectAutosProps> = ({ fieldBrand, fieldModel, form, autos, isEdited }) => {
    const isErrorBrand = form.touched[fieldBrand.name] && form.errors[fieldBrand.name];
    const isErrorModel = form.touched[fieldModel.name] && form.errors[fieldModel.name];

    const isBrandSelected = !!fieldBrand.value;

    return (
        <>
            <div className="col-md-6 mb-4">
                <select className={`form-select ${isErrorBrand ? 'is-invalid' : ''}`} {...fieldBrand} disabled={isEdited}>
                    <option value="" disabled>
                        Марка автомобиля
                    </option>
                    {autos.map((brandData) => (
                        <option key={brandData.brand} value={brandData.brand}>
                            {brandData.brand}
                        </option>
                    ))}
                </select>
                {isErrorBrand && <span className="invalid-feedback">{form.errors[fieldBrand.name] as string}</span>}
            </div>

            <div className="col-md-6 mb-4">
                <select className={`form-select ${isErrorModel ? 'is-invalid' : ''}`} {...fieldModel} disabled={!isBrandSelected || isEdited}>
                    <option value="" disabled>
                        Модель автомобиля
                    </option>
                    {autos.map(
                        (brandData) =>
                            brandData.brand === fieldBrand.value && (
                                <optgroup key={brandData.brand} label={brandData.brand}>
                                    {brandData.models.map((model: any) => (
                                        <option key={model.id} value={model.id}>
                                            {model.name}
                                        </option>
                                    ))}
                                </optgroup>
                            )
                    )}
                </select>
                {isErrorModel && <span className="invalid-feedback">{form.errors[fieldModel.name] as string}</span>}
            </div>
        </>
    );
};

export default SelectAutos;
