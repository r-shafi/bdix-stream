import { getStreams } from '@/utilities/actions';
import Table from './components/Table';

export default async function Home() {
  const streams: StreamLink[] = await getStreams();

  const columns = [
    'Title',
    'Description',
    'URL',
    'Type',
    'Votes',
    'User',
    'Created At',
  ];
  const rows = streams.map((stream) => [
    stream.title,
    stream.description,
    stream.url,
    stream.type,
    `${stream.upvotes}/${stream.downvotes}`,
    stream.user.username,
    stream.createdAt,
  ]);

  return <div>{<Table columns={columns} rows={rows}></Table>}</div>;
}

export interface StreamLink {
  _id: string;
  user: {
    _id: string;
    username: string;
  };
  title: string;
  description: string;
  url: string;
  upvotes: number;
  downvotes: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
