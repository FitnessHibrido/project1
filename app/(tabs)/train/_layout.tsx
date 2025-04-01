import { Stack } from 'expo-router';

export default function TrainLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen 
        name="programs" 
        options={{
          presentation: 'card',
          headerShown: true,
          title: 'Programas',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen 
        name="workout" 
        options={{
          presentation: 'fullScreenModal',
          headerShown: true,
          title: 'Entrenamiento',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen 
        name="performance" 
        options={{
          presentation: 'card',
          headerShown: true,
          title: 'Rendimiento',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}