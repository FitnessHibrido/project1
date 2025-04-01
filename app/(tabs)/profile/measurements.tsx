import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Camera, Scale, Ruler, Activity, Calendar, ChevronRight, Plus } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;

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

interface ProgressPhoto {
  id: string;
  date: string;
  type: 'front' | 'back' | 'side';
  url: string;
}

export default function MeasurementsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'metrics' | 'measurements' | 'photos'>('metrics');
  const [metrics, setMetrics] = useState<BodyMetrics[]>([]);
  const [measurements, setMeasurements] = useState<BodyMeasurements[]>([]);
  const [photos, setPhotos] = useState<ProgressPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch metrics
        const { data: metricsData } = await supabase
          .from('body_metrics')
          .select('*')
          .eq('profile_id', user.id)
          .order('date', { ascending: false });

        if (metricsData) setMetrics(metricsData);

        // Fetch measurements
        const { data: measurementsData } = await supabase
          .from('body_measurements')
          .select('*')
          .eq('profile_id', user.id)
          .order('date', { ascending: false });

        if (measurementsData) setMeasurements(measurementsData);

        // Fetch photos
        const { data: photosData } = await supabase
          .from('progress_photos')
          .select('*')
          .eq('profile_id', user.id)
          .order('date', { ascending: false });

        if (photosData) setPhotos(photosData);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const renderMetricsTab = () => (
    <View style={styles.tabContent}>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => router.push('/profile/metrics/add')}
      >
        <Plus size={20} color="#3B82F6" />
        <Text style={styles.addButtonText}>Añadir Métricas</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {metrics.map((metric, index) => (
          <View key={metric.id} style={styles.metricCard}>
            <View style={styles.cardHeader}>
              <Calendar size={16} color="#6B7280" />
              <Text style={styles.dateText}>
                {new Date(metric.date).toLocaleDateString()}
              </Text>
            </View>

            <View style={styles.metricsGrid}>
              {metric.weight && (
                <View style={styles.metricItem}>
                  <Scale size={20} color="#3B82F6" />
                  <Text style={styles.metricValue}>{metric.weight} kg</Text>
                  <Text style={styles.metricLabel}>Peso</Text>
                </View>
              )}

              {metric.body_fat && (
                <View style={styles.metricItem}>
                  <Activity size={20} color="#22C55E" />
                  <Text style={styles.metricValue}>{metric.body_fat}%</Text>
                  <Text style={styles.metricLabel}>Grasa Corporal</Text>
                </View>
              )}

              {metric.muscle_mass && (
                <View style={styles.metricItem}>
                  <Ruler size={20} color="#F59E0B" />
                  <Text style={styles.metricValue}>{metric.muscle_mass} kg</Text>
                  <Text style={styles.metricLabel}>Masa Muscular</Text>
                </View>
              )}
            </View>

            <TouchableOpacity 
              style={styles.viewDetailsButton}
              onPress={() => router.push({
                pathname: '/profile/metrics/details',
                params: { id: metric.id }
              })}
            >
              <Text style={styles.viewDetailsText}>Ver Detalles</Text>
              <ChevronRight size={16} color="#3B82F6" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderMeasurementsTab = () => (
    <View style={styles.tabContent}>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => router.push('/profile/measurements/add')}
      >
        <Plus size={20} color="#3B82F6" />
        <Text style={styles.addButtonText}>Añadir Medidas</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {measurements.map((measurement) => (
          <View key={measurement.id} style={styles.measurementCard}>
            <View style={styles.cardHeader}>
              <Calendar size={16} color="#6B7280" />
              <Text style={styles.dateText}>
                {new Date(measurement.date).toLocaleDateString()}
              </Text>
            </View>

            <View style={styles.measurementsGrid}>
              {measurement.chest && (
                <View style={styles.measurementItem}>
                  <Text style={styles.measurementValue}>{measurement.chest} cm</Text>
                  <Text style={styles.measurementLabel}>Pecho</Text>
                </View>
              )}

              {measurement.waist && (
                <View style={styles.measurementItem}>
                  <Text style={styles.measurementValue}>{measurement.waist} cm</Text>
                  <Text style={styles.measurementLabel}>Cintura</Text>
                </View>
              )}

              {measurement.hips && (
                <View style={styles.measurementItem}>
                  <Text style={styles.measurementValue}>{measurement.hips} cm</Text>
                  <Text style={styles.measurementLabel}>Cadera</Text>
                </View>
              )}
            </View>

            <TouchableOpacity 
              style={styles.viewDetailsButton}
              onPress={() => router.push({
                pathname: '/profile/measurements/details',
                params: { id: measurement.id }
              })}
            >
              <Text style={styles.viewDetailsText}>Ver Detalles</Text>
              <ChevronRight size={16} color="#3B82F6" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderPhotosTab = () => (
    <View style={styles.tabContent}>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => router.push('/profile/camera')}
      >
        <Camera size={20} color="#3B82F6" />
        <Text style={styles.addButtonText}>Nueva Foto</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {photos.length > 0 ? (
          <View style={styles.photosGrid}>
            {photos.map((photo) => (
              <TouchableOpacity
                key={photo.id}
                style={styles.photoCard}
                onPress={() => router.push({
                  pathname: '/profile/photos/compare',
                  params: { id: photo.id }
                })}
              >
                <Image
                  source={{ uri: photo.url }}
                  style={styles.photoImage}
                />
                <View style={styles.photoOverlay}>
                  <Text style={styles.photoType}>{photo.type}</Text>
                  <Text style={styles.photoDate}>
                    {new Date(photo.date).toLocaleDateString()}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Camera size={48} color="#D1D5DB" />
            <Text style={styles.emptyStateTitle}>Sin Fotos</Text>
            <Text style={styles.emptyStateText}>
              Añade fotos para hacer un seguimiento visual de tu progreso
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Métricas Corporales</Text>
        <Text style={styles.subtitle}>Seguimiento de tu progreso físico</Text>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'metrics' && styles.activeTab]}
          onPress={() => setActiveTab('metrics')}
        >
          <Text style={[styles.tabText, activeTab === 'metrics' && styles.activeTabText]}>
            Métricas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'measurements' && styles.activeTab]}
          onPress={() => setActiveTab('measurements')}
        >
          <Text style={[styles.tabText, activeTab === 'measurements' && styles.activeTabText]}>
            Medidas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'photos' && styles.activeTab]}
          onPress={() => setActiveTab('photos')}
        >
          <Text style={[styles.tabText, activeTab === 'photos' && styles.activeTabText]}>
            Fotos
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'metrics' && renderMetricsTab()}
      {activeTab === 'measurements' && renderMeasurementsTab()}
      {activeTab === 'photos' && renderPhotosTab()}
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#EFF6FF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#3B82F6',
  },
  tabContent: {
    flex: 1,
    padding: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    gap: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
  },
  metricCard: {
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
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 16,
  },
  metricItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    gap: 8,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  metricLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    marginTop: 16,
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  measurementCard: {
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
  measurementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  measurementItem: {
    flex: 1,
    minWidth: '30%',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  measurementValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  measurementLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  photoCard: {
    width: (CARD_WIDTH - 12) / 2,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  photoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  photoType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  photoDate: {
    fontSize: 12,
    color: '#F3F4F6',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});