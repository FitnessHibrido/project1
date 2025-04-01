/*
  # Actualización del Plan Gratuito
  
  1. Cambios
    - Actualizar la duración del trial a 3 días
    - Asegurar que los nuevos usuarios reciban el plan gratuito por defecto
    - Modificar la función de creación de perfil para incluir la fecha de inicio del trial
  
  2. Seguridad
    - Mantener las políticas de seguridad existentes
    - Asegurar la integridad de los datos
*/

-- Actualizar el plan gratuito
UPDATE subscription_plans
SET 
  trial_days = 3,
  description = 'Acceso básico para probar la plataforma durante 3 días'
WHERE id = 'free';

-- Modificar la tabla de perfiles para incluir la fecha de inicio del trial
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS trial_start_date timestamptz DEFAULT now();

-- Actualizar la función que maneja nuevos usuarios
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    name,
    subscription_type,
    trial_start_date
  )
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'name',
    'free',
    now()
  );

  -- Crear suscripción gratuita inicial
  INSERT INTO public.subscriptions (
    profile_id,
    plan_id,
    status,
    current_period_start,
    current_period_end,
    trial_end
  )
  VALUES (
    new.id,
    'free',
    'trialing',
    now(),
    now() + interval '3 days',
    now() + interval '3 days'
  );

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY definer;

-- Crear función para verificar y actualizar suscripciones expiradas
CREATE OR REPLACE FUNCTION check_trial_expiration()
RETURNS trigger AS $$
BEGIN
  -- Si el trial ha expirado, actualizar el estado
  IF NEW.trial_end < now() AND NEW.status = 'trialing' THEN
    NEW.status := 'expired';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger para verificar la expiración del trial
DROP TRIGGER IF EXISTS check_trial_expiration_trigger ON subscriptions;
CREATE TRIGGER check_trial_expiration_trigger
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION check_trial_expiration();

-- Crear índice para optimizar consultas de trial
CREATE INDEX IF NOT EXISTS idx_subscriptions_trial_end
  ON subscriptions(trial_end)
  WHERE status = 'trialing';