'use client';

import { FormProps, Response } from '@/types/interface';
import { useState } from 'react';
import FormButton from '../Buttons/FormButton';
import Toast from '../Layout/Toast';
import Input from './Input';
import Select from './Select';

const Form = ({ action, fields, buttonTitle }: FormProps) => {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState<Response | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (pending) return;
    e.preventDefault();
    setPending(true);
    const formData = new FormData(e.currentTarget);
    const response = await action(formData);
    setContent(response);
    setShow(true);
    setPending(false);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {fields.map((field, i) =>
        field.type === 'select' ? (
          <Select key={i} {...field} />
        ) : (
          <Input key={i} {...field} />
        )
      )}

      <FormButton
        title={buttonTitle}
        type="submit"
        pending={pending}
      ></FormButton>

      {show && content && (
        <Toast
          type={content.error ? 'error' : 'success'}
          message={content.message}
          setter={setShow}
        />
      )}
    </form>
  );
};

export default Form;
