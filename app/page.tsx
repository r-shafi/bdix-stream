import { getStreams } from '@/utilities/api/stream';
import { Metadata } from 'next';
import Table from './components/Display/Table';

export const metadata: Metadata = {
  title: 'Live Streams | m3u8',
  description:
    'Watch live cricket, football, and entertainment TV channels streamed by members of our website. Enjoy high-quality streaming and diverse content on our platform. Join today to experience the thrill of live sports and entertainment at your fingertips.',
};

export default async function Home() {
  const response: any = await getStreams();

  if (response.error) {
    return <div>{response.message}</div>;
  }

  return <div>{<Table data={response.body}></Table>}</div>;
}
