import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Shield, Zap, Crown, ChevronRight, History } from 'lucide-react-native';
import { useSubscription } from '@/hooks/useSubscription';

export default function SubscriptionScreen() {
  const router = useRouter();
  const { plans, currentSubscription, loading, error } = useSubscription();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando planes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const getIcon = (planId: string) => {
    switch (planId) {
      case 'free':
        return Shield;
      case 'pro':
        return Zap;
      case 'elite':
        return Crown;
      default:
        return Shield;
    }
  };

  const getColor = (planId: string) => {
    switch (planId) {
      case 'free':
        return '#3B82F6';
      case 'pro':
        return '#8B5CF6';
      case 'elite':
        return '#F59E0B';
      default:
        return '#3B82F6';
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Planes de Suscripción</Text>
          <Text style={styles.subtitle}>
            Elige el plan que mejor se adapte a tus objetivos
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.historyButton}
          onPress={() => router.push('/profile/payment/history')}
        >
          <History size={20} color="#3B82F6" />
          <Text style={styles.historyButtonText}>Ver historial de pagos</Text>
          <ChevronRight size={20} color="#3B82F6" />
        </TouchableOpacity>

        <View style={styles.plansContainer}>
          {plans.map((plan) => {
            const Icon = getIcon(plan.id);
            const color = getColor(plan.id);
            const isCurrentPlan = currentSubscription?.plan_id === plan.id;
            const features = plan.subscription_features || [];

            return (
              <View 
                key={plan.id} 
                style={[
                  styles.planCard,
                  isCurrentPlan && styles.currentPlanCard,
                  plan.id === 'pro' && styles.popularPlan
                ]}
              >
                {plan.id === 'pro' && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularBadgeText}>Más Popular</Text>
                  </View>
                )}

                <View style={[styles.planIconContainer, { backgroundColor: `${color}20` }]}>
                  <Icon size={24} color={color} />
                </View>

                <Text style={styles.planName}>{plan.name}</Text>
                <Text style={styles.planPrice}>
                  {plan.price > 0 ? `${plan.price}€` : 'Gratis'}
                  <Text style={styles.planInterval}>/{plan.interval}</Text>
                </Text>

                <View style={styles.featuresContainer}>
                  {features.map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                      <View style={[styles.featureBullet, { backgroundColor: color }]} />
                      <Text style={styles.featureText}>{feature.feature}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity 
                  style={[
                    styles.subscribeButton,
                    { backgroundColor: color },
                    isCurrentPlan && styles.currentPlanButton
                  ]}
                  onPress={() => router.push({
                    pathname: '/profile/payment/checkout',
                    params: { plan: plan.id }
                  })}
                  disabled={isCurrentPlan}
                >
                  <Text style={styles.subscribeButtonText}>
                    {isCurrentPlan ? 'Plan Actual' : 'Suscribirse'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        <View style={styles.paymentMethodsSection}>
          <Text style={styles.sectionTitle}>Métodos de Pago Aceptados</Text>
          <View style={styles.paymentMethodsInfo}>
            <Text style={styles.paymentMethodsText}>
              Aceptamos tarjetas de crédito/débito y PayPal. Todos los pagos son procesados de forma segura a través de Stripe.
            </Text>
          </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    lineHeight: 24,
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EFF6FF',
    margin: 20,
    padding: 16,
    borderRadius: 12,
  },
  historyButtonText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
  },
  plansContainer: {
    padding: 20,
    gap: 20,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  currentPlanCard: {
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  popularPlan: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  popularBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  popularBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  planIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  planName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  planInterval: {
    fontSize: 16,
    color: '#6B7280',
  },
  featuresContainer: {
    gap: 12,
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  featureText: {
    fontSize: 14,
    color: '#4B5563',
  },
  subscribeButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  currentPlanButton: {
    opacity: 0.5,
  },
  subscribeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  paymentMethodsSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  paymentMethodsInfo: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
  },
  paymentMethodsText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});