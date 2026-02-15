import { useState, useEffect } from 'react';
import axios from 'axios';
import type { StockDataResponse } from '../types';

export const useStockData = (symbol: string) => {
  const [data, setData] = useState<StockDataResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<StockDataResponse>(`http://localhost:3001/api/history/${symbol}`);
        setData(response.data);
      } catch (err: unknown) {
        console.error(err);
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to fetch data');
        }
      } finally {
        setLoading(false);
      }
    };

    if (symbol) {
      fetchData();
    }
  }, [symbol]);

  return { data, loading, error };
};
