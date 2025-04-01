import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { CreditCard, Lock } from 'lucide-react-native';
import { useSubscription } from '@/hooks/useSubscription';
import { useState } from 'react';

interface CheckoutForm {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export default function CheckoutScreen() {
  const { plan } = useLocalSearchParams();
  const router = useRouter();
  const { plans, subscribe } = useSubscription();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<CheckoutForm>({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const selectedPlan = plans.find(p => p.id === plan);

  const handlePayment = async () => {
    try {
      setLoading(true);
      // Aquí iría la integración con Stripe
      await subscribe(plan as string);
      router.push('/profile/payment/success');
    } catch (error) {
      console.error('Error processing payment:', error);
      router.push('/profile/payment/error');
    }
  };

  if (!selectedPlan) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Plan no encontrado</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información de Pago</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre en la tarjeta</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre completo"
              value={form.cardName}
              onChangeText={(value) => setForm(prev => ({ ...prev, cardName: value }))}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Número de tarjeta</Text>
            <View style={styles.cardInput}>
              <CreditCard size={20} color="#6B7280" />
              <TextInput
                style={styles.cardInputText}
                placeholder="1234 5678 9012 3456"
                value={form.cardNumber}
                onChangeText={(value) => setForm(prev => ({ ...prev, cardNumber: value }))}
                keyboardType="numeric"
                maxLength={19}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Fecha de expiración</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/AA"
                value={form.expiry}
                onChangeText={(value) => setForm(prev => ({ ...prev, expiry: value }))}
                keyboardType="numeric"
                maxLength={5}
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                placeholder="123"
                value={form.cvv}
                onChangeText={(value) => setForm(prev => ({ ...prev, cvv: value }))}
                keyboardType="numeric"
                maxLength={4}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen del Pedido</Text>
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Plan seleccionado</Text>
            <Text style={styles.summaryValue}>Plan {selectedPlan.name}</Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Precio bimensual</Text>
            <Text style={styles.summaryValue}>{selectedPlan.price}€</Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Impuestos</Text>
            <Text style={styles.summaryValue}>{(selectedPlan.price * 0.21).toFixed(2)}€</Text>
          </View>

          <View style={[styles.summaryItem, styles.total]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              {(selectedPlan.price * 1.21).toFixed(2)}€
            </Text>
          </View>
        </View>

        <View style={styles.secureNote}>
          <Lock size={16} color="#6B7280" />
          <Text style={styles.secureText}>
            Pago seguro procesado por Stripe. Tus datos están protegidos.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.payButton}
          onPress={handlePayment}
          disabled={loading}
        >
          <Text style={styles.payButtonText}>
            {loading ? 'Procesando...' : `Pagar ${(selectedPlan.price * 1.21).toFixed(2)}€`}
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
  content: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 16,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 12,
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
  cardInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  cardInputText: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#111827',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  total: {
    marginTop: 8,
    borderBottomWidth: 0,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  secureNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 20,
  },
  secureText: {
    flex: 1,
    fontSize: 12,
    color: '#6B7280',
  },
  footer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  payButton: {
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});