'use client';

import { StreamLink } from '@/types/interface';
import { formatDistanceToNow } from 'date-fns';
import { ArrowUpDown, ArrowUp, ArrowDown, ExternalLink, Eye } from 'lucide-react';
import { FC, useState, useMemo, useEffect } from 'react';
import ClipboardButton from '../Buttons/ClipboardButton';
import PlayButton from '../Buttons/PlayButton';
import VoteButton from '../Buttons/VoteButton';
import StreamIcon from './StreamIcon';
import TableControls from './TableControls';
import Pagination from './Pagination';
import StreamCard from './StreamCard';
import EmptyState from './EmptyState';
import StreamTableSkeleton from './StreamTableSkeleton';

interface TableProps {
  data: StreamLink[];
  isLoading?: boolean;
}

type SortField = 'title' | 'type' | 'username' | 'createdAt' | 'upvotes' | 'downvotes';
type SortDirection = 'asc' | 'desc';

const AVAILABLE_COLUMNS = [
  { key: 'title', label: 'Title' },
  { key: 'description', label: 'Description' },
  { key: 'stream', label: 'Stream' },
  { key: 'type', label: 'Type' },
  { key: 'uploader', label: 'Uploader' },
  { key: 'createdAt', label: 'Created at' },
  { key: 'votes', label: 'Votes' },
];

const DEFAULT_VISIBLE_COLUMNS = ['title', 'stream', 'type', 'uploader', 'createdAt', 'votes'];

