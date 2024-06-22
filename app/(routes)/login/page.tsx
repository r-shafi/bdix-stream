import Button from '@/app/components/Button';

const Page = () => {
  return (
    <div className="flex justify-center items-center min-h-[85vh]">
      <form className="flex flex-col gap-4">
        <label className="text-sm font-medium text-gray-900 flex flex-col gap-2">
          Username
          <input
            type="text"
            autoComplete="given-name"
            className="outline-none bg-gray-50 border border-gray-300 focus:border-blue-400 text-gray-700 rounded-lg w-full p-2.5"
            required
          />
        </label>
        <label className="text-sm font-medium text-gray-900 flex flex-col gap-2">
          Password
          <input
            type="password"
            autoComplete="current-password"
            className="outline-none bg-gray-50 border border-gray-300 focus:border-blue-400 text-gray-700 rounded-lg w-full p-2.5"
            required
          />
        </label>

        <Button title="Login / Register" type="submit"></Button>
      </form>
    </div>
  );
};

export default Page;
