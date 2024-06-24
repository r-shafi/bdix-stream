import { FormProps } from '@/types/interface';
import FormButton from './Buttons/FormButton';
import Input from './Input';

const Form = ({ action, fields, buttonTitle }: FormProps) => {
  return (
    <form className="flex flex-col gap-4" action={action}>
      {fields.map(({ label, type, required, placeholder, options }, i) =>
        type === 'select' ? (
          <label
            key={i}
            className="flex flex-col gap-2 text-sm font-medium text-gray-900"
          >
            {label}
            <select
              className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              name={label.toLowerCase()}
            >
              <option value="" disabled selected>
                {placeholder || 'Select an option'}
              </option>
              {options?.map(({ value, label }, i) => (
                <option key={i} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <Input
            key={i}
            label={label}
            type={type}
            required={required}
            placeholder={placeholder}
          />
        )
      )}

      <FormButton title={buttonTitle} type="submit"></FormButton>
    </form>
  );
};

export default Form;
