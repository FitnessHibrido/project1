import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Settings, Crown, ChevronRight, Scale, Clock, Weight, Trophy } from 'lucide-react-native';
import { useProfile } from '@/context/ProfileContext';
import { useAuth } from '@/context/AuthContext';
import { usePerformance } from '@/hooks/usePerformance';
import { useSubscription } from '@/hooks/useSubscription';
import * as InAppPurchases from 'expo-in-app-purchases';

export default function ProfileScreen() {
  const router = useRouter();
  const { profile, loading: profileLoading } = useProfile();
  const { metrics, loading: performanceLoading } = usePerformance();
  const { currentSubscription, plans, loading: subscriptionLoading } = useSubscription();
  const { signOut } = useAuth();

  const loading = profileLoading || performanceLoading || subscriptionLoading;

  const productId = Platform.OS === 'ios' ? 'ios_product_id' : 'android_product_id';

  const handlePayment = async () => {
    setLoading(true);
    try {
      const { responseCode, results } = await InAppPurchases.getProductsAsync([productId]);

      if (responseCode === InAppPurchases.IAPResponseCode.OK && results.length > 0) {
        const { responseCode: purchaseResponse } = await InAppPurchases.purchaseItemAsync(productId);

        if (purchaseResponse === InAppPurchases.IAPResponseCode.OK) {
          // Validar recibo en el backend
          router.push('/profile/payment/success');
        } else {
          console.error('Error en la compra:', purchaseResponse);
          router.push('/profile/payment/error');
        }
      } else {
        console.error('No se encontraron productos o hubo un error en la respuesta.');
      }
    } catch (error) {
      console.error('Error procesando el pago:', error);
      router.push('/profile/payment/error');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !profile) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando perfil...</Text>
      </View>
    );
  }

  // Obtener el plan actual
  const currentPlan = plans.find(p => p.id === profile.subscription_type) || plans.find(p => p.id === 'free');

  // Calcular la fecha del próximo cobro
  const nextBillingDate = currentSubscription?.current_period_end 
    ? new Date(currentSubscription.current_period_end).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    : null;

  const performanceMetrics = [
    {
      id: 1,
      title: 'Tiempo Total',
      value: `${metrics.totalTime}min`,
      change: '',
      icon: Clock,
      color: '#3B82F6',
      bgColor: '#EFF6FF',
    },
    {
      id: 2,
      title: 'Volumen Total',
      value: `${metrics.totalVolume.toLocaleString()}kg`,
      change: '',
      icon: Weight,
      color: '#22C55E',
      bgColor: '#F0FDF4',
    },
    {
      id: 3,
      title: 'PRs',
      value: `${metrics.personalRecords} PRs`,
      change: '',
      icon: Trophy,
      color: '#F59E0B',
      bgColor: '#FFFBEB',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.headerTitle}>{profile.name || 'Sin nombre'}</Text>
            <TouchableOpacity onPress={() => router.push('/profile/edit')}>
              <Settings size={24} color="#111827" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileSection}>
            <TouchableOpacity 
              style={styles.profileImageContainer}
              onPress={() => router.push('/profile/edit')}
            >
              <Image
                source={{ uri: profile.avatar_url || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80' }}
                style={styles.profileImage}
              />
              <View style={styles.editBadge}>
                <Text style={styles.editBadgeText}>Editar</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.bioSection}>
              <Text style={styles.bioText}>{profile.bio || 'Añade una biografía para que otros te conozcan mejor'}</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.subscriptionBanner}
            onPress={() => router.push('/profile/subscription')}
          >
            <View style={styles.subscriptionInfo}>
              <View style={styles.subscriptionBadge}>
                <Crown size={16} color="#8B5CF6" />
                <Text style={styles.subscriptionType}>{currentPlan?.name || 'Plan Gratuito'}</Text>
              </View>
              {nextBillingDate && (
                <Text style={styles.subscriptionDate}>Próximo cobro: {nextBillingDate}</Text>
              )}
            </View>
            <Text style={styles.subscriptionAction}>Gestionar →</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.metricsButton}
          onPress={() => router.push('/profile/metrics')}
        >
          <View style={styles.metricsButtonContent}>
            <View style={styles.metricsIcon}>
              <Scale size={24} color="#3B82F6" />
            </View>
            <View style={styles.metricsInfo}>
              <Text style={styles.metricsTitle}>Métricas Corporales</Text>
              <Text style={styles.metricsSubtitle}>Seguimiento de medidas y progreso</Text>
            </View>
          </View>
          <ChevronRight size={20} color="#6B7280" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.performanceSection}
          onPress={() => router.push('/train/performance')}
        >
          <View style={styles.performanceHeader}>
            <Text style={styles.sectionTitle}>Vista Rápida de Rendimiento</Text>
            <ChevronRight size={20} color="#6B7280" />
          </View>
          
          <View style={styles.metricsContainer}>
            {performanceMetrics.map((metric) => (
              <View 
                key={metric.id} 
                style={[styles.metricCard, { backgroundColor: metric.bgColor }]}
              >
                <metric.icon size={24} color={metric.color} />
                <Text style={[styles.metricValue, { color: metric.color }]}>{metric.value}</Text>
                <Text style={styles.metricTitle}>{metric.title}</Text>
                <Text style={styles.metricChange}>{metric.change}</Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={signOut}
        >
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
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
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
  },
  profileSection: {
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3B82F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  editBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  bioSection: {
    width: '100%',
    alignItems: 'center',
  },
  bioText: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 16,
  },
  subscriptionBanner: {
    backgroundColor: '#F5F3FF',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subscriptionInfo: {
    gap: 4,
  },
  subscriptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  subscriptionType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  subscriptionDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  subscriptionAction: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  metricsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginTop: 12,
  },
  metricsButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  metricsIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricsInfo: {
    flex: 1,
  },
  metricsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  metricsSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  performanceSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginTop: 12,
  },
  performanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  metricsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: 'flex-start',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  metricChange: {
    fontSize: 12,
    color: '#6B7280',
  },
  logoutButton: {
    margin: 20,
    padding: 16,
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DC2626',
  },
});