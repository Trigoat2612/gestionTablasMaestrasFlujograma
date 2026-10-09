export type Level = 'N0' | 'N1' | 'N2'

export type DiagramDefinition = {
  id: string
  level: Level
  title: string
  shortTitle: string
  fileKey: string
  description: string
  group: 'general' | 'pj' | 'softplan' | 'shared'
}

export const diagrams: DiagramDefinition[] = [
  {
    id: 'n0', level: 'N0', title: 'Gestión de tablas maestras', shortTitle: 'Vista general',
    fileKey: 'n0.bpmn', group: 'general',
    description: 'Visión integral del proceso entre Poder Judicial y Softplan: registro, clasificación, aprobación, documentación FTM-02, ejecución, validación y cierre.'
  },
  {
    id: '01', level: 'N1', title: 'Registrar y clasificar solicitud', shortTitle: 'PJ: registro y clasificación',
    fileKey: '01-registrar-clasificar.bpmn', group: 'pj',
    description: 'Selecciona el servicio, registra FTM-01, identifica la tabla y su propietario, y clasifica el tipo e impacto del cambio.'
  },
  {
    id: '01d', level: 'N1', title: 'Validar dato distrital', shortTitle: 'PJ: validación distrital',
    fileKey: '01d-validar-distrital.bpmn', group: 'pj',
    description: 'Valida datos, fuente y alcance cuando el requerimiento corresponde a información distrital.'
  },
  {
    id: '02', level: 'N1', title: 'Evaluar y aprobar', shortTitle: 'PJ: evaluación y aprobación',
    fileKey: '02-evaluar-aprobar.bpmn', group: 'pj',
    description: 'Evalúa la ruta rápida o controlada, revisa impacto y registra la aprobación con la ruta autorizada.'
  },
  {
    id: '02r', level: 'N1', title: 'Reaprobar alcance', shortTitle: 'PJ: reaprobación',
    fileKey: '02r-reaprobar-alcance.bpmn', group: 'pj',
    description: 'Reevalúa alcance y riesgo cuando una subsanación modifica lo previamente aprobado.'
  },
  {
    id: '03', level: 'N1', title: 'Gestionar FTM-02', shortTitle: 'PJ: gestión FTM-02',
    fileKey: '03-gestionar-ftm02.bpmn', group: 'pj',
    description: 'Prepara, remite y subsana FTM-02; controla observaciones de Softplan y deriva a reaprobación si cambia el alcance.'
  },
  {
    id: '04', level: 'N1', title: 'Validar pruebas', shortTitle: 'PJ: validar pruebas',
    fileKey: '04-validar-pruebas.bpmn', group: 'pj',
    description: 'Recibe resultados, valida evidencias, formula observaciones y otorga conformidad para producción cuando corresponde.'
  },
  {
    id: '05', level: 'N1', title: 'Verificar resultado', shortTitle: 'PJ: verificar resultado',
    fileKey: '05-verificar-resultado.bpmn', group: 'pj',
    description: 'Verifica el cambio operativo contra el alcance aprobado y consolida FTM-01, FTM-02, aprobaciones y evidencias.'
  },
  {
    id: '06', level: 'N1', title: 'Formalizar cierre en SGD', shortTitle: 'PJ: cierre SGD',
    fileKey: '06-formalizar-sgd.bpmn', group: 'pj',
    description: 'Revisa el expediente completo y formaliza el cierre y la trazabilidad mediante el SGD.'
  },
  {
    id: 'spa', level: 'N1', title: 'Revisar paquete FTM-02', shortTitle: 'Softplan: revisar paquete',
    fileKey: 'spa-revisar-paquete.bpmn', group: 'softplan',
    description: 'Verifica integridad, factibilidad y alcance; formula observaciones o comunica que el paquete está validado.'
  },
  {
    id: 'spb', level: 'N1', title: 'Ejecutar ruta autorizada', shortTitle: 'Softplan: ejecutar ruta',
    fileKey: 'spb-ejecutar-ruta.bpmn', group: 'softplan',
    description: 'Ejecuta ruta rápida o controlada, gestiona pruebas y producción, y remite la evidencia correspondiente al PJ.'
  },
  {
    id: '11', level: 'N2', title: 'Preparar documentación FTM-02', shortTitle: 'Preparar FTM-02',
    fileKey: '11-preparar-ftm02.bpmn', group: 'pj',
    description: 'Completa FTM-02 y anexos y comprueba consistencia con FTM-01 y la aprobación.'
  },
  {
    id: '12', level: 'N2', title: 'Subsanar observaciones', shortTitle: 'Subsanar observaciones',
    fileKey: '12-subsanar-observaciones.bpmn', group: 'pj',
    description: 'Corrige FTM-02 y anexos y evalúa si las observaciones modifican el alcance aprobado.'
  },
  {
    id: '13', level: 'N2', title: 'Verificar pruebas', shortTitle: 'Verificar pruebas',
    fileKey: '13-verificar-pruebas.bpmn', group: 'pj',
    description: 'Contrasta evidencias contra los criterios de aceptación y registra el resultado de la validación.'
  },
  {
    id: '14', level: 'N2', title: 'Ejecutar ruta rápida', shortTitle: 'Ruta rápida',
    fileKey: '14-ruta-rapida.bpmn', group: 'softplan',
    description: 'Aplica un cambio estándar autorizado y prepara evidencia del resultado.'
  },
  {
    id: '15', level: 'N2', title: 'Adecuar y probar', shortTitle: 'Pruebas',
    fileKey: '15-adecuar-probar.bpmn', group: 'softplan',
    description: 'Configura el cambio en ambiente de pruebas, ejecuta pruebas y documenta evidencias.'
  },
  {
    id: '16', level: 'N2', title: 'Aplicar en producción', shortTitle: 'Producción',
    fileKey: '16-aplicar-produccion.bpmn', group: 'softplan',
    description: 'Aplica la modificación en producción y verifica la ejecución y sus evidencias.'
  },
]

