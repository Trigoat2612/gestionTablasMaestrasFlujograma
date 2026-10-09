export const procedure = {
  title: 'Procedimiento de gestión de tablas maestras',
  version: 'Modelo BPMN · Proyecto v1.0.0',
  date: '9 de octubre de 2026',
  objective: 'Gestionar cambios sobre tablas maestras desde la identificación de la necesidad hasta su aprobación, documentación FTM-02, ejecución por Softplan, validación del resultado y cierre trazable mediante SGD.',
  scope: 'La vista integra el trabajo del Poder Judicial y Softplan. Comprende al Administrador del Módulo, Secretario Técnico Distrital, Dueño del Proceso o Propietario de Tabla, Usuario habilitado del SGD, Mesa o Coordinación Técnica de Softplan y Equipo Técnico de Softplan.',
  principles: [
    'Registro formal mediante FTM-01',
    'Aprobación por el propietario de la tabla o dueño del proceso',
    'Consistencia entre FTM-01, FTM-02 y el alcance aprobado',
    'Reaprobación cuando una subsanación modifica el alcance',
    'Evidencia de pruebas antes del pase a producción cuando corresponde',
    'Cierre documental y trazabilidad mediante SGD',
  ],
  controlMilestones: [
    'Solicitud clasificada',
    'Aprobación emitida',
    'FTM-02 aceptado',
    'Pruebas conformes',
    'Resultado verificado',
    'Expediente cerrado en SGD',
  ],
  operationTypes: [
    'CAMBIO ESTÁNDAR / DATO',
    'CAMBIO CON CONFIGURACIÓN / IMPACTO',
    'DATO DISTRITAL',
    'RUTA RÁPIDA',
    'RUTA CONTROLADA CON PRUEBAS',
    'SUBSANACIÓN',
    'REAPROBACIÓN DE ALCANCE',
  ],
}

export type ActivityReference = {
  responsible?: string
  evidence?: string
  note?: string
}

// Referencias complementarias de los Call Activities principales. El detalle de
// cada tarea se obtiene directamente del BPMN y de su carril.
export const activityReference: Record<string, ActivityReference> = {
  'PJ-01': {
    responsible: 'Administrador del Módulo',
    evidence: 'FTM-01 registrado, tabla y propietario identificados, y solicitud clasificada.'
  },
  'PJ-01D': {
    responsible: 'Secretario Técnico Distrital',
    evidence: 'Validación de datos, fuente y alcance distrital registrada.'
  },
  'PJ-02': {
    responsible: 'Dueño del Proceso / Propietario de Tabla',
    evidence: 'Aprobación o decisión registrada junto con la ruta autorizada.'
  },
  'PJ-02R': {
    responsible: 'Dueño del Proceso / Propietario de Tabla',
    evidence: 'Resultado de la reaprobación del alcance modificado.'
  },
  'PJ-03': {
    responsible: 'Administrador del Módulo',
    evidence: 'FTM-02 y anexos remitidos o subsanados, manteniendo consistencia con la aprobación.'
  },
  'PJ-04': {
    responsible: 'Dueño del Proceso / Propietario de Tabla',
    evidence: 'Resultado de validación de pruebas y conformidad para producción cuando aplique.'
  },
  'PJ-05': {
    responsible: 'Administrador del Módulo',
    evidence: 'Verificación del cambio contra el alcance aprobado y expediente consolidado.'
  },
  'PJ-06': {
    responsible: 'Usuario habilitado del SGD',
    evidence: 'Cierre formal y trazabilidad registrados en el SGD.'
  },
  'SP-A': {
    responsible: 'Softplan - Mesa / Coordinación Técnica',
    evidence: 'Paquete validado o relación de observaciones remitida al PJ.'
  },
  'SP-B': {
    responsible: 'Softplan - Equipo Técnico',
    evidence: 'Resultado de ruta rápida o controlada, evidencias de pruebas y/o producción.'
  },
}

