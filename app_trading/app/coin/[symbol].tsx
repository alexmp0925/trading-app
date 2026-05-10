import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import { useBinancePrice } from '../../hooks/useBinance';

const TIME_RANGES = ['1H', '1D', '1W', '1M', '1Y'];

export default function CoinDetailScreen() {
  const router = useRouter();
  
  // Recibimos los datos dinámicos que nos mandó la pantalla Markets
  const { symbol, coinId, coinName } = useLocalSearchParams();
  const currentSymbol = (symbol as string) || 'btcusdt';
  const binanceAbbreviation = currentSymbol.replace('usdt', '').toUpperCase();
  
  const livePrice = useBinancePrice(currentSymbol);
  const [activeRange, setActiveRange] = useState('1D');
  const [coinInfo, setCoinInfo] = useState<any>(null);

  // FETCH DINÁMICO usando el "coinId" automático
  useEffect(() => {
    const fetchRealCoinData = async () => {
      setCoinInfo(null); 
      if (!coinId) return; 

      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`);
        const data = await response.json();

        let description = data.description?.en || "Información no disponible.";
        if (description.includes('.')) description = description.split('.')[0] + '.';

        setCoinInfo({
          rank: `NO.${data.market_cap_rank}`,
          marketCap: `$ ${(data.market_data.market_cap.usd / 1e9).toFixed(2)}B`, 
          supply: `${(data.market_data.circulating_supply / 1e6).toFixed(2)}M`,
          aboutText: description 
        });
      } catch (error) {
        setCoinInfo({ rank: '--', marketCap: '--', supply: '--', aboutText: 'Error cargando datos.' });
      }
    };
    fetchRealCoinData();
  }, [coinId]);

  const getBinanceInterval = (range: string) => {
    switch(range) {
      case '1H': return { interval: '1m', limit: 60 };
      case '1D': return { interval: '15m', limit: 96 };
      case '1W': return { interval: '2h', limit: 84 };
      case '1M': return { interval: '8h', limit: 90 };
      case '1Y': return { interval: '1d', limit: 365 };
      default: return { interval: '15m', limit: 96 };
    }
  };

  const { interval, limit } = getBinanceInterval(activeRange);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://unpkg.com/lightweight-charts@4.1.1/dist/lightweight-charts.standalone.production.js"></script>
    </head>
    <body style="margin:0; background:#0B0E11;">
      <div id="chart" style="width:100%; height:300px;"></div>
      <script>
        window.onload = () => {
          const chart = LightweightCharts.createChart(document.getElementById('chart'), {
            layout: { backgroundColor: '#0B0E11', textColor: '#848E9C' },
            grid: { vertLines: { visible: false }, horzLines: { color: '#1E2329' } },
            timeScale: { visible: true, borderVisible: false, timeVisible: true },
            rightPriceScale: { borderVisible: false },
            handleScroll: false,
            handleScale: false,
          });
          
          const areaSeries = chart.addAreaSeries({ 
            lineColor: '#FCD535', 
            topColor: 'rgba(252, 213, 53, 0.4)', 
            bottomColor: 'rgba(252, 213, 53, 0)',
            lineWidth: 2
          });

          const timezoneOffset = new Date().getTimezoneOffset() * 60;

          fetch('https://api.binance.com/api/v3/klines?symbol=${currentSymbol.toUpperCase()}&interval=${interval}&limit=${limit}')
            .then(res => res.json())
            .then(data => {
              const historicalData = data.map(d => ({ 
                time: (d[0] / 1000) - timezoneOffset, 
                value: parseFloat(d[4]) 
              }));
              areaSeries.setData(historicalData);
              chart.timeScale().fitContent(); 
            });

          const socket = new WebSocket('wss://stream.binance.com:9443/ws/${currentSymbol}@kline_1m');
          socket.onmessage = (e) => {
            const k = JSON.parse(e.data).k;
            areaSeries.update({ 
              time: (k.t / 1000) - timezoneOffset, 
              value: parseFloat(k.c) 
            });
          };
        };
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={{color: 'white', fontSize: 24}}>←</Text>
        </TouchableOpacity>
        {/* Usamos el nombre real: "Bitcoin BTC" en vez de solo la abreviación */}
        <Text style={styles.headerTitle}>{coinName} <Text style={styles.pairSubtitle}>{binanceAbbreviation}</Text></Text>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={styles.priceSection}>
          <Text style={styles.mainPrice}>${livePrice}</Text>
        </View>

        <View style={styles.chartContainer}>
          {Platform.OS === 'web' ? (
            <iframe key={activeRange} srcDoc={htmlContent} style={{ flex: 1, border: 'none' }} />
          ) : (
            <WebView key={activeRange} source={{ html: htmlContent }} style={{ flex: 1 }} scrollEnabled={false} />
          )}
        </View>

        <View style={styles.timeRangeContainer}>
          {TIME_RANGES.map((range) => (
            <TouchableOpacity key={range} onPress={() => setActiveRange(range)}>
              <Text style={[styles.timeRangeText, activeRange === range && styles.timeRangeActive]}>{range}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionBlock}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Your balance</Text>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.balanceValue}>0 {binanceAbbreviation}</Text>
              <Text style={styles.balanceFiat}>≈$0.00</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionBlock}>
          {/* El título ahora dice "About Bitcoin" */}
          <Text style={styles.sectionTitle}>About {coinName}</Text>
          
          {!coinInfo ? (
            <ActivityIndicator size="small" color="#FCD535" style={{ marginVertical: 20 }} />
          ) : (
            <>
              <Text style={{ color: '#848E9C', fontSize: 14, lineHeight: 20, marginBottom: 20 }}>
                {coinInfo.aboutText}
              </Text>
              <View style={styles.aboutRow}>
                <Text style={styles.aboutLabel}>Rank</Text>
                <Text style={styles.aboutValue}>{coinInfo.rank}</Text>
              </View>
              <View style={styles.aboutRow}>
                <Text style={styles.aboutLabel}>Market Cap</Text>
                <Text style={styles.aboutValue}>{coinInfo.marketCap}</Text>
              </View>
              <View style={styles.aboutRow}>
                <Text style={styles.aboutLabel}>Circulation Supply</Text>
                <Text style={styles.aboutValue}>{coinInfo.supply}</Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.convertButton}>
          <Text style={styles.convertButtonText}>Convert</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0E11' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 50 },
  backButton: { marginRight: 15 },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  pairSubtitle: { color: '#848E9C', fontSize: 14, fontWeight: 'normal' },
  priceSection: { paddingHorizontal: 20, paddingBottom: 10 },
  mainPrice: { color: 'white', fontSize: 36, fontWeight: 'bold' },
  chartContainer: { height: 300, width: '100%' },
  timeRangeContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#1E2329' },
  timeRangeText: { color: '#848E9C', fontSize: 14, fontWeight: '600' },
  timeRangeActive: { color: '#0B0E11', backgroundColor: '#FCD535', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, overflow: 'hidden' },
  sectionBlock: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#1E2329' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  balanceValue: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  balanceFiat: { color: '#848E9C', fontSize: 12, marginTop: 4 },
  aboutRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  aboutLabel: { color: '#848E9C', fontSize: 14 },
  aboutValue: { color: 'white', fontSize: 14, fontWeight: '500' },
  bottomActions: { flexDirection: 'row', padding: 20, gap: 15, backgroundColor: '#0B0E11', borderTopWidth: 1, borderTopColor: '#1E2329' },
  buyButton: { flex: 1, backgroundColor: '#2B3139', paddingVertical: 15, borderRadius: 8, alignItems: 'center' },
  buyButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  convertButton: { flex: 1, backgroundColor: '#FCD535', paddingVertical: 15, borderRadius: 8, alignItems: 'center' },
  convertButtonText: { color: '#0B0E11', fontWeight: 'bold', fontSize: 16 },
});