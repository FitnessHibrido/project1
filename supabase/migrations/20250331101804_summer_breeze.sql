/*
  # Sistema de Suscripciones

  1. Nuevas Tablas
    - `subscription_plans`: Planes disponibles
    - `subscriptions`: Suscripciones activas de usuarios
    - `subscription_features`: Características de cada plan

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users

  3. Datos Iniciales
    - Insertar planes básicos
    - Definir características de cada plan
*/

-- Create subscription_plans table
CREATE TABLE IF NOT EXISTS subscription_plans (
  id text PRIMARY KEY,
  name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL,
  interval text NOT NULL,
  trial_days integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  plan_id text REFERENCES subscription_plans(id),
  status text NOT NULL,
  current_period_start timestamptz NOT NULL,
  current_period_end timestamptz NOT NULL,
  trial_end timestamptz,
  cancel_at_period_end boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create subscription_features table
CREATE TABLE IF NOT EXISTS subscription_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id text REFERENCES subscription_plans(id),
  feature text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_features ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view subscription plans"
  ON subscription_plans
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view own subscription"
  ON subscriptions
  FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

CREATE POLICY "Users can view subscription features"
  ON subscription_features
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert initial data
INSERT INTO subscription_plans (id, name, description, price, interval, trial_days) VALUES
  ('free', 'Prueba Gratuita', 'Acceso básico para probar la plataforma', 0, 'month', 14),
  ('pro', 'Plan Pro', 'Acceso casi completo a todas las funcionalidades', 39.90, 'month', 0),
  ('elite', 'Plan Elite', 'Acceso completo y características exclusivas', 49.90, 'month', 0);

-- Insert features
INSERT INTO subscription_features (plan_id, feature) VALUES
  -- Free Plan Features
  ('free', 'Acceso a programas básicos'),
  ('free', 'Seguimiento de progreso básico'),
  ('free', 'Estadísticas limitadas'),
  ('free', '1 programa activo'),
  
  -- Pro Plan Features
  ('pro', 'Todos los programas de entrenamiento'),
  ('pro', 'Seguimiento de progreso avanzado'),
  ('pro', 'Estadísticas detalladas'),
  ('pro', 'Programas personalizados'),
  ('pro', '3 programas activos simultáneos'),
  ('pro', 'Acceso a todos los manuales'),
  
  -- Elite Plan Features
  ('elite', 'Todo lo incluido en Plan Pro'),
  ('elite', 'Programas exclusivos'),
  ('elite', 'Prioridad en nuevas funciones'),
  ('elite', 'Soporte prioritario'),
  ('elite', 'Programas ilimitados'),
  ('elite', 'Análisis avanzado de rendimiento'),
  ('elite', 'Contenido exclusivo'),
  ('elite', 'Sin anuncios');

-- Add subscription_type to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_type text 
REFERENCES subscription_plans(id) DEFAULT 'free';