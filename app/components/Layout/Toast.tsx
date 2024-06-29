'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  setter: Dispatch<SetStateAction<boolean>>;
}

const Toast = ({ message, type, setter }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setter(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={
        'fixed top-8 right-8 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow border' +
        (type === 'success' ? ' border-green-500' : ' border-red-500')
      }
    >
      <div
        className={
          'inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg' +
          (type === 'success'
            ? ' bg-green-100 text-green-500'
            : ' bg-red-100 text-red-500')
        }
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d={
              type === 'success'
                ? 'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z'
                : 'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z'
            }
          />
        </svg>
      </div>

      <div className="ms-3 text-sm font-normal">{message}</div>

      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
        onClick={() => setter(false)}
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};

export default Toast;
