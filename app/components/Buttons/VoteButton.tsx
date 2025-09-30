'use client';

import { voteStream } from '@/utilities/api/stream';
import { ThumbsUp, ThumbsDown, Loader } from 'lucide-react';
import { useState } from 'react';
import Toast from '../Layout/Toast';

interface VoteButtonProps {
  id: string;
  type: 'upvote' | 'downvote';
  count: number;
  size?: 'sm' | 'md';
  showLabel?: boolean;
}

const VoteButton: React.FC<VoteButtonProps> = ({ 
  id, 
  type, 
  count, 
  size = 'md',
  showLabel = false 
}) => {
  const [pending, setPending] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastContent, setToastContent] = useState<any | null>(null);
  const [optimisticCount, setOptimisticCount] = useState(count);
  const [hasVoted, setHasVoted] = useState(false);

  const handleSubmit = async () => {
    if (pending) return;
    
    setPending(true);
    
    // Optimistic update
    if (!hasVoted) {
      setOptimisticCount(prev => prev + 1);
      setHasVoted(true);
    }

    try {
      const response = await voteStream(id, type);
      setToastContent(response);
      setShowToast(true);
      
      if (response.error) {
        // Revert optimistic update on error
        setOptimisticCount(count);
        setHasVoted(false);
      }
    } catch (error) {
      // Revert optimistic update on error
      setOptimisticCount(count);
      setHasVoted(false);
      setToastContent({ error: true, message: 'Failed to vote. Please try again.' });
      setShowToast(true);
    } finally {
      setPending(false);
    }
  };

  const isUpvote = type === 'upvote';
  const Icon = isUpvote ? ThumbsUp : ThumbsDown;
  
  const baseClasses = 'flex items-center justify-center gap-1.5 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeClasses = size === 'sm' 
    ? 'px-2 py-1 text-xs min-w-[44px]' 
    : 'px-3 py-2 text-sm min-w-[56px]';

  const colorClasses = isUpvote
    ? hasVoted 
      ? 'bg-green-100 text-green-700 hover:bg-green-200 focus:ring-green-500 border border-green-300'
      : 'bg-gray-50 text-gray-600 hover:bg-green-50 hover:text-green-600 focus:ring-green-500 border border-gray-200'
    : hasVoted
      ? 'bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500 border border-red-300'
      : 'bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-600 focus:ring-red-500 border border-gray-200';

  return (
    <>
      <button
        onClick={handleSubmit}
        disabled={pending}
        className={`${baseClasses} ${sizeClasses} ${colorClasses}`}
        title={`${isUpvote ? 'Like' : 'Dislike'} this stream`}
        aria-label={`${isUpvote ? 'Upvote' : 'Downvote'} (${optimisticCount} ${isUpvote ? 'likes' : 'dislikes'})`}
      >
        {pending ? (
          <Loader className={`${size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} animate-spin`} />
        ) : (
          <Icon 
            className={`${size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} ${hasVoted ? 'fill-current' : ''} transition-all`}
            strokeWidth={hasVoted ? 0 : 2}
          />
        )}
        <span className={`font-medium tabular-nums ${pending ? 'opacity-50' : ''}`}>
          {optimisticCount}
        </span>
        {showLabel && (
          <span className="hidden sm:inline">
            {isUpvote ? 'Like' : 'Dislike'}
          </span>
        )}
      </button>

      {showToast && toastContent && (
        <Toast
          type={toastContent.error ? 'error' : 'success'}
          message={toastContent.message}
          setter={setShowToast}
        />
      )}
    </>
  );
};

export default VoteButton;
