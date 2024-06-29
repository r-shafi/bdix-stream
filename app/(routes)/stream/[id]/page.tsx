import VoteButton from '@/app/components/Buttons/VoteButton';
import VideoPlayer from '@/app/components/Display/VideoPlayer';
import { StreamModel } from '@/schemas/stream.schema';
import Head from 'next/head';

const Page = async ({ params }: { params: { id: string } }) => {
  const stream = await StreamModel.findById(params.id);

  if (!stream) {
    return <div>Stream not found!</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <Head>
        <title>Live Stream {stream.title}</title>
        <meta name="description" content={stream.description || stream.title} />
        <meta property="og:title" content={stream.title} />
        <meta
          property="og:description"
          content={stream.description || stream.title}
        />
      </Head>

      <div className="flex justify-between items-center">
        <h1 className="max-w-lg text-3xl font-semibold leading-normal text-gray-900">
          {stream.title}
        </h1>

        <div className="flex items-center gap-2">
          <VoteButton
            id={stream._id.toString()}
            count={stream.upvotes}
            type="upvote"
          />
          <VoteButton
            id={stream._id.toString()}
            count={stream.downvotes}
            type="downvote"
          />
        </div>
      </div>

      {stream.description && <p className="text-sm">{stream.description}</p>}

      <VideoPlayer url={stream.url} />
    </div>
  );
};

export default Page;
