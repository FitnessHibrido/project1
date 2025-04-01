import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Clock, Dumbbell } from 'lucide-react-native';

export default function BuilderScreen() {
  const router = useRouter();
  const duration = '0s';
  const volume = '0 kg';
  const sets = '0';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.headerButton}>Entreno</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.finishButton}>
          <Text style={styles.finishButtonText}>Terminar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Duración</Text>
          <Text style={styles.statValue}>{duration}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Volumen</Text>
          <Text style={styles.statValue}>{volume}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Series</Text>
          <Text style={styles.statValue}>{sets}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.emptyState}>
          <Dumbbell size={32} color="#D1D5DB" />
          <Text style={styles.emptyStateText}>Empezar</Text>
          <Text style={styles.emptyStateSubtext}>
            Agrega un ejercicio para empezar tu entrenamiento
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/train/builder/exercise-selection')}
        >
          <Text style={styles.addButtonText}>+ Agregar Ejercicio</Text>
        </TouchableOpacity>

        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.configButton}>
            <Text style={styles.configButtonText}>Configuración</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.discardButton}>
            <Text style={styles.discardButtonText}>Descartar Entreno</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerButton: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  finishButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  finishButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  stats: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomButtons: {
    gap: 12,
  },
  configButton: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  configButtonText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '500',
  },
  discardButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  discardButtonText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '500',
  },
});