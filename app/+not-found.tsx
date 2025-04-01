import { Stack, router } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Página no encontrada' }} />
      <View style={styles.container}>
        <Text style={styles.title}>404</Text>
        <Text style={styles.message}>Esta pantalla no existe.</Text>

        <TouchableOpacity onPress={() => router.replace('/(tabs)/profile')} style={styles.button}>
          <Text style={styles.buttonText}>Volver al inicio</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#EF4444',
  },
  message: {
    fontSize: 18,
    color: '#6B7280',
    marginVertical: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
