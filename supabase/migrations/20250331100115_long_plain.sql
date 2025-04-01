/*
  # Add Workout Statistics
  
  1. Changes
    - Add total_reps column to workouts table if it doesn't exist
    - Add statistics columns to workout_exercises table if they don't exist
    - Create performance optimization indexes
  
  2. Indexes
    - Create index on workouts(profile_id, start_time)
    - Create index on workout_exercises(workout_id)
*/

-- Añadir campos para estadísticas en workout_exercises si no existen
DO $$ 
BEGIN
  -- Añadir total_volume si no existe
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'workout_exercises' 
    AND column_name = 'total_volume'
  ) THEN
    ALTER TABLE workout_exercises 
    ADD COLUMN total_volume numeric(8,2) DEFAULT 0;
  END IF;

  -- Añadir max_weight si no existe
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'workout_exercises' 
    AND column_name = 'max_weight'
  ) THEN
    ALTER TABLE workout_exercises 
    ADD COLUMN max_weight numeric(8,2) DEFAULT 0;
  END IF;

  -- Añadir total_reps si no existe
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'workout_exercises' 
    AND column_name = 'total_reps'
  ) THEN
    ALTER TABLE workout_exercises 
    ADD COLUMN total_reps integer DEFAULT 0;
  END IF;
END $$;

-- Crear índices para mejorar el rendimiento de las consultas si no existen
DO $$ 
BEGIN
  -- Crear índice en workouts
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'workouts' 
    AND indexname = 'idx_workouts_profile_date'
  ) THEN
    CREATE INDEX idx_workouts_profile_date 
    ON workouts (profile_id, start_time DESC);
  END IF;

  -- Crear índice en workout_exercises
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'workout_exercises' 
    AND indexname = 'idx_workout_exercises_workout'
  ) THEN
    CREATE INDEX idx_workout_exercises_workout 
    ON workout_exercises (workout_id);
  END IF;
END $$;