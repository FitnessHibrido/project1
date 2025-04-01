import { Stack } from 'expo-router';

export default function MetricsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen 
        name="add" 
        options={{
          presentation: 'modal',
          headerShown: true,
          title: 'Añadir Métricas',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen 
        name="add-measurement" 
        options={{
          presentation: 'modal',
          headerShown: true,
          title: 'Añadir Medidas',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen 
        name="details" 
        options={{
          presentation: 'card',
          headerShown: true,
          title: 'Detalles de Métricas',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen 
        name="measurement-details" 
        options={{
          presentation: 'card',
          headerShown: true,
          title: 'Detalles de Medidas',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen 
        name="photo-compare" 
        options={{
          presentation: 'card',
          headerShown: true,
          title: 'Comparación de Fotos',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}