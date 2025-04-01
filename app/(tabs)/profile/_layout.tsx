import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false 
        }} 
      />

      <Stack.Screen 
        name="edit" 
        options={{
          presentation: 'modal',
          headerShown: true,
          title: 'Editar Perfil',
        }} 
      />

      <Stack.Screen 
        name="metrics" 
        options={{ 
          presentation: 'card', 
          headerShown: false 
        }} 
      />

      <Stack.Screen 
        name="subscription" 
        options={{
          presentation: 'card',
          headerShown: true,
          title: 'Gestionar Suscripción',
        }} 
      />

      <Stack.Screen 
        name="camera" 
        options={{
          presentation: 'fullScreenModal',
          headerShown: false,
        }} 
      />
    </Stack>
  );
}
