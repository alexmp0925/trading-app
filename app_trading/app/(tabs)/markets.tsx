import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useBinanceMarkets } from '@/hooks/useBinance';
import { IconSymbol } from '@/components/ui/icon-symbol';

const CATEGORIES = ['Hot', 'Favoritos'];

export default function MarketsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Hot');
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Estados para nuestra lista automatizada
  const [topCoins, setTopCoins] = useState<any[]>([]);
  const [binanceSymbols, setBinanceSymbols] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. FETCH AUTOMÁTICO DEL TOP 30 (Nombres, Símbolos e Iconos)
  useEffect(() => {
    const fetchTop30 = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false');
        const data = await response.json();
        setTopCoins(data);
        
        // Creamos la lista de símbolos para Binance (ej. "btc" -> "btcusdt")
        const symbolsForBinance = data.map((coin: any) => `${coin.symbol.toLowerCase()}usdt`);
        setBinanceSymbols(symbolsForBinance);
      } catch (error) {
        console.error("Error cargando el Top 30:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTop30();
  }, []);

  // 2. Conectamos nuestra lista dinámica al radar de Binance
  const marketData = useBinanceMarkets(binanceSymbols);

  const toggleFavorite = (coinId: string) => {
    if (favorites.includes(coinId)) setFavorites(favorites.filter(fav => fav !== coinId));
    else setFavorites([...favorites, coinId]);
  };

  const displayedCoins = activeTab === 'Favoritos' 
    ? topCoins.filter(coin => favorites.includes(coin.id))
    : topCoins;

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Mercados</ThemedText>
      </View>

      <View style={styles.tabBar}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity 
            key={cat} 
            onPress={() => setActiveTab(cat)}
            style={[styles.tabItem, activeTab === cat && styles.activeTabItem]}
          >
            <ThemedText style={[styles.tabText, activeTab === cat && styles.activeTabText]}>{cat}</ThemedText>
          </TouchableOpacity>
        ))}
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#FCD535" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={displayedCoins}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            // Buscamos los datos en vivo de Binance
            const binanceSymbol = `${item.symbol.toLowerCase()}usdt`;
            const binanceInfo = marketData[binanceSymbol];
            const isFav = favorites.includes(item.id);

            // EL PLAN B: Si Binance no tiene datos, usamos los de CoinGecko
            // Formateamos los datos de CoinGecko para que se vean igual que los de Binance
            const fallbackPrice = item.current_price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
            const fallbackChange = item.price_change_percentage_24h || 0;
            const fallbackChangeText = `${fallbackChange >= 0 ? '+' : ''}${fallbackChange.toFixed(2)}%`;

            // Decisión lógica: ¿Usamos Binance (en vivo) o CoinGecko (estático)?
            const displayPrice = binanceInfo ? binanceInfo.price : fallbackPrice;
            const displayChange = binanceInfo ? binanceInfo.change : fallbackChangeText;
            const isPositive = displayChange.includes('+');

            return (
              <View style={styles.coinRowContainer}>
                <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.starButton}>
                  <IconSymbol name="house.fill" size={20} color={isFav ? '#FCD535' : '#474D57'} />
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.coinInfoMain} 
                  onPress={() => router.push({ 
                    pathname: '/coin/[symbol]', 
                    params: { symbol: binanceSymbol, coinId: item.id, coinName: item.name } 
                  })}
                >
                  <View style={styles.coinIdentity}>
                    <Image source={{ uri: item.image }} style={styles.coinIcon} />
                    <View>
                      <ThemedText type="defaultSemiBold" style={styles.coinName}>{item.name}</ThemedText>
                      <ThemedText style={styles.pairText}>{item.symbol.toUpperCase()}</ThemedText>
                    </View>
                  </View>

                  <View style={styles.priceContainer}>
                    <ThemedText type="defaultSemiBold">${displayPrice}</ThemedText>
                    <ThemedText style={{ color: isPositive ? '#26a69a' : '#ef5350' }}>
                      {displayChange}
                    </ThemedText>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0E11', paddingTop: 60 },
  header: { paddingHorizontal: 20, marginBottom: 20 },
  tabBar: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#2B3139' },
  tabItem: { paddingHorizontal: 20, paddingVertical: 15 },
  activeTabItem: { borderBottomWidth: 2, borderBottomColor: '#FCD535' },
  tabText: { color: '#848E9C' },
  activeTabText: { color: '#EAECEF', fontWeight: 'bold' },
  coinRowContainer: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#1E2329' },
  starButton: { paddingLeft: 20 },
  coinInfoMain: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  coinIdentity: { flexDirection: 'row', alignItems: 'center' },
  coinIcon: { width: 32, height: 32, borderRadius: 16, marginRight: 12 }, // Estilo del Icono
  coinName: { fontSize: 16, color: 'white' },
  pairText: { color: '#848E9C', fontSize: 12, marginTop: 2 },
  priceContainer: { alignItems: 'flex-end' }
});