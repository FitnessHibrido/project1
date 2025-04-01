import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight, Clock, Target, Dumbbell } from 'lucide-react-native';
import { trainingPrograms } from '@/constants/programs';
import { useState, useMemo } from 'react';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 20;
const CARD_WIDTH = width - (CARD_MARGIN * 2);

type Level = 'Todos' | 'Principiante' | 'Intermedio' | 'Avanzado';

export default function ProgramsScreen() {
  const [selectedLevel, setSelectedLevel] = useState<Level>('Todos');
  const router = useRouter();

  const filteredPrograms = useMemo(() => {
    if (selectedLevel === 'Todos') {
      return trainingPrograms;
    }
    return trainingPrograms.filter(program => program.level === selectedLevel);
  }, [selectedLevel]);

  const handleProgramDetails = (programId: string) => {
    router.push({
      pathname: '/train/program/select-week',
      params: { id: programId }
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.title}>Nuestros Programas</Text>
        <Text style={styles.subtitle}>
          Encuentra el programa perfecto para alcanzar tus objetivos
        </Text>
      </View>

      <View style={styles.filtersSection}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {(['Todos', 'Principiante', 'Intermedio', 'Avanzado'] as Level[]).map((level) => (
            <TouchableOpacity 
              key={level}
              style={[
                styles.filterChip,
                selectedLevel === level && styles.activeFilter
              ]}
              onPress={() => setSelectedLevel(level)}
            >
              <Text style={[
                styles.filterText,
                selectedLevel === level && styles.activeFilterText
              ]}>
                {level}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.programsContainer}
      >
        {filteredPrograms.map((program) => (
          <TouchableOpacity 
            key={program.id} 
            style={styles.programCard}
            activeOpacity={0.9}
            onPress={() => handleProgramDetails(program.id)}
          >
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: program.image }}
                style={styles.programImage}
                resizeMode="cover"
              />
              <View style={styles.overlay}>
                <View style={styles.levelBadge}>
                  <Text style={styles.levelText}>{program.level}</Text>
                </View>
                <View style={styles.programNameContainer}>
                  <Text style={styles.programName}>{program.name}</Text>
                </View>
              </View>
            </View>

            <View style={styles.programDetails}>
              <View style={styles.statsContainer}>
                <View style={styles.stat}>
                  <Clock size={16} color="#6B7280" />
                  <Text style={styles.statText}>{program.duration}</Text>
                </View>
                <View style={styles.stat}>
                  <Target size={16} color="#6B7280" />
                  <Text style={styles.statText}>4 objetivos</Text>
                </View>
                <View style={styles.stat}>
                  <Dumbbell size={16} color="#6B7280" />
                  <Text style={styles.statText}>3-4 días/sem</Text>
                </View>
              </View>

              <Text style={styles.description} numberOfLines={2}>
                {program.description}
              </Text>

              <View style={styles.highlightsContainer}>
                {program.highlights.slice(0, 2).map((highlight, index) => (
                  <View key={index} style={styles.highlight}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.highlightText} numberOfLines={1}>
                      {highlight}
                    </Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity 
                style={styles.detailsButton}
                onPress={() => handleProgramDetails(program.id)}
              >
                <Text style={styles.detailsButtonText}>Ver Detalles</Text>
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
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
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
    lineHeight: 24,
  },
  filtersSection: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 4,
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeFilter: {
    backgroundColor: '#EFF6FF',
    borderColor: '#3B82F6',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeFilterText: {
    color: '#3B82F6',
  },
  programsContainer: {
    padding: 20,
    gap: 24,
  },
  programCard: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    height: 220,
    width: '100%',
  },
  programImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 16,
    justifyContent: 'space-between',
  },
  levelBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  levelText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  programNameContainer: {
    width: '100%',
  },
  programName: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  programDetails: {
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  description: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
    marginTop: 16,
    marginBottom: 16,
  },
  highlightsContainer: {
    gap: 8,
    marginBottom: 16,
  },
  highlight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3B82F6',
    marginRight: 12,
  },
  highlightText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    gap: 8,
  },
  detailsButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
  },
});