import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronRight, Dumbbell, TrendingUp, Timer, Weight } from 'lucide-react-native';
import { trainingPrograms } from '@/constants/programs';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { usePerformance } from '@/hooks/usePerformance';

interface ActiveProgram {
  id: string;
  name: string;
  level: string;
  image: string;
  progress: string;
  lastWorkout: string;
}

export default function TrainScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { metrics } = usePerformance();
  const [activePrograms, setActivePrograms] = useState<ActiveProgram[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivePrograms = async () => {
      if (!user) return;

      try {
        setLoading(true);
        // Obtener entrenamientos agrupados por programa
        const { data: workouts, error } = await supabase
          .from('workouts')
          .select('*')
          .eq('profile_id', user.id)
          .order('start_time', { ascending: false });

        if (error) throw error;

        // Agrupar workouts por programa y obtener el último de cada uno
        const programWorkouts = workouts?.reduce((acc, workout) => {
          if (!workout.program_id) return acc;
          
          if (!acc[workout.program_id] || 
              new Date(workout.start_time) > new Date(acc[workout.program_id].start_time)) {
            acc[workout.program_id] = workout;
          }
          return acc;
        }, {} as Record<string, any>);

        // Crear lista de programas activos
        const active = Object.entries(programWorkouts || {}).map(([programId, lastWorkout]) => {
          const program = trainingPrograms.find(p => p.id === programId);
          if (!program) return null;

          return {
            ...program,
            progress: `Semana ${lastWorkout.week_number} de ${program.duration.split(' ')[0]}`,
            lastWorkout: `Último: Día ${lastWorkout.day_number}`,
          };
        }).filter(Boolean) as ActiveProgram[];

        setActivePrograms(active);
      } catch (err) {
        console.error('Error fetching active programs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivePrograms();
  }, [user]);

  const performanceMetrics = [
    {
      id: 1,
      title: 'Tiempo Total',
      value: `${metrics.totalTime}min`,
      change: '+2h esta semana',
      icon: Timer,
      color: '#3B82F6',
      bgColor: '#EFF6FF',
    },
    {
      id: 2,
      title: 'Peso Total',
      value: `${metrics.totalVolume.toLocaleString()}kg`,
      change: '+150kg vs anterior',
      icon: Weight,
      color: '#22C55E',
      bgColor: '#F0FDF4',
    },
    {
      id: 3,
      title: 'Progreso',
      value: `${metrics.personalRecords} PRs`,
      change: '3 esta semana',
      icon: TrendingUp,
      color: '#F59E0B',
      bgColor: '#FFFBEB',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>¡Buen trabajo!</Text>
          <Text style={styles.subtitle}>Continúa con tu progreso</Text>
        </View>

        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#EFF6FF' }]}
          onPress={() => router.push('/train/programs')}
        >
          <Dumbbell size={24} color="#3B82F6" />
          <Text style={[styles.actionButtonText, { color: '#3B82F6' }]}>Ver Programas</Text>
        </TouchableOpacity>
        
        {activePrograms.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Entrenamientos Activos</Text>
            
            {activePrograms.map((program) => (
              <TouchableOpacity 
                key={program.id} 
                style={styles.programCard}
                onPress={() => router.push({
                  pathname: '/train/program/select-week',
                  params: { id: program.id }
                })}
              >
                <Image 
                  source={{ uri: program.image }}
                  style={styles.programImage}
                />
                <View style={styles.programOverlay}>
                  <View style={styles.levelBadge}>
                    <Text style={styles.levelText}>{program.level}</Text>
                  </View>
                  <View style={styles.programInfo}>
                    <View>
                      <Text style={styles.programName}>{program.name}</Text>
                      <Text style={styles.programProgress}>{program.progress}</Text>
                      <Text style={styles.lastWorkout}>{program.lastWorkout}</Text>
                    </View>
                    <ChevronRight size={24} color="#FFFFFF" />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity 
          style={styles.performanceSection}
          onPress={() => router.push('/train/performance')}
        >
          <View style={styles.performanceHeader}>
            <Text style={styles.sectionTitle}>Vista Rápida de Rendimiento</Text>
            <ChevronRight size={20} color="#6B7280" />
          </View>
          
          <View style={styles.metricsContainer}>
            {performanceMetrics.map((metric) => (
              <View 
                key={metric.id} 
                style={[styles.metricCard, { backgroundColor: metric.bgColor }]}
              >
                <metric.icon size={24} color={metric.color} />
                <Text style={[styles.metricValue, { color: metric.color }]}>{metric.value}</Text>
                <Text style={styles.metricTitle}>{metric.title}</Text>
                <Text style={styles.metricChange}>{metric.change}</Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  programCard: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#000000',
  },
  programImage: {
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  programOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 20,
  },
  levelBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 'auto',
  },
  levelText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  programInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  programName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  programProgress: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  lastWorkout: {
    fontSize: 14,
    color: '#E5E7EB',
  },
  performanceSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  performanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  metricsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: 'flex-start',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  metricChange: {
    fontSize: 12,
    color: '#6B7280',
  },
});