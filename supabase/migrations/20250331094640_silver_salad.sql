/*
  # Añadir campos para estadísticas de entrenamiento

  1. Nuevos Campos
    - total_reps en workouts
    - total_volume, max_weight, total_reps en workout_exercises

  2. Cambios
    - Añade campos para tracking de estadísticas
    - Mantiene la estructura existente
*/

-- Añadir campos para estadísticas en workouts
ALTER TABLE workouts
ADD COLUMN total_reps integer DEFAULT 0;

-- Añadir campos para estadísticas en workout_exercises
ALTER TABLE workout_exercises
ADD COLUMN total_volume numeric(8,2) DEFAULT 0,
ADD COLUMN max_weight numeric(8,2) DEFAULT 0,
ADD COLUMN total_reps integer DEFAULT 0;

-- Crear índices para mejorar el rendimiento de las consultas
CREATE INDEX idx_workouts_profile_date ON workouts (profile_id, start_time DESC);
CREATE INDEX idx_workout_exercises_workout ON workout_exercises (workout_id);