import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* "index" es el login y se carga primero por defecto */}
      <Stack.Screen name="index" /> 
      {/* "(tabs)" contiene el resto de la app con el gráfico */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}