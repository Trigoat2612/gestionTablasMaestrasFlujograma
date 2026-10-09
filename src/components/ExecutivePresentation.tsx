import { useState } from 'react'
import {
  AlertTriangle, ArrowRight, BarChart3, CheckCircle2, ClipboardCheck, Database,
  FileCheck2, GitBranch, Layers3, ListChecks, PlayCircle, RefreshCcw, ShieldCheck,
  UsersRound, Workflow, Zap, ChevronDown,
} from 'lucide-react'
import { diagrams } from '../data/catalog'
import { pendingScenarios, procedure } from '../data/procedure'

type ExecutivePresentationProps = {
  onOpenDiagram: (id: string) => void
  onOpenPending: () => void
}

type JourneyStep = {
  id: string
  title: string
  actor: string
  description: string
  decision: string
  output: string
  diagramId?: string
}

type Scenario = {
  id: string
  title: string
  trigger: string
  executiveMessage: string
  result: string
  diagramId: string
  attention?: string
}

type SummaryPanel = 'steps' | 'scenarios' | 'diagrams' | 'controls'

const journey: JourneyStep[] = [
  {
    id: 'registrar',
    title: '1. Registrar y clasificar',
    actor: 'Administrador del Módulo',
    description: 'La necesidad se registra en FTM-01, se identifica la tabla, su propietario y el tipo e impacto del cambio.',
    decision: '¿Qué tabla cambia y qué impacto tiene?',
    output: 'Solicitud clasificada y propietario identificado.',
    diagramId: '01',
  },
  {
    id: 'distrital',
    title: '2. Validar alcance especial',
    actor: 'Secretario Técnico Distrital / Administrador del Módulo',
    description: 'Cuando el dato es distrital se valida su fuente y alcance antes de continuar con la aprobación.',
    decision: '¿El requerimiento contiene un dato distrital?',
    output: 'Validación distrital registrada o trámite directo a evaluación.',
    diagramId: '01d',
  },
  {
    id: 'aprobar',
    title: '3. Evaluar y aprobar',
    actor: 'Dueño del Proceso / Propietario de Tabla',
    description: 'Se evalúa si el cambio es estándar o requiere una ruta controlada y se registra la aprobación y ruta autorizada.',
    decision: '¿Se aprueba y qué ruta corresponde?',
    output: 'Decisión emitida con ruta autorizada.',
    diagramId: '02',
  },
  {
    id: 'ftm02',
    title: '4. Preparar y validar FTM-02',
    actor: 'Administrador del Módulo + Softplan Mesa / Coordinación Técnica',
    description: 'El PJ prepara FTM-02 y anexos; Softplan revisa integridad, factibilidad y alcance y devuelve observaciones cuando corresponde.',
    decision: '¿El paquete es consistente, completo y técnicamente viable?',
    output: 'FTM-02 aceptado o subsanado; reaprobación si cambió el alcance.',
    diagramId: '03',
  },
  {
    id: 'ejecutar',
    title: '5. Ejecutar ruta autorizada',
    actor: 'Softplan - Equipo Técnico',
    description: 'Softplan ejecuta una ruta rápida o configura y prueba el cambio antes del pase a producción.',
    decision: '¿Ruta rápida autorizada o ejecución controlada con pruebas?',
    output: 'Resultado rápido o evidencias de pruebas disponibles.',
    diagramId: 'spb',
  },
  {
    id: 'validar',
    title: '6. Validar resultado',
    actor: 'Dueño del Proceso / Propietario de Tabla + Administrador del Módulo',
    description: 'El PJ valida las evidencias, autoriza producción cuando aplica y verifica el resultado final contra el alcance aprobado.',
    decision: '¿Las pruebas y el resultado cumplen lo aprobado?',
    output: 'Conformidad, observaciones o resultado final documentado.',
    diagramId: '04',
  },
  {
    id: 'cerrar',
    title: '7. Formalizar cierre',
    actor: 'Usuario habilitado del SGD',
    description: 'Se revisa el expediente completo y se registra el cierre y la trazabilidad documental mediante SGD.',
    decision: '¿El expediente contiene FTM-01, FTM-02, aprobaciones y evidencias?',
    output: 'Expediente cerrado y SGD actualizado.',
    diagramId: '06',
  },
]

