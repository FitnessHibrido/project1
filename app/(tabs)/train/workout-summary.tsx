import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Timer, Weight, Dumbbell, Trophy, Share2 } from 'lucide-react-native';

export default function WorkoutSummaryScreen() {
  const router = useRouter();
  const { totalVolume, totalReps, duration } = useLocalSearchParams();

  // Formatear duración de segundos a formato legible
  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs > 0 ? `${hrs}h ` : ''}${mins}min`;
  };

  // Formatear volumen total
  const formatVolume = (volume: number) => {
    return `${Number(volume).toLocaleString('es-ES')} kg`;
  };

  const handleShare = async () => {
    try {
      const message = `¡He completado mi entrenamiento! 💪\n\n` +
        `🕒 Duración: ${formatDuration(Number(duration))}\n` +
        `🏋️‍♂️ Volumen total: ${formatVolume(Number(totalVolume))}\n` +
        `🔄 Repeticiones: ${Number(totalReps).toLocaleString('es-ES')}\n\n` +
        `#BoltApp #Fitness #Workout`;

      await Share.share({
        title: '¡Entrenamiento Completado!',
        message,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Trophy size={48} color="#22C55E" />
            <Text style={styles.cardTitle}>¡Entrenamiento Completado!</Text>
            <Text style={styles.cardDate}>
              {new Date().toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Timer size={32} color="#3B82F6" />
              <Text style={styles.statValue}>{formatDuration(Number(duration))}</Text>
              <Text style={styles.statLabel}>Duración</Text>
            </View>

            <View style={styles.statCard}>
              <Weight size={32} color="#22C55E" />
              <Text style={styles.statValue}>{formatVolume(Number(totalVolume))}</Text>
              <Text style={styles.statLabel}>Volumen Total</Text>
            </View>

            <View style={styles.statCard}>
              <Dumbbell size={32} color="#F59E0B" />
              <Text style={styles.statValue}>{Number(totalReps).toLocaleString('es-ES')}</Text>
              <Text style={styles.statLabel}>Repeticiones</Text>
            </View>
          </View>

          <View style={styles.cardFooter}>
            <Text style={styles.appName}>@BoltApp</Text>
            <Text style={styles.hashtags}>#Fitness #Workout #Progress</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.shareButton}
          onPress={handleShare}
        >
          <Share2 size={20} color="#FFFFFF" />
          <Text style={styles.shareButtonText}>Compartir Entrenamiento</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.performanceButton}
          onPress={() => router.push('/train/performance')}
        >
          <Text style={styles.performanceButtonText}>Ver Estadísticas Completas</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.finishButton}
          onPress={() => router.push('/train')}
        >
          <Text style={styles.finishButtonText}>Volver al Inicio</Text>
        </TouchableOpacity>
      </ScrollView>
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
  },
  card: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  cardDate: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  cardFooter: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
  },
  appName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
    marginBottom: 4,
  },
  hashtags: {
    fontSize: 14,
    color: '#6B7280',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  performanceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  performanceButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
  },
  finishButton: {
    backgroundColor: '#22C55E',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  finishButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});