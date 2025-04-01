/*
  # Actualización de Métricas Corporales

  1. Nuevas Tablas
    - `body_metrics`: Métricas corporales básicas (peso, altura, etc.)
    - `body_measurements`: Medidas corporales detalladas
    - `progress_photos`: Fotos de progreso con categorización

  2. Cambios
    - Reorganizar estructura de medidas
    - Añadir soporte para fotos de progreso
    - Mejorar tracking histórico
*/

-- Crear tabla de métricas corporales
CREATE TABLE IF NOT EXISTS body_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  date timestamptz DEFAULT now(),
  weight numeric(5,2),
  height numeric(5,2),
  body_fat numeric(4,1),
  muscle_mass numeric(5,2),
  visceral_fat numeric(4,1),
  bone_mass numeric(4,2),
  metabolic_age integer,
  hydration numeric(4,1),
  created_at timestamptz DEFAULT now()
);

-- Crear tabla de medidas corporales
CREATE TABLE IF NOT EXISTS body_measurements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  date timestamptz DEFAULT now(),
  neck numeric(4,1),
  shoulders numeric(4,1),
  chest numeric(4,1),
  left_arm numeric(4,1),
  right_arm numeric(4,1),
  left_forearm numeric(4,1),
  right_forearm numeric(4,1),
  waist numeric(4,1),
  abdomen numeric(4,1),
  hips numeric(4,1),
  left_thigh numeric(4,1),
  right_thigh numeric(4,1),
  left_calf numeric(4,1),
  right_calf numeric(4,1),
  created_at timestamptz DEFAULT now()
);

-- Crear tabla de fotos de progreso
CREATE TABLE IF NOT EXISTS progress_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  date timestamptz DEFAULT now(),
  type text NOT NULL CHECK (type IN ('front', 'back', 'side')),
  url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE body_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE body_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_photos ENABLE ROW LEVEL SECURITY;

-- Crear políticas de seguridad
CREATE POLICY "Users can view own body metrics"
  ON body_metrics
  FOR SELECT
  TO authenticated
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert own body metrics"
  ON body_metrics
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can view own body measurements"
  ON body_measurements
  FOR SELECT
  TO authenticated
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert own body measurements"
  ON body_measurements
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can view own progress photos"
  ON progress_photos
  FOR SELECT
  TO authenticated
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert own progress photos"
  ON progress_photos
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = profile_id);

-- Crear índices para optimizar consultas
CREATE INDEX idx_body_metrics_profile_date 
ON body_metrics (profile_id, date DESC);

CREATE INDEX idx_body_measurements_profile_date 
ON body_measurements (profile_id, date DESC);

CREATE INDEX idx_progress_photos_profile_date 
ON progress_photos (profile_id, date DESC);