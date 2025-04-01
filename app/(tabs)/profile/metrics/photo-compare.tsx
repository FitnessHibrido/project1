import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Calendar, Share2 } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Share } from 'react-native';

const { width } = Dimensions.get('window');
const PHOTO_WIDTH = width - 40;

interface ProgressPhoto {
  id: string;
  date: string;
  type: 'front' | 'back' | 'side';
  url: string;
}

export default function PhotoCompareScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [currentPhoto, setCurrentPhoto] = useState<ProgressPhoto | null>(null);
  const [previousPhoto, setPreviousPhoto] = useState<ProgressPhoto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        
        // Obtener la foto actual
        const { data: currentPhotoData, error: currentError } = await supabase
          .from('progress_photos')
          .select('*')
          .eq('id', id)
          .single();

        if (currentError) throw currentError;
        setCurrentPhoto(currentPhotoData);

        // Obtener la foto anterior del mismo tipo
        if (currentPhotoData) {
          const { data: previousPhotoData } = await supabase
            .from('progress_photos')
            .select('*')
            .eq('type', currentPhotoData.type)
            .lt('date', currentPhotoData.date)
            .order('date', { ascending: false })
            .limit(1)
            .single();

          setPreviousPhoto(previousPhotoData || null);
        }
      } catch (err) {
        console.error('Error fetching photos:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPhotos();
    }
  }, [id]);

  const handleShare = async () => {
    try {
      const message = `¡Mira mi progreso!\n\n` +
        `${new Date(currentPhoto?.date || '').toLocaleDateString()}\n` +
        `#FitnessProgress #BoltApp`;

      await Share.share({
        message,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando fotos...</Text>
      </View>
    );
  }

  if (!currentPhoto) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No se encontró la foto</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Comparación de Progreso</Text>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Share2 size={20} color="#3B82F6" />
          <Text style={styles.shareButtonText}>Compartir</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.photoContainer}>
          {previousPhoto ? (
            <>
              <View style={styles.photoCard}>
                <Image source={{ uri: previousPhoto.url }} style={styles.photo} />
                <View style={styles.photoInfo}>
                  <Calendar size={16} color="#6B7280" />
                  <Text style={styles.photoDate}>
                    {new Date(previousPhoto.date).toLocaleDateString()}
                  </Text>
                </View>
              </View>

              <View style={styles.photoCard}>
                <Image source={{ uri: currentPhoto.url }} style={styles.photo} />
                <View style={styles.photoInfo}>
                  <Calendar size={16} color="#6B7280" />
                  <Text style={styles.photoDate}>
                    {new Date(currentPhoto.date).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <View style={styles.singlePhotoCard}>
              <Image source={{ uri: currentPhoto.url }} style={styles.photo} />
              <View style={styles.photoInfo}>
                <Calendar size={16} color="#6B7280" />
                <Text style={styles.photoDate}>
                  {new Date(currentPhoto.date).toLocaleDateString()}
                </Text>
              </View>
            </View>
          )}
        </View>

        {!previousPhoto && (
          <View style={styles.noComparisonMessage}>
            <Text style={styles.noComparisonTitle}>Sin foto anterior</Text>
            <Text style={styles.noComparisonText}>
              Toma más fotos de este tipo para poder comparar tu progreso
            </Text>
          </View>
        )}
      </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  shareButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  photoContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  photoCard: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  singlePhotoCard: {
    width: PHOTO_WIDTH,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  photo: {
    width: '100%',
    aspectRatio: 3/4,
  },
  photoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  photoDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  noComparisonMessage: {
    marginTop: 32,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
  },
  noComparisonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  noComparisonText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});