import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  // Este HTML ahora es AUTÓNOMO: él mismo se conecta a Binance
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
        // Esperar a que la librería cargue
        window.onload = () => {
          if (typeof LightweightCharts === 'undefined') {
            document.body.innerHTML = "<div style='color:white; padding:20px;'>Error: No se pudo cargar la librería de gráficos.</div>";
            return;
          }

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

          // WebSocket para tiempo real
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

          // Intentar historial sin que el error rompa el script
          fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=100')
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
            .catch(err => console.warn("CORS evitó cargar el historial. Esperando datos en vivo..."));

          window.addEventListener('resize', () => {
            chart.applyOptions({ width: window.innerWidth, height: window.innerHeight });
          });
        };
      </script>
    </body>
    </html>
  `;

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>BTC / USDT (PC Mode)</Text>
        </View>
        <iframe 
          srcDoc={htmlContent} 
          style={{ flex: 1, border: 'none' }} 
          title="trading-chart"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>BTC / USDT (Mobile)</Text>
      </View>
      <WebView 
        source={{ html: htmlContent }} 
        style={{ flex: 1 }} 
        originWhitelist={['*']}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#131722' },
  header: { padding: 20, backgroundColor: '#1e222d', borderBottomWidth: 1, borderBottomColor: '#2a2e39' },
  title: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});