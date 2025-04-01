/*
  # Subscription Plans and Features Setup
  
  1. Content
    - Creates initial subscription plans
    - Adds features for each plan
    - Sets up pricing tiers
  
  2. Structure
    - Free plan: Basic access
    - Pro plan: Full access
    - Elite plan: Premium features
*/

-- Asegurarse de que los planes existen
INSERT INTO subscription_plans (id, name, description, price, interval)
VALUES
  ('free', 'Plan Gratuito', 'Acceso básico a la plataforma', 0, 'bimonthly'),
  ('pro', 'Plan Pro', 'Acceso completo a funcionalidades', 39.90, 'bimonthly'),
  ('elite', 'Plan Elite', 'Acceso VIP con características exclusivas', 49.90, 'bimonthly')
ON CONFLICT (id) DO UPDATE
SET 
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  interval = EXCLUDED.interval;

-- Asegurarse de que las características existen
INSERT INTO subscription_features (plan_id, feature)
VALUES
  -- Free Plan Features
  ('free', 'Acceso a programas básicos por 14 días'),
  ('free', 'Seguimiento de progreso básico'),
  ('free', 'Estadísticas limitadas'),
  ('free', '1 programa activo'),
  ('free', 'Acceso a manuales básicos'),
  
  -- Pro Plan Features
  ('pro', 'Todos los programas de entrenamiento'),
  ('pro', 'Seguimiento de progreso avanzado'),
  ('pro', 'Estadísticas detalladas'),
  ('pro', 'Programas personalizados'),
  ('pro', '3 programas activos simultáneos'),
  ('pro', 'Acceso a todos los manuales'),
  ('pro', 'Soporte prioritario'),
  ('pro', 'Sin anuncios'),
  
  -- Elite Plan Features
  ('elite', 'Todo lo incluido en Plan Pro'),
  ('elite', 'Programas exclusivos y beta'),
  ('elite', 'Prioridad en nuevas funciones'),
  ('elite', 'Soporte 24/7'),
  ('elite', 'Programas ilimitados'),
  ('elite', 'Análisis avanzado de rendimiento'),
  ('elite', 'Contenido exclusivo'),
  ('elite', 'Rutinas personalizadas'),
  ('elite', 'Acceso anticipado a nuevas funciones')
ON CONFLICT DO NOTHING;