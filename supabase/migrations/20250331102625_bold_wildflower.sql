-- Añadir campo para el ID de cliente de Stripe
ALTER TABLE profiles
ADD COLUMN stripe_customer_id text;

-- Crear índice para búsquedas rápidas por customer_id
CREATE INDEX idx_profiles_stripe_customer_id ON profiles(stripe_customer_id);