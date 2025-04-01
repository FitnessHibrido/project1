import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Play, Pause, Clock, ChevronRight, X, Info, Timer, Video } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { useWorkout } from '@/hooks/useWorkout';
import { useProgram } from '@/hooks/useProgram';

function ExerciseVideo({ videoUrl, visible, onClose }: { videoUrl?: string; visible: boolean; onClose: () => void }) {
  if (!videoUrl) return null;

  // Modificar la URL para forzar reproducción automática y pantalla completa
  const enhancedUrl = `${videoUrl}?autoplay=true&preload=true&muted=false&responsive=true`;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      presentationStyle="fullScreen"
      statusBarTranslucent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <WebView
            source={{ uri: enhancedUrl }}
            style={styles.video}
            allowsFullscreenVideo={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            mediaPlaybackRequiresUserAction={false}
            startInLoadingState={true}
            scrollEnabled={false}
            bounces={false}
            automaticallyAdjustContentInsets={false}
          />
        </View>
      </View>
    </Modal>
  );
}

export default function WorkoutScreen() {
  const { week, day } = useLocalSearchParams();
  const router = useRouter();
  const weekNum = parseInt(week as string, 10);
  const dayNum = parseInt(day as string, 10);
  const { getDay } = useProgram('zero-to-hybrid');
  const { startWorkout, finishWorkout } = useWorkout();
  
  const [workoutId, setWorkoutId] = useState<string | null>(null);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [exerciseData, setExerciseData] = useState<Array<{
    name: string;
    video_url?: string;
    sets: Array<{
      reps: string;
      weight: string;
      rir: string;
    }>;
  }>>([]);

  const dayData = getDay(weekNum, dayNum);

  useEffect(() => {
    if (dayData) {
      setExerciseData(
        dayData.exercises.map(exercise => ({
          name: exercise.name,
          video_url: exercise.video_url,
          sets: Array(exercise.sets).fill().map(() => ({
            reps: '',
            weight: '',
            rir: '',
          })),
        }))
      );
    }
  }, [dayData]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    const initWorkout = async () => {
      try {
        const workout = await startWorkout('zero-to-hybrid', weekNum, dayNum);
        setWorkoutId(workout.id);
      } catch (error) {
        console.error('Error al iniciar el entrenamiento:', error);
      }
    };

    initWorkout();
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const updateSetData = (exerciseIndex: number, setIndex: number, field: 'reps' | 'weight' | 'rir', value: string) => {
    setExerciseData(prevData => {
      const newData = [...prevData];
      newData[exerciseIndex].sets[setIndex][field] = value;
      return newData;
    });
  };

  const handleFinishWorkout = async () => {
    try {
      if (!workoutId) return;

      const exercises = exerciseData.map(exercise => ({
        name: exercise.name,
        sets: exercise.sets.map(set => ({
          reps: parseInt(set.reps, 10),
          weight: parseFloat(set.weight),
          rir: set.rir,
        })),
      }));

      const stats = await finishWorkout(workoutId, exercises);

      router.replace({
        pathname: '/train/workout-summary',
        params: { 
          totalVolume: stats.totalVolume,
          totalReps: stats.totalReps,
          duration: time,
        }
      });
    } catch (error) {
      console.error('Error al finalizar el entrenamiento:', error);
    }
  };

  if (!dayData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No se encontró el entrenamiento</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.timerContainer}>
          <View style={styles.timer}>
            <Timer size={20} color="#3B82F6" />
            <Text style={styles.timerText}>{formatTime(time)}</Text>
            <TouchableOpacity 
              style={styles.timerButton} 
              onPress={() => setIsRunning(!isRunning)}
            >
              {isRunning ? (
                <Pause size={20} color="#FFFFFF" />
              ) : (
                <Play size={20} color="#FFFFFF" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{dayData.title}</Text>
            <Text style={styles.description}>{dayData.description}</Text>
          </View>

          {exerciseData.map((exercise, exerciseIndex) => (
            <View key={exercise.name} style={styles.exerciseContainer}>
              <View style={styles.exerciseHeader}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                
                {exercise.video_url && (
                  <TouchableOpacity 
                    style={styles.videoButton}
                    onPress={() => setSelectedVideo(exercise.video_url)}
                  >
                    <Video size={20} color="#3B82F6" />
                    <Text style={styles.videoButtonText}>Ver técnica</Text>
                  </TouchableOpacity>
                )}

                <View style={styles.targetContainer}>
                  <Text style={styles.targetLabel}>Objetivo:</Text>
                  <Text style={styles.targetValue}>{dayData.exercises[exerciseIndex].reps}</Text>
                </View>

                {dayData.exercises[exerciseIndex].rir && (
                  <View style={styles.notesContainer}>
                    <Info size={14} color="#3B82F6" />
                    <Text style={styles.notesText}>RIR: {dayData.exercises[exerciseIndex].rir}</Text>
                  </View>
                )}
              </View>

              <View style={styles.setsContainer}>
                <View style={styles.setsHeader}>
                  <Text style={styles.setsHeaderText}>Series</Text>
                  <Text style={styles.setsHeaderText}>Reps</Text>
                  <Text style={styles.setsHeaderText}>Peso</Text>
                  <Text style={styles.setsHeaderText}>RIR</Text>
                </View>

                {exercise.sets.map((set, setIndex) => (
                  <View key={setIndex} style={styles.setRow}>
                    <View style={styles.setNumberContainer}>
                      <Text style={styles.setNumber}>{setIndex + 1}</Text>
                    </View>
                    
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={set.reps}
                        onChangeText={(value) => updateSetData(exerciseIndex, setIndex, 'reps', value)}
                        placeholder="0"
                        placeholderTextColor="#9CA3AF"
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={set.weight}
                        onChangeText={(value) => updateSetData(exerciseIndex, setIndex, 'weight', value)}
                        placeholder="0"
                        placeholderTextColor="#9CA3AF"
                      />
                      <Text style={styles.unit}>kg</Text>
                    </View>

                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={set.rir}
                        onChangeText={(value) => updateSetData(exerciseIndex, setIndex, 'rir', value)}
                        placeholder="0"
                        placeholderTextColor="#9CA3AF"
                      />
                    </View>
                  </View>
                ))}
              </View>

              <View style={styles.restTime}>
                <Clock size={14} color="#3B82F6" />
                <Text style={styles.restTimeText}>
                  Descanso: {dayData.exercises[exerciseIndex].rest}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <ExerciseVideo 
          videoUrl={selectedVideo || undefined}
          visible={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />

        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => router.back()}
          >
            <X size={20} color="#DC2626" />
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.finishButton}
            onPress={handleFinishWorkout}
          >
            <Text style={styles.finishButtonText}>Finalizar Entreno</Text>
            <ChevronRight size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  timerContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    padding: 16,
  },
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  timerText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    fontVariant: ['tabular-nums'],
  },
  timerButton: {
    backgroundColor: '#3B82F6',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
  },
  exerciseContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 12,
    padding: 20,
    borderRadius: 12,
    margin: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  exerciseHeader: {
    marginBottom: 16,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  targetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  targetLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  targetValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 8,
  },
  notesText: {
    flex: 1,
    fontSize: 14,
    color: '#3B82F6',
  },
  setsContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  setsHeader: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  setsHeaderText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
    textAlign: 'center',
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  setNumberContainer: {
    flex: 1,
    alignItems: 'center',
  },
  setNumber: {
    width: 28,
    height: 28,
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    textAlign: 'center',
    lineHeight: 28,
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 10,
    width: 64,
    textAlign: 'center',
    fontSize: 16,
    color: '#111827',
    fontVariant: ['tabular-nums'],
  },
  unit: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 2,
  },
  restTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  restTimeText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  cancelButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DC2626',
  },
  finishButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
  },
  finishButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#000000',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
    borderRadius: 20,
  },
  video: {
    flex: 1,
    backgroundColor: '#000000',
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 8,
    gap: 8,
    marginVertical: 12,
  },
  videoButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
});