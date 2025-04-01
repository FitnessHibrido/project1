import { Stack } from 'expo-router';

export default function ProgramLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="select-week" />
      <Stack.Screen name="select-day" />
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
    </Stack>
  );
}