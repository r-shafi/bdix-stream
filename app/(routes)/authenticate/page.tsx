import Tabs from '@/app/components/Display/Tabs';
import Form from '@/app/components/Forms/Form';
import { Field } from '@/types/interface';
import { authenticate } from '@/utilities/api/user';
import { getSession } from '@/utilities/functions/auth';
import { redirect } from 'next/navigation';

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

  const Login = <Form form='loginForm' action={authenticateServer} buttonTitle="Login"></Form>;

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
