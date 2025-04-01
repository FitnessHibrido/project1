import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, Receipt, CircleCheck as CheckCircle, Circle as XCircle } from 'lucide-react-native';
import { useSubscription } from '@/hooks/useSubscription';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'completed' | 'failed';
  paymentMethod: string;
}

export default function HistoryScreen() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('subscriptions')
          .select(`
            *,
            subscription_plans (
              name,
              price
            )
          `)
          .eq('profile_id', user.id)
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;

        const formattedTransactions = data?.map(subscription => ({
          id: subscription.id,
          date: new Date(subscription.created_at).toLocaleDateString(),
          description: `${subscription.subscription_plans.name} - ${subscription.subscription_plans.interval}`,
          amount: subscription.subscription_plans.price,
          status: subscription.status === 'active' ? 'completed' : 'failed',
          paymentMethod: '**** 4242', // Simulado - En producción vendría de Stripe
        }));

        setTransactions(formattedTransactions || []);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar el historial');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando historial...</Text>
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

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView>
        {transactions.length === 0 ? (
          <View style={styles.emptyState}>
            <Receipt size={48} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>Sin Transacciones</Text>
            <Text style={styles.emptyText}>
              Aún no tienes ninguna transacción en tu historial
            </Text>
          </View>
        ) : (
          transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.header}>
                <View style={styles.dateContainer}>
                  <Clock size={16} color="#6B7280" />
                  <Text style={styles.date}>{transaction.date}</Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  transaction.status === 'completed' ? styles.successBadge : styles.errorBadge
                ]}>
                  {transaction.status === 'completed' ? (
                    <CheckCircle size={14} color="#059669" />
                  ) : (
                    <XCircle size={14} color="#DC2626" />
                  )}
                  <Text style={[
                    styles.statusText,
                    transaction.status === 'completed' ? styles.successText : styles.errorText
                  ]}>
                    {transaction.status === 'completed' ? 'Completado' : 'Fallido'}
                  </Text>
                </View>
              </View>

              <View style={styles.details}>
                <View style={styles.descriptionContainer}>
                  <Receipt size={20} color="#3B82F6" />
                  <View style={styles.textContainer}>
                    <Text style={styles.description}>{transaction.description}</Text>
                    <Text style={styles.paymentMethod}>
                      Tarjeta {transaction.paymentMethod}
                    </Text>
                  </View>
                </View>
                <Text style={styles.amount}>{transaction.amount}€</Text>
              </View>
            </View>
          ))
        )}
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  transactionCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  date: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  successBadge: {
    backgroundColor: '#DCFCE7',
  },
  errorBadge: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  successText: {
    color: '#059669',
  },
  errorText: {
    color: '#DC2626',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  textContainer: {
    gap: 4,
  },
  description: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  paymentMethod: {
    fontSize: 14,
    color: '#6B7280',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
});