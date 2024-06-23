import Form from '@/app/components/Form';
import { Field } from '@/types/interface';
import { createStream } from '@/utilities/api/stream';
import { getSession } from '@/utilities/functions/auth';
import { redirect } from 'next/navigation';

const fields: Field[] = [
  {
    label: 'Title',
    type: 'text',
    required: true,
    placeholder: 'T-Sports - Ban vs Aus',
  },
  {
    label: 'Description',
    type: 'text',
    required: false,
    placeholder: '',
  },
  {
    label: 'URL',
    type: 'url',
    required: true,
    placeholder: '',
  },
  {
    label: 'Stream Type',
    type: 'select',
    required: true,
    placeholder: '',
    options: [
      { value: 'sports', label: 'Sports' },
      { value: 'entertainment', label: 'Entertainment' },
    ],
  },
];

const Page = async () => {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex justify-center items-center min-h-[85vh]">
      <Form
        fields={fields}
        action={createStream}
        buttonTitle="Add New Stream"
      ></Form>
    </div>
  );
};

export default Page;
