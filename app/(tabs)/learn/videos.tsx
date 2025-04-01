import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Dumbbell, FileWarning as Running, ArrowUp, Armchair, Footprints, Activity, Heart, Leaf, Waves, Mountain } from 'lucide-react-native';

const categories = [
  {
    id: 'abs',
    title: 'Abdominales',
    description: 'Ejercicios para el core',
    icon: Activity,
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
    color: '#EF4444',
    videoCount: 4,
  },
  {
    id: 'adductor',
    title: 'Aductor',
    description: 'Ejercicios para aductores',
    icon: Footprints,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    color: '#3B82F6',
    videoCount: 1,
  },
  {
    id: 'quads',
    title: 'Cuádriceps',
    description: 'Ejercicios para cuádriceps',
    icon: Footprints,
    image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800&q=80',
    color: '#F59E0B',
    videoCount: 10,
  },
  {
    id: 'shoulders',
    title: 'Deltoides',
    description: 'Ejercicios para hombros',
    icon: Waves,
    image: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=800&q=80',
    color: '#10B981',
    videoCount: 11,
  },
  {
    id: 'glutes',
    title: 'Glúteos',
    description: 'Ejercicios para glúteos',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80',
    color: '#6366F1',
    videoCount: 6,
  },
  {
    id: 'hamstrings',
    title: 'Isquiotibiales',
    description: 'Ejercicios para isquios',
    icon: Leaf,
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80',
    color: '#EC4899',
    videoCount: 5,
  },
  {
    id: 'chest',
    title: 'Pectoral',
    description: 'Ejercicios para pecho',
    icon: Dumbbell,
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
    color: '#8B5CF6',
    videoCount: 22,
  },
  {
    id: 'traps',
    title: 'Trapecio',
    description: 'Ejercicios para trapecios',
    icon: Mountain,
    image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800&q=80',
    color: '#F472B6',
    videoCount: 6,
  },
  {
    id: 'triceps',
    title: 'Tríceps',
    description: 'Ejercicios para tríceps',
    icon: Armchair,
    image: 'https://images.unsplash.com/photo-1590507621108-433608c97823?w=800&q=80',
    color: '#2DD4BF',
    videoCount: 8,
  },
  {
    id: 'running',
    title: 'Técnica de Carrera',
    description: 'Ejercicios de técnica de carrera',
    icon: Running,
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80',
    color: '#FB923C',
    videoCount: 39,
  },
  {
    id: 'plyometrics',
    title: 'Pliométricos',
    description: 'Ejercicios pliométricos',
    icon: ArrowUp,
    image: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800&q=80',
    color: '#0EA5E9',
    videoCount: 21,
  },
];

export default function VideosScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Categorías</Text>
          <Text style={styles.subtitle}>Videos por Raúl Ocaña</Text>
        </View>

        <View style={styles.grid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => router.push({
                pathname: '/learn/video-category',
                params: { id: category.id, title: category.title }
              })}
            >
              <Image
                source={{ uri: category.image }}
                style={styles.categoryImage}
              />
              <View style={styles.overlay} />
              
              <View style={styles.iconContainer}>
                <View style={[styles.iconBackground, { backgroundColor: category.color }]}>
                  <category.icon size={24} color="#FFFFFF" />
                </View>
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.videoCount}>{category.videoCount} videos</Text>
              </View>
            </TouchableOpacity>
          ))}
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
  grid: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryCard: {
    width: '50%',
    padding: 10,
    position: 'relative',
  },
  categoryImage: {
    width: '100%',
    height: 180,
    borderRadius: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    margin: 10,
    borderRadius: 16,
  },
  iconContainer: {
    position: 'absolute',
    top: 25,
    left: 25,
    zIndex: 10,
  },
  iconBackground: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    position: 'absolute',
    bottom: 25,
    left: 25,
    right: 25,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  videoCount: {
    fontSize: 14,
    color: '#F3F4F6',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});