const scenarios: Scenario[] = [
  {
    id: 'rapida',
    title: 'Ruta rápida',
    trigger: 'Cambio estándar autorizado que puede ejecutarse sin ciclo de pruebas.',
    executiveMessage: 'Softplan aplica el cambio estándar y prepara evidencia del resultado. El PJ verifica posteriormente que coincida con el alcance aprobado.',
    result: 'Cambio aplicado y evidencia disponible para verificación y cierre.',
    diagramId: '14',
    attention: 'La condición de ruta rápida debe estar formalmente definida para evitar clasificaciones discrecionales.',
  },
  {
    id: 'controlada',
    title: 'Ruta con pruebas',
    trigger: 'Cambio que requiere configuración, evaluación de impacto o validación previa a producción.',
    executiveMessage: 'Softplan configura en pruebas, documenta evidencia, el PJ valida y solo con conformidad se ejecuta el pase a producción.',
    result: 'Cambio probado, aprobado y aplicado en producción con evidencia.',
    diagramId: '15',
  },
  {
    id: 'distrital',
    title: 'Dato distrital',
    trigger: 'La solicitud afecta información cuyo origen o alcance es distrital.',
    executiveMessage: 'El Secretario Técnico Distrital valida datos, fuente y alcance antes de la evaluación y aprobación del propietario de la tabla.',
    result: 'Validación distrital registrada y solicitud habilitada para continuar.',
    diagramId: '01d',
  },
  {
    id: 'subsanacion',
    title: 'Observación / subsanación',
    trigger: 'Softplan identifica observaciones en integridad, factibilidad o alcance del FTM-02.',
    executiveMessage: 'El Administrador corrige FTM-02 y anexos. Si la corrección modifica el alcance aprobado, el flujo exige reaprobación antes de reenviar.',
    result: 'Paquete corregido y aceptado sin perder trazabilidad del alcance.',
    diagramId: '12',
  },
  {
    id: 'reaprobacion',
    title: 'Cambio de alcance',
    trigger: 'La subsanación técnica modifica el alcance previamente aprobado.',
    executiveMessage: 'El Dueño del Proceso / Propietario de Tabla reevalúa alcance y riesgo y registra aprobación o denegación.',
    result: 'Nuevo alcance aprobado para continuar o solicitud suspendida.',
    diagramId: '02r',
  },
]

const responsibilityRows = [
  ['Administrador del Módulo', 'Registra FTM-01, clasifica el cambio, prepara y subsana FTM-02, y consolida el resultado.'],
  ['Secretario Técnico Distrital', 'Valida datos, fuente y alcance cuando la solicitud tiene componente distrital.'],
  ['Dueño del Proceso / Propietario de Tabla', 'Evalúa y aprueba, reaprueba cambios de alcance y valida pruebas.'],
  ['Usuario habilitado del SGD', 'Formaliza el cierre y la trazabilidad documental del expediente.'],
  ['Softplan - Mesa / Coordinación Técnica', 'Revisa integridad, factibilidad y alcance del paquete FTM-02.'],
  ['Softplan - Equipo Técnico', 'Ejecuta ruta rápida, pruebas y producción y entrega evidencia.'],
]

const executiveControls = [
  { title: 'Propiedad y aprobación', detail: 'Cada cambio debe identificar la tabla y el responsable facultado para aprobarla.' },
  { title: 'Consistencia documental', detail: 'FTM-02 y anexos deben conservar coherencia con FTM-01 y la aprobación vigente.' },
  { title: 'Control de alcance', detail: 'Una subsanación que modifica el alcance requiere reaprobación antes de continuar.' },
  { title: 'Evidencia antes de producción', detail: 'La ruta controlada exige evidencia de pruebas y conformidad antes del pase.' },
  { title: 'Trazabilidad de cierre', detail: 'La verificación final y el expediente se formalizan mediante SGD.' },
]

const indicators = [
  ['Solicitudes por ruta', 'Permite observar cuántos cambios siguen ruta rápida versus ruta controlada.'],
  ['Paquetes observados', 'Mide cuántos FTM-02 requieren subsanación antes de ser aceptados.'],
  ['Cambios de alcance', 'Controla solicitudes que requieren reaprobación durante la atención.'],
  ['Pruebas no conformes', 'Identifica iteraciones generadas por evidencias o resultados no conformes.'],
  ['Cierres en SGD', 'Verifica que los cambios concluidos cuenten con expediente formalizado.'],
]