// Estos puntos son propuestas de formalización inferidas del modelo BPMN. No se
// presentan como decisiones ya aprobadas: deben ser validados por los responsables.
export const pendingScenarios = [
  {
    title: 'Criterio de ruta rápida',
    detail: 'El flujo distingue una ruta rápida de una ruta controlada con pruebas, pero el BPMN no contiene un catálogo explícito de cambios que califican para cada ruta.',
    solution: 'Formalizar una matriz de clasificación que indique qué tipos de cambio pueden ejecutarse por ruta rápida y cuáles requieren pruebas y conformidad previa.',
    steps: [
      'Inventariar los tipos de cambio de tablas maestras atendidos por el procedimiento.',
      'Definir criterios objetivos de impacto, complejidad y riesgo.',
      'Asignar cada tipo de cambio a RUTA_RAPIDA o RUTA_CONTROLADA.',
      'Aprobar la matriz con el Dueño del Proceso / Propietario de Tabla y Softplan.',
      'Referenciar la matriz en el gateway ¿Ruta rápida? de PJ-02 y SP-B.'
    ]
  },
  {
    title: 'Matriz de propietarios de tablas',
    detail: 'PJ-01 identifica la tabla y su propietario y PJ-02 exige evaluación del Dueño del Proceso / Propietario de Tabla. La relación tabla-responsable debe mantenerse vigente.',
    solution: 'Mantener un catálogo oficial que relacione cada tabla maestra con su propietario, reemplazo y ámbito de aprobación.',
    steps: [
      'Listar las tablas maestras comprendidas por el procedimiento.',
      'Asignar propietario o dueño del proceso por tabla.',
      'Definir suplencias y responsabilidades para ausencias.',
      'Registrar el catálogo como referencia del FTM-01.',
      'Establecer un mecanismo de actualización y control de versiones.'
    ]
  },
  {
    title: 'Criterio de dato distrital',
    detail: 'El N0 deriva a PJ-01D cuando el requerimiento corresponde a un dato distrital, pero el modelo no define el catálogo o regla de identificación de ese supuesto.',
    solution: 'Definir qué datos requieren validación del Secretario Técnico Distrital y qué evidencia debe acompañar dicha validación.',
    steps: [
      'Identificar tablas o campos de alcance distrital.',
      'Definir la fuente válida de los datos distritales.',
      'Definir el responsable distrital habilitado para validar.',
      'Establecer evidencia mínima de la validación.',
      'Referenciar estas reglas en el gateway ¿Dato distrital? del N0.'
    ]
  },
  {
    title: 'Criterios de aceptación de pruebas',
    detail: 'PJ-04 y el N2 de validación contrastan evidencias con criterios de aceptación, pero el BPMN no enumera esos criterios.',
    solution: 'Formalizar criterios mínimos de aceptación por tipo de cambio antes de emitir conformidad para producción.',
    steps: [
      'Definir casos de prueba mínimos por categoría de cambio.',
      'Definir evidencias obligatorias y responsable de validación.',
      'Establecer condiciones de conformidad y rechazo.',
      'Definir cómo se registran observaciones y nueva evidencia.',
      'Adjuntar o referenciar los criterios desde FTM-02.'
    ]
  },
  {
    title: 'Regla de cambio de alcance y reaprobación',
    detail: 'Durante la subsanación se evalúa si las observaciones modifican el alcance aprobado. La regla que determina cuándo corresponde reaprobación debe ser inequívoca.',
    solution: 'Definir qué modificaciones se consideran cambio de alcance y obligan a regresar a PJ-02R.',
    steps: [
      'Definir dimensiones del alcance: tabla, campos, valores, ambiente, comportamiento e impacto.',
      'Establecer cuáles cambios son materiales y cuáles son correcciones documentales.',
      'Registrar en la subsanación la comparación contra el alcance aprobado.',
      'Derivar a PJ-02R cuando exista cambio material.',
      'Conservar la nueva aprobación junto con las versiones previas.'
    ]
  },
  {
    title: 'Expediente mínimo para cierre en SGD',
    detail: 'PJ-06 formaliza el cierre mediante SGD después de revisar expediente y anexos. Conviene formalizar el conjunto mínimo de documentos requeridos.',
    solution: 'Definir un checklist de cierre que garantice trazabilidad completa desde la solicitud hasta la evidencia de ejecución.',
    steps: [
      'Incluir FTM-01 y su aprobación.',
      'Incluir FTM-02 vigente y sus anexos.',
      'Incluir observaciones, subsanaciones y reaprobaciones cuando existan.',
      'Incluir evidencia de pruebas o resultado rápido y evidencia de producción cuando aplique.',
      'Registrar la verificación final y el identificador del expediente SGD.'
    ]
  },
]
