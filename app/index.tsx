import { Redirect } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href="/(tabs)/profile" />;
}
