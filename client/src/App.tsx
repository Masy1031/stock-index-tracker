import { useStockData } from './hooks/useStockData';
import StockChart from './components/StockChart';
import StockTable from './components/StockTable';
import { TrendingUp, RefreshCw } from 'lucide-react';

function App() {
  const { data: sp500, loading: sp500Loading, error: sp500Error } = useStockData('^GSPC');
  const { data: acwi, loading: acwiLoading, error: acwiError } = useStockData('ACWI');

  if (sp500Loading || acwiLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <RefreshCw className="animate-spin text-blue-600" size={32} />
        <p className="text-gray-600 font-medium">Loading market data...</p>
      </div>
    </div>
  );

  if (sp500Error || acwiError) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-red-500 max-w-md">
        <h3 className="text-xl font-bold text-red-600 mb-2">Error Loading Data</h3>
        <p className="text-gray-600">{sp500Error || acwiError}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors cursor-pointer"
        >
          Retry
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 pb-12">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white shadow-sm">
              <TrendingUp size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">Stock Index Tracker</h1>
          </div>
          <div className="text-sm text-gray-500 hidden sm:block">
            Auto-updates monthly & daily
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">

        {/* S&P 500 Section */}
        {sp500 && (
          <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-end justify-between border-b border-gray-200 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">S&P 500</h2>
                <p className="text-gray-500 text-sm">Standard & Poor's 500 Index</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-extrabold text-gray-900">
                  {sp500.meta.regularMarketPrice?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  <span className="text-sm text-gray-500 font-normal ml-1">{sp500.meta.currency}</span>
                </p>
                <p className="text-xs text-gray-400">
                  Last updated: {new Date(sp500.meta.regularMarketTime * 1000).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 h-[500px]">
                <StockChart data={sp500.quotes} title="S&P 500" color="#2563eb" />
              </div>
              <div className="lg:col-span-1 h-[500px]">
                <StockTable data={sp500.quotes} title="S&P 500" />
              </div>
            </div>
          </section>
        )}

        {/* ACWI Section */}
        {acwi && (
          <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
            <div className="flex items-end justify-between border-b border-gray-200 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">All Country (ACWI)</h2>
                <p className="text-gray-500 text-sm">iShares MSCI ACWI ETF</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-extrabold text-gray-900">
                  {acwi.meta.regularMarketPrice?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  <span className="text-sm text-gray-500 font-normal ml-1">{acwi.meta.currency}</span>
                </p>
                <p className="text-xs text-gray-400">
                  Last updated: {new Date(acwi.meta.regularMarketTime * 1000).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 h-[500px]">
                <StockChart data={acwi.quotes} title="ACWI" color="#16a34a" />
              </div>
              <div className="lg:col-span-1 h-[500px]">
                <StockTable data={acwi.quotes} title="ACWI" />
              </div>
            </div>
          </section>
        )}

      </main>
    </div>
  );
}

export default App;
