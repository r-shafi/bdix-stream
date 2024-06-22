interface InputProps {
  label: string;
  type: 'text' | 'password' | 'email' | 'number';
  autoComplete: string;
  required: boolean;
}

const Input = ({
  label,
  type = 'text',
  autoComplete,
  required = false,
}: InputProps) => {
  return (
    <label className="text-sm font-medium text-gray-900 flex flex-col gap-2">
      {label}
      <input
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="outline-none bg-gray-50 border border-gray-300 focus:border-blue-400 text-gray-700 rounded-lg w-full p-2.5"
      />
    </label>
  );
};

export default Input;
