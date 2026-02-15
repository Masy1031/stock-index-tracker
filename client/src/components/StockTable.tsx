import React, { useState, useMemo } from 'react';
import type { StockQuote } from '../types';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface StockTableProps {
  data: StockQuote[];
  title: string;
}

const StockTable: React.FC<StockTableProps> = ({ data, title }) => {
  const [viewMode, setViewMode] = useState<'daily' | 'monthly'>('monthly');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const processedData = useMemo(() => {
    if (viewMode === 'daily') {
      return [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      // Monthly aggregation: take the last entry of each month
      const grouped = data.reduce((acc, quote) => {
        const date = new Date(quote.date);
        const key = `${date.getFullYear()}-${date.getMonth()}`;
        acc[key] = quote;
        return acc;
      }, {} as Record<string, StockQuote>);

      return Object.values(grouped).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  }, [data, viewMode]);

  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const currentData = processedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h3 className="font-bold text-gray-700 flex items-center gap-2">
          <Calendar size={18} />
          {title} - {viewMode === 'daily' ? 'Daily' : 'Monthly'} Data
        </h3>
        <div className="flex bg-gray-200 rounded-lg p-1">
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors cursor-pointer ${
              viewMode === 'daily' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => { setViewMode('daily'); setCurrentPage(1); }}
          >
            Daily
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors cursor-pointer ${
              viewMode === 'monthly' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => { setViewMode('monthly'); setCurrentPage(1); }}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="overflow-x-auto flex-grow">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3 text-right">Open</th>
              <th className="px-6 py-3 text-right">High</th>
              <th className="px-6 py-3 text-right">Low</th>
              <th className="px-6 py-3 text-right">Close</th>
              <th className="px-6 py-3 text-right">Volume</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((quote) => {
                const dateStr = new Date(quote.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: viewMode === 'daily' ? 'numeric' : undefined
                });
                return (
              <tr key={quote.date} className="bg-white border-b hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {dateStr}
                </td>
                <td className="px-6 py-4 text-right">{quote.open?.toFixed(2) ?? '-'}</td>
                <td className="px-6 py-4 text-right text-green-600">{quote.high?.toFixed(2) ?? '-'}</td>
                <td className="px-6 py-4 text-right text-red-600">{quote.low?.toFixed(2) ?? '-'}</td>
                <td className="px-6 py-4 text-right font-bold">{quote.close?.toFixed(2) ?? '-'}</td>
                <td className="px-6 py-4 text-right text-gray-500">{(quote.volume / 1000).toFixed(1)}k</td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
        <span className="text-xs text-gray-500">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StockTable;
