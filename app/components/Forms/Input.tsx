import { Field } from '@/types/interface';

const Input = ({
  label,
  type = 'text',
  required = false,
  placeholder,
}: Field) => {
  return (
    <label className="text-sm font-medium text-gray-900 flex flex-col gap-2">
      {label}
      <input
        type={type}
        required={required}
        className="outline-none bg-gray-50 border border-gray-300 focus:border-blue-400 text-gray-700 rounded-lg w-full p-2.5"
        placeholder={placeholder}
        name={label.toLowerCase()}
      />
    </label>
  );
};

export default Input;
