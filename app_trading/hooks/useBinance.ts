import { useState, useEffect } from 'react';

export interface CoinData {
  price: string;
  change: string;
}

// HOOK PARA MARKETS (Varias monedas a la vez)
export function useBinanceMarkets(symbols: string[]) {
  const [data, setData] = useState<Record<string, CoinData>>({});

  useEffect(() => {
    if (symbols.length === 0) return;
    const streams = symbols.map(s => `${s.toLowerCase()}@ticker`).join('/');
    const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (!msg.data) return;
      const symbolKey = msg.stream.split('@')[0];
      setData(prev => ({
        ...prev,
        [symbolKey]: {
          price: parseFloat(msg.data.c).toLocaleString(undefined, { minimumFractionDigits: 2 }),
          change: (parseFloat(msg.data.P) >= 0 ? '+' : '') + parseFloat(msg.data.P).toFixed(2) + '%'
        }
      }));
    };
    return () => ws.close();
  }, [symbols]);

  return data;
}

// HOOK PARA TRADING (Una sola moneda muy precisa)
export function useBinancePrice(symbol: string = 'btcusdt') {
  const [price, setPrice] = useState<string>('0.00');

  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_1s`);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.k) setPrice(parseFloat(data.k.c).toFixed(2));
    };
    return () => ws.close();
  }, [symbol]);

  return price;
}