import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Play, X } from 'lucide-react-native';

interface Exercise {
  id: string;
  name: string;
  video_url: string;
}

export default function VideoCategoryScreen() {
  const { id, title } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('program_exercises')
          .select('id, name, video_url')
          .order('order_number');

        if (error) throw error;

        const filteredExercises = data.filter(exercise => {
          const name = exercise.name.toLowerCase();
          switch (id) {
            case 'abs':
              return name.includes('pallof') || name.includes('bird-dog') || name.includes('stir');
            case 'adductor':
              return name.includes('copenhaguen');
            case 'quads':
              return name.includes('sentadilla') || name.includes('squat') || name.includes('zancada') || name.includes('extensión de cuádriceps') || name.includes('prensa');
            case 'shoulders':
              return name.includes('press militar') || name.includes('elevaciones') || name.includes('remo al mentón') || name.includes('abducción');
            case 'glutes':
              return name.includes('glúteos') || name.includes('hip thrust') || name.includes('step down') || name.includes('pull through');
            case 'hamstrings':
              return name.includes('peso muerto') || name.includes('leg curl');
            case 'chest':
              return name.includes('press') || name.includes('pecho') || name.includes('flexiones') || name.includes('cruce') || name.includes('aperturas');
            case 'traps':
              return name.includes('trapecio') || name.includes('encogimiento');
            case 'triceps':
              return name.includes('tríceps') || name.includes('extensión') || name.includes('francés') || name.includes('kaz press');
            case 'running':
              return name.includes('carrera') || name.includes('sat') || name.includes('apoyo') || name.includes('longitud');
            case 'plyometrics':
              return name.includes('salto') || name.includes('jump') || name.includes('pogo') || name.includes('drop');
            default:
              return false;
          }
        });

        setExercises(filteredExercises);
      } catch (err) {
        console.error('Error fetching exercises:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando ejercicios...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{exercises.length} videos disponibles</Text>
      </View>

      <ScrollView style={styles.content}>
        {exercises.map((exercise) => (
          <View key={exercise.id} style={styles.videoCard}>
            <Text style={styles.videoTitle}>{exercise.name}</Text>
            <TouchableOpacity 
              style={styles.thumbnailContainer}
              onPress={() => setSelectedVideo(exercise.video_url)}
            >
              <View style={styles.playButtonContainer}>
                <View style={styles.playButton}>
                  <Play size={32} color="#FFFFFF" fill="#FFFFFF" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Modal
        visible={!!selectedVideo}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setSelectedVideo(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setSelectedVideo(null)}
            >
              <X size={24} color="#FFFFFF" />
            </TouchableOpacity>
            {selectedVideo && (
              <iframe
                src={`${selectedVideo}?autoplay=true&loop=false&muted=false&preload=true&responsive=true`}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: 12,
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </View>
        </View>
      </Modal>
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
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
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
  content: {
    flex: 1,
    padding: 20,
  },
  videoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  thumbnailContainer: {
    width: '100%',
    aspectRatio: 16/9,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(59, 130, 246, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    aspectRatio: 16/9,
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});