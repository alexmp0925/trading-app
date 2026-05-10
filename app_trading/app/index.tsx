import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    router.replace('/markets'); 
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.welcomeText}>TradingApp</ThemedText>
        <ThemedText style={styles.subText}>Inicia sesión para operar</ThemedText>
      </View>

      <View style={styles.form}>
        <ThemedText style={styles.label}>Correo electrónico</ThemedText>
        <TextInput 
          style={styles.input} 
          placeholder="email@ejemplo.com" 
          placeholderTextColor="#848E9C"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
          <ThemedText style={styles.buttonText}>Continuar</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#0B0E11' },
  header: { marginTop: 80, marginBottom: 40 },
  welcomeText: { color: '#FCD535', fontSize: 32, fontWeight: 'bold' },
  subText: { color: '#848E9C', marginTop: 8 },
  form: { flex: 1 },
  label: { color: '#EAECEF', marginBottom: 8 },
  input: { backgroundColor: '#2B3139', borderRadius: 4, padding: 16, color: 'white', marginBottom: 24 },
  primaryButton: { backgroundColor: '#FCD535', borderRadius: 4, padding: 16, alignItems: 'center' },
  buttonText: { color: '#0B0E11', fontWeight: 'bold' }
});