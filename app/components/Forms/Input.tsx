'use client';

import { Field } from '@/types/interface';
import { useState } from 'react';

const Input = ({
  label,
  type = 'text',
  required = false,
  placeholder,
  name,
  autocomplete,
  validation,
}: Field) => {
  const { minLen, maxLen, pattern } = validation || {};

  const [error, setError] = useState<string | null>('');

  const validate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (minLen && value.length < minLen) {
      setError(`Minimum length is ${minLen}`);
    } else if (maxLen && value.length > maxLen) {
      setError(`Maximum length is ${maxLen}`);
    } else if (pattern && !pattern.test(value)) {
      setError('Invalid format');
    } else {
      setError(null);
    }
  };

  return (
    <>
      <label className="text-sm font-medium text-gray-900 flex flex-col gap-2">
        {label}
        <input
          type={type}
          required={required}
          className="outline-none bg-gray-50 border border-gray-300 focus:border-blue-400 text-gray-700 rounded-lg w-full p-2.5"
          placeholder={placeholder}
          name={name}
          autoComplete={autocomplete}
          onBlur={validate}
        />
      </label>
      {error && (
        <p className="text-red-500 text-sm font-medium -mt-2">{error}</p>
      )}
    </>
  );
};

export default Input;
