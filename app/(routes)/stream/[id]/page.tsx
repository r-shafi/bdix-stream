import VoteButton from '@/app/components/Buttons/VoteButton';
import VideoPlayer from '@/app/components/Display/VideoPlayer';
import { StreamModel } from '@/schemas/stream.schema';
import Head from 'next/head';

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props) {
  const stream = await StreamModel.findById(params.id);

  if (!stream) {
    return {
      title: 'Stream not found!',
      description: 'Stream not found!',
    };
  }

  return {
    title: `${stream.title} Live Stream`,
    description: `${stream.description || stream.title} Live Stream`,
  };
}

const Page = async ({ params }: Props) => {
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

      <p className="w-full px-4 py-2 border-l-4 border-l-orange-400 bg-orange-100 text-sm text-gray-600 rounded-lg">
        This link might be blocked due to browser restrictions{' '}
        <a
          className="text-blue-600 hover:underline"
          target="_blank"
          href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"
        >
          [CORS]
        </a>
        . To enjoy a seamless experience, please install{' '}
        <a
          className="text-blue-600 hover:underline"
          target="_blank"
          href="https://chromewebstore.google.com/detail/moesif-origincors-changer/digfbfaphojjndkpccljibejjbppifbc"
        >
          Moesif OriginCors Changer
        </a>{' '}
        extension to avoid any issues. Thank you!
      </p>

      {stream.description && <p className="text-sm">{stream.description}</p>}

      <VideoPlayer url={stream.url} />
    </div>
  );
};

export default Page;
