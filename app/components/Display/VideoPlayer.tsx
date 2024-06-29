'use client';

import { useRef } from 'react';
import ReactHlsPlayer from 'react-hls-player';

const VideoPlayer = ({ url }: { url: string }) => {
  const playerRef = useRef(null);

  return (
    <ReactHlsPlayer
      className="rounded-lg shadow-lg"
      playerRef={playerRef}
      src={url}
      autoPlay={true}
      controls={true}
      width="100%"
      height="auto"
    />
  );
};

export default VideoPlayer;
