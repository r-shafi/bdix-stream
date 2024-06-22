interface InputProps {
  label: string;
  type: string;
  autoComplete?: string;
  required?: boolean;
  placeholder?: string;
}

const Input = ({
  label,
  type = 'text',
  autoComplete,
  required = false,
  placeholder,
}: InputProps) => {
  return (
    <label className="text-sm font-medium text-gray-900 flex flex-col gap-2">
      {label}
      <input
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="outline-none bg-gray-50 border border-gray-300 focus:border-blue-400 text-gray-700 rounded-lg w-full p-2.5"
        placeholder={placeholder}
      />
    </label>
  );
};

export default Input;
