import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Play, Pause, Clock, ChevronRight, Dumbbell, X, Info, Timer } from 'lucide-react-native';
import { useState, useEffect } from 'react';

const workoutData = {
  program: "De 0 a Híbrido",
  week: 1,
  day: "Día 1 - Full Body",
  description: "Enfoque en movimientos compuestos para desarrollar fuerza base",
  muscleGroups: ["Pecho", "Espalda", "Piernas", "Core"],
  exercises: [
    {
      id: 1,
      name: "Sentadilla con Peso Corporal",
      sets: 3,
      targetReps: "12-15",
      restTime: 90,
      notes: "Mantén la espalda recta y los pies a la altura de los hombros",
    },
    {
      id: 2,
      name: "Flexiones Modificadas",
      sets: 3,
      targetReps: "8-12",
      restTime: 90,
      notes: "Puedes hacerlas con rodillas apoyadas para facilitar el movimiento",
    },
    {
      id: 3,
      name: "Peso Muerto con Mancuerna",
      sets: 3,
      targetReps: "12-15",
      restTime: 90,
      notes: "Mantén la espalda recta y las rodillas ligeramente flexionadas",
    },
    {
      id: 4,
      name: "Plancha",
      sets: 3,
      targetTime: "30s",
      restTime: 60,
      notes: "Mantén el core activado y la espalda recta",
    }
  ]
};

export default function WorkoutScreen() {
  const router = useRouter();
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [exerciseData, setExerciseData] = useState(
    workoutData.exercises.map(exercise => ({
      ...exercise,
      sets: Array(exercise.sets).fill().map(() => ({
        reps: '',
        weight: '',
        rir: '',
      }))
    }))
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

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

        <ScrollView 
          style={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <View style={styles.programInfo}>
              <Text style={styles.programName}>{workoutData.program}</Text>
              <Text style={styles.weekInfo}>Semana {workoutData.week}</Text>
            </View>
            <Text style={styles.dayTitle}>{workoutData.day}</Text>
            <Text style={styles.description}>{workoutData.description}</Text>
            <View style={styles.muscleGroups}>
              {workoutData.muscleGroups.map((group, index) => (
                <View key={index} style={styles.muscleGroupTag}>
                  <Dumbbell size={14} color="#3B82F6" />
                  <Text style={styles.muscleGroupText}>{group}</Text>
                </View>
              ))}
            </View>
          </View>

          {exerciseData.map((exercise, exerciseIndex) => (
            <View key={exercise.id} style={styles.exerciseContainer}>
              <View style={styles.exerciseHeader}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <View style={styles.targetContainer}>
                  <Text style={styles.targetLabel}>Objetivo:</Text>
                  <Text style={styles.targetValue}>{exercise.targetReps || exercise.targetTime}</Text>
                </View>
                {exercise.notes && (
                  <View style={styles.notesContainer}>
                    <Info size={14} color="#3B82F6" />
                    <Text style={styles.notesText}>{exercise.notes}</Text>
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
                <Text style={styles.restTimeText}>Descanso: {exercise.restTime}s</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => router.back()}
          >
            <X size={20} color="#DC2626" />
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.finishButton}>
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
  programInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  programName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  weekInfo: {
    fontSize: 14,
    color: '#6B7280',
  },
  dayTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  muscleGroups: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  muscleGroupTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  muscleGroupText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
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
});