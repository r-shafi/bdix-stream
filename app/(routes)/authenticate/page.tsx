import Tabs from '@/app/components/Display/Tabs';
import Form from '@/app/components/Forms/Form';
import { Field } from '@/types/interface';
import { authenticate } from '@/utilities/api/user';
import { getSession } from '@/utilities/functions/auth';
import { redirect } from 'next/navigation';

const loginFormFields: Field[] = [
  {
    label: 'Username',
    type: 'text',
    required: true,
    placeholder: 'Username',
    name: 'username',
    autocomplete: 'given-name',
  },
  {
    label: 'Password',
    type: 'password',
    required: true,
    placeholder: '****',
    name: 'password',
    autocomplete: 'current-password',
  },
];

const registerFormFields: Field[] = [
  ...loginFormFields,
  {
    label: 'Email',
    type: 'email',
    required: false,
    placeholder: 'Email (optional)',
    name: 'email',
    autocomplete: 'email',
  },
];

const Page = async () => {
  const authenticateServer = async (formData: FormData) => {
    'use server';
    const result = await authenticate(formData);
    const session = await getSession();
    if (session) {
      redirect('/share');
    }
    return result;
  };

  const Login = (
    <Form
      fields={loginFormFields}
      action={authenticateServer}
      buttonTitle="Login"
    ></Form>
  );

  const Register = (
    <Form
      fields={registerFormFields}
      action={authenticateServer}
      buttonTitle="Register"
    ></Form>
  );

  return (
    <div className="flex flex-col justify-center items-center min-h-[85vh]">
      <Tabs tabs={['Login', 'Register']} components={[Login, Register]} />
    </div>
  );
};

export default Page;
