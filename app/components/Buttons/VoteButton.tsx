'use client';

import { voteStream } from '@/utilities/api/stream';
import { useState } from 'react';
import Toast from '../Layout/Toast';

interface VoteButtonProps {
  id: string;
  type: 'upvote' | 'downvote';
  count: number;
}

const VoteButton = ({ id, type, count }: VoteButtonProps) => {
  const [pending, setPending] = useState(false);
  const [show, setShow] = useState(false);
  const [content, setContent] = useState<any | null>(null);

  const handleSubmit = async () => {
    if (pending) return;
    setPending(true);
    const response = await voteStream(JSON.parse(id), type);
    setContent(response);
    setShow(true);
    setPending(false);
  };

  return (
    <>
      <button
        onClick={handleSubmit}
        className="flex items-center gap-2 bg-transparent hover:bg-gray-100 transition-all px-2 py-1 rounded-md"
      >
        {type === 'upvote' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#2c3e50"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#2c3e50"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3" />
          </svg>
        )}
        <span>{count}</span>
      </button>

      {show && content && (
        <Toast
          type={content.error ? 'error' : 'success'}
          message={content.message}
          setter={setShow}
        />
      )}
    </>
  );
};

export default VoteButton;
