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

-- Insertar ejercicios para la semana 1, día 2
DO $$
DECLARE
  v_week_id uuid;
  v_day_id uuid;
BEGIN
  -- Obtener el ID de la semana 1
  SELECT id INTO v_week_id FROM program_weeks 
  WHERE program_id = 'zero-to-hybrid' AND number = 1;

  -- Insertar día 1
  INSERT INTO program_days (week_id, number, title, description)
  VALUES (v_week_id, 1, 'Full Body', 'Introducción a movimientos compuestos')
  RETURNING id INTO v_day_id;

  -- Insertar ejercicios del día 1 con el nuevo video
  INSERT INTO program_exercises (day_id, name, sets, reps, rir, rest, video_url, order_number)
  VALUES 
    (v_day_id, 'Sentadilla con Peso Corporal', 3, '12-15', '3', '90s', 'https://iframe.mediadelivery.net/embed/184875/ca2f55ab-b743-42b9-b7b3-02ef58d908e4', 1),
    (v_day_id, 'Flexiones Modificadas', 3, '8-12', '3', '90s', 'https://iframe.mediadelivery.net/embed/184875/ca2f55ab-b743-42b9-b7b3-02ef58d908e4', 2),
    (v_day_id, 'Peso Muerto con Mancuerna', 3, '12-15', '3', '90s', 'https://iframe.mediadelivery.net/embed/184875/ca2f55ab-b743-42b9-b7b3-02ef58d908e4', 3),
    (v_day_id, 'Plancha', 3, '30s', '', '60s', 'https://iframe.mediadelivery.net/embed/184875/ca2f55ab-b743-42b9-b7b3-02ef58d908e4', 4),
    (v_day_id, 'Bird Dog', 3, '10 por lado', '', '60s', 'https://iframe.mediadelivery.net/embed/184875/ca2f55ab-b743-42b9-b7b3-02ef58d908e4', 5),
    (v_day_id, 'Puente de Glúteos', 3, '15-20', '', '60s', 'https://iframe.mediadelivery.net/embed/184875/ca2f55ab-b743-42b9-b7b3-02ef58d908e4', 6);

  -- Insertar día 2
  INSERT INTO program_days (week_id, number, title, description)
  VALUES (v_week_id, 2, 'Cardio', 'Intervalos de alta intensidad')
  RETURNING id INTO v_day_id;

  -- Insertar ejercicios
  INSERT INTO program_exercises (day_id, name, sets, reps, rir, rest, video_url, order_number)
  VALUES 
    (v_day_id, 'Intervalos en cinta o airbike', 3, '30"(90%)', '', '150"(60%)', 'https://iframe.mediadelivery.net/embed/184875/ca2f55ab-b743-42b9-b7b3-02ef58d908e4', 1),
    (v_day_id, 'Vuelta a la calma', 1, '180"(50%)', '', '', 'https://iframe.mediadelivery.net/embed/184875/ca2f55ab-b743-42b9-b7b3-02ef58d908e4', 2);

  -- Insertar día 3
  INSERT INTO program_days (week_id, number, title, description)
  VALUES (v_week_id, 3, 'Full Body + Fuerza', 'Desarrollo de fuerza base')
  RETURNING id INTO v_day_id;

  -- Insertar ejercicios del día 3
  INSERT INTO program_exercises (day_id, name, sets, reps, rir, rest, video_url, order_number)
  VALUES 
    (v_day_id, 'Tuck jumps', 3, '8', 'Máxima altura', 'C', 'https://iframe.mediadelivery.net/embed/184875/ca2f55ab-b743-42b9-b7b3-02ef58d908e4', 1),
    (v_day_id, 'Peso muerto barra', 3, '8-10', '3', 'C', 'https://iframe.mediadelivery.net/embed/184875/ca2f55ab-b743-42b9-b7b3-02ef58d908e4', 2),
    (v_day_id, 'Leg curl máquina', 3, '15-20', '3', 'C', 'https://iframe.mediadelivery.net/embed/184875/ca2f55ab-b743-42b9-b7b3-02ef58d908e4', 3),
    (v_day_id, 'Elevaciones laterales mancuernas de pie', 3, '20-25', '3', 'P', 'https://iframe.mediadelivery.net/embed/184875/ca2f55ab-b743-42b9-b7b3-02ef58d908e4', 4),
    (v_day_id, 'Remo T', 3, '12-15', '3', 'C', 'https://iframe.mediadelivery.net/embed/184875/ca2f55ab-b743-42b9-b7b3-02ef58d908e4', 5),
    (v_day_id, 'Press inclinado pecho en multipower', 4, '12-15', '3322', 'C', 'https://iframe.mediadelivery.net/embed/184875/ca2f55ab-b743-42b9-b7b3-02ef58d908e4', 6),
    (v_day_id, 'Curl de bíceps mancuernas sentado', 3, '10-12', '22F', 'P', 'https://iframe.mediadelivery.net/embed/184875/ca2f55ab-b743-42b9-b7b3-02ef58d908e4', 7);

  -- Continuar con los demás días y ejercicios...
END $$;

-- Repetir el proceso para las demás semanas...