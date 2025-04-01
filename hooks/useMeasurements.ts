import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { Database } from '@/types/database';

type Measurement = Database['public']['Tables']['measurements']['Row'];
type MeasurementInsert = Omit<Database['public']['Tables']['measurements']['Insert'], 'profile_id'>;

export function useMeasurements() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [latestMeasurement, setLatestMeasurement] = useState<Measurement | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    const fetchMeasurements = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('measurements')
          .select('*')
          .eq('profile_id', user.id)
          .order('date', { ascending: false });

        if (error) throw error;

        setMeasurements(data || []);
        setLatestMeasurement(data?.[0] || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar las medidas');
      } finally {
        setLoading(false);
      }
    };

    fetchMeasurements();
  }, [user?.id]);

  const addMeasurement = async (measurement: MeasurementInsert) => {
    try {
      setError(null);

      const { data, error } = await supabase
        .from('measurements')
        .insert([
          {
            ...measurement,
            profile_id: user?.id,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setMeasurements(prev => [data, ...prev]);
      setLatestMeasurement(data);

      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar las medidas');
      throw err;
    }
  };

  return {
    measurements,
    latestMeasurement,
    loading,
    error,
    addMeasurement,
  };
}