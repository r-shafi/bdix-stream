import { getStreams } from '@/utilities/api/stream';
import { Metadata } from 'next';
import { Suspense } from 'react';
import Table from './components/Display/Table';
import StreamTableSkeleton from './components/Display/StreamTableSkeleton';
import EmptyState from './components/Display/EmptyState';
import { Clock, TrendingUp } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Live Streams | BDIX Live Stream',
  description:
    'Watch live cricket, football, and entertainment TV channels streamed by members of our website. Enjoy high-quality streaming and diverse content on our platform. Join today to experience the thrill of live sports and entertainment at your fingertips.',
};

export default async function Home() {
  const allStreamsResponse: any = await getStreams();
  const latestStreamResponse: any = await getStreams(undefined, 24);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-8 px-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl border border-blue-200">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Welcome to <span className="text-blue-600">BDIX Live Stream</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Discover high-quality live streams of cricket, football, and entertainment channels 
          shared by our community members. Join thousands of viewers enjoying seamless streaming.
        </p>
      </section>

      {/* Latest Streams Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Latest Streams</h2>
              <p className="text-base text-gray-600 mt-1">
                Fresh content from the last 24 hours
              </p>
            </div>
          </div>
          <div className="ml-auto hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Recently Added
          </div>
        </div>

        <Suspense fallback={<StreamTableSkeleton />}>
          {latestStreamResponse.error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <div className="text-red-600 font-medium mb-2">Failed to load latest streams</div>
              <div className="text-red-500 text-sm">{latestStreamResponse.message}</div>
            </div>
          ) : latestStreamResponse.body?.length > 0 ? (
            <Table data={latestStreamResponse.body} />
          ) : (
            <EmptyState
              title="No recent streams"
              description="No streams have been added in the last 24 hours. Check back later or explore all streams below."
              icon={
                <Clock className="w-24 h-24 text-gray-300 mx-auto mb-6" strokeWidth={1} />
              }
            />
          )}
        </Suspense>
      </section>

      {/* Visual Separator */}
      <div className="flex items-center justify-center py-8">
        <div className="flex-1 border-t border-gray-300"></div>
        <div className="px-6 text-gray-500 bg-gray-50 rounded-full py-2 text-sm font-medium">
          All Available Streams
        </div>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      {/* All Streams Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">All Streams</h2>
              <p className="text-base text-gray-600 mt-1">
                Complete collection of available streams
              </p>
            </div>
          </div>
          {allStreamsResponse.body?.length > 0 && (
            <div className="ml-auto hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              {allStreamsResponse.body.length} Total Streams
            </div>
          )}
        </div>

        <Suspense fallback={<StreamTableSkeleton />}>
          {allStreamsResponse.error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <div className="text-red-600 font-medium mb-2">Failed to load streams</div>
              <div className="text-red-500 text-sm">{allStreamsResponse.message}</div>
            </div>
          ) : allStreamsResponse.body?.length > 0 ? (
            <Table data={allStreamsResponse.body} />
          ) : (
            <EmptyState
              title="No streams available"
              description="There are no streams on the platform yet. Be the first to share a stream!"
              action={
                <a
                  href="/share"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add First Stream
                </a>
              }
            />
          )}
        </Suspense>
      </section>
    </div>
  );
}
