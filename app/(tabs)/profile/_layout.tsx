import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen 
        name="edit" 
        options={{
          presentation: 'modal',
          headerShown: true,
          title: 'Editar Perfil',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen 
        name="metrics" 
        options={{
          presentation: 'card',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="subscription" 
        options={{
          presentation: 'card',
          headerShown: true,
          title: 'Gestionar Suscripción',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerShadowVisible: false,
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