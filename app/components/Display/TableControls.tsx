'use client';

import { Search, Filter, SortAsc, SortDesc, Columns, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface TableControlsProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  sortField: string;
  sortDirection: 'asc' | 'desc';
  onSortChange: (field: string, direction: 'asc' | 'desc') => void;
  filterType: string;
  onFilterChange: (type: string) => void;
  visibleColumns: string[];
  onColumnToggle: (column: string) => void;
  availableColumns: { key: string; label: string }[];
  availableTypes: string[];
  totalResults: number;
}

const TableControls: React.FC<TableControlsProps> = ({
  searchTerm,
  onSearchChange,
  sortField,
  sortDirection,
  onSortChange,
  filterType,
  onFilterChange,
  visibleColumns,
  onColumnToggle,
  availableColumns,
  availableTypes,
  totalResults
}) => {
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const columnMenuRef = useRef<HTMLDivElement>(null);
  const filterMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (columnMenuRef.current && !columnMenuRef.current.contains(event.target as Node)) {
        setShowColumnMenu(false);
      }
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target as Node)) {
        setShowFilterMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-gray-50/50 rounded-lg border border-gray-200">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search streams..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex gap-2">
        {/* Filter */}
        <div className="relative" ref={filterMenuRef}>
          <button
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border rounded-lg transition-colors ${
              filterType ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Filter className="h-4 w-4" />
            {filterType ? `Type: ${filterType}` : 'Filter'}
          </button>
          
          {showFilterMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
              <div className="p-2">
                <button
                  onClick={() => {
                    onFilterChange('');
                    setShowFilterMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                    !filterType ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                  }`}
                >
                  All types
                </button>
                {availableTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      onFilterChange(type);
                      setShowFilterMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors capitalize ${
                      filterType === type ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Column Toggle */}
        <div className="relative" ref={columnMenuRef}>
          <button
            onClick={() => setShowColumnMenu(!showColumnMenu)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Columns className="h-4 w-4" />
            Columns
          </button>
          
          {showColumnMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
              <div className="p-2">
                {availableColumns.map((column) => (
                  <label
                    key={column.key}
                    className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-50 rounded cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={visibleColumns.includes(column.key)}
                      onChange={() => onColumnToggle(column.key)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    {column.label}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center text-sm text-gray-600 whitespace-nowrap">
        {totalResults} {totalResults === 1 ? 'result' : 'results'}
      </div>
    </div>
  );
};

export default TableControls;