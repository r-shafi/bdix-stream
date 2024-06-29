import Table from '@/app/components/Display/Table';
import { getStreams } from '@/utilities/api/stream';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Entertainment Live Streams | m3u8',
  description:
    'Explore our Entertainment Live Streams page for exciting live broadcasts of popular TV channels and events. Enjoy a variety of entertainment content including movies, shows, and live events streamed by our members. Join now to access high-quality entertainment streams and engage with a vibrant community of viewers.',
};

export default async function Home() {
  const response = await getStreams('entertainment');

  if (response.error) {
    return <div>{response.message}</div>;
  }

  return <div>{<Table data={response.body}></Table>}</div>;
}
