import Form from '@/app/components/Forms/Form';
import { Field } from '@/types/interface';
import { login } from '@/utilities/api/user';
import { getSession } from '@/utilities/functions/auth';
import { redirect } from 'next/navigation';

const fields: Field[] = [
  {
    label: 'Username',
    type: 'text',
    required: true,
    placeholder: 'Username',
  },
  {
    label: 'Password',
    type: 'password',
    required: true,
    placeholder: '****',
  },
];

const Page = async () => {
  return (
    <div className="flex justify-center items-center min-h-[85vh]">
      <Form
        fields={fields}
        action={async (formData) => {
          'use server';
          await login(formData);
          const session = await getSession();
          if (session) {
            redirect('/new');
          }
        }}
        buttonTitle="Login / Register"
      ></Form>
    </div>
  );
};

export default Page;
