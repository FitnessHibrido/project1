import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Circle as XCircle, CircleAlert as AlertCircle } from 'lucide-react-native';

export default function ErrorScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.icon}>
          <XCircle size={64} color="#DC2626" />
        </View>
        
        <Text style={styles.title}>Error en el Pago</Text>
        <Text style={styles.message}>
          Ha ocurrido un error al procesar tu pago. Por favor, verifica los datos de tu tarjeta e inténtalo de nuevo.
        </Text>

        <View style={styles.errorDetails}>
          <View style={styles.errorHeader}>
            <AlertCircle size={20} color="#DC2626" />
            <Text style={styles.errorTitle}>Posibles causas:</Text>
          </View>
          <View style={styles.errorList}>
            <Text style={styles.errorItem}>• Fondos insuficientes</Text>
            <Text style={styles.errorItem}>• Datos de tarjeta incorrectos</Text>
            <Text style={styles.errorItem}>• Tarjeta expirada o bloqueada</Text>
            <Text style={styles.errorItem}>• Error de conexión</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Intentar de Nuevo</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.supportButton}
          onPress={() => {/* Implementar contacto con soporte */}}
        >
          <Text style={styles.supportButtonText}>Contactar Soporte</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 24,
    backgroundColor: '#FEE2E2',
    padding: 20,
    borderRadius: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  errorDetails: {
    width: '100%',
    backgroundColor: '#FEF2F2',
    padding: 20,
    borderRadius: 16,
    marginBottom: 32,
  },
  errorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#991B1B',
  },
  errorList: {
    gap: 8,
  },
  errorItem: {
    fontSize: 14,
    color: '#991B1B',
  },
  button: {
    backgroundColor: '#DC2626',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  supportButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  supportButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '500',
  },
});