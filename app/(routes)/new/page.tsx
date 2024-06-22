import Button from '@/app/components/Button';
import Input from '@/app/components/Input';

const FIELDS = [
  {
    label: 'Title',
    type: 'text',
    required: true,
    placeholder: 'T-Sports - Ban vs Aus',
  },
  {
    label: 'Description',
    type: 'text',
  },
  {
    label: 'URL',
    type: 'url',
    required: true,
  },
];

const Page = () => {
  return (
    <div className="flex justify-center items-center min-h-[85vh]">
      <form className="flex flex-col gap-4">
        {FIELDS.map(({ label, type, required, placeholder }, i) => (
          <Input
            key={i}
            label={label}
            type={type}
            required={required}
            placeholder={placeholder}
          ></Input>
        ))}

        <label className="flex flex-col gap-2 text-sm font-medium text-gray-900">
          Stream Type
          <select className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option value="sports">Sports</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </label>

        <Button title="Add New Link" type="submit"></Button>
      </form>
    </div>
  );
};

export default Page;
