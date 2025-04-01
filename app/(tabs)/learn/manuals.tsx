import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, ChevronRight } from 'lucide-react-native';

const manuals = [
  {
    id: 1,
    title: 'Guía de Entrenamiento',
    description: 'Guía completa con todos los ejercicios y programas de entrenamiento.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80',
    type: 'PDF',
    pages: 45,
    author: 'Raúl Ocaña',
  },
  {
    id: 2,
    title: 'Guía de Nutrición',
    description: 'Aprende los fundamentos de la nutrición deportiva y optimiza tu rendimiento.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
    type: 'PDF',
    pages: 32,
    author: 'Raúl Ocaña',
  },
  {
    id: 3,
    title: 'Guía de Suplementación',
    description: 'Todo lo que necesitas saber sobre suplementación deportiva.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    type: 'PDF',
    pages: 28,
    author: 'Raúl Ocaña',
  }
];

export default function ManualsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {manuals.map((manual) => (
          <TouchableOpacity key={manual.id} style={styles.manualCard}>
            <Image source={{ uri: manual.image }} style={styles.manualImage} />
            <View style={styles.overlay} />
            
            <View style={styles.content}>
              <View style={styles.header}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{manual.title}</Text>
                  <View style={styles.typeBadge}>
                    <BookOpen size={14} color="#3B82F6" />
                    <Text style={styles.typeText}>{manual.type}</Text>
                  </View>
                </View>
                
                <View style={styles.metaInfo}>
                  <Text style={styles.metaText}>{manual.pages} páginas</Text>
                  <Text style={styles.metaText}>•</Text>
                  <Text style={styles.metaText}>Por {manual.author}</Text>
                </View>
              </View>
              
              <Text style={styles.description}>
                {manual.description}
              </Text>

              <TouchableOpacity style={styles.readButton}>
                <Text style={styles.readButtonText}>Leer Manual</Text>
                <ChevronRight size={20} color="#3B82F6" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  manualCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  manualImage: {
    width: '100%',
    height: 200,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    height: 200,
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginRight: 12,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  typeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3B82F6',
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 14,
    color: '#6B7280',
  },
  description: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 20,
  },
  readButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  readButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
  },
});