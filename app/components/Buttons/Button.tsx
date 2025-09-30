import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  title, 
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap';
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[36px]',
    md: 'px-4 py-2.5 text-base min-h-[44px]',
    lg: 'px-6 py-3 text-lg min-h-[48px]'
  };

  const variantClasses = {
    primary: 'bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 hover:border-blue-700 focus:ring-blue-500 shadow-sm hover:shadow-md',
    secondary: 'bg-gray-600 text-white border border-gray-600 hover:bg-gray-700 hover:border-gray-700 focus:ring-gray-500 shadow-sm hover:shadow-md',
    outline: 'bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50 hover:text-blue-700 focus:ring-blue-500',
    ghost: 'bg-transparent text-gray-700 border border-transparent hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500'
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {isLoading && (
        <svg 
          className={`animate-spin -ml-1 ${size === 'sm' ? 'mr-2 h-4 w-4' : size === 'lg' ? 'mr-3 h-5 w-5' : 'mr-2 h-4 w-4'}`}
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      
      {!isLoading && leftIcon && (
        <span className={size === 'sm' ? 'mr-2' : size === 'lg' ? 'mr-3' : 'mr-2'}>
          {leftIcon}
        </span>
      )}
      
      <span>{title}</span>
      
      {!isLoading && rightIcon && (
        <span className={size === 'sm' ? 'ml-2' : size === 'lg' ? 'ml-3' : 'ml-2'}>
          {rightIcon}
        </span>
      )}
    </button>
  );
};

export default Button;
