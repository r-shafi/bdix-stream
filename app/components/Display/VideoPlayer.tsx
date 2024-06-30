'use client';

import HLS from 'hls.js';
import { useEffect, useRef } from 'react';

const VideoPlayer = ({ url }: { url: string }) => {
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (HLS.isSupported()) {
      const hls = new HLS();
      hls.loadSource(url);
      hls.attachMedia(playerRef.current!);
      hls.on(HLS.Events.MANIFEST_PARSED, () => {
        playerRef.current?.play();
      });

      return () => {
        hls.destroy();
      };
    } else if (
      playerRef.current?.canPlayType('application/vnd.apple.mpegurl')
    ) {
      playerRef.current.src = url;
      playerRef.current.addEventListener('loadedmetadata', () => {
        playerRef.current?.play();
      });
    }
  }, [url]);

  return (
    <video
      ref={playerRef}
      controls
      autoPlay
      playsInline
      className="rounded-lg shadow-lg w-full h-full"
    />
  );
};

export default VideoPlayer;
