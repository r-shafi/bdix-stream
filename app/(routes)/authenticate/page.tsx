import Tabs from '@/app/components/Display/Tabs';
import Form from '@/app/components/Forms/Form';
import { authenticate } from '@/utilities/api/user';
import { getSession } from '@/utilities/functions/auth';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Authentication | BDIX Live Stream',
  description:
    'Sign up or log in to our platform to enjoy streaming live cricket, football, and entertainment TV channels shared by members. Register for free to access exclusive content and features. Join now to experience seamless registration and secure login processes.',
};

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
      form="loginForm"
      action={authenticateServer}
      buttonTitle="Login"
    ></Form>
  );

  const Register = (
    <Form
      form="registerForm"
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
