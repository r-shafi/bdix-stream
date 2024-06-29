'use client';

import { Field, FormProps, Response } from '@/types/interface';
import forms from '@/utilities/forms/forms';
import { useState } from 'react';
import FormButton from '../Buttons/FormButton';
import Toast from '../Layout/Toast';
import Input from './Input';
import Select from './Select';

const Form = ({ action, form, buttonTitle }: FormProps) => {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState<Response | null>(null);
  const [pending, setPending] = useState(false);
  const fields: Field[] = forms[form];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (pending) return;
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    if (form === 'loginForm' || form === 'registerForm') {
      const username = formData.get('username') as string;
      const password = formData.get('password') as string;
      const email = formData.get('email') as string;
      if (!username || !password) return;
      if (username.length < 5 || password.length < 6) return;
      if (email && email.length < 8) return;
    } else if (form === 'createStreamForm') {
      const title = formData.get('title') as string;
      const description = formData.get('description') as string;
      const type = formData.get('type') as string;
      const url = formData.get('url') as string;

      if (!title || !type || !url) return;
      if (title.length < 3) return;
      if (description && description.length < 5) return;
    }

    setPending(true);
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
