import express from 'express';
import yahooFinance from 'yahoo-finance2';
import cors from 'cors';

const app = express();
const yf = new yahooFinance();
const port = 3001;

app.use(cors());

app.get('/api/history/:symbol', async (req, res) => {
  const symbol = req.params.symbol;
  const { period1 } = req.query;

  const period1Date = period1 ? new Date(period1) : new Date(new Date().setFullYear(new Date().getFullYear() - 5));
  const period2Date = new Date();

  const queryOptions = {
    period1: period1Date.toISOString().split('T')[0],
    period2: period2Date.toISOString().split('T')[0],
    interval: '1d',
  };

  try {
    const result = await yf.chart(symbol, queryOptions);
    res.json(result);
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
