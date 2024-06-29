import Form from '@/app/components/Forms/Form';
import { createStream } from '@/utilities/api/stream';
import { getSession } from '@/utilities/functions/auth';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Share New Stream | m3u8',
  description: 'Share New Stream',
};

const Page = async () => {
  const session = await getSession();

  if (!session) {
    redirect('/authenticate');
  }

  const createStreamServer = async (formData: FormData) => {
    'use server';
    const result = await createStream(formData);

    if (result.error) {
      return result;
    }

    redirect('/');

    return result;
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh]">
      <Form
        form="createStreamForm"
        action={createStreamServer}
        buttonTitle="Add New Stream"
      ></Form>
    </div>
  );
};

export default Page;
