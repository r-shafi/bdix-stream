import { StreamLink } from '@/types/interface';

interface TableProps {
  data: StreamLink[];
}

const Table = ({ data }: TableProps) => {
  const columns = [
    'Title',
    'Description',
    'URL',
    'Type',
    'Uploader',
    'Created At',
    'Votes',
  ];

  const rows: any[][] = data.map((stream) => [
    stream.title,
    stream.description,
    stream.url,
    stream.type,
    stream.user.username,
    stream.createdAt,
    [stream.upvotes, stream.downvotes],
  ]);

  if (data.length === 0) {
    return <div className="text-center">No data found</div>;
  }

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column) => (
              <th scope="col" className="px-6 py-3" key={column}>
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row: any, i) => (
            <tr className="bg-white border-b " key={i}>
              <td className="px-6 py-4">{row[0]}</td>
              <td className="px-6 py-4">{row[1] ? row[1] : '-'}</td>
              <td className="px-6 py-4">{row[2]}</td>
              <td className="px-6 py-4">
                {row[3] === 'sports' ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    <path d="M12 7l4.76 3.45l-1.76 5.55h-6l-1.76 -5.55z" />
                    <path d="M12 7v-4m3 13l2.5 3m-.74 -8.55l3.74 -1.45m-11.44 7.05l-2.56 2.95m.74 -8.55l-3.74 -1.45" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                    <path d="M8 4l0 16" />
                    <path d="M16 4l0 16" />
                    <path d="M4 8l4 0" />
                    <path d="M4 16l4 0" />
                    <path d="M4 12l16 0" />
                    <path d="M16 8l4 0" />
                    <path d="M16 16l4 0" />
                  </svg>
                )}
              </td>
              <td className="px-6 py-4">{row[4]}</td>
              <td className="px-6 py-4">
                {Intl.DateTimeFormat('en-US', {
                  month: 'short',
                  day: '2-digit',
                  hour: 'numeric',
                  minute: 'numeric',
                }).format(new Date(row[5]))}
              </td>
              <td className="px-6 py-4 flex items-center gap-1">
                <button className="flex items-center gap-2 bg-transparent hover:bg-gray-100 transition-all px-2 py-1 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
                  </svg>{' '}
                  {row[6][0]}
                </button>
                <button className="flex items-center gap-2 bg-transparent hover:bg-gray-100 transition-all px-2 py-1 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3" />
                  </svg>
                  {row[6][1]}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
