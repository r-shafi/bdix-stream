'use client';

import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  setter: Dispatch<SetStateAction<boolean>>;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center';
}

const Toast: React.FC<ToastProps> = ({ 
  message, 
  type, 
  setter, 
  duration = 4000,
  position = 'top-right' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setter(false);
    }, 300); // Match the exit animation duration
  };

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true);

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, handleClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'error':
        return <XCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getColorClasses = () => {
    switch (type) {
      case 'success':
        return {
          border: 'border-green-200',
          bg: 'bg-white',
          iconWrapper: 'bg-green-100 text-green-600',
          text: 'text-gray-800'
        };
      case 'error':
        return {
          border: 'border-red-200',
          bg: 'bg-white',
          iconWrapper: 'bg-red-100 text-red-600',
          text: 'text-gray-800'
        };
      case 'warning':
        return {
          border: 'border-amber-200',
          bg: 'bg-white',
          iconWrapper: 'bg-amber-100 text-amber-600',
          text: 'text-gray-800'
        };
      case 'info':
        return {
          border: 'border-blue-200',
          bg: 'bg-white',
          iconWrapper: 'bg-blue-100 text-blue-600',
          text: 'text-gray-800'
        };
      default:
        return {
          border: 'border-gray-200',
          bg: 'bg-white',
          iconWrapper: 'bg-gray-100 text-gray-600',
          text: 'text-gray-800'
        };
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'top-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      default:
        return 'top-4 right-4';
    }
  };

  const colors = getColorClasses();
  const positionClasses = getPositionClasses();

  return (
    <div
      className={`
        fixed z-50 flex items-center w-full max-w-sm p-4 space-x-4 rounded-lg shadow-lg border transition-all duration-300 ease-in-out
        ${colors.bg} ${colors.border} ${positionClasses}
        ${isVisible && !isLeaving ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'}
      `}
      role="alert"
      aria-live="polite"
    >
      {/* Icon */}
      <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${colors.iconWrapper}`}>
        {getIcon()}
      </div>

      {/* Message */}
      <div className={`text-sm font-medium ${colors.text} flex-1`}>
        {message}
      </div>

      {/* Close button */}
      <button
        type="button"
        className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        onClick={handleClose}
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-gray-200 rounded-b-lg overflow-hidden">
        <div 
          className={`h-full transition-all ease-linear ${
            type === 'success' ? 'bg-green-500' :
            type === 'error' ? 'bg-red-500' :
            type === 'warning' ? 'bg-amber-500' :
            'bg-blue-500'
          }`}
          style={{
            width: '100%',
            animation: `toast-progress ${duration}ms linear forwards`
          }}
        />
      </div>

      <style jsx>{`
        @keyframes toast-progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
};

export default Toast;
