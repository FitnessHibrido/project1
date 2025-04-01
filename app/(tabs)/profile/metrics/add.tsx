import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Scale, Activity, Brain, Droplets } from 'lucide-react-native';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

export default function AddMetricsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState({
    weight: '',
    height: '',
    body_fat: '',
    muscle_mass: '',
    visceral_fat: '',
    bone_mass: '',
    metabolic_age: '',
    hydration: '',
  });

  const handleSave = async () => {
    try {
      setLoading(true);

      // Convertir valores a números donde sea necesario
      const numericMetrics = Object.entries(metrics).reduce((acc, [key, value]) => {
        if (value === '') return acc;
        return {
          ...acc,
          [key]: key === 'metabolic_age' ? parseInt(value) : parseFloat(value),
        };
      }, {});

      const { error } = await supabase
        .from('body_metrics')
        .insert({
          profile_id: user?.id,
          ...numericMetrics,
        });

      if (error) throw error;

      router.back();
    } catch (err) {
      console.error('Error saving metrics:', err);
      // Aquí podrías mostrar un mensaje de error al usuario
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.content}>
          <Text style={styles.title}>Añadir Métricas</Text>
          <Text style={styles.subtitle}>
            Registra tus métricas corporales para hacer seguimiento de tu progreso
          </Text>

          <View style={styles.form}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Métricas Básicas</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Peso (kg)</Text>
                <View style={styles.inputContainer}>
                  <Scale size={20} color="#6B7280" />
                  <TextInput
                    style={styles.input}
                    placeholder="0.0"
                    value={metrics.weight}
                    onChangeText={(value) => setMetrics(prev => ({ ...prev, weight: value }))}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Altura (cm)</Text>
                <View style={styles.inputContainer}>
                  <Scale size={20} color="#6B7280" />
                  <TextInput
                    style={styles.input}
                    placeholder="0.0"
                    value={metrics.height}
                    onChangeText={(value) => setMetrics(prev => ({ ...prev, height: value }))}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Composición Corporal</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Grasa Corporal (%)</Text>
                <View style={styles.inputContainer}>
                  <Activity size={20} color="#6B7280" />
                  <TextInput
                    style={styles.input}
                    placeholder="0.0"
                    value={metrics.body_fat}
                    onChangeText={(value) => setMetrics(prev => ({ ...prev, body_fat: value }))}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Masa Muscular (kg)</Text>
                <View style={styles.inputContainer}>
                  <Activity size={20} color="#6B7280" />
                  <TextInput
                    style={styles.input}
                    placeholder="0.0"
                    value={metrics.muscle_mass}
                    onChangeText={(value) => setMetrics(prev => ({ ...prev, muscle_mass: value }))}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Grasa Visceral</Text>
                <View style={styles.inputContainer}>
                  <Activity size={20} color="#6B7280" />
                  <TextInput
                    style={styles.input}
                    placeholder="0.0"
                    value={metrics.visceral_fat}
                    onChangeText={(value) => setMetrics(prev => ({ ...prev, visceral_fat: value }))}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Masa Ósea (kg)</Text>
                <View style={styles.inputContainer}>
                  <Activity size={20} color="#6B7280" />
                  <TextInput
                    style={styles.input}
                    placeholder="0.0"
                    value={metrics.bone_mass}
                    onChangeText={(value) => setMetrics(prev => ({ ...prev, bone_mass: value }))}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Otros Indicadores</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Edad Metabólica</Text>
                <View style={styles.inputContainer}>
                  <Brain size={20} color="#6B7280" />
                  <TextInput
                    style={styles.input}
                    placeholder="0"
                    value={metrics.metabolic_age}
                    onChangeText={(value) => setMetrics(prev => ({ ...prev, metabolic_age: value }))}
                    keyboardType="number-pad"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Hidratación (%)</Text>
                <View style={styles.inputContainer}>
                  <Droplets size={20} color="#6B7280" />
                  <TextInput
                    style={styles.input}
                    placeholder="0.0"
                    value={metrics.hydration}
                    onChangeText={(value) => setMetrics(prev => ({ ...prev, hydration: value }))}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => router.back()}
            disabled={loading}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.saveButton, loading && styles.disabledButton]}
            onPress={handleSave}
            disabled={loading}
          >
            <Text style={styles.saveButtonText}>
              {loading ? 'Guardando...' : 'Guardar'}
            </Text>
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
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  form: {
    gap: 24,
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#111827',
  },
  footer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
  },
  saveButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  disabledButton: {
    opacity: 0.7,
  },
});