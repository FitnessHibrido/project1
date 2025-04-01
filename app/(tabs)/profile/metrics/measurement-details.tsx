import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { Ruler } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface BodyMeasurements {
  id: string;
  date: string;
  neck?: number;
  shoulders?: number;
  chest?: number;
  left_arm?: number;
  right_arm?: number;
  left_forearm?: number;
  right_forearm?: number;
  waist?: number;
  abdomen?: number;
  hips?: number;
  left_thigh?: number;
  right_thigh?: number;
  left_calf?: number;
  right_calf?: number;
}

export default function MeasurementDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [measurements, setMeasurements] = useState<BodyMeasurements | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeasurements = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('body_measurements')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setMeasurements(data);
      } catch (err) {
        console.error('Error fetching measurements:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMeasurements();
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando medidas...</Text>
      </View>
    );
  }

  if (!measurements) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No se encontraron las medidas</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.date}>
            {new Date(measurements.date).toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Parte Superior</Text>
          
          <View style={styles.measurementsGrid}>
            {measurements.neck && (
              <View style={styles.measurementCard}>
                <Ruler size={24} color="#3B82F6" />
                <Text style={styles.measurementValue}>{measurements.neck} cm</Text>
                <Text style={styles.measurementLabel}>Cuello</Text>
              </View>
            )}

            {measurements.shoulders && (
              <View style={styles.measurementCard}>
                <Ruler size={24} color="#3B82F6" />
                <Text style={styles.measurementValue}>{measurements.shoulders} cm</Text>
                <Text style={styles.measurementLabel}>Hombros</Text>
              </View>
            )}

            {measurements.chest && (
              <View style={styles.measurementCard}>
                <Ruler size={24} color="#3B82F6" />
                <Text style={styles.measurementValue}>{measurements.chest} cm</Text>
                <Text style={styles.measurementLabel}>Pecho</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Brazos</Text>
          
          <View style={styles.measurementsGrid}>
            {measurements.left_arm && (
              <View style={styles.measurementCard}>
                <Ruler size={24} color="#22C55E" />
                <Text style={styles.measurementValue}>{measurements.left_arm} cm</Text>
                <Text style={styles.measurementLabel}>Bíceps Izquierdo</Text>
              </View>
            )}

            {measurements.right_arm && (
              <View style={styles.measurementCard}>
                <Ruler size={24} color="#22C55E" />
                <Text style={styles.measurementValue}>{measurements.right_arm} cm</Text>
                <Text style={styles.measurementLabel}>Bíceps Derecho</Text>
              </View>
            )}

            {measurements.left_forearm && (
              <View style={styles.measurementCard}>
                <Ruler size={24} color="#22C55E" />
                <Text style={styles.measurementValue}>{measurements.left_forearm} cm</Text>
                <Text style={styles.measurementLabel}>Antebrazo Izquierdo</Text>
              </View>
            )}

            {measurements.right_forearm && (
              <View style={styles.measurementCard}>
                <Ruler size={24} color="#22C55E" />
                <Text style={styles.measurementValue}>{measurements.right_forearm} cm</Text>
                <Text style={styles.measurementLabel}>Antebrazo Derecho</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tronco</Text>
          
          <View style={styles.measurementsGrid}>
            {measurements.waist && (
              <View style={styles.measurementCard}>
                <Ruler size={24} color="#F59E0B" />
                <Text style={styles.measurementValue}>{measurements.waist} cm</Text>
                <Text style={styles.measurementLabel}>Cintura</Text>
              </View>
            )}

            {measurements.abdomen && (
              <View style={styles.measurementCard}>
                <Ruler size={24} color="#F59E0B" />
                <Text style={styles.measurementValue}>{measurements.abdomen} cm</Text>
                <Text style={styles.measurementLabel}>Abdomen</Text>
              </View>
            )}

            {measurements.hips && (
              <View style={styles.measurementCard}>
                <Ruler size={24} color="#F59E0B" />
                <Text style={styles.measurementValue}>{measurements.hips} cm</Text>
                <Text style={styles.measurementLabel}>Cadera</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Piernas</Text>
          
          <View style={styles.measurementsGrid}>
            {measurements.left_thigh && (
              <View style={styles.measurementCard}>
                <Ruler size={24} color="#EC4899" />
                <Text style={styles.measurementValue}>{measurements.left_thigh} cm</Text>
                <Text style={styles.measurementLabel}>Muslo Izquierdo</Text>
              </View>
            )}

            {measurements.right_thigh && (
              <View style={styles.measurementCard}>
                <Ruler size={24} color="#EC4899" />
                <Text style={styles.measurementValue}>{measurements.right_thigh} cm</Text>
                <Text style={styles.measurementLabel}>Muslo Derecho</Text>
              </View>
            )}

            {measurements.left_calf && (
              <View style={styles.measurementCard}>
                <Ruler size={24} color="#EC4899" />
                <Text style={styles.measurementValue}>{measurements.left_calf} cm</Text>
                <Text style={styles.measurementLabel}>Gemelo Izquierdo</Text>
              </View>
            )}

            {measurements.right_calf && (
              <View style={styles.measurementCard}>
                <Ruler size={24} color="#EC4899" />
                <Text style={styles.measurementValue}>{measurements.right_calf} cm</Text>
                <Text style={styles.measurementLabel}>Gemelo Derecho</Text>
              </View>
            )}
          </View>
        </View>
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
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  date: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textTransform: 'capitalize',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 12,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  measurementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  measurementCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  measurementValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
  },
  measurementLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
});