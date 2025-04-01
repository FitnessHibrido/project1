import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

export function useStripe() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCheckoutSession = async (planId: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: functionError } = await supabase.functions.invoke('create-checkout', {
        body: { 
          planId,
          userId: user?.id,
        }
      });

      if (functionError) throw functionError;
      if (!data?.url) throw new Error('No se pudo crear la sesión de pago');

      return data.url;
    } catch (err) {
      console.error('Error creating checkout session:', err);
      setError(err instanceof Error ? err.message : 'Error al crear la sesión de pago');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (planId: string) => {
    try {
      setLoading(true);
      setError(null);

      // Crear sesión de checkout
      const checkoutUrl = await createCheckoutSession(planId);
      
      // Redirigir al checkout de Stripe
      window.location.href = checkoutUrl;
    } catch (err) {
      console.error('Error processing payment:', err);
      setError(err instanceof Error ? err.message : 'Error al procesar el pago');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handlePayment,
  };
}