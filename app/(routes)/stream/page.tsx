'use client';

import VoteButton from '@/app/components/Buttons/VoteButton';
import { StreamLink } from '@/types/interface';
import { useSearchParams } from 'next/navigation';
import { useRef } from 'react';
import ReactHlsPlayer from 'react-hls-player';

const Page = () => {
  const playerRef = useRef(null);
  const searchParams = useSearchParams();

  let stream: StreamLink | null = null;
  let isUrl = false;

  try {
    const encodedStream = searchParams.get('stream') || '';
    const decodedString = atob(encodedStream);
    stream = JSON.parse(decodedString);

    isUrl = stream?.url?.match(/^(http|https):\/\/[^ "]+$/) !== null;
  } catch (error) {
    console.error('Error parsing stream data:', error);
  }

  if (!stream || !isUrl) {
    return <div>Invalid URL</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="max-w-lg text-3xl font-semibold leading-normal text-gray-900">
          {stream.title}
        </h1>

        <div className="flex items-center gap-2">
          <VoteButton id={stream._id} count={stream.upvotes} type="upvote" />
          <VoteButton
            id={stream._id}
            count={stream.downvotes}
            type="downvote"
          />
        </div>
      </div>

      <ReactHlsPlayer
        className="rounded-lg shadow-lg"
        playerRef={playerRef}
        src={stream.url}
        autoPlay={true}
        controls={true}
        width="100%"
        height="auto"
      />
    </div>
  );
};

export default Page;
