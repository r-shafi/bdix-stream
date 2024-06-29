import Table from '@/app/components/Display/Table';
import { getStreams } from '@/utilities/api/stream';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sports Live Streams | BDIX Live Stream',
  description:
    'Discover our Sports Streams page for live streaming of cricket, football, and other sports events shared by our members. Watch your favorite sports matches and tournaments in real-time with high-quality video feeds. Join our platform to access diverse sports content and engage with fellow sports enthusiasts.',
};

export default async function Home() {
  const response = await getStreams('sports');

  if (response.error) {
    return <div>{response.message}</div>;
  }

  return <div>{<Table data={response.body}></Table>}</div>;
}
