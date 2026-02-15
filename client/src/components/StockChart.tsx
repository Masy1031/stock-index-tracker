import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { StockQuote } from '../types';

interface StockChartProps {
  data: StockQuote[];
  title: string;
  color?: string;
}

const StockChart: React.FC<StockChartProps> = ({ data, title, color = '#8884d8' }) => {
  const formattedData = data.map((item) => ({
    ...item,
    formattedDate: new Date(item.date).toLocaleDateString(),
  }));

  return (
    <div className="w-full h-full bg-white p-4 rounded-lg shadow-md border border-gray-100">
      <h3 className="text-lg font-bold mb-4 text-gray-700">{title} Price History</h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={formattedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis
            dataKey="formattedDate"
            tick={{ fontSize: 12, fill: '#666' }}
            interval="preserveStartEnd"
            minTickGap={50}
          />
          <YAxis
            domain={['auto', 'auto']}
            tick={{ fontSize: 12, fill: '#666' }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
            labelStyle={{ color: '#333', fontWeight: 'bold' }}
            formatter={(value: number | string | Array<number | string> | undefined) => [
              `${typeof value === 'number' ? value.toFixed(2) : value ?? '-'}`,
              'Close Price',
            ]}
          />
          <Legend wrapperStyle={{ paddingTop: '10px' }} />
          <Line
            type="monotone"
            dataKey="close"
            stroke={color}
            strokeWidth={2}
            activeDot={{ r: 6 }}
            dot={false}
            name={title}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
