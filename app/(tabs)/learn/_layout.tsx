import { Stack } from 'expo-router';

export default function LearnLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen 
        name="videos" 
        options={{
          presentation: 'card',
          headerShown: true,
          title: 'Videos Formativos',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen 
        name="video-category" 
        options={{
          presentation: 'card',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen 
        name="manuals" 
        options={{
          presentation: 'card',
          headerShown: true,
          title: 'Manuales y Guías',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}