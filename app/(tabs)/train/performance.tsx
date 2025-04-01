import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, TrendingUp, Clock, Weight, Calendar, Trophy, Target, Dumbbell, ArrowUp, ArrowDown } from 'lucide-react-native';
import { usePerformance } from '@/hooks/usePerformance';

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - 40;

export default function PerformanceScreen() {
  const { metrics, loading, error } = usePerformance();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando estadísticas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const maxVolume = Math.max(...metrics.weeklyVolume.map(d => d.value));

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen Mensual</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={[styles.iconContainer, { backgroundColor: '#EFF6FF' }]}>
                <Calendar size={24} color="#3B82F6" />
              </View>
              <Text style={styles.statValue}>{metrics.totalWorkouts}</Text>
              <Text style={styles.statLabel}>Entrenos</Text>
            </View>
            <View style={styles.statCard}>
              <View style={[styles.iconContainer, { backgroundColor: '#F0FDF4' }]}>
                <Weight size={24} color="#22C55E" />
              </View>
              <Text style={styles.statValue}>{metrics.totalVolume.toLocaleString()}kg</Text>
              <Text style={styles.statLabel}>Volumen</Text>
            </View>
            <View style={styles.statCard}>
              <View style={[styles.iconContainer, { backgroundColor: '#FEF3C7' }]}>
                <Clock size={24} color="#F59E0B" />
              </View>
              <Text style={styles.statValue}>{metrics.totalTime}min</Text>
              <Text style={styles.statLabel}>Tiempo</Text>
            </View>
            <View style={styles.statCard}>
              <View style={[styles.iconContainer, { backgroundColor: '#FCE7F3' }]}>
                <Trophy size={24} color="#EC4899" />
              </View>
              <Text style={styles.statValue}>{metrics.personalRecords}</Text>
              <Text style={styles.statLabel}>PRs</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Volumen Semanal</Text>
          <View style={styles.chartContainer}>
            {metrics.weeklyVolume.map((day) => (
              <View key={day.day} style={styles.barContainer}>
                <View style={styles.barWrapper}>
                  <View 
                    style={[
                      styles.bar, 
                      { 
                        height: `${(day.value / maxVolume) * 100}%`,
                        backgroundColor: day.value > 0 ? '#3B82F6' : '#E5E7EB'
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.barLabel}>{day.day}</Text>
                <Text style={styles.barValue}>
                  {day.value > 0 ? `${(day.value/1000).toFixed(1)}k` : '-'}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {metrics.recentPRs.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Records Personales Recientes</Text>
            {metrics.recentPRs.map((pr, index) => (
              <View key={index} style={styles.prCard}>
                <View style={styles.prHeader}>
                  <Text style={styles.prExercise}>{pr.exercise}</Text>
                  <View style={styles.prBadge}>
                    <Text style={styles.prImprovement}>+{pr.improvement}kg</Text>
                  </View>
                </View>
                <View style={styles.prDetails}>
                  <View style={styles.prDetail}>
                    <Weight size={16} color="#6B7280" />
                    <Text style={styles.prDetailText}>{pr.weight}kg</Text>
                  </View>
                  <View style={styles.prDetail}>
                    <Calendar size={16} color="#6B7280" />
                    <Text style={styles.prDetailText}>
                      {new Date(pr.date).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {metrics.frequentExercises.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ejercicios Frecuentes</Text>
            {metrics.frequentExercises.map((exercise, index) => (
              <View key={index} style={styles.exerciseCard}>
                <View style={styles.exerciseIcon}>
                  <Dumbbell size={24} color="#3B82F6" />
                </View>
                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <View style={styles.exerciseStats}>
                    <Text style={styles.exerciseStat}>{exercise.sets} series</Text>
                    <Text style={styles.exerciseStat}>•</Text>
                    <Text style={styles.exerciseStat}>Media: {exercise.avgWeight}kg</Text>
                  </View>
                </View>
                <View style={styles.trendContainer}>
                  {exercise.trend === 'up' ? (
                    <ArrowUp size={20} color="#22C55E" />
                  ) : (
                    <ArrowDown size={20} color="#EF4444" />
                  )}
                  <Text style={[
                    styles.trendText,
                    { color: exercise.trend === 'up' ? '#22C55E' : '#EF4444' }
                  ]}>
                    {exercise.percentage}%
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
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
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  chartContainer: {
    height: 200,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
  },
  barWrapper: {
    height: '85%',
    width: 24,
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderRadius: 4,
    backgroundColor: '#3B82F6',
  },
  barLabel: {
    marginTop: 8,
    fontSize: 12,
    color: '#6B7280',
  },
  barValue: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 4,
  },
  prCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  prHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  prExercise: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  prBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  prImprovement: {
    fontSize: 12,
    fontWeight: '500',
    color: '#059669',
  },
  prDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  prDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  prDetailText: {
    fontSize: 14,
    color: '#6B7280',
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  exerciseIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#EFF6FF',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  exerciseStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  exerciseStat: {
    fontSize: 14,
    color: '#6B7280',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 14,
    fontWeight: '600',
  },
});