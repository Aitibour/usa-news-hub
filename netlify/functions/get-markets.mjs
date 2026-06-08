// Proxy Yahoo Finance quotes — avoids browser CORS restrictions
// Cached at CDN edge via Cache-Control header

const SYMBOLS = [
  { key: 'DOW',    symbol: '%5EDJI' },
  { key: 'S&P 500',symbol: '%5EGSPC' },
  { key: 'NASDAQ', symbol: '%5EIXIC' },
  { key: 'OIL',    symbol: 'CL%3DF' },
  { key: 'GOLD',   symbol: 'GC%3DF' },
  { key: 'BTC',    symbol: 'BTC-USD' },
];

async function fetchQuote(symbol) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=2d`;
  const r = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
    signal: AbortSignal.timeout(5000),
  });
  if (!r.ok) return null;
  const d = await r.json();
  const meta = d?.chart?.result?.[0]?.meta;
  if (!meta) return null;
  const price = meta.regularMarketPrice;
  const prev  = meta.previousClose || meta.chartPreviousClose;
  if (!price || !prev) return null;
  const chg = ((price - prev) / prev) * 100;
  return { price, chg };
}

function fmt(key, price, chg) {
  let val;
  if (key === 'OIL' || key === 'GOLD') val = '$' + price.toFixed(2);
  else if (key === 'BTC') val = '$' + price.toLocaleString('en-US', { maximumFractionDigits: 0 });
  else val = price.toLocaleString('en-US', { maximumFractionDigits: 2 });
  const chgStr = (chg >= 0 ? '+' : '') + chg.toFixed(2) + '%';
  return { key, val, chg: chgStr, up: chg >= 0 };
}

export default async function handler() {
  const results = await Promise.allSettled(
    SYMBOLS.map(async ({ key, symbol }) => {
      const q = await fetchQuote(symbol);
      return q ? fmt(key, q.price, q.chg) : null;
    })
  );

  const data = results
    .map(r => r.status === 'fulfilled' ? r.value : null)
    .filter(Boolean);

  return new Response(JSON.stringify({ markets: data }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
      'Access-Control-Allow-Origin': 'https://americapulse.live',
    },
  });
}
