'use client';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const StreamTableSkeleton = () => {
  return (
    <div className="relative overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <table className="w-full text-left">
        <thead className="text-sm font-semibold text-gray-900 bg-gray-50/80 sticky top-0 z-10 backdrop-blur-sm border-b border-gray-200">
          <tr className="min-h-[56px]">
            {['Title', 'Description', 'Stream', 'Type', 'Uploader', 'Created at', 'Votes'].map((header) => (
              <th key={header} className="px-6 py-4 font-semibold text-gray-900 tracking-wide">
                <Skeleton width={80} height={16} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index} className="min-h-[64px] hover:bg-gray-50/50 transition-colors duration-150">
              <td className="px-6 py-4">
                <Skeleton width={120} height={20} />
              </td>
              <td className="px-6 py-4">
                <Skeleton width={200} height={16} />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <Skeleton width={40} height={32} borderRadius={20} />
                  <Skeleton width={60} height={32} borderRadius={20} />
                </div>
              </td>
              <td className="px-6 py-4">
                <Skeleton width={24} height={24} borderRadius={12} />
              </td>
              <td className="px-6 py-4">
                <Skeleton width={80} height={16} />
              </td>
              <td className="px-6 py-4">
                <Skeleton width={100} height={16} />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Skeleton width={30} height={24} borderRadius={12} />
                  <Skeleton width={30} height={24} borderRadius={12} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StreamTableSkeleton;