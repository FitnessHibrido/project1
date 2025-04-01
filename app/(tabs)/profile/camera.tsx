// camera.tsx
import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Camera, CameraType, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { Camera as CameraIcon, RefreshCw } from 'lucide-react-native';

export default function CameraScreen() {
  const [type, setType] = useState<CameraType>(CameraType.back);
  const [hasPermission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<Camera | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  const toggleCameraType = () => {
    setType(prev => (prev === CameraType.back ? CameraType.front : CameraType.back));
  };

  const takePicture = async () => {
    try {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
        router.push({ pathname: '/profile/edit', params: { photo: photo.uri } });
      } else {
        console.error('Referencia de cámara no disponible.');
      }
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.text}>Verificando permisos de cámara...</Text>
      </View>
    );
  }

  if (!hasPermission.granted) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>Necesitamos tu permiso para usar la cámara</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Conceder permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.camera} type={type} ratio="16:9">
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.flipButton} onPress={toggleCameraType}>
            <RefreshCw size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <CameraIcon size={32} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  text: { color: '#fff', fontSize: 16, textAlign: 'center', marginTop: 20 },
  button: { backgroundColor: '#3B82F6', padding: 16, borderRadius: 12, marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  camera: { flex: 1 },
  closeButton: {
    position: 'absolute', top: 40, right: 20, width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', zIndex: 10,
  },
  closeButtonText: { color: '#fff', fontSize: 20, fontWeight: '600' },
  buttonContainer: {
    position: 'absolute', bottom: 40, left: 0, right: 0, flexDirection: 'row',
    justifyContent: 'center', alignItems: 'center',
  },
  flipButton: {
    marginRight: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
