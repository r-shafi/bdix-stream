import { Play } from 'lucide-react';
import Link from 'next/link';

interface PlayButtonProps {
  id: string;
  size?: 'sm' | 'md';
  variant?: 'primary' | 'secondary';
}

const PlayButton: React.FC<PlayButtonProps> = ({ 
  id, 
  size = 'md',
  variant = 'primary' 
}) => {
  const baseClasses = 'font-medium focus:outline-none rounded-lg transition-all duration-200 flex items-center justify-center gap-2 focus:ring-2 focus:ring-offset-1 group';
  
  const sizeClasses = size === 'sm' 
    ? 'py-1.5 px-3 text-xs min-w-[70px]' 
    : 'py-2.5 px-4 text-sm min-w-[80px]';

  const variantClasses = variant === 'primary'
    ? 'text-white bg-blue-600 border border-blue-600 hover:bg-blue-700 hover:border-blue-700 focus:ring-blue-500 shadow-sm hover:shadow-md'
    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-blue-700 hover:border-blue-300 focus:ring-blue-500';

  return (
    <Link
      href={`/stream/${id}`}
      className={`${baseClasses} ${sizeClasses} ${variantClasses}`}
      title="Watch stream"
      aria-label="Play stream"
    >
      <Play 
        className={`${size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} group-hover:scale-110 transition-transform`}
        fill="currentColor"
        strokeWidth={0}
      />
      <span>Play</span>
    </Link>
  );
};

export default PlayButton;
