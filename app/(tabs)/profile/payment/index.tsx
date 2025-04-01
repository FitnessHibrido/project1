import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { CreditCard, Clock, Calendar, ChevronRight, Shield, Zap, Award, Crown, Receipt, History } from 'lucide-react-native';

const subscriptionPlans = [
  {
    id: 'basic',
    name: 'Básico',
    price: '9.99€',
    interval: 'mes',
    features: [
      'Acceso a programas básicos',
      'Seguimiento de progreso',
      'Estadísticas básicas',
    ],
    icon: Shield,
    color: '#3B82F6',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '19.99€',
    interval: 'mes',
    features: [
      'Todos los programas',
      'Estadísticas avanzadas',
      'Soporte prioritario',
      'Sin anuncios',
    ],
    icon: Zap,
    color: '#8B5CF6',
    popular: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    price: '29.99€',
    interval: 'mes',
    features: [
      'Acceso anticipado a programas',
      'Entrenador personal virtual',
      'Planes personalizados',
      'Análisis detallado',
      'Soporte 24/7',
    ],
    icon: Crown,
    color: '#F59E0B',
  },
];

export default function PaymentScreen() {
  const router = useRouter();
  const currentPlan = 'pro';

  const handleSubscribe = (planId: string) => {
    router.push({
      pathname: '/profile/payment/checkout',
      params: { plan: planId }
    });
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
          {subscriptionPlans.map((plan) => (
            <View 
              key={plan.id} 
              style={[
                styles.planCard,
                currentPlan === plan.id && styles.currentPlanCard,
                plan.popular && styles.popularPlan
              ]}
            >
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularBadgeText}>Más Popular</Text>
                </View>
              )}

              <View style={[styles.planIconContainer, { backgroundColor: `${plan.color}20` }]}>
                <plan.icon size={24} color={plan.color} />
              </View>

              <Text style={styles.planName}>{plan.name}</Text>
              <Text style={styles.planPrice}>
                {plan.price}
                <Text style={styles.planInterval}>/{plan.interval}</Text>
              </Text>

              <View style={styles.featuresContainer}>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <View style={[styles.featureBullet, { backgroundColor: plan.color }]} />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity 
                style={[
                  styles.subscribeButton,
                  { backgroundColor: plan.color },
                  currentPlan === plan.id && styles.currentPlanButton
                ]}
                onPress={() => handleSubscribe(plan.id)}
                disabled={currentPlan === plan.id}
              >
                <Text style={styles.subscribeButtonText}>
                  {currentPlan === plan.id ? 'Plan Actual' : 'Suscribirse'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.paymentMethodsSection}>
          <Text style={styles.sectionTitle}>Métodos de Pago Aceptados</Text>
          <View style={styles.paymentMethodsGrid}>
            <View style={styles.paymentMethod}>
              <CreditCard size={24} color="#6B7280" />
              <Text style={styles.paymentMethodText}>Tarjeta de Crédito</Text>
            </View>
            <View style={styles.paymentMethod}>
              <Receipt size={24} color="#6B7280" />
              <Text style={styles.paymentMethodText}>PayPal</Text>
            </View>
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
  paymentMethodsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  paymentMethod: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  paymentMethodText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});