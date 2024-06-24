import { StreamLink } from '@/types/interface';
import ClipboardButton from '../Buttons/ClipboardButton';
import PlayButton from '../Buttons/PlayButton';
import VoteButton from '../Buttons/VoteButton';
import StreamIcon from './StreamIcon';

interface TableProps {
  data: StreamLink[];
}

const Table = ({ data }: TableProps) => {
  const columns = [
    'Title',
    'Description',
    'Stream',
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
    [stream.upvotes, stream.downvotes, stream._id],
  ]);

  if (data.length === 0) {
    return <div className="text-center">No data found</div>;
  }

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
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
              <td className="px-6 py-4 flex items-center gap-4">
                <PlayButton src={row[2]} />
                <ClipboardButton src={row[2]} />
              </td>
              <td className="px-6 py-4" title={row[3]}>
                <StreamIcon type={row[3]} />
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
                <VoteButton
                  id={JSON.stringify(row[6][2])}
                  type="upvote"
                  count={row[6][0]}
                ></VoteButton>
                <VoteButton
                  id={JSON.stringify(row[6][2])}
                  type="downvote"
                  count={row[6][1]}
                ></VoteButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
