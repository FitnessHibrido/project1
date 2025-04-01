import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Calendar, ChevronRight, Clock, Dumbbell } from 'lucide-react-native';
import { useProgram } from '@/hooks/useProgram';

export default function SelectDayScreen() {
  const { week } = useLocalSearchParams();
  const router = useRouter();
  const weekNumber = parseInt(week as string, 10);
  const { loading, error, getWeek } = useProgram('zero-to-hybrid');

  const weekData = getWeek(weekNumber);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando programa...</Text>
      </View>
    );
  }

  if (error || !weekData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {error || 'No se encontró la semana seleccionada'}
        </Text>
      </View>
    );
  }

  const handleStartWorkout = (dayNumber: number) => {
    router.push({
      pathname: '/train/program/workout',
      params: { week: weekNumber, day: dayNumber }
    });
  };

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
          <View style={styles.weekBadge}>
            <Calendar size={16} color="#FFFFFF" />
            <Text style={styles.weekText}>Semana {weekData.number}</Text>
          </View>
          <Text style={styles.title}>{weekData.title}</Text>
          <Text style={styles.subtitle}>{weekData.description}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {weekData.days.map((day) => (
          <TouchableOpacity
            key={day.id}
            style={styles.dayCard}
            onPress={() => handleStartWorkout(day.number)}
          >
            <View style={styles.cardHeader}>
              <View style={styles.dayBadge}>
                <Text style={styles.dayNumber}>Día {day.number}</Text>
              </View>
              <View style={styles.difficultyBadge}>
                <Text style={styles.difficultyText}>{weekData.difficulty}</Text>
              </View>
            </View>

            <View style={styles.mainInfo}>
              <Text style={styles.dayTitle}>{day.title}</Text>
              <Text style={styles.dayDescription}>{day.description}</Text>
            </View>

            <View style={styles.stats}>
              <View style={styles.statItem}>
                <Clock size={14} color="#6B7280" />
                <Text style={styles.statText}>
                  {day.exercises.length > 0 ? `${day.exercises.length} ejercicios` : 'Sin ejercicios'}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Dumbbell size={14} color="#6B7280" />
                <Text style={styles.statText}>
                  {day.exercises.reduce((total, ex) => total + ex.sets, 0)} series totales
                </Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.startButton}
              onPress={() => handleStartWorkout(day.number)}
            >
              <Text style={styles.startButtonText}>Comenzar</Text>
              <ChevronRight size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
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
  weekBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  weekText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
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
  dayCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dayBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  dayNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  difficultyBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  mainInfo: {
    marginBottom: 16,
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  dayDescription: {
    fontSize: 14,
    color: '#4B5563',
  },
  stats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
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
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});