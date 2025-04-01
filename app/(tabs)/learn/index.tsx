import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, BookOpen, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function LearnScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Biblioteca</Text>
          <Text style={styles.subtitle}>Recursos para tu desarrollo</Text>
        </View>

        <TouchableOpacity 
          style={styles.section}
          onPress={() => router.push('/learn/videos')}
        >
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Play size={24} color="#3B82F6" />
              <Text style={styles.sectionTitle}>Videos Formativos</Text>
            </View>
            <ChevronRight size={20} color="#3B82F6" />
          </View>
          
          <View style={styles.previewCard}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80' }} 
              style={styles.previewImage}
            />
            <View style={styles.previewOverlay}>
              <Play size={32} color="#FFFFFF" fill="#FFFFFF" />
              <Text style={styles.previewText}>Ejercicios por Raúl Ocaña</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.section}
          onPress={() => router.push('/learn/manuals')}
        >
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <BookOpen size={24} color="#3B82F6" />
              <Text style={styles.sectionTitle}>Manuales y Guías</Text>
            </View>
            <ChevronRight size={20} color="#3B82F6" />
          </View>
          
          <View style={styles.previewCard}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80' }} 
              style={styles.previewImage}
            />
            <View style={styles.previewOverlay}>
              <BookOpen size={32} color="#FFFFFF" />
              <Text style={styles.previewText}>Guías de Entrenamiento</Text>
            </View>
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
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
    color: '#6B7280',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  previewCard: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000000',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  previewOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  previewText: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});