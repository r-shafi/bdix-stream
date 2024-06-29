import { StreamLink } from '@/types/interface';
import { FC } from 'react';
import ClipboardButton from '../Buttons/ClipboardButton';
import PlayButton from '../Buttons/PlayButton';
import VoteButton from '../Buttons/VoteButton';
import StreamIcon from './StreamIcon';

interface TableProps {
  data: StreamLink[];
}

interface TableRow {
  title: string;
  description: string;
  url: string;
  type: string;
  username: string;
  role: 'user' | 'admin' | 'moderator';
  createdAt: Date;
  upvotes: number;
  downvotes: number;
  _id: string;
}

const Table: FC<TableProps> = ({ data }) => {
  const formatDate = (dateString: Date) => {
    return Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
    }).format(new Date(dateString));
  };

  if (data.length === 0) {
    return <div className="text-center">No data found</div>;
  }

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-left text-gray-600 rounded-md overflow-hidden">
        <thead className="text-xs text-gray-800 uppercase bg-gray-50">
          <tr>
            {[
              'Title',
              'Description',
              'Stream',
              'Type',
              'Uploader',
              'Created At',
              'Votes',
            ].map((column) => (
              <th scope="col" className="px-6 py-3" key={column}>
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((stream, index) => {
            const row: TableRow = {
              title: stream.title,
              description: stream.description ?? '-',
              url: stream.url,
              type: stream.type,
              username: stream.user.username,
              role: stream.user.role,
              createdAt: stream.createdAt,
              upvotes: stream.upvotes,
              downvotes: stream.downvotes,
              _id: stream._id.toString(),
            };

            return (
              <tr className="bg-white border-b" key={index}>
                <td className="px-6 py-4">{row.title}</td>
                <td className="px-6 py-4">{row.description}</td>
                <td className="px-6 py-4 flex items-center gap-4">
                  <PlayButton id={row._id} />
                  <ClipboardButton src={row.url} />
                </td>
                <td className="px-6 py-4" title={row.type}>
                  <StreamIcon type={row.type} />
                </td>
                <td
                  className={`px-6 py-4 ${
                    row.role === 'admin'
                      ? 'text-red-500'
                      : row.role === 'moderator'
                      ? 'text-blue-500'
                      : ''
                  }`}
                >
                  {row.username}
                </td>
                <td className="px-6 py-4">{formatDate(row.createdAt)}</td>
                <td className="px-6 py-4 flex items-center gap-1">
                  <VoteButton id={row._id} type="upvote" count={row.upvotes} />
                  <VoteButton
                    id={row._id}
                    type="downvote"
                    count={row.downvotes}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
