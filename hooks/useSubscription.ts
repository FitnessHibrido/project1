import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useStripe } from './useStripe';

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: string;
  subscription_features: {
    feature: string;
  }[];
}

interface Subscription {
  id: string;
  plan_id: string;
  status: string;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
}

export function useSubscription() {
  const { user } = useAuth();
  const { handlePayment } = useStripe();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    fetchSubscriptionData();
  }, [user]);

  const fetchSubscriptionData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Obtener planes
      const { data: plansData, error: plansError } = await supabase
        .from('subscription_plans')
        .select(`
          *,
          subscription_features (
            feature
          )
        `)
        .order('price');

      if (plansError) throw plansError;

      setPlans(plansData);

      // Obtener suscripción actual si hay usuario
      if (user) {
        const { data: subscription, error: subError } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('profile_id', user.id)
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (subError && subError.code !== 'PGRST116') throw subError;
        setCurrentSubscription(subscription);
      }
    } catch (err) {
      console.error('Error fetching subscription data:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const subscribe = async (planId: string) => {
    try {
      if (!user) throw new Error('Usuario no autenticado');

      const plan = plans.find(p => p.id === planId);
      if (!plan) throw new Error('Plan no encontrado');

      // Iniciar proceso de pago con Stripe
      await handlePayment(planId);
    } catch (err) {
      console.error('Error subscribing:', err);
      throw err;
    }
  };

  return {
    loading,
    error,
    plans,
    currentSubscription,
    subscribe,
  };
}