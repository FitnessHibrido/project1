import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { Scale, Activity, Brain, Droplets } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface BodyMetrics {
  id: string;
  date: string;
  weight?: number;
  height?: number;
  body_fat?: number;
  muscle_mass?: number;
  visceral_fat?: number;
  bone_mass?: number;
  metabolic_age?: number;
  hydration?: number;
}

export default function MetricsDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [metrics, setMetrics] = useState<BodyMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('body_metrics')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setMetrics(data);
      } catch (err) {
        console.error('Error fetching metrics:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMetrics();
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando métricas...</Text>
      </View>
    );
  }

  if (!metrics) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No se encontraron las métricas</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.date}>
            {new Date(metrics.date).toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Métricas Básicas</Text>
          
          <View style={styles.metricsGrid}>
            {metrics.weight && (
              <View style={styles.metricCard}>
                <Scale size={24} color="#3B82F6" />
                <Text style={styles.metricValue}>{metrics.weight} kg</Text>
                <Text style={styles.metricLabel}>Peso</Text>
              </View>
            )}

            {metrics.height && (
              <View style={styles.metricCard}>
                <Scale size={24} color="#3B82F6" />
                <Text style={styles.metricValue}>{metrics.height} cm</Text>
                <Text style={styles.metricLabel}>Altura</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Composición Corporal</Text>
          
          <View style={styles.metricsGrid}>
            {metrics.body_fat && (
              <View style={styles.metricCard}>
                <Activity size={24} color="#22C55E" />
                <Text style={styles.metricValue}>{metrics.body_fat}%</Text>
                <Text style={styles.metricLabel}>Grasa Corporal</Text>
              </View>
            )}

            {metrics.muscle_mass && (
              <View style={styles.metricCard}>
                <Activity size={24} color="#22C55E" />
                <Text style={styles.metricValue}>{metrics.muscle_mass} kg</Text>
                <Text style={styles.metricLabel}>Masa Muscular</Text>
              </View>
            )}

            {metrics.visceral_fat && (
              <View style={styles.metricCard}>
                <Activity size={24} color="#22C55E" />
                <Text style={styles.metricValue}>{metrics.visceral_fat}</Text>
                <Text style={styles.metricLabel}>Grasa Visceral</Text>
              </View>
            )}

            {metrics.bone_mass && (
              <View style={styles.metricCard}>
                <Activity size={24} color="#22C55E" />
                <Text style={styles.metricValue}>{metrics.bone_mass} kg</Text>
                <Text style={styles.metricLabel}>Masa Ósea</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Otros Indicadores</Text>
          
          <View style={styles.metricsGrid}>
            {metrics.metabolic_age && (
              <View style={styles.metricCard}>
                <Brain size={24} color="#F59E0B" />
                <Text style={styles.metricValue}>{metrics.metabolic_age} años</Text>
                <Text style={styles.metricLabel}>Edad Metabólica</Text>
              </View>
            )}

            {metrics.hydration && (
              <View style={styles.metricCard}>
                <Droplets size={24} color="#F59E0B" />
                <Text style={styles.metricValue}>{metrics.hydration}%</Text>
                <Text style={styles.metricLabel}>Hidratación</Text>
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
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
  },
  metricLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
});