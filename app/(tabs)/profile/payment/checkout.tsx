import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as InAppPurchases from 'expo-in-app-purchases';
import { useEffect, useState } from 'react';
import { Lock } from 'lucide-react-native';
import { useSubscription } from '@/hooks/useSubscription';

export default function CheckoutScreen() {
  const { plan } = useLocalSearchParams();
  const router = useRouter();
  const { plans } = useSubscription();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initIAP = async () => {
      try {
        await InAppPurchases.connectAsync();
        const { responseCode, results } = await InAppPurchases.getProductsAsync([plan]);

        if (responseCode === InAppPurchases.IAPResponseCode.OK && results.length > 0) {
          setSelectedPlan(results[0]);
        } else {
          console.error('No se encontraron productos o hubo un error en la respuesta.');
        }
      } catch (error) {
        console.error('Error al inicializar las compras dentro de la app:', error);
      }
    };

    initIAP();

    return () => {
      InAppPurchases.disconnectAsync();
    };
  }, [plan]);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const { responseCode } = await InAppPurchases.purchaseItemAsync(plan);

      if (responseCode === InAppPurchases.IAPResponseCode.OK) {
        router.push('/profile/payment/success');
      } else {
        console.error('Error en la compra:', responseCode);
        router.push('/profile/payment/error');
      }
    } catch (error) {
      console.error('Error procesando el pago:', error);
      router.push('/profile/payment/error');
    } finally {
      setLoading(false);
    }
  };

  if (!selectedPlan) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Cargando información del plan...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen del Pedido</Text>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Plan seleccionado</Text>
            <Text style={styles.summaryValue}>{selectedPlan.title}</Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Precio</Text>
            <Text style={styles.summaryValue}>{selectedPlan.price}</Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Tipo de pago</Text>
            <Text style={styles.summaryValue}>Suscripción automática</Text>
          </View>

          <View style={styles.secureNote}>
            <Lock size={16} color="#6B7280" />
            <Text style={styles.secureText}>
              Pago seguro gestionado por la App Store. Tus datos están protegidos.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.payButton}
          onPress={handlePayment}
          disabled={loading}
        >
          <Text style={styles.payButtonText}>
            {loading ? 'Procesando...' : `Suscribirme por ${selectedPlan.price}`}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { flex: 1 },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { color: '#6B7280', fontSize: 16 },
  section: { backgroundColor: '#FFFFFF', padding: 20, marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 16 },
  summaryItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 },
  summaryLabel: { fontSize: 14, color: '#6B7280' },
  summaryValue: { fontSize: 14, fontWeight: '500', color: '#111827' },
  secureNote: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingTop: 20 },
  secureText: { flex: 1, fontSize: 12, color: '#6B7280' },
  footer: { padding: 20, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  payButton: { backgroundColor: '#3B82F6', padding: 16, borderRadius: 12, alignItems: 'center' },
  payButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});
