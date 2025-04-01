import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ruler } from 'lucide-react-native';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

export default function AddMeasurementScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [measurements, setMeasurements] = useState({
    neck: '',
    shoulders: '',
    chest: '',
    left_arm: '',
    right_arm: '',
    left_forearm: '',
    right_forearm: '',
    waist: '',
    abdomen: '',
    hips: '',
    left_thigh: '',
    right_thigh: '',
    left_calf: '',
    right_calf: '',
  });

  const handleSave = async () => {
    try {
      setLoading(true);

      // Convertir valores a números
      const numericMeasurements = Object.entries(measurements).reduce((acc, [key, value]) => {
        if (value === '') return acc;
        return {
          ...acc,
          [key]: parseFloat(value),
        };
      }, {});

      const { error } = await supabase
        .from('body_measurements')
        .insert({
          profile_id: user?.id,
          ...numericMeasurements,
        });

      if (error) throw error;

      router.back();
    } catch (err) {
      console.error('Error saving measurements:', err);
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
          <Text style={styles.title}>Añadir Medidas</Text>
          <Text style={styles.subtitle}>
            Registra tus medidas corporales para hacer seguimiento de tu progreso
          </Text>

          <View style={styles.form}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Parte Superior</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Cuello (cm)</Text>
                <View style={styles.inputContainer}>
                  <Ruler size={20} color="#6B7280" />
                  <TextInput
                    style={styles.input}
                    placeholder="0.0"
                    value={measurements.neck}
                    onChangeText={(value) => setMeasurements(prev => ({ ...prev, neck: value }))}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Hombros (cm)</Text>
                <View style={styles.inputContainer}>
                  <Ruler size={20} color="#6B7280" />
                  <TextInput
                    style={styles.input}
                    placeholder="0.0"
                    value={measurements.shoulders}
                    onChangeText={(value) => setMeasurements(prev => ({ ...prev, shoulders: value }))}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Pecho (cm)</Text>
                <View style={styles.inputContainer}>
                  <Ruler size={20} color="#6B7280" />
                  <TextInput
                    style={styles.input}
                    placeholder="0.0"
                    value={measurements.chest}
                    onChangeText={(value) => setMeasurements(prev => ({ ...prev, chest: value }))}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Brazos</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Bíceps Izquierdo (cm)</Text>
                <View style={styles.inputContainer}>
                  <Ruler size={20} color="#6B7280" />
                  <TextInput
                    style={styles.input}
                    placeholder="0.0"
                    value={measurements.left_arm}
                    onChangeText={(value) => setMeasurements(prev => ({ ...prev, left_arm: value }))}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Bíceps Derecho (cm)</Text>
                <View style={styles.inputContainer}>
                  <Ruler size={20} color="#6B7280" />
                  <TextInput
                    style={styles.input}
                    placeholder="0.0"
                    value={measurements.right_arm}
                    onChangeText={(value) => setMeasurements(prev => ({ ...prev, right_arm: value }))}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Antebrazo Izquierdo (cm)</Text>
                <View style={styles.inputContainer}>
                  <Ruler size={20} color="#6B7280" />
                  <TextInput
                    style={styles.input}
                    placeholder="0.0"
                    value={measurements.left_forearm}
                    onChangeText={(value) => setMeasurements(prev => ({ ...prev, left_forearm: value }))}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Antebrazo Derecho (cm)</Text>
                <View style={styles.inputContainer}>
                  <Ruler size={20} color="#6B7280" />
                  <TextInput
                    style={styles.input}
                    placeholder="0.0"
                    value={measurements.right_forearm}
                    onChangeText={(value) => setMeasurements(prev => ({ ...prev, right_forearm: value }))}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tronco</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Cintura (cm)</Text>
                <View style={styles.inputContainer}>
                  <Ruler size={20} color="#6B7280" />
                  <TextInput
                    style={styles.input}
                    placeholder="0.0"
                    value={measurements.waist}
                    onChangeText={(value) => setMeasurements(prev => ({ ...prev, waist: value }))}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Abdomen (cm)</Text>
                <View style={styles.inputContainer}>
                  <Ruler size={20} color="#6B7280" />
                  <TextInput
                    style={styles.input}
                    placeholder="0.0"
                    value={measurements.abdomen}
                    onChangeText={(value) => setMeasurements(prev => ({ ...prev, abdomen: value }))}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Cadera (cm)</Text>
                <View style={styles.inputContainer}>
                  <Ruler size={20} color="#6B7280" />
                  <TextInput
                    style={styles.input}
                    placeholder="0.0"
                    value={measurements.hips}
                    onChangeText={(value) => setMeasurements(prev => ({ ...prev, hips: value }))}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Piernas</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Muslo Izquierdo (cm)</Text>
                <View style={styles.inputContainer}>
                  <Ruler size={20} color="#6B7280" />
                  <TextInput
                    style={styles.input}
                    placeholder="0.0"
                    value={measurements.left_thigh}
                    onChangeText={(value) => setMeasurements(prev => ({ ...prev, left_thigh: value }))}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Muslo Derecho (cm)</Text>
                <View style={styles.inputContainer}>
                  <Ruler size={20} color="#6B7280" />
                  <TextInput
                    style={styles.input}
                    placeholder="0.0"
                    value={measurements.right_thigh}
                    onChangeText={(value) => setMeasurements(prev => ({ ...prev, right_thigh: value }))}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Gemelo Izquierdo (cm)</Text>
                <View style={styles.inputContainer}>
                  <Ruler size={20} color="#6B7280" />
                  <TextInput
                    style={styles.input}
                    placeholder="0.0"
                    value={measurements.left_calf}
                    onChangeText={(value) => setMeasurements(prev => ({ ...prev, left_calf: value }))}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Gemelo Derecho (cm)</Text>
                <View style={styles.inputContainer}>
                  <Ruler size={20} color="#6B7280" />
                  <TextInput
                    style={styles.input}
                    placeholder="0.0"
                    value={measurements.right_calf}
                    onChangeText={(value) => setMeasurements(prev => ({ ...prev, right_calf: value }))}
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