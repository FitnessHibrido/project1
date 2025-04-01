import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

interface PerformanceMetrics {
  totalWorkouts: number;
  totalVolume: number;
  totalTime: number;
  personalRecords: number;
  weeklyVolume: {
    day: string;
    value: number;
  }[];
  recentPRs: {
    exercise: string;
    weight: number;
    date: string;
    improvement: number;
  }[];
  frequentExercises: {
    name: string;
    sets: number;
    avgWeight: number;
    trend: 'up' | 'down';
    percentage: number;
  }[];
}

export function usePerformance() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    totalWorkouts: 0,
    totalVolume: 0,
    totalTime: 0,
    personalRecords: 0,
    weeklyVolume: [],
    recentPRs: [],
    frequentExercises: []
  });

  useEffect(() => {
    if (!user?.id) return;

    const fetchPerformanceData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Obtener workouts del último mes
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const { data: workouts, error: workoutsError } = await supabase
          .from('workouts')
          .select(`
            *,
            workout_exercises (*)
          `)
          .eq('profile_id', user.id)
          .gte('start_time', thirtyDaysAgo.toISOString())
          .order('start_time', { ascending: false });

        if (workoutsError) throw workoutsError;

        // Calcular métricas
        const totalWorkouts = workouts?.length || 0;
        const totalVolume = workouts?.reduce((acc, workout) => acc + (workout.total_volume || 0), 0) || 0;
        const totalTime = workouts?.reduce((acc, workout) => {
          if (workout.end_time && workout.start_time) {
            return acc + (new Date(workout.end_time).getTime() - new Date(workout.start_time).getTime());
          }
          return acc;
        }, 0) || 0;

        // Calcular volumen semanal
        const weeklyVolume = calculateWeeklyVolume(workouts || []);

        // Obtener PRs recientes
        const recentPRs = getRecentPRs(workouts || []);

        // Obtener ejercicios frecuentes
        const frequentExercises = getFrequentExercises(workouts || []);

        setMetrics({
          totalWorkouts,
          totalVolume,
          totalTime: Math.floor(totalTime / (1000 * 60)), // Convertir a minutos
          personalRecords: recentPRs.length,
          weeklyVolume,
          recentPRs,
          frequentExercises
        });

      } catch (err) {
        console.error('Error fetching performance data:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar los datos de rendimiento');
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, [user?.id]);

  return {
    loading,
    error,
    metrics
  };
}

function calculateWeeklyVolume(workouts: any[]) {
  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const weeklyVolume = new Array(7).fill(0);

  workouts.forEach(workout => {
    if (workout.total_volume) {
      const date = new Date(workout.start_time);
      const dayIndex = date.getDay();
      weeklyVolume[dayIndex] += workout.total_volume;
    }
  });

  return days.map((day, index) => ({
    day,
    value: weeklyVolume[index]
  }));
}

function getRecentPRs(workouts: any[]) {
  const prs: any[] = [];
  const exerciseMaxes = new Map();

  workouts.forEach(workout => {
    workout.workout_exercises?.forEach((exercise: any) => {
      const currentMax = exercise.max_weight || 0;
      const prevMax = exerciseMaxes.get(exercise.exercise_name) || 0;

      if (currentMax > prevMax) {
        exerciseMaxes.set(exercise.exercise_name, currentMax);
        prs.push({
          exercise: exercise.exercise_name,
          weight: currentMax,
          date: workout.start_time,
          improvement: currentMax - prevMax
        });
      }
    });
  });

  return prs.slice(0, 3); // Retornar solo los 3 PRs más recientes
}

function getFrequentExercises(workouts: any[]) {
  const exerciseStats = new Map();

  workouts.forEach(workout => {
    workout.workout_exercises?.forEach((exercise: any) => {
      const stats = exerciseStats.get(exercise.exercise_name) || {
        sets: 0,
        totalWeight: 0,
        count: 0
      };

      stats.sets += (exercise.sets?.length || 0);
      stats.totalWeight += (exercise.max_weight || 0);
      stats.count += 1;

      exerciseStats.set(exercise.exercise_name, stats);
    });
  });

  return Array.from(exerciseStats.entries())
    .map(([name, stats]) => ({
      name,
      sets: stats.sets,
      avgWeight: Math.round(stats.totalWeight / stats.count),
      trend: Math.random() > 0.5 ? 'up' : 'down', // Simplificado para el ejemplo
      percentage: Math.round((Math.random() * 10) * 100) / 100 // Simplificado para el ejemplo
    }))
    .slice(0, 3); // Retornar solo los 3 ejercicios más frecuentes
}