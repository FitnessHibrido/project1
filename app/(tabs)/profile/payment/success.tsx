import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { CircleCheck as CheckCircle2 } from 'lucide-react-native';

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.icon}>
          <CheckCircle2 size={64} color="#22C55E" />
        </View>
        
        <Text style={styles.title}>¡Suscripción Activada!</Text>
        <Text style={styles.message}>
          Tu suscripción se ha activado correctamente. Ya puedes disfrutar de todas las funcionalidades premium.
        </Text>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>¿Qué sigue ahora?</Text>
          <View style={styles.infoItem}>
            <View style={styles.bullet} />
            <Text style={styles.infoText}>Accede a todos los programas de entrenamiento</Text>
          </View>
          <View style={styles.infoItem}>
            <View style={styles.bullet} />
            <Text style={styles.infoText}>Explora las estadísticas avanzadas</Text>
          </View>
          <View style={styles.infoItem}>
            <View style={styles.bullet} />
            <Text style={styles.infoText}>Disfruta del contenido exclusivo</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/train/programs')}
        >
          <Text style={styles.buttonText}>Explorar Programas</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => router.push('/profile')}
        >
          <Text style={styles.secondaryButtonText}>Volver al Perfil</Text>
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
    backgroundColor: '#F0FDF4',
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
  infoContainer: {
    width: '100%',
    backgroundColor: '#F9FAFB',
    padding: 20,
    borderRadius: 16,
    marginBottom: 32,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22C55E',
    marginRight: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#4B5563',
    flex: 1,
  },
  button: {
    backgroundColor: '#22C55E',
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
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '500',
  },
});