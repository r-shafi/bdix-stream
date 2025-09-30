'use client';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

interface ClipboardButtonProps {
  src: string;
  size?: 'sm' | 'md';
  variant?: 'default' | 'minimal';
}

const ClipboardButton: React.FC<ClipboardButtonProps> = ({ 
  src, 
  size = 'md',
  variant = 'default' 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(src);
      setCopied(true);
      
      // Reset after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = src;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error('Fallback copy failed: ', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  const baseClasses = 'font-medium focus:outline-none rounded-lg border transition-all duration-200 flex items-center justify-center gap-2 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1';
  
  const sizeClasses = size === 'sm' 
    ? 'py-1.5 px-3 text-xs min-w-[70px]' 
    : 'py-2.5 px-4 text-sm min-w-[90px]';

  const variantClasses = variant === 'minimal'
    ? 'text-gray-500 bg-transparent border-transparent hover:bg-gray-100 hover:text-gray-700'
    : copied
    ? 'text-green-700 bg-green-50 border-green-200 hover:bg-green-100'
    : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50 hover:text-blue-700 hover:border-blue-300';

  const Icon = copied ? Check : Copy;

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`${baseClasses} ${sizeClasses} ${variantClasses}`}
      title={copied ? 'Copied to clipboard' : 'Copy URL to clipboard'}
      aria-label={copied ? 'URL copied' : 'Copy URL'}
    >
      <Icon 
        className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} 
        strokeWidth={copied ? 2.5 : 2}
      />
      <span className={copied ? 'font-semibold' : ''}>
        {copied ? 'Copied!' : 'Copy'}
      </span>
    </button>
  );
};

export default ClipboardButton;
