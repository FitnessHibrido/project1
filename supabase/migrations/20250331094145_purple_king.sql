/*
  # Estructura de ejercicios del programa

  1. Nuevas Tablas
    - `program_weeks`: Semanas del programa
      - `id` (uuid, primary key)
      - `program_id` (text)
      - `number` (integer)
      - `title` (text)
      - `description` (text)
      - `difficulty` (text)
      - `created_at` (timestamptz)

    - `program_days`: Días de entrenamiento
      - `id` (uuid, primary key)
      - `week_id` (uuid, references program_weeks)
      - `number` (integer)
      - `title` (text)
      - `description` (text)
      - `created_at` (timestamptz)

    - `program_exercises`: Ejercicios del programa
      - `id` (uuid, primary key)
      - `day_id` (uuid, references program_days)
      - `name` (text)
      - `sets` (integer)
      - `reps` (text)
      - `rir` (text)
      - `rest` (text)
      - `video_url` (text)
      - `order` (integer)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create program_weeks table
CREATE TABLE IF NOT EXISTS program_weeks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id text NOT NULL,
  number integer NOT NULL,
  title text NOT NULL,
  description text,
  difficulty text,
  created_at timestamptz DEFAULT now()
);

-- Create program_days table
CREATE TABLE IF NOT EXISTS program_days (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  week_id uuid REFERENCES program_weeks(id) ON DELETE CASCADE,
  number integer NOT NULL,
  title text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create program_exercises table
CREATE TABLE IF NOT EXISTS program_exercises (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day_id uuid REFERENCES program_days(id) ON DELETE CASCADE,
  name text NOT NULL,
  sets integer NOT NULL,
  reps text NOT NULL,
  rir text,
  rest text,
  video_url text,
  order_number integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE program_weeks ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_exercises ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view program weeks"
  ON program_weeks
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view program days"
  ON program_days
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view program exercises"
  ON program_exercises
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert program data
INSERT INTO program_weeks (program_id, number, title, description, difficulty)
VALUES 
  ('zero-to-hybrid', 1, 'Adaptación y Fundamentos', 'Introducción a los movimientos básicos y patrones fundamentales', 'Principiante'),
  ('zero-to-hybrid', 2, 'Desarrollo de Fuerza Base', 'Enfoque en técnica y construcción de fuerza inicial', 'Principiante-Intermedio'),
  ('zero-to-hybrid', 3, 'Progresión de Cargas', 'Incremento gradual de pesos y volumen', 'Intermedio'),
  ('zero-to-hybrid', 4, 'Introducción al HIIT', 'Combinación de fuerza con intervalos de alta intensidad', 'Intermedio'),
  ('zero-to-hybrid', 5, 'Supercompensación', 'Aumento significativo de intensidad y volumen', 'Intermedio-Avanzado'),
  ('zero-to-hybrid', 6, 'Especialización', 'Trabajo específico por grupos musculares', 'Avanzado'),
  ('zero-to-hybrid', 7, 'Peak Performance', 'Máxima intensidad y complejidad de ejercicios', 'Avanzado'),
  ('zero-to-hybrid', 8, 'Deload y Evaluación', 'Reducción de carga y evaluación de progreso', 'Intermedio');

-- Insertar días y ejercicios
DO $$ 
DECLARE
  week_id uuid;
  day_id uuid;
BEGIN
  -- Obtener el ID de la primera semana
  SELECT id INTO week_id FROM program_weeks WHERE program_id = 'zero-to-hybrid' AND number = 1;

  -- Insertar día 1
  INSERT INTO program_days (week_id, number, title, description)
  VALUES (week_id, 1, 'Full Body', 'Introducción a movimientos compuestos')
  RETURNING id INTO day_id;

  -- Insertar ejercicios del día 1
  INSERT INTO program_exercises (day_id, name, sets, reps, rir, rest, video_url, order_number)
  VALUES 
    (day_id, 'Sentadilla con Peso Corporal', 3, '12-15', '3', '90s', 'https://iframe.mediadelivery.net/play/184875/c95b8298-3894-4e38-9907-dcd9199dc315', 1),
    (day_id, 'Flexiones Modificadas', 3, '8-12', '3', '90s', 'https://iframe.mediadelivery.net/play/184875/36aec660-db2c-45ff-8631-ddbd86912aed', 2),
    (day_id, 'Peso Muerto con Mancuerna', 3, '12-15', '3', '90s', 'https://iframe.mediadelivery.net/play/184875/a574c2ae-e566-4258-9e2f-4bcff0e8c57d', 3),
    (day_id, 'Plancha', 3, '30s', '', '60s', 'https://iframe.mediadelivery.net/play/184875/e40d87ac-9937-45a8-884d-c9c1420b0acb', 4),
    (day_id, 'Bird Dog', 3, '10 por lado', '', '60s', 'https://iframe.mediadelivery.net/play/184875/f27286b9-21c8-4f10-b6c2-88888428ec1c', 5),
    (day_id, 'Puente de Glúteos', 3, '15-20', '', '60s', 'https://iframe.mediadelivery.net/play/184875/46cd8910-503f-45de-a584-2d1b670ed2d5', 6);

  -- Continuar con los demás días y ejercicios...
END $$;