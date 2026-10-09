# Gestión de tablas maestras · Presentación dinámica

Sitio web interactivo construido a partir de los BPMN entregados para el procedimiento de **Gestión de tablas maestras – Poder Judicial / Softplan**.

## Alcance de la versión 1.0.0

- Vista **Gerencial** compacta y responsive.
- Vista **BPMN operativo** con navegación N0 → N1 → N2.
- Vista **Mapa** con los 17 diagramas relacionados.
- Vista **Por formalizar** visible, con propuestas de reglas operativas a validar a partir del modelo BPMN.
- Buscador transversal por actividad, rol, código o proceso.
- Navegación automática entre Call Activities usando `calledElement`.
- Cabeceras de pool y lane horizontales para mejorar la lectura de BPMN exportados por Bizagi.
- Diseño responsive para escritorio, tablet y móvil.

## Diagramas incorporados

### N0
- Gestión de tablas maestras – PJ / Softplan.

### N1
- PJ-01 · Registrar y clasificar.
- PJ-01D · Validar dato distrital.
- PJ-02 · Evaluar y aprobar.
- PJ-02R · Reaprobar alcance.
- PJ-03 · Gestionar FTM-02.
- PJ-04 · Validar pruebas.
- PJ-05 · Verificar resultado.
- PJ-06 · Formalizar SGD.
- SP-A · Revisar paquete.
- SP-B · Ejecutar ruta.

### N2
- Preparar documentación FTM-02.
- Subsanar observaciones.
- Verificar pruebas.
- Ejecutar ruta rápida.
- Adecuar y probar.
- Aplicar en producción.

## Ejecutar localmente

```bash
npm ci
npm run dev
```

## Validar build

```bash
npm run build
```

## Despliegue en Vercel

El proyecto incluye `vercel.json`.

- Framework: **Vite**
- Build Command: `npm run build`
- Output Directory: `dist`

También puede desplegarse directamente conectando el repositorio de GitHub en Vercel.

## Actualización de BPMN

Los diagramas se encuentran en:

```text
src/bpmn/
```

Para reemplazar un diagrama manteniendo la navegación:

1. Exportar el BPMN actualizado desde Bizagi.
2. Sustituir el archivo correspondiente en `src/bpmn/`.
3. Si cambia el `process id` usado por una `callActivity`, actualizar `calledElementTargets` en `src/data/catalog.ts`.
4. Ejecutar `npm run build`.
5. Validar que las actividades de llamada sigan abriendo el subproceso correcto.

## Archivos de configuración principales

- `src/data/catalog.ts`: catálogo de diagramas y asociaciones entre procesos.
- `src/data/procedure.ts`: contenido ejecutivo, referencias y aspectos por formalizar.
- `src/components/ExecutivePresentation.tsx`: presentación gerencial.
- `src/components/BpmnViewer.tsx`: visor BPMN y cabeceras de swimlanes.
- `src/lib-bpmn.ts`: lectura y transformación visual del BPMN.

## Nota sobre “Pendientes de formalización”

Los puntos mostrados en esa vista son **propuestas inferidas del modelo BPMN para validación**, no decisiones ya aprobadas. Se mantienen visibles deliberadamente, conforme al requerimiento de esta versión.


## v1.0.1 · Operation Map Panel

Se agregó el panel desplegable **Mapa de escenarios operativos** en la cabecera gerencial. Permite identificar Ruta rápida, Ruta con pruebas, Dato distrital, Subsanación y Cambio de alcance sin revisar todos los BPMN.


## Cambios de versión 1.0.2
- Los cuatro indicadores de la cabecera gerencial son ahora desplegables.
- El panel expandido se alinea al mismo ancho de la vista gerencial y de los demás paneles.
- Cada tarjeta muestra un chevron para indicar que puede abrir/cerrar su detalle.
- Solo un resumen permanece abierto a la vez para conservar una lectura compacta.
