'use client';

import { StreamLink } from '@/types/interface';
import { formatDistanceToNow } from 'date-fns';
import { Clock, ExternalLink, User, TrendingUp, TrendingDown } from 'lucide-react';
import ClipboardButton from '../Buttons/ClipboardButton';
import PlayButton from '../Buttons/PlayButton';
import VoteButton from '../Buttons/VoteButton';
import StreamIcon from './StreamIcon';

interface StreamCardProps {
  stream: StreamLink;
  onUploaderClick: (username: string) => void;
}

const StreamCard: React.FC<StreamCardProps> = ({ stream, onUploaderClick }) => {
  const formatDate = (dateString: Date) => {
    return {
      relative: formatDistanceToNow(new Date(dateString), { addSuffix: true }),
      absolute: new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        year: 'numeric'
      }).format(new Date(dateString))
    };
  };

  const dateInfo = formatDate(stream.createdAt);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-1 line-clamp-2">
              {stream.title}
            </h3>
            {stream.description && stream.description !== '-' && (
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                {stream.description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <StreamIcon type={stream.type} />
            <span className="text-xs font-medium text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded-full">
              {stream.type}
            </span>
          </div>
        </div>

        {/* Uploader and Date */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <button
            onClick={() => onUploaderClick(stream.user?.username || '')}
            className={`flex items-center gap-2 hover:text-gray-700 transition-colors ${
              stream.user?.role === 'admin'
                ? 'text-red-600 hover:text-red-700'
                : stream.user?.role === 'moderator'
                ? 'text-blue-600 hover:text-blue-700'
                : ''
            }`}
          >
            <User className="h-4 w-4" />
            <span className="font-medium">{stream.user?.username}</span>
            {stream.user?.role !== 'user' && (
              <span className="text-xs font-bold uppercase tracking-wide">
                {stream.user?.role}
              </span>
            )}
          </button>
          
          <div className="flex items-center gap-1" title={dateInfo.absolute}>
            <Clock className="h-4 w-4" />
            <time className="text-xs">{dateInfo.relative}</time>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PlayButton id={stream._id.toString()} />
            <ClipboardButton src={stream.url} />
            <a
              href={stream.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          {/* Votes */}
          <div className="flex items-center gap-2">
            <VoteButton 
              id={stream._id.toString()} 
              type="upvote" 
              count={stream.upvotes} 
            />
            <VoteButton 
              id={stream._id.toString()} 
              type="downvote" 
              count={stream.downvotes} 
            />
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              {stream.upvotes} likes
            </span>
            <span className="flex items-center gap-1">
              <TrendingDown className="h-3 w-3 text-red-500" />
              {stream.downvotes} dislikes
            </span>
          </div>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" title="Live" />
        </div>
      </div>
    </div>
  );
};

export default StreamCard;