export const callTargets: Record<string, string> = {
  'PJ-01': '01',
  'PJ-01D': '01d',
  'PJ-02': '02',
  'PJ-02R': '02r',
  'PJ-03': '03',
  'PJ-04': '04',
  'PJ-05': '05',
  'PJ-06': '06',
  'SP-A': 'spa',
  'SP-B': 'spb',
}

// Asociación nativa por calledElement. Esta tabla permite navegar incluso cuando
// el nombre visible del Call Activity no contiene un código único (por ejemplo “N2 · …”).
export const calledElementTargets: Record<string, string> = {
  'Id_c059fb49-4256-4855-9e0c-3c97b5752bfd': '01',
  'Id_6937b3a2-8334-438e-b3fb-f5ebc394d84d': '01d',
  'Id_20e64c0c-93af-4418-933e-f558662f116e': '02',
  'Id_bb2c3f6b-7427-4998-b6a6-68d69e74febd': '02r',
  'Id_2ae533bd-631f-484a-868c-e42ed8fc35b2': '03',
  'Id_471bc08c-e957-45b1-a8e3-c74d2df15643': '04',
  'Id_b896f3af-53b8-4c8b-ad41-5b3dbc6934c9': '05',
  'Id_8c39d4e2-9d8d-4cdc-8457-a527c0432973': '06',
  'Id_1fa82947-2539-4019-9898-ea308d74aecc': 'spa',
  'Id_c1b9fdfa-f94e-4dbb-ad89-891dddd84d91': 'spb',
  'Id_dcdb7fea-1b1e-43dc-82d4-3e98bb5a0e34': '11',
  'Id_ea0b1ba6-2d6e-4390-a665-119b44c5c89b': '12',
  'Id_20ca039c-02e0-4a2e-802d-3ce999557f63': '13',
  'Id_cbcae542-3f46-4d4a-9a5a-47315f646ae3': '14',
  'Id_186de990-0966-4dcd-a78b-af7206c8c41b': '15',
  'Id_ad407780-18a8-4af4-a3b3-523b987cb824': '16',
}

export const levelLabels: Record<Level, string> = {
  N0: 'Nivel 0 · visión integral',
  N1: 'Nivel 1 · coordinación',
  N2: 'Nivel 2 · detalle operativo',
}
