'use client';

import React from 'react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No streams found",
  description = "There are no streams available at the moment. Check back later or add a new stream.",
  icon,
  action
}) => {
  const defaultIcon = (
    <svg 
      className="w-24 h-24 text-gray-300 mx-auto mb-6" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
      strokeWidth={1}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" 
      />
    </svg>
  );

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white rounded-lg border border-gray-200">
      {icon || defaultIcon}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 max-w-md mb-6 leading-relaxed">{description}</p>
      {action}
    </div>
  );
};

export default EmptyState;