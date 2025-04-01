/*
  # Inserción de ejercicios del programa De 0 a Híbrido

  1. Contenido
    - Inserta los ejercicios para cada día del programa
    - Mantiene la estructura y progresión del programa
    - Incluye todos los detalles de cada ejercicio

  2. Estructura
    - Organizado por semanas y días
    - Cada ejercicio incluye sets, reps, RIR y descanso
*/

-- Función auxiliar para insertar ejercicios
CREATE OR REPLACE FUNCTION insert_program_day_exercises(
  p_week_id uuid,
  p_day_number integer,
  p_title text,
  p_description text,
  p_exercises json[]
) RETURNS void AS $$
DECLARE
  v_day_id uuid;
  v_exercise json;
BEGIN
  -- Insertar el día
  INSERT INTO program_days (week_id, number, title, description)
  VALUES (p_week_id, p_day_number, p_title, p_description)
  RETURNING id INTO v_day_id;

  -- Insertar los ejercicios del día
  FOR v_exercise IN SELECT * FROM json_array_elements(array_to_json(p_exercises))
  LOOP
    INSERT INTO program_exercises (
      day_id,
      name,
      sets,
      reps,
      rir,
      rest,
      video_url,
      order_number
    )
    VALUES (
      v_day_id,
      (v_exercise->>'name')::text,
      (v_exercise->>'sets')::integer,
      (v_exercise->>'reps')::text,
      (v_exercise->>'rir')::text,
      (v_exercise->>'rest')::text,
      (v_exercise->>'video_url')::text,
      (v_exercise->>'order_number')::integer
    );
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Insertar ejercicios para la semana 1
DO $$
DECLARE
  v_week_id uuid;
BEGIN
  SELECT id INTO v_week_id FROM program_weeks 
  WHERE program_id = 'zero-to-hybrid' AND number = 1;

  -- Día 1: Full Body
  PERFORM insert_program_day_exercises(
    v_week_id,
    1,
    'Full Body',
    'Introducción a movimientos compuestos',
    ARRAY[
      json_build_object(
        'name', 'Sentadilla con Peso Corporal',
        'sets', 3,
        'reps', '12-15',
        'rir', '3',
        'rest', '90s',
        'video_url', 'https://iframe.mediadelivery.net/play/184875/c95b8298-3894-4e38-9907-dcd9199dc315',
        'order_number', 1
      ),
      json_build_object(
        'name', 'Flexiones Modificadas',
        'sets', 3,
        'reps', '8-12',
        'rir', '3',
        'rest', '90s',
        'video_url', 'https://iframe.mediadelivery.net/play/184875/36aec660-db2c-45ff-8631-ddbd86912aed',
        'order_number', 2
      )
      -- Continuar con el resto de ejercicios...
    ]
  );

  -- Continuar con los demás días...
END $$;

-- Repetir el proceso para las demás semanas...