const operationGroups = [
  { title: 'Ruta rápida', items: ['CAMBIO_ESTÁNDAR', 'EJECUCIÓN_DIRECTA'], detail: 'Cambio autorizado que puede aplicarse sin ciclo de pruebas.' },
  { title: 'Ruta con pruebas', items: ['PRUEBA', 'VALIDACIÓN_PJ', 'PRODUCCIÓN'], detail: 'Configuración, evidencia, conformidad y pase controlado.' },
  { title: 'Dato distrital', items: ['VALIDACIÓN_DISTRITAL'], detail: 'Confirmación de fuente, alcance y datos por instancia distrital.' },
  { title: 'Subsanación', items: ['OBSERVACIÓN', 'SUBSANACIÓN'], detail: 'Corrección de FTM-02 y anexos sin perder trazabilidad.' },
  { title: 'Cambio de alcance', items: ['REAPROBACIÓN', 'DENEGACIÓN'], detail: 'Nueva decisión del propietario cuando la corrección cambia el alcance.' },
]

export function ExecutivePresentation({ onOpenDiagram, onOpenPending }: ExecutivePresentationProps) {
  const [activeStep, setActiveStep] = useState(journey[0])
  const [activeScenario, setActiveScenario] = useState(scenarios[0])
  const [activeSummaryPanel, setActiveSummaryPanel] = useState<SummaryPanel | null>(null)
  const toggleSummaryPanel = (panel: SummaryPanel) => setActiveSummaryPanel((current) => current === panel ? null : panel)
  const activeStepDiagramId = activeStep.diagramId

  return (
    <section className="executive-page">
      <div className="executive-hero">
        <div className="executive-hero-copy">
          <span className="eyebrow">Vista gerencial · Modelo BPMN</span>
          <h1>Gestión de tablas maestras</h1>
          <p>
            Lectura ejecutiva del proceso para comprender quién solicita, quién aprueba, cómo se documenta el cambio, qué ruta técnica se ejecuta y cómo se valida y formaliza el cierre.
          </p>
          <div className="executive-actions">
            <button className="primary-action" onClick={() => onOpenDiagram('n0')}><Workflow size={17} /> Ver BPMN integral</button>
            <button className="secondary-action" onClick={onOpenPending}><AlertTriangle size={17} /> Ver pendientes</button>
          </div>
        </div>
        <div className="executive-scoreboard">
          <button type="button" className={activeSummaryPanel === 'steps' ? 'scoreboard-action active' : 'scoreboard-action'} onClick={() => toggleSummaryPanel('steps')} aria-expanded={activeSummaryPanel === 'steps'} aria-controls="executive-summary-panel">
            <strong>{journey.length}</strong><span>pasos de control</span><ChevronDown className="scoreboard-chevron" size={18} />
          </button>
          <button type="button" className={activeSummaryPanel === 'scenarios' ? 'scoreboard-action active' : 'scoreboard-action'} onClick={() => toggleSummaryPanel('scenarios')} aria-expanded={activeSummaryPanel === 'scenarios'} aria-controls="executive-summary-panel">
            <strong>{operationGroups.length}</strong><span>escenarios operativos</span><ChevronDown className="scoreboard-chevron" size={18} />
          </button>
          <button type="button" className={activeSummaryPanel === 'diagrams' ? 'scoreboard-action active' : 'scoreboard-action'} onClick={() => toggleSummaryPanel('diagrams')} aria-expanded={activeSummaryPanel === 'diagrams'} aria-controls="executive-summary-panel">
            <strong>{diagrams.length}</strong><span>diagramas vinculados</span><ChevronDown className="scoreboard-chevron" size={18} />
          </button>
          <button type="button" className={activeSummaryPanel === 'controls' ? 'scoreboard-action active' : 'scoreboard-action'} onClick={() => toggleSummaryPanel('controls')} aria-expanded={activeSummaryPanel === 'controls'} aria-controls="executive-summary-panel">
            <strong>{executiveControls.length}</strong><span>controles críticos</span><ChevronDown className="scoreboard-chevron" size={18} />
          </button>
        </div>
      </div>

      {activeSummaryPanel && (
        <article id="executive-summary-panel" className="summary-detail-panel">
          {activeSummaryPanel === 'steps' && (
            <>
              <div className="summary-panel-heading">
                <GitBranch size={19} />
                <div><h2>Pasos de control</h2><p>Lectura compacta del recorrido del proceso y del actor responsable en cada etapa.</p></div>
              </div>
              <div className="summary-panel-grid steps-grid">
                {journey.map((step) => (
                  <button key={step.id} type="button" className="summary-step-card" onClick={() => step.diagramId && onOpenDiagram(step.diagramId)}>
                    <span>{step.title.split('.')[0]}</span><div><strong>{step.title.replace(/^\d\.\s*/, '')}</strong><small>{step.actor}</small></div><ArrowRight size={14} />
                  </button>
                ))}
              </div>
            </>
          )}

          {activeSummaryPanel === 'scenarios' && (
            <>
              <div className="summary-panel-heading">
                <Database size={19} />
                <div><h2>Mapa de escenarios operativos</h2><p>Identifica las rutas principales de atención y las decisiones técnicas/documentales asociadas al cambio de tablas maestras.</p></div>
              </div>
              <div className="summary-panel-grid scenario-grid">
                {operationGroups.map((group) => (
                  <div key={group.title} className="summary-panel-card">
                    <strong>{group.title}</strong>
                    <div className="summary-tags">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
                    <p>{group.detail}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeSummaryPanel === 'diagrams' && (
            <>
              <div className="summary-panel-heading">
                <Layers3 size={19} />
                <div><h2>Diagramas vinculados</h2><p>Navega directamente por los niveles N0, N1 y N2 del procedimiento.</p></div>
              </div>
              <div className="diagram-summary-grid">
                {(['N0', 'N1', 'N2'] as const).map((level) => (
                  <div key={level} className="diagram-summary-group">
                    <strong>{level}</strong><span>{diagrams.filter((diagram) => diagram.level === level).length} diagramas</span>
                    <div>
                      {diagrams.filter((diagram) => diagram.level === level).map((diagram) => (
                        <button key={diagram.id} type="button" onClick={() => onOpenDiagram(diagram.id)}>{diagram.shortTitle}<ArrowRight size={13} /></button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeSummaryPanel === 'controls' && (
            <>
              <div className="summary-panel-heading">
                <ClipboardCheck size={19} />
                <div><h2>Controles críticos</h2><p>Controles que deben preservarse durante todo el ciclo del cambio.</p></div>
              </div>
              <div className="summary-panel-grid controls-grid">
                {executiveControls.map((control) => (
                  <div key={control.title} className="summary-panel-card control-summary-card">
                    <CheckCircle2 size={16} /><div><strong>{control.title}</strong><p>{control.detail}</p></div>
                  </div>
                ))}
              </div>
            </>
          )}
        </article>
      )}

      <div className="executive-grid">
        <article className="executive-card executive-card-wide">
          <div className="executive-card-heading">
            <PlayCircle size={20} />
            <div>
              <h2>Mensaje central</h2>
              <p>El cambio no llega directamente a producción: se clasifica, aprueba, documenta, ejecuta con la ruta autorizada, valida y cierra con trazabilidad.</p>
            </div>
          </div>
          <div className="executive-message-strip">
            <div><ShieldCheck size={18} /><strong>PJ gobierna el cambio</strong><span>registra, aprueba, valida y formaliza</span></div>
            <ArrowRight size={18} />
            <div><Zap size={18} /><strong>Softplan ejecuta</strong><span>revisa factibilidad, prueba y aplica la modificación</span></div>
            <ArrowRight size={18} />
            <div><Database size={18} /><strong>FTM + SGD trazan</strong><span>conservan alcance, evidencias y cierre</span></div>
          </div>
        </article>

        <article className="executive-card executive-card-wide">
          <div className="executive-card-heading">
            <GitBranch size={20} />
            <div>
              <h2>Recorrido del proceso</h2>
              <p>Siete pasos de control. Selecciona uno para ver actor, decisión y salida esperada.</p>
            </div>
          </div>
          <div className="journey-layout">
            <div className="journey-rail">
              {journey.map((step) => (
                <button key={step.id} className={activeStep.id === step.id ? 'active' : ''} onClick={() => setActiveStep(step)}>
                  <span>{step.title.split('.')[0]}</span>
                  <div style={{ minWidth: 0, textAlign: 'left' }}>
                    <strong style={{ display: 'block' }}>{step.title.replace(/^\d\.\s*/, '')}</strong>
                    <small style={{ display: 'block', marginTop: 4, color: '#6f7e91', fontSize: '11px', lineHeight: 1.25, whiteSpace: 'normal' }}>
                      {step.actor}
                    </small>
                  </div>
                </button>
              ))}
            </div>
            <div className="journey-detail">
              <h3>{activeStep.title}</h3>
              <p>{activeStep.description}</p>
              <div className="decision-box"><UsersRound size={17} /><div><strong>Actor responsable</strong><span>{activeStep.actor}</span></div></div>
              <div className="decision-box"><ListChecks size={17} /><div><strong>Decisión clave</strong><span>{activeStep.decision}</span></div></div>
              <div className="decision-box"><FileCheck2 size={17} /><div><strong>Salida esperada</strong><span>{activeStep.output}</span></div></div>
              {activeStepDiagramId && <button className="link-action" onClick={() => onOpenDiagram(activeStepDiagramId)}>Abrir detalle BPMN <ArrowRight size={15} /></button>}
            </div>
          </div>
        </article>

        <article className="executive-card executive-card-wide">
          <div className="executive-card-heading">
            <Layers3 size={20} />
            <div><h2>Escenarios operativos</h2></div>
          </div>
          <div className="scenario-tabs">
            {scenarios.map((scenario) => <button key={scenario.id} className={activeScenario.id === scenario.id ? 'active' : ''} onClick={() => setActiveScenario(scenario)}>{scenario.title}</button>)}
          </div>
          <div className="scenario-panel">
            <div><span>Disparador</span><strong>{activeScenario.trigger}</strong></div>
            <div><span>Detalle</span><p>{activeScenario.executiveMessage}</p></div>
            <div><span>Resultado esperado</span><p>{activeScenario.result}</p></div>
            {activeScenario.attention && <div className="attention-note"><AlertTriangle size={16} />{activeScenario.attention}</div>}
            <button className="link-action" onClick={() => onOpenDiagram(activeScenario.diagramId)}>Ver BPMN del escenario <ArrowRight size={15} /></button>
          </div>
        </article>

        <article className="executive-card">
          <div className="executive-card-heading"><UsersRound size={20} /><div><h2>Responsabilidades</h2><p>Quién debe mirar qué.</p></div></div>
          <div className="responsibility-list">
            {responsibilityRows.map(([role, duty]) => <div key={role}><strong>{role}</strong><span>{duty}</span></div>)}
          </div>
        </article>

        <article className="executive-card">
          <div className="executive-card-heading"><ClipboardCheck size={20} /><div><h2>Controles críticos</h2><p>No negociables del proceso modelado.</p></div></div>
          <div className="control-list">
            {executiveControls.map((control) => <div key={control.title}><CheckCircle2 size={16} /><div><strong>{control.title}</strong><span>{control.detail}</span></div></div>)}
          </div>
        </article>

        <article className="executive-card">
          <div className="executive-card-heading"><BarChart3 size={20} /><div><h2>Indicadores gerenciales</h2><p>Seguimiento sugerido a partir del BPMN.</p></div></div>
          <div className="indicator-list">
            {indicators.map(([name, detail]) => <div key={name}><strong>{name}</strong><span>{detail}</span></div>)}
          </div>
        </article>

        <article className="executive-card">
          <div className="executive-card-heading"><RefreshCcw size={20} /><div><h2>Pendientes de formalización</h2><p>Propuestas a validar antes de una versión operativa.</p></div></div>
          <div className="pending-mini-list">
            {pendingScenarios.slice(0, 3).map((item) => <div key={item.title}><AlertTriangle size={15} /><span>{item.title}</span></div>)}
          </div>
          <button className="link-action" onClick={onOpenPending}>Revisar todos <ArrowRight size={15} /></button>
        </article>
      </div>

      <div className="executive-footer-note">
        <strong>Alcance:</strong> {procedure.scope}
      </div>
    </section>
  )
}
