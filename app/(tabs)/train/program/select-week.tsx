import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Calendar, ChevronRight, Clock, Dumbbell, ArrowLeft, Trophy, Target } from 'lucide-react-native';
import { useProgramExercises } from '@/hooks/useProgramExercises';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;

export default function SelectWeekScreen() {
  const router = useRouter();
  const { weeks, loading, error } = useProgramExercises('zero-to-hybrid');

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando programa...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error al cargar el programa: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80' }}
          style={styles.headerImage}
        />
        <View style={styles.overlay} />
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>De 0 a Híbrido</Text>
          <Text style={styles.subtitle}>Selecciona la semana de entrenamiento</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {weeks.map((week) => (
          <TouchableOpacity
            key={week.id}
            style={styles.weekCard}
            onPress={() => router.push({
              pathname: '/train/program/select-day',
              params: { week: week.number }
            })}
          >
            <View style={styles.weekHeader}>
              <View style={styles.weekBadge}>
                <Calendar size={16} color="#3B82F6" />
                <Text style={styles.weekNumber}>Semana {week.number}</Text>
              </View>
              <View style={[styles.difficultyBadge, getDifficultyStyle(week.difficulty)]}>
                <Target size={14} color={getDifficultyColor(week.difficulty)} />
                <Text style={[styles.difficultyText, { color: getDifficultyColor(week.difficulty) }]}>
                  {week.difficulty}
                </Text>
              </View>
            </View>

            <Text style={styles.weekTitle}>{week.title}</Text>
            <Text style={styles.weekDescription}>{week.description}</Text>

            <View style={styles.stats}>
              <View style={styles.statItem}>
                <Clock size={16} color="#6B7280" />
                <Text style={styles.statText}>{week.days.length} días</Text>
              </View>
              <View style={styles.statItem}>
                <Dumbbell size={16} color="#6B7280" />
                <Text style={styles.statText}>
                  {week.days.reduce((total, day) => total + day.exercises.length, 0)} ejercicios
                </Text>
              </View>
              <View style={styles.statItem}>
                <Trophy size={16} color="#6B7280" />
                <Text style={styles.statText}>4 objetivos</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.startButton}
              onPress={() => router.push({
                pathname: '/train/program/select-day',
                params: { week: week.number }
              })}
            >
              <Text style={styles.startButtonText}>Ver Días</Text>
              <ChevronRight size={20} color="#3B82F6" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function getDifficultyStyle(difficulty: string) {
  switch (difficulty.toLowerCase()) {
    case 'principiante':
      return styles.beginnerBadge;
    case 'intermedio':
      return styles.intermediateBadge;
    case 'avanzado':
      return styles.advancedBadge;
    default:
      return styles.defaultBadge;
  }
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty.toLowerCase()) {
    case 'principiante':
      return '#22C55E';
    case 'intermedio':
      return '#F59E0B';
    case 'avanzado':
      return '#EF4444';
    default:
      return '#6B7280';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 16,
    textAlign: 'center',
  },
  header: {
    height: 200,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  headerContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#F3F4F6',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  weekCard: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  weekBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  weekNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  difficultyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  beginnerBadge: {
    backgroundColor: '#F0FDF4',
  },
  intermediateBadge: {
    backgroundColor: '#FFFBEB',
  },
  advancedBadge: {
    backgroundColor: '#FEF2F2',
  },
  defaultBadge: {
    backgroundColor: '#F3F4F6',
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: '600',
  },
  weekTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  weekDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  stats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 14,
    color: '#6B7280',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
  },
});