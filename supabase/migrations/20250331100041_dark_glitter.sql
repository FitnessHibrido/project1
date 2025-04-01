/*
  # Program Schema Update
  
  1. Tables
    - Create program_weeks table for storing program week information
    - Create program_days table for storing program day information
    - Create program_exercises table for storing exercise information
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to view program data
  
  3. Data
    - Insert initial program data for "De 0 a Híbrido"
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

-- Create policies if they don't exist
DO $$ 
BEGIN
  -- Check and create policy for program_weeks
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'program_weeks' 
    AND policyname = 'Users can view program weeks'
  ) THEN
    CREATE POLICY "Users can view program weeks"
      ON program_weeks
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;

  -- Check and create policy for program_days
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'program_days' 
    AND policyname = 'Users can view program days'
  ) THEN
    CREATE POLICY "Users can view program days"
      ON program_days
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;

  -- Check and create policy for program_exercises
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'program_exercises' 
    AND policyname = 'Users can view program exercises'
  ) THEN
    CREATE POLICY "Users can view program exercises"
      ON program_exercises
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;

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