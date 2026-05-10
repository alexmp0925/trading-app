import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import BuyButton from '../../components/green.btn';
import SellButton from '../../components/red_btn';
import { useBinancePrice } from '../../hooks/useBinance';

export default function HomeScreen() {
  // Obtenemos el precio en tiempo real desde React Native
  const btcPrice = useBinancePrice('btcusdt');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body, html { margin: 0; padding: 0; height: 100%; background-color: #131722; overflow: hidden; }
        #chart { width: 100%; height: 100vh; }
      </style>
      <script src="https://unpkg.com/lightweight-charts@4.1.1/dist/lightweight-charts.standalone.production.js"></script>
    </head>
    <body>
      <div id="chart"></div>
      <script>
        window.onload = () => {
          // Inicializar el gráfico de TradingView
          const chart = LightweightCharts.createChart(document.getElementById('chart'), {
            layout: { backgroundColor: '#131722', textColor: '#DDD' },
            grid: { vertLines: { color: '#2B2B43' }, horzLines: { color: '#2B2B43' } },
            timeScale: { timeVisible: true, secondsVisible: false, borderVisible: false }
          });
          
          const candleSeries = chart.addCandlestickSeries({
            upColor: '#26a69a', downColor: '#ef5350',
            borderDownColor: '#ef5350', borderUpColor: '#26a69a',
            wickDownColor: '#ef5350', wickUpColor: '#26a69a',
          });

          // WebSocket para actualizar las velas en tiempo real dentro del HTML
          const socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1s');
          
          socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const k = data.k;
            candleSeries.update({
              time: k.t / 1000,
              open: parseFloat(k.o),
              high: parseFloat(k.h),
              low: parseFloat(k.l),
              close: parseFloat(k.c)
            });
          };

          // Cargar historial inicial para que el gráfico no empiece vacío
          fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1s&limit=100')
            .then(res => res.json())
            .then(data => {
              const history = data.map(d => ({
                time: d[0] / 1000,
                open: parseFloat(d[1]),
                high: parseFloat(d[2]),
                low: parseFloat(d[3]),
                close: parseFloat(d[4])
              }));
              candleSeries.setData(history);
            })
            .catch(err => console.warn("Error cargando historial de Binance"));

          window.addEventListener('resize', () => {
            chart.applyOptions({ width: window.innerWidth, height: window.innerHeight });
          });
        };
      </script>
    </body>
    </html>
  `;

  const handleBuy = () => {
    console.log("Orden de compra enviada");
    if (Platform.OS === 'web') alert(`Comprando BTC a $${btcPrice}`);
  };

  const handleSell = () => {
    console.log("Orden de venta enviada");
    if (Platform.OS === 'web') alert(`Vendiendo BTC a $${btcPrice}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>BTC / USDT - ${btcPrice}</Text>
      </View>
      
      <View style={{ flex: 1 }}>
        {Platform.OS === 'web' ? (
          <iframe srcDoc={htmlContent} style={{ flex: 1, border: 'none' }} title="trading-chart" />
        ) : (
          <WebView 
            source={{ html: htmlContent }} 
            style={{ flex: 1 }} 
            originWhitelist={['*']} 
          />
        )}
      </View>

      <View style={styles.actions}>
        <BuyButton onPress={handleBuy} />
        <SellButton onPress={handleSell} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#131722' },
  header: { 
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20, 
    backgroundColor: '#1e222d', 
    borderBottomWidth: 1, 
    borderBottomColor: '#2a2e39' 
  },
  title: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  actions: {
    padding: 15,
    backgroundColor: '#1e222d', 
    borderTopWidth: 1,
    borderTopColor: '#2a2e39',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});