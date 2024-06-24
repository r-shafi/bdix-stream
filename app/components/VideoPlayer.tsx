'use client';
import { useRef, useState } from 'react';
import ReactHlsPlayer from 'react-hls-player';

interface VideoPlayerProps {
  src: string;
}

export const PlayButton = ({ src }: { src: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="flex justify-center items-center"
      >
        <svg
          className="h-6 w-6"
          data-slot="icon"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          ></path>
        </svg>
      </button>

      {isPlaying && <VideoPlayer src={src}></VideoPlayer>}
    </>
  );
};

const VideoPlayer = ({ src }: VideoPlayerProps) => {
  const playerRef = useRef(null);

  return (
    <ReactHlsPlayer
      className="fixed bottom-8 right-8 max-w-screen-sm"
      playerRef={playerRef}
      src={src}
      autoPlay={true}
      controls={true}
      width="100%"
      height="auto"
    />
  );
};

export default VideoPlayer;
