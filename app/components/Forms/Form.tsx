import { FormProps } from '@/types/interface';
import FormButton from '../Buttons/FormButton';
import Input from './Input';
import Select from './Select';

const Form = ({ action, fields, buttonTitle }: FormProps) => {
  return (
    <form className="flex flex-col gap-4" action={action}>
      {fields.map((field, i) =>
        field.type === 'select' ? (
          <Select key={i} {...field} />
        ) : (
          <Input key={i} {...field} />
        )
      )}

      <FormButton title={buttonTitle} type="submit"></FormButton>
    </form>
  );
};

export default Form;
