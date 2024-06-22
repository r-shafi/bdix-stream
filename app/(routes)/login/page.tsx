import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import { login } from '@/utilities/actions';
import { redirect } from 'next/navigation';

const FIELDS = [
  {
    label: 'Username',
    type: 'text',
    autoComplete: 'given-name',
  },
  {
    label: 'Password',
    type: 'password',
    autoComplete: 'current-password',
  },
];

const Page = async () => {
  return (
    <div className="flex justify-center items-center min-h-[85vh]">
      <form
        className="flex flex-col gap-4"
        action={async (formData) => {
          'use server';
          await login(formData);
          redirect('/new');
        }}
      >
        {FIELDS.map(({ label, type, autoComplete }, i) => (
          <Input
            key={i}
            label={label}
            type={type}
            autoComplete={autoComplete}
          ></Input>
        ))}

        <Button title="Login / Register" type="submit"></Button>
      </form>
    </div>
  );
};

export default Page;
