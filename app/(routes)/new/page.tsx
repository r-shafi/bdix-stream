import Form from '@/app/components/Forms/Form';
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
    name: 'title',
  },
  {
    label: 'Description',
    type: 'text',
    required: false,
    name: 'description',
  },
  {
    label: 'URL',
    type: 'url',
    required: true,
    name: 'url',
  },
  {
    label: 'Stream Type',
    type: 'select',
    required: true,
    options: [
      { value: 'sports', label: 'Sports' },
      { value: 'entertainment', label: 'Entertainment' },
    ],
    name: 'type',
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
