/*
  # Actualización de Planes de Suscripción
  
  1. Cambios
    - Actualizar precios y períodos de los planes
    - Ajustar descripciones y características
    - Mantener la estructura existente
*/

-- Actualizar planes existentes
UPDATE subscription_plans
SET 
  interval = 'bimonthly',
  price = CASE 
    WHEN id = 'pro' THEN 39.90
    WHEN id = 'elite' THEN 49.90
    ELSE price
  END,
  description = CASE
    WHEN id = 'free' THEN 'Acceso básico para probar la plataforma durante 14 días'
    WHEN id = 'pro' THEN 'Acceso casi completo a todas las funcionalidades por 2 meses'
    WHEN id = 'elite' THEN 'Acceso completo y características exclusivas por 2 meses'
    ELSE description
  END;

-- Limpiar características existentes
DELETE FROM subscription_features;

-- Insertar características actualizadas
INSERT INTO subscription_features (plan_id, feature) VALUES
  -- Free Plan Features
  ('free', 'Acceso a programas básicos por 14 días'),
  ('free', 'Seguimiento de progreso básico'),
  ('free', 'Estadísticas limitadas'),
  ('free', '1 programa activo'),
  ('free', 'Acceso a manuales básicos'),
  
  -- Pro Plan Features (39.90€/2 meses)
  ('pro', 'Todos los programas de entrenamiento'),
  ('pro', 'Seguimiento de progreso avanzado'),
  ('pro', 'Estadísticas detalladas'),
  ('pro', 'Programas personalizados'),
  ('pro', '3 programas activos simultáneos'),
  ('pro', 'Acceso a todos los manuales'),
  ('pro', 'Soporte prioritario'),
  ('pro', 'Sin anuncios'),
  
  -- Elite Plan Features (49.90€/2 meses)
  ('elite', 'Todo lo incluido en Plan Pro'),
  ('elite', 'Programas exclusivos y beta'),
  ('elite', 'Prioridad en nuevas funciones'),
  ('elite', 'Soporte 24/7'),
  ('elite', 'Programas ilimitados'),
  ('elite', 'Análisis avanzado de rendimiento'),
  ('elite', 'Contenido exclusivo'),
  ('elite', 'Rutinas personalizadas'),
  ('elite', 'Acceso anticipado a nuevas funciones');