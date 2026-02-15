export interface StockQuote {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adjclose?: number;
}

export interface StockMeta {
  currency: string;
  symbol: string;
  exchangeName: string;
  instrumentType: string;
  firstTradeDate: number;
  regularMarketTime: number;
  gmtoffset: number;
  timezone: string;
  exchangeTimezoneName: string;
  regularMarketPrice: number;
  chartPreviousClose: number;
  priceHint: number;
  dataGranularity: string;
  range: string;
  validRanges: string[];
}

export interface StockDataResponse {
  meta: StockMeta;
  quotes: StockQuote[];
}
