/*
  # Update Program Exercises with Video URLs
  
  1. Content
    - Updates exercise video URLs in program_exercises table
    - Organizes exercises by muscle groups
    - Maintains existing exercise structure
  
  2. Structure
    - Keeps week and day organization
    - Updates video_url field for each exercise
*/

-- Update existing exercises with video URLs
UPDATE program_exercises 
SET video_url = CASE name
  -- Abdominales
  WHEN 'Press pallof guerrero' THEN 'https://iframe.mediadelivery.net/embed/184875/ca2f55ab-b743-42b9-b7b3-02ef58d908e4'
  WHEN 'Press pallof con rotación' THEN 'https://iframe.mediadelivery.net/embed/184875/5c1d398f-bc33-42e1-ad72-8e30d67cfa4d'
  WHEN 'Stir the pot' THEN 'https://iframe.mediadelivery.net/embed/184875/ddb605b5-285f-48cf-81bd-58144b988ad1'
  WHEN 'Dead bug y bird-dog' THEN 'https://iframe.mediadelivery.net/embed/184875/d41da3c5-d280-490a-b07c-05eb358ab654'
  
  -- Adductor
  WHEN 'Plancha Copenhaguen' THEN 'https://iframe.mediadelivery.net/embed/184875/7a7e9874-b39c-4912-9386-7d7c5b023218'
  
  -- Cuádriceps
  WHEN 'Sentadilla' THEN 'https://iframe.mediadelivery.net/embed/184875/08a01593-8732-493b-9d1a-3dbf240e6042'
  WHEN 'Ramps Squat en multipower' THEN 'https://iframe.mediadelivery.net/embed/184875/3ef307e7-245d-4de4-86a3-018b6736d765'
  WHEN 'Hack squat en máquina' THEN 'https://iframe.mediadelivery.net/embed/184875/4af42392-2c6e-4eb9-b419-0284122b1b5c'
  WHEN 'Zancada hacia atrás' THEN 'https://iframe.mediadelivery.net/embed/184875/b91f6f29-a796-41c7-9420-182e50b78fb0'
  WHEN 'Sentadilla búlgara en banco' THEN 'https://iframe.mediadelivery.net/embed/184875/7d0c0d67-8bb4-441d-9b34-fd46de37bf86'
  WHEN 'Step up con mancuernas' THEN 'https://iframe.mediadelivery.net/embed/184875/863c97ac-8812-45fa-98cb-0f5968708443'
  WHEN 'Zancadas con mancuernas' THEN 'https://iframe.mediadelivery.net/embed/184875/2662f392-03b5-4441-b10f-168adce6fff8'
  WHEN 'Extensión de cuádriceps en máquina' THEN 'https://iframe.mediadelivery.net/embed/184875/46f29dbd-972d-43cf-80ba-b461df71c738'
  WHEN 'Extensión de cuádriceps unilateral en máquina' THEN 'https://iframe.mediadelivery.net/embed/184875/ed0d7254-3234-46aa-b48a-cb8c821c4bfe'
  WHEN 'Prensa de piernas unilateral en máquina' THEN 'https://iframe.mediadelivery.net/embed/184875/d78ffcff-5cd8-4046-aaac-3adca3627667'
  
  -- Deltoides
  WHEN 'Remo al mentón en multipower' THEN 'https://iframe.mediadelivery.net/embed/184875/c7d77252-65fc-4c22-9b1a-c518ad7baaf3'
  WHEN 'Elevaciones laterales con mancuernas sentado' THEN 'https://iframe.mediadelivery.net/embed/184875/a365ee27-fab3-4f8a-8978-8afd16e05430'
  WHEN 'Elevaciones laterales invertidas' THEN 'https://iframe.mediadelivery.net/embed/184875/d127c7ff-5ba7-40d7-ba5b-76a5e9ed664c'
  WHEN 'Elevaciones frontales con mancuernas sentado' THEN 'https://iframe.mediadelivery.net/embed/184875/df9b50e2-9803-4ee7-aff7-fd175a3fd117'
  WHEN 'Press militar sentado con mancuernas' THEN 'https://iframe.mediadelivery.net/embed/184875/889bee87-a9a9-4043-b71b-a0b39691f443'
  WHEN 'Elevación frontal unilateral para hombro' THEN 'https://iframe.mediadelivery.net/embed/184875/46651b48-3583-4493-ad17-a88a5005f1f9'
  WHEN 'Cruces de polea inverso' THEN 'https://iframe.mediadelivery.net/embed/184875/b4f492fd-1ff3-4beb-a832-8bcbcdbd52d1'
  WHEN 'Abducción unilateral en polea' THEN 'https://iframe.mediadelivery.net/embed/184875/4cf738f1-87f8-48f7-b26d-ef6dd405cdc7'
  WHEN 'Abducción horizontal de hombro en polea' THEN 'https://iframe.mediadelivery.net/embed/184875/10c84eaf-2cda-4b1a-aa5a-b6aafd70c23a'
  WHEN 'Press militar en máquina' THEN 'https://iframe.mediadelivery.net/embed/184875/0012baed-7b68-4fbe-a758-2084076ce8fb'
  WHEN 'Press militar en multipower' THEN 'https://iframe.mediadelivery.net/embed/184875/6cbb58ac-16e2-4fa3-9be2-175e37278277'
  
  -- Glúteos
  WHEN 'Peso muerto sumo' THEN 'https://iframe.mediadelivery.net/embed/184875/16aa79d7-60d4-427c-963a-416b7d73f13b'
  WHEN 'Hip thrust' THEN 'https://iframe.mediadelivery.net/embed/184875/7be45aac-da85-4c5c-9426-79eafc4e3c15'
  WHEN 'Step Down con Mancuerna' THEN 'https://iframe.mediadelivery.net/embed/184875/b664a9e9-75bb-41f0-8b3d-73a0aa9f7373'
  WHEN 'Patada con Glúteos en Polea Baja' THEN 'https://iframe.mediadelivery.net/embed/184875/6768a99c-0880-47e0-8fd9-f7d743ff13eb'
  WHEN 'Patadas Laterales en Polea Baja' THEN 'https://iframe.mediadelivery.net/embed/184875/c0465981-b301-418c-a401-69806d14e83e'
  WHEN 'Pull Through en Polea' THEN 'https://iframe.mediadelivery.net/embed/184875/1913df4d-0b62-4852-bd01-caa1d21a9a00'
  
  -- Isquios
  WHEN 'Peso Muerto Rumano en Multipower' THEN 'https://iframe.mediadelivery.net/embed/184875/de932bce-e14d-4fe5-905c-bfa1a47046a1'
  WHEN 'Peso Muerto Rumano' THEN 'https://iframe.mediadelivery.net/embed/184875/569007a7-ffeb-4570-8efc-e863a2b9dbaa'
  WHEN 'Peso Muerto Libre Tradicional' THEN 'https://iframe.mediadelivery.net/embed/184875/b854b9f3-b824-49a8-9b4c-d94ebd02c715'
  WHEN 'Leg Curl Sentado en Máquina' THEN 'https://iframe.mediadelivery.net/embed/184875/a574c2ae-e566-4258-9e2f-4bcff0e8c57d'
  WHEN 'Leg Curl Sentado Unilateral en Máquina' THEN 'https://iframe.mediadelivery.net/embed/184875/ba3688c2-d185-431a-8114-ab9cedd8f778'
  
  -- Pectoral
  WHEN 'Press Banca' THEN 'https://iframe.mediadelivery.net/embed/184875/77b34731-a4ca-4292-9cdb-bfd51648c768'
  WHEN 'Cruce de poleas' THEN 'https://iframe.mediadelivery.net/embed/184875/62326ed8-eb69-4fe0-ac9e-0b636875dc60'
  WHEN 'Floor press' THEN 'https://iframe.mediadelivery.net/embed/184875/76652d59-d4da-41a1-838e-a1395ba4dc4e'
  WHEN 'Flexiones' THEN 'https://iframe.mediadelivery.net/embed/184875/b082f244-4c39-47be-8748-533d12976638'
  WHEN 'Floor press con mancuernas' THEN 'https://iframe.mediadelivery.net/embed/184875/656cc14d-c0b4-4194-9531-5b971323b79a'
  WHEN 'Aperturas con mancuernas en banco plano' THEN 'https://iframe.mediadelivery.net/embed/184875/137b85e4-d960-4353-b596-c038a1426737'
  WHEN 'Cruce de poleas (pectoral superior)' THEN 'https://iframe.mediadelivery.net/embed/184875/8d69b124-6804-4d82-8f92-92f42ec55277'
  WHEN 'Cruce de poleas hacia arriba sentado' THEN 'https://iframe.mediadelivery.net/embed/184875/0ad03a42-e0b8-4b5b-92cc-d075c691bc41'
  WHEN 'Cruce de poleas hacia arriba de pie' THEN 'https://iframe.mediadelivery.net/embed/184875/38c381be-a74c-4cc4-872f-a1127d8a06d9'
  WHEN 'Cruce de poleas sentado' THEN 'https://iframe.mediadelivery.net/embed/184875/f01e3d18-e22c-4512-a809-8975e5e2ec43'
  WHEN 'Cruce de poleas tumbado declinado' THEN 'https://iframe.mediadelivery.net/embed/184875/c93c7d88-af44-4f43-8a60-5ae4bc29dba3'
  WHEN 'Cruce de poleas tumbado inclinado' THEN 'https://iframe.mediadelivery.net/embed/184875/17a70ff8-b99a-4f9d-b5c8-0f29b11e0658'
  WHEN 'Press banca declinado con mancuernas' THEN 'https://iframe.mediadelivery.net/embed/184875/73204394-acb2-4248-b2fc-bac03677767e'
  WHEN 'Press banco plano con mancuernas' THEN 'https://iframe.mediadelivery.net/embed/184875/a224d925-cc59-49c1-864b-a92c1a3746c1'
  WHEN 'Press banca inclinado con mancuernas' THEN 'https://iframe.mediadelivery.net/embed/184875/eea50817-6b28-4240-8cf4-a0287a1cf195'
  WHEN 'Press de pecho superior en polea en pie' THEN 'https://iframe.mediadelivery.net/embed/184875/271fbd5e-41db-47c9-9ee9-e470b26d5be3'
  WHEN 'Press de pecho superior en polea tumbado inclinado' THEN 'https://iframe.mediadelivery.net/embed/184875/5922f98e-120c-4a74-963d-86748527cc41'
  WHEN 'Press de pecho en polea' THEN 'https://iframe.mediadelivery.net/embed/184875/e96dacdf-5e48-4552-bdfb-7b03840140f9'
  WHEN 'Press de pecho inferior en polea' THEN 'https://iframe.mediadelivery.net/embed/184875/042a71da-1bad-4b9b-ad86-cd83fbbb4a24'
  WHEN 'Press de pecho tumbado en polea' THEN 'https://iframe.mediadelivery.net/embed/184875/5f2e9a43-713b-45d4-bbeb-a344bb6e89a7'
  WHEN 'Press de pecho sentado en polea' THEN 'https://iframe.mediadelivery.net/embed/184875/cdbb6082-203f-442b-8369-aff682846f0c'
  WHEN 'Press banca inclinado en máquina' THEN 'https://iframe.mediadelivery.net/embed/184875/473f5fe7-ae6d-4260-9a9a-038e0fc5e139'
  WHEN 'Press banco plano en máquina' THEN 'https://iframe.mediadelivery.net/embed/184875/0e76449c-a57d-495f-b2a0-da4e6e821d2b'
  
  -- Trapecio
  WHEN 'Encogimiento para Trapecios con Mancuernas en Banco Inclinado' THEN 'https://iframe.mediadelivery.net/embed/184875/d6427eab-0a40-4e29-be28-e920e8e68ea2'
  WHEN 'Retracción-Protacción Escapular en Polea' THEN 'https://iframe.mediadelivery.net/embed/184875/1950ee08-d91c-4ead-8081-59f0eefd48e7'
  WHEN 'Encogimientos para Trapecios en Polea' THEN 'https://iframe.mediadelivery.net/embed/184875/2e5e367b-3995-4004-9029-bbbb9e521a29'
  WHEN 'Encogimientos para Trapecios con Mancuernas' THEN 'https://iframe.mediadelivery.net/embed/184875/502dc6b8-8716-4a7d-8535-474faa875152'
  WHEN 'Remo Invertido con Agarre Ancho con Barra en Multipower' THEN 'https://iframe.mediadelivery.net/embed/184875/820b5170-f565-4d61-9088-3199daea29f8'
  WHEN 'Encogimiento de Hombros en Mutipower' THEN 'https://iframe.mediadelivery.net/embed/184875/9269c649-8049-4954-a54e-22a51fe30c1f'
  
  -- Triceps
  WHEN 'Extensiones de Codo Tras Nuca con Mancuerna' THEN 'https://iframe.mediadelivery.net/embed/184875/9189d87d-317b-431c-a9a3-ba2f39541434'
  WHEN 'Press Francés con Mancuerna en Banco Inclinado' THEN 'https://iframe.mediadelivery.net/embed/184875/152c97bc-9b8f-48b1-95f4-739e40cc4fa2'
  WHEN 'Extensión de Codo en Polea Alta' THEN 'https://iframe.mediadelivery.net/embed/184875/ddb0cfd1-b302-4a5a-a313-18007a98712b'
  WHEN 'Extensión de Codo Tras Nuca Polea Alta' THEN 'https://iframe.mediadelivery.net/embed/184875/eb3d4d72-4305-40cf-9004-18d372386004'
  WHEN 'Extension de Codo Unilateral en Polea Alta' THEN 'https://iframe.mediadelivery.net/embed/184875/738831cb-82a9-4472-a8a7-e3aa0eeb7863'
  WHEN 'Extensión de Tríceps en X en Polea' THEN 'https://iframe.mediadelivery.net/embed/184875/93486db8-03b1-4db4-863d-2cb2c36bf03d'
  WHEN 'Extensión Katana en Polea Baja' THEN 'https://iframe.mediadelivery.net/embed/184875/f536e800-dbc4-4081-a577-33f0c5cf5278'
  WHEN 'Kaz Press en Multipower' THEN 'https://iframe.mediadelivery.net/embed/184875/6c76770b-009a-42b9-8a6d-dd32954facae'
  
  -- Técnica de carrera
  WHEN 'Técnica de carrera introducción' THEN 'https://iframe.mediadelivery.net/embed/184875/a2eb1f29-2064-4dc1-9deb-d7d3e2fc3663'
  WHEN 'Técnica de carrera - Explicación' THEN 'https://iframe.mediadelivery.net/embed/184875/c95b8298-3894-4e38-9907-dcd9199dc315'
  WHEN 'La técnica de carrera es importante' THEN 'https://iframe.mediadelivery.net/embed/184875/8dcf2b32-108e-4312-ba7a-a9cfbe05f6fb'
  WHEN 'Postura del cuerpo - Explicación' THEN 'https://iframe.mediadelivery.net/embed/184875/1a676922-5f24-4545-a544-68fccb2c650e'
  WHEN 'Calentamiento - Explicación' THEN 'https://iframe.mediadelivery.net/embed/184875/1e1462e8-93b5-46da-b658-ae2629996135'
  WHEN 'Calentamiento - Subir temperatura' THEN 'https://iframe.mediadelivery.net/embed/184875/54be25d4-d5d6-4aa0-ba5e-ff21f22c886a'
  WHEN 'Calentamiento - Pliométricos' THEN 'https://iframe.mediadelivery.net/embed/184875/eb997b01-9943-40cc-9032-37c93ab6a07e'
  WHEN 'Calentamiento - Calentamiento muscular' THEN 'https://iframe.mediadelivery.net/embed/184875/0b8bfbf5-ec5d-4645-8f38-955530d933a0'
  WHEN 'Calentamiento - Movilidad articular' THEN 'https://iframe.mediadelivery.net/embed/184875/64da6347-3c8d-49e1-bbb4-992b98bb4be9'
  WHEN 'Longitud explicación' THEN 'https://iframe.mediadelivery.net/embed/184875/2bb5eb99-a04c-4e57-af92-9a16b4c93717'
  WHEN 'Longitud -Fase 1' THEN 'https://iframe.mediadelivery.net/embed/184875/7e6a23d8-0c19-4cab-829c-ad7cbd9ec019'
  WHEN 'Longitud-Fase 2' THEN 'https://iframe.mediadelivery.net/embed/184875/8561a172-3da0-46e8-b743-c91af40f038e'
  WHEN 'Longitud-Fase 2.1' THEN 'https://iframe.mediadelivery.net/embed/184875/a9065d2d-2fac-444e-9375-700bd864d41e'
  WHEN 'Longitud-Fase 3' THEN 'https://iframe.mediadelivery.net/embed/184875/bc5393be-3529-4500-a15f-e30da99b3ac0'
  WHEN 'Longitud-Fase 4' THEN 'https://iframe.mediadelivery.net/embed/184875/746611d4-41a0-4733-8b3c-be7e34d11478'
  WHEN 'Longitud-Fase 5' THEN 'https://iframe.mediadelivery.net/embed/184875/9ac85a78-1a31-43b7-aa83-a977af0c71cd'
  WHEN 'SAT-Explicación' THEN 'https://iframe.mediadelivery.net/embed/184875/a45dfc25-96b5-4fa2-b66c-d055f19a8a6d'
  WHEN 'SAT-Fase 1' THEN 'https://iframe.mediadelivery.net/embed/184875/97b05b01-94cb-4abd-b651-d06aad806ec0'
  WHEN 'SAT-Fase 2' THEN 'https://iframe.mediadelivery.net/embed/184875/eb94f4f9-7e3d-45f8-88de-16b45a8f85d8'
  WHEN 'SAT-Fase 2.1' THEN 'https://iframe.mediadelivery.net/embed/184875/30d58bc5-cca3-4033-9f01-e66764949b31'
  WHEN 'SAT-Fase 2.2' THEN 'https://iframe.mediadelivery.net/embed/184875/c8b4fe11-7ee3-4d81-8ee2-c17ab649739b'
  WHEN 'SAT-Fase 3' THEN 'https://iframe.mediadelivery.net/embed/184875/d965a201-89c3-48e0-819b-0d35bf0418d9'
  WHEN 'SAT-Fase 4' THEN 'https://iframe.mediadelivery.net/embed/184875/d3b16f93-33a7-455a-9683-70816bebe36f'
  WHEN 'SAT-Fase 4.2' THEN 'https://iframe.mediadelivery.net/embed/184875/6d73a076-aadb-478f-98b5-4f2524ea1dd5'
  WHEN 'SAT-Fase 5' THEN 'https://iframe.mediadelivery.net/embed/184875/2e88f711-1311-4f8d-8f78-30c1ec86ded9'
  WHEN 'Apoyo-Fase 1' THEN 'https://iframe.mediadelivery.net/embed/184875/ae88602d-bcec-47da-a841-55d6f6d03471'
  WHEN 'Apoyo-Fase 2' THEN 'https://iframe.mediadelivery.net/embed/184875/b2134a13-d251-4873-b0b7-5f7531bf7f79'
  WHEN 'Apoyo-Fase 2.1' THEN 'https://iframe.mediadelivery.net/embed/184875/827fada1-b001-4253-a421-e0b1e844f52b'
  WHEN 'Apoyo-Fase 2.2' THEN 'https://iframe.mediadelivery.net/embed/184875/7f45ccf9-7964-48ec-98f5-450684b26283'
  WHEN 'Apoyo-Fase 3' THEN 'https://iframe.mediadelivery.net/embed/184875/f89bd2d3-a17a-48da-9b8c-e06b37dd54ec'
  WHEN 'Apoyo-Fase 4' THEN 'https://iframe.mediadelivery.net/embed/184875/d361fd6f-2ddd-4f67-8323-5813efbec6b6'
  WHEN 'Apoyo-Fase 5' THEN 'https://iframe.mediadelivery.net/embed/184875/9bd1c488-db0d-4e4b-b30c-c44dbf1c2c84'
  WHEN 'Intégralo todo' THEN 'https://iframe.mediadelivery.net/embed/184875/aa0094e3-f81d-4284-ae92-0f76f316e066'
  WHEN 'Intégralo todo-Ejercicio máster' THEN 'https://iframe.mediadelivery.net/embed/184875/76317cd8-c9e6-4e59-bd11-8be4c51b8494'
  
  -- Pliométricos
  WHEN 'Salto vertical con goma asistido' THEN 'https://iframe.mediadelivery.net/embed/184875/ff549c82-8721-4071-8bdf-c05b8e8fed45'
  WHEN 'Saltos a tocar el step con un pie' THEN 'https://iframe.mediadelivery.net/embed/184875/1cbd2f0e-6848-466b-b79a-2541f9e6ce2f'
  WHEN 'Power push off' THEN 'https://iframe.mediadelivery.net/embed/184875/d6c64ac5-c806-4ad0-b8a6-1e271c058059'
  WHEN 'Rodillas arriba vs una goma' THEN 'https://iframe.mediadelivery.net/embed/184875/a2b5eec1-5839-43da-93f3-a198d2d1b8c4'
  WHEN 'Squat jump con carga' THEN 'https://iframe.mediadelivery.net/embed/184875/0bb2a28e-d5a2-4c6e-a398-7f426ef91f3b'
  WHEN 'Salto en contramovimiento intensivo' THEN 'https://iframe.mediadelivery.net/embed/184875/db14f297-c888-41f7-b66b-ab116d1711d3'
  WHEN 'Saltos desde el cajón' THEN 'https://iframe.mediadelivery.net/embed/184875/75192217-0eb7-48d1-9e5c-561aff90f67e'
  WHEN 'Salto al cajón' THEN 'https://iframe.mediadelivery.net/embed/184875/723ba3fb-b99f-4d0b-a08c-b51e1692c593'
  WHEN 'Drop Jump' THEN 'https://iframe.mediadelivery.net/embed/184875/fc09e304-6de8-4b39-a906-212d7be7502b'
  WHEN 'Sit squat+squat jump' THEN 'https://iframe.mediadelivery.net/embed/184875/188c0d00-40a3-47b1-8aba-aff28d2ddcd5'
  WHEN 'Split squat tuck jump' THEN 'https://iframe.mediadelivery.net/embed/184875/7435751d-6ea9-4565-99cf-9dc25257d35c'
  WHEN 'Rapid and forward and back line' THEN 'https://iframe.mediadelivery.net/embed/184875/31459b0f-59f6-4ec3-8b9a-4a3585faf7d5'
  WHEN 'Linear pogos' THEN 'https://iframe.mediadelivery.net/embed/184875/bd7196b0-9ba8-4454-8444-229deae66a58'
  WHEN 'Pogo jumps' THEN 'https://iframe.mediadelivery.net/embed/184875/cf1c0af2-0e54-4be5-9b14-3694643b8f40'
  WHEN 'Linear jumps' THEN 'https://iframe.mediadelivery.net/embed/184875/d9db7f99-002b-4f8c-9534-7b208343e492'
  WHEN 'RFE toe taps' THEN 'https://iframe.mediadelivery.net/embed/184875/31950f18-d568-43d2-8dd5-234fbf4b180b'
  WHEN 'CMJ-Salto en contramovimiento' THEN 'https://iframe.mediadelivery.net/embed/184875/75e535c2-66b4-4fc2-9de3-6984d1d0d322'
  WHEN 'Sprinter jump' THEN 'https://iframe.mediadelivery.net/embed/184875/c03f21c1-94ed-46ec-8f61-1bfd4dde59d6'
  WHEN 'Reactive squat jump' THEN 'https://iframe.mediadelivery.net/embed/184875/3fa0bd00-de1c-48db-9a1e-cd5ff4a54390'
  WHEN 'Reactive tuck jumps' THEN 'https://iframe.mediadelivery.net/embed/184875/ab436fa6-babe-4b8a-8ed2-81ccf7a50c2e'
  WHEN 'Lunge jump reactivo' THEN 'https://iframe.mediadelivery.net/embed/184875/b46425d4-7982-4aff-8f71-e2f03b3f9f3f'
  
  ELSE video_url
END;