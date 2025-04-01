import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';

type Workout = Database['public']['Tables']['workouts']['Row'];
type WorkoutExercise = Database['public']['Tables']['workout_exercises']['Row'];

interface Set {
  reps?: number;
  weight?: number;
  rir?: string;
  time?: number;
}

interface ExerciseStats {
  totalVolume: number;
  maxWeight: number;
  totalReps: number;
}

interface WorkoutStats {
  totalVolume: number;
  totalReps: number;
  duration: number;
  personalRecords: {
    type: 'volume' | 'weight' | 'reps';
    exercise: string;
    value: number;
    previous: number;
  }[];
}

export function useWorkout() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateExerciseStats = (sets: Set[]): ExerciseStats => {
    return sets.reduce((stats, set) => {
      const reps = set.reps || 0;
      const weight = set.weight || 0;
      const volume = reps * weight;

      return {
        totalVolume: stats.totalVolume + volume,
        maxWeight: Math.max(stats.maxWeight, weight),
        totalReps: stats.totalReps + reps,
      };
    }, { totalVolume: 0, maxWeight: 0, totalReps: 0 });
  };

  const checkPersonalRecords = async (
    exerciseName: string, 
    stats: ExerciseStats
  ) => {
    const { data: previousExercises } = await supabase
      .from('workout_exercises')
      .select('max_weight, total_volume, total_reps')
      .eq('exercise_name', exerciseName)
      .order('created_at', { ascending: false })
      .limit(1);

    const previous = previousExercises?.[0];
    const records = [];

    if (previous) {
      if (stats.maxWeight > (previous.max_weight || 0)) {
        records.push({
          type: 'weight' as const,
          exercise: exerciseName,
          value: stats.maxWeight,
          previous: previous.max_weight || 0,
        });
      }
      if (stats.totalVolume > (previous.total_volume || 0)) {
        records.push({
          type: 'volume' as const,
          exercise: exerciseName,
          value: stats.totalVolume,
          previous: previous.total_volume || 0,
        });
      }
      if (stats.totalReps > (previous.total_reps || 0)) {
        records.push({
          type: 'reps' as const,
          exercise: exerciseName,
          value: stats.totalReps,
          previous: previous.total_reps || 0,
        });
      }
    }

    return records;
  };

  const startWorkout = async (programId: string, weekNumber: number, dayNumber: number) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('workouts')
        .insert({
          profile_id: user?.id,
          program_id: programId,
          week_number: weekNumber,
          day_number: dayNumber,
          start_time: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar el entrenamiento');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addExercise = async (workoutId: string, exerciseName: string, sets: Set[]) => {
    try {
      setError(null);

      // Calcular estadísticas del ejercicio
      const stats = calculateExerciseStats(sets);

      // Insertar ejercicio con sus estadísticas
      const { data, error } = await supabase
        .from('workout_exercises')
        .insert({
          workout_id: workoutId,
          exercise_name: exerciseName,
          sets: sets,
          total_volume: stats.totalVolume,
          max_weight: stats.maxWeight,
          total_reps: stats.totalReps,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar el ejercicio');
      throw err;
    }
  };

  const finishWorkout = async (workoutId: string, exercises: { name: string, sets: Set[] }[]): Promise<WorkoutStats> => {
    try {
      setLoading(true);
      setError(null);

      const personalRecords = [];
      let totalVolume = 0;
      let totalReps = 0;

      // Procesar cada ejercicio
      for (const exercise of exercises) {
        const stats = calculateExerciseStats(exercise.sets);
        totalVolume += stats.totalVolume;
        totalReps += stats.totalReps;

        // Guardar ejercicio
        await addExercise(workoutId, exercise.name, exercise.sets);

        // Verificar records personales
        const records = await checkPersonalRecords(exercise.name, stats);
        personalRecords.push(...records);
      }

      // Obtener tiempo total del entrenamiento
      const { data: workout } = await supabase
        .from('workouts')
        .select('start_time')
        .eq('id', workoutId)
        .single();

      const duration = workout ? 
        (new Date().getTime() - new Date(workout.start_time).getTime()) / 1000 : 
        0;

      // Actualizar workout con estadísticas finales
      const { error } = await supabase
        .from('workouts')
        .update({
          end_time: new Date().toISOString(),
          total_volume: totalVolume,
          total_reps: totalReps,
        })
        .eq('id', workoutId);

      if (error) throw error;

      return {
        totalVolume,
        totalReps,
        duration,
        personalRecords,
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al finalizar el entrenamiento');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getWorkoutHistory = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('workouts')
        .select(`
          *,
          exercises:workout_exercises(*)
        `)
        .eq('profile_id', user?.id)
        .order('start_time', { ascending: false });

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener el historial');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    startWorkout,
    finishWorkout,
    addExercise,
    getWorkoutHistory,
  };
}