const Table: FC<TableProps> = ({ data, isLoading = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filterType, setFilterType] = useState('');
  const [filterUploader, setFilterUploader] = useState('');
  const [visibleColumns, setVisibleColumns] = useState(DEFAULT_VISIBLE_COLUMNS);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Responsive view mode
  useEffect(() => {
    const handleResize = () => {
      setViewMode(window.innerWidth < 768 ? 'cards' : 'table');
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const availableTypes = useMemo(() => {
    return Array.from(new Set(data.map(stream => stream.type))).sort();
  }, [data]);

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return {
      relative: formatDistanceToNow(date, { addSuffix: true }),
      absolute: new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        year: 'numeric'
      }).format(date)
    };
  };

  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter(stream => {
      const matchesSearch = 
        stream.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (stream.description && stream.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        stream.user?.username.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = !filterType || stream.type === filterType;
      const matchesUploader = !filterUploader || stream.user?.username === filterUploader;
      
      return matchesSearch && matchesType && matchesUploader;
    });

    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortField) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'type':
          aValue = a.type.toLowerCase();
          bValue = b.type.toLowerCase();
          break;
        case 'username':
          aValue = a.user?.username.toLowerCase() || '';
          bValue = b.user?.username.toLowerCase() || '';
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        case 'upvotes':
          aValue = a.upvotes;
          bValue = b.upvotes;
          break;
        case 'downvotes':
          aValue = a.downvotes;
          bValue = b.downvotes;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [data, searchTerm, sortField, sortDirection, filterType, filterUploader]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  const handleSort = (field: string, direction?: 'asc' | 'desc') => {
    const sortableField = field as SortField;
    if (direction) {
      setSortField(sortableField);
      setSortDirection(direction);
    } else if (sortField === sortableField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(sortableField);
      setSortDirection('asc');
    }
  };

  const handleColumnToggle = (column: string) => {
    if (visibleColumns.includes(column)) {
      if (visibleColumns.length > 1) {
        setVisibleColumns(visibleColumns.filter(col => col !== column));
      }
    } else {
      setVisibleColumns([...visibleColumns, column]);
    }
  };

  const handleUploaderClick = (username: string) => {
    setFilterUploader(username);
    setCurrentPage(1);
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 opacity-50" />;
    }
    return sortDirection === 'asc' 
      ? <ArrowUp className="h-4 w-4 text-blue-600" />
      : <ArrowDown className="h-4 w-4 text-blue-600" />;
  };

  if (isLoading) {
    return <StreamTableSkeleton />;
  }

  if (data.length === 0) {
    return (
      <EmptyState
        title="No streams available"
        description="There are no streams to display at the moment. Check back later or add a new stream to get started."
      />
    );
  }

  return (
    <div className="space-y-4">
      <TableControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={(field, direction) => handleSort(field, direction)}
        filterType={filterType}
        onFilterChange={setFilterType}
        visibleColumns={visibleColumns}
        onColumnToggle={handleColumnToggle}
        availableColumns={AVAILABLE_COLUMNS}
        availableTypes={availableTypes}
        totalResults={filteredAndSortedData.length}
      />

      {filterUploader && (
        <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <span className="text-sm text-blue-700">
            Showing streams by: <strong>{filterUploader}</strong>
          </span>
          <button
            onClick={() => setFilterUploader('')}
            className="text-blue-600 hover:text-blue-800 text-sm underline"
          >
            Clear filter
          </button>
        </div>
      )}

      {filteredAndSortedData.length === 0 ? (
        <EmptyState
          title="No matching streams found"
          description="Try adjusting your search terms or filters to find what you're looking for."
        />
      ) : viewMode === 'cards' ? (
        <div className="grid gap-4">
          {paginatedData.map((stream) => (
            <StreamCard
              key={stream._id.toString()}
              stream={stream}
              onUploaderClick={handleUploaderClick}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/80 sticky top-0 z-10 backdrop-blur-sm border-b border-gray-200">
                <tr className="min-h-[56px]">
                  {visibleColumns.includes('title') && (
                    <th className="px-6 py-4 text-left">
                      <button
                        onClick={() => handleSort('title')}
                        className="flex items-center gap-2 font-semibold text-gray-900 hover:text-blue-600 transition-colors group"
                      >
                        Title
                        {getSortIcon('title')}
                      </button>
                    </th>
                  )}
                  {visibleColumns.includes('description') && (
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">
                      Description
                    </th>
                  )}
                  {visibleColumns.includes('stream') && (
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">
                      Actions
                    </th>
                  )}
                  {visibleColumns.includes('type') && (
                    <th className="px-6 py-4 text-left">
                      <button
                        onClick={() => handleSort('type')}
                        className="flex items-center gap-2 font-semibold text-gray-900 hover:text-blue-600 transition-colors group"
                      >
                        Type
                        {getSortIcon('type')}
                      </button>
                    </th>
                  )}
                  {visibleColumns.includes('uploader') && (
                    <th className="px-6 py-4 text-left">
                      <button
                        onClick={() => handleSort('username')}
                        className="flex items-center gap-2 font-semibold text-gray-900 hover:text-blue-600 transition-colors group"
                      >
                        Uploader
                        {getSortIcon('username')}
                      </button>
                    </th>
                  )}
                  {visibleColumns.includes('createdAt') && (
                    <th className="px-6 py-4 text-left">
                      <button
                        onClick={() => handleSort('createdAt')}
                        className="flex items-center gap-2 font-semibold text-gray-900 hover:text-blue-600 transition-colors group"
                      >
                        Created at
                        {getSortIcon('createdAt')}
                      </button>
                    </th>
                  )}
                  {visibleColumns.includes('votes') && (
                    <th className="px-6 py-4 text-left">
                      <button
                        onClick={() => handleSort('upvotes')}
                        className="flex items-center gap-2 font-semibold text-gray-900 hover:text-blue-600 transition-colors group"
                      >
                        Votes
                        {getSortIcon('upvotes')}
                      </button>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedData.map((stream, index) => {
                  const dateInfo = formatDate(stream.createdAt);
                  const isEven = index % 2 === 0;
                  
                  return (
                    <tr 
                      key={stream._id.toString()}
                      className={`min-h-[64px] hover:bg-blue-50/50 transition-all duration-150 cursor-pointer group ${
                        isEven ? 'bg-white' : 'bg-gray-50/30'
                      }`}
                    >
                      {visibleColumns.includes('title') && (
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900 text-base leading-relaxed group-hover:text-blue-700 transition-colors">
                            {stream.title}
                          </div>
                        </td>
                      )}
                      {visibleColumns.includes('description') && (
                        <td className="px-6 py-4">
                          <div className="text-gray-600 text-base leading-relaxed max-w-xs truncate" title={stream.description || '-'}>
                            {stream.description || '-'}
                          </div>
                        </td>
                      )}
                      {visibleColumns.includes('stream') && (
                        <td className="px-6 py-4">
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
                        </td>
                      )}
                      {visibleColumns.includes('type') && (
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <StreamIcon type={stream.type} />
                            <span className="text-sm font-medium text-gray-700 capitalize">
                              {stream.type}
                            </span>
                          </div>
                        </td>
                      )}
                      {visibleColumns.includes('uploader') && (
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleUploaderClick(stream.user?.username || '')}
                            className={`text-base font-medium hover:underline transition-colors ${
                              stream.user?.role === 'admin'
                                ? 'text-red-600 hover:text-red-700'
                                : stream.user?.role === 'moderator'
                                ? 'text-blue-600 hover:text-blue-700'
                                : 'text-gray-900 hover:text-blue-600'
                            }`}
                          >
                            {stream.user?.username}
                            {stream.user?.role !== 'user' && (
                              <span className="ml-2 text-xs font-bold uppercase tracking-wide opacity-75">
                                {stream.user?.role}
                              </span>
                            )}
                          </button>
                        </td>
                      )}
                      {visibleColumns.includes('createdAt') && (
                        <td className="px-6 py-4">
                          <div 
                            className="text-gray-600 text-base leading-relaxed cursor-help"
                            title={dateInfo.absolute}
                          >
                            {dateInfo.relative}
                          </div>
                        </td>
                      )}
                      {visibleColumns.includes('votes') && (
                        <td className="px-6 py-4">
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
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredAndSortedData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(newItemsPerPage) => {
          setItemsPerPage(newItemsPerPage);
          setCurrentPage(1);
        }}
      />
    </div>
  );
};

export default Table;
