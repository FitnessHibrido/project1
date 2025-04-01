import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';

type ProgramWeek = Database['public']['Tables']['program_weeks']['Row'];
type ProgramDay = Database['public']['Tables']['program_days']['Row'];
type ProgramExercise = Database['public']['Tables']['program_exercises']['Row'];

interface WeekWithDays extends ProgramWeek {
  days: (ProgramDay & {
    exercises: ProgramExercise[];
  })[];
}

export function useProgramExercises(programId: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [weeks, setWeeks] = useState<WeekWithDays[]>([]);

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Obtener todas las semanas del programa
        const { data: weeksData, error: weeksError } = await supabase
          .from('program_weeks')
          .select('*')
          .eq('program_id', programId)
          .order('number');

        if (weeksError) throw weeksError;

        // Para cada semana, obtener sus días y ejercicios
        const weeksWithDays = await Promise.all(
          weeksData.map(async (week) => {
            const { data: daysData, error: daysError } = await supabase
              .from('program_days')
              .select(`
                *,
                exercises:program_exercises(*)
              `)
              .eq('week_id', week.id)
              .order('number');

            if (daysError) throw daysError;

            return {
              ...week,
              days: daysData || [],
            };
          })
        );

        setWeeks(weeksWithDays);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar el programa');
      } finally {
        setLoading(false);
      }
    };

    if (programId) {
      fetchProgramData();
    }
  }, [programId]);

  return {
    weeks,
    loading,
    error,
  };
}