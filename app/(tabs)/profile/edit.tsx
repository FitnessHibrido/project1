import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, MapPin, Cake, Instagram, Mail, Phone } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useProfile } from '@/context/ProfileContext';
import { useState } from 'react';

interface ProfileForm {
  name: string;
  bio: string;
  location: string;
  birthdate: string;
  phone: string;
  instagram: string;
  goals: string;
  email: string;
}

interface MeasurementsForm {
  height: string;
  weight: string;
  chest: string;
  waist: string;
  hips: string;
  biceps_left: string;
  biceps_right: string;
  thigh_left: string;
  thigh_right: string;
}

export default function EditProfileScreen() {
  const router = useRouter();
  const { profile, updateProfile } = useProfile();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [profileForm, setProfileForm] = useState<ProfileForm>({
    name: profile?.name || '',
    bio: profile?.bio || '',
    location: profile?.location || '',
    birthdate: profile?.birthdate || '',
    phone: profile?.phone || '',
    instagram: profile?.instagram || '',
    goals: profile?.goals || '',
    email: profile?.email || '',
  });

  const [measurementsForm, setMeasurementsForm] = useState<MeasurementsForm>({
    height: '',
    weight: '',
    chest: '',
    waist: '',
    hips: '',
    biceps_left: '',
    biceps_right: '',
    thigh_left: '',
    thigh_right: '',
  });

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);

      // Actualizar perfil
      await updateProfile(profileForm);

      // Guardar medidas si hay alguna
      const measurements: Record<string, number> = {};
      Object.entries(measurementsForm).forEach(([key, value]) => {
        if (value) {
          measurements[key] = parseFloat(value);
        }
      });

      if (Object.keys(measurements).length > 0) {
        // Añadir medidas nuevas
        await updateProfile({
          ...profileForm,
          measurements,
        });
      }

      router.back();
    } catch (err) {
      console.error('Error al guardar:', err);
      setError('Error al guardar los cambios. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.content}>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.imageSection}>
          <Image
            source={{ 
              uri: profile.avatar_url || 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&q=80' 
            }}
            style={styles.profileImage}
          />
          <TouchableOpacity 
            style={styles.changePhotoButton}
            onPress={() => router.push('/profile/camera')}
          >
            <Camera size={20} color="#3B82F6" />
            <Text style={styles.changePhotoText}>Cambiar foto</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información básica</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              placeholder="Tu nombre"
              value={profileForm.name}
              onChangeText={(value) => setProfileForm(prev => ({ ...prev, name: value }))}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Biografía</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Cuéntanos sobre ti"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={profileForm.bio}
              onChangeText={(value) => setProfileForm(prev => ({ ...prev, bio: value }))}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Ubicación</Text>
            <View style={styles.inputWithIcon}>
              <MapPin size={20} color="#6B7280" />
              <TextInput
                style={styles.inputIcon}
                placeholder="Tu ubicación"
                value={profileForm.location}
                onChangeText={(value) => setProfileForm(prev => ({ ...prev, location: value }))}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Fecha de nacimiento</Text>
            <View style={styles.inputWithIcon}>
              <Cake size={20} color="#6B7280" />
              <TextInput
                style={styles.inputIcon}
                placeholder="DD/MM/AAAA"
                value={profileForm.birthdate}
                onChangeText={(value) => setProfileForm(prev => ({ ...prev, birthdate: value }))}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contacto</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWithIcon}>
              <Mail size={20} color="#6B7280" />
              <TextInput
                style={styles.inputIcon}
                placeholder="tu@email.com"
                keyboardType="email-address"
                value={profileForm.email}
                onChangeText={(value) => setProfileForm(prev => ({ ...prev, email: value }))}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Teléfono</Text>
            <View style={styles.inputWithIcon}>
              <Phone size={20} color="#6B7280" />
              <TextInput
                style={styles.inputIcon}
                placeholder="+34 XXX XXX XXX"
                keyboardType="phone-pad"
                value={profileForm.phone}
                onChangeText={(value) => setProfileForm(prev => ({ ...prev, phone: value }))}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Instagram</Text>
            <View style={styles.inputWithIcon}>
              <Instagram size={20} color="#6B7280" />
              <TextInput
                style={styles.inputIcon}
                placeholder="@usuario"
                value={profileForm.instagram}
                onChangeText={(value) => setProfileForm(prev => ({ ...prev, instagram: value }))}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medidas</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Altura (cm)</Text>
            <TextInput
              style={styles.input}
              placeholder="175"
              keyboardType="numeric"
              value={measurementsForm.height}
              onChangeText={(value) => setMeasurementsForm(prev => ({ ...prev, height: value }))}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Peso (kg)</Text>
            <TextInput
              style={styles.input}
              placeholder="70"
              keyboardType="numeric"
              value={measurementsForm.weight}
              onChangeText={(value) => setMeasurementsForm(prev => ({ ...prev, weight: value }))}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pecho (cm)</Text>
            <TextInput
              style={styles.input}
              placeholder="95"
              keyboardType="numeric"
              value={measurementsForm.chest}
              onChangeText={(value) => setMeasurementsForm(prev => ({ ...prev, chest: value }))}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cintura (cm)</Text>
            <TextInput
              style={styles.input}
              placeholder="82"
              keyboardType="numeric"
              value={measurementsForm.waist}
              onChangeText={(value) => setMeasurementsForm(prev => ({ ...prev, waist: value }))}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cadera (cm)</Text>
            <TextInput
              style={styles.input}
              placeholder="98"
              keyboardType="numeric"
              value={measurementsForm.hips}
              onChangeText={(value) => setMeasurementsForm(prev => ({ ...prev, hips: value }))}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bíceps Izquierdo (cm)</Text>
            <TextInput
              style={styles.input}
              placeholder="36"
              keyboardType="numeric"
              value={measurementsForm.biceps_left}
              onChangeText={(value) => setMeasurementsForm(prev => ({ ...prev, biceps_left: value }))}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bíceps Derecho (cm)</Text>
            <TextInput
              style={styles.input}
              placeholder="36.5"
              keyboardType="numeric"
              value={measurementsForm.biceps_right}
              onChangeText={(value) => setMeasurementsForm(prev => ({ ...prev, biceps_right: value }))}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Muslo Izquierdo (cm)</Text>
            <TextInput
              style={styles.input}
              placeholder="58"
              keyboardType="numeric"
              value={measurementsForm.thigh_left}
              onChangeText={(value) => setMeasurementsForm(prev => ({ ...prev, thigh_left: value }))}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Muslo Derecho (cm)</Text>
            <TextInput
              style={styles.input}
              placeholder="58.5"
              keyboardType="numeric"
              value={measurementsForm.thigh_right}
              onChangeText={(value) => setMeasurementsForm(prev => ({ ...prev, thigh_right: value }))}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Objetivos</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe tus objetivos de entrenamiento"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={profileForm.goals}
              onChangeText={(value) => setProfileForm(prev => ({ ...prev, goals: value }))}
            />
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
            {loading ? 'Guardando...' : 'Guardar cambios'}
          </Text>
        </TouchableOpacity>
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
  content: {
    flex: 1,
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
    padding: 16,
    margin: 20,
    borderRadius: 8,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
  },
  imageSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
  },
  changePhotoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 12,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#111827',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  inputIcon: {
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