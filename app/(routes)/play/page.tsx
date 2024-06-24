'use client';
import { useSearchParams } from 'next/navigation';
import { useRef } from 'react';
import ReactHlsPlayer from 'react-hls-player';

const Page = () => {
  const playerRef = useRef(null);

  const searchParams = useSearchParams();

  const src = atob(searchParams.get('src') || '');

  const isUrl = src.match(/^(http|https):\/\/[^ "]+$/);

  if (!isUrl) {
    return <div>Invalid URL</div>;
  }

  return (
    <div>
      <ReactHlsPlayer
        playerRef={playerRef}
        src={src}
        autoPlay={true}
        controls={true}
        width="100%"
        height="auto"
      />
    </div>
  );
};

export default Page;
