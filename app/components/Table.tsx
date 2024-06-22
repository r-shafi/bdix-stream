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
    'Votes',
    'User',
    'Created At',
  ];

  const rows: any[][] = data.map((stream) => [
    stream.title,
    stream.description,
    stream.url,
    stream.type,
    `${stream.upvotes}/${stream.downvotes}`,
    stream.user.username,
    stream.createdAt,
  ]);

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
          {rows.map((row, i) => (
            <tr className="bg-white border-b " key={i}>
              {row.map((cell, j) => (
                <td key={j} className="px-6 py-4">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
