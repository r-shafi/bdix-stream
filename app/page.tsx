import { getStreams } from '@/utilities/api/stream';
import { Metadata } from 'next';
import Table from './components/Display/Table';

export const metadata: Metadata = {
  title: 'Live Streams | BDIX Live Stream',
  description:
    'Watch live cricket, football, and entertainment TV channels streamed by members of our website. Enjoy high-quality streaming and diverse content on our platform. Join today to experience the thrill of live sports and entertainment at your fingertips.',
};

export default async function Home() {
  const allStreamsResponse: any = await getStreams();
  const latestStreamResponse: any = await getStreams(undefined, 24);

  return (
    <>
      <section className="flex flex-col gap-2 mb-12">
        <h2 className="font-medium text-2xl text-gray-800">Latest Streams</h2>
        <p className="text-sm text-gray-600 lowercase -mt-2 mb-4">
          Streams created in last 24 hours
        </p>

        {latestStreamResponse.error ? (
          <div>{latestStreamResponse.message}</div>
        ) : (
          <Table data={latestStreamResponse.body}></Table>
        )}
      </section>

      <section className="flex flex-col gap-2 mb-12">
        <h2 className="font-medium text-2xl text-gray-800">All Streams</h2>
        <p className="text-sm text-gray-600 lowercase -mt-2 mb-4">
          All streams available on the platform
        </p>

        {allStreamsResponse.error ? (
          <div>{allStreamsResponse.message}</div>
        ) : (
          <Table data={allStreamsResponse.body}></Table>
        )}
      </section>
    </>
  );
}
