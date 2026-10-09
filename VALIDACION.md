# Validación · Gestión de tablas maestras v1.0.0

## Resultado

La estructura del proyecto y los BPMN fueron revisados antes de empaquetar la versión.

### BPMN

- 17 archivos BPMN incorporados.
- Todos los archivos pudieron parsearse como XML válido.
- Se identificaron 54 actividades/tareas/call activities.
- Se identificaron 17 gateways.
- Se identificaron 6 roles/carriles principales.
- Las 16 Call Activities con `calledElement` apuntan a procesos existentes dentro del catálogo entregado.
- Las 16 asociaciones están registradas en `calledElementTargets` para navegación directa en la aplicación.

### Código

- Se adaptó `catalog.ts` a Gestión de tablas maestras.
- Se adaptó `procedure.ts` al contenido soportado por los BPMN.
- Se creó una vista gerencial específica para el nuevo proceso.
- Se mantiene visible el panel **Pendientes de formalización**.
- Se actualizó el buscador y la identidad del sitio.
- Se conservan las mejoras visuales de pools/lanes de la versión base de Gestión de licencias.
- Validación TypeScript realizada con stubs locales y `tsc 5.8.3`: sin errores en los archivos fuente del proyecto.

### Build con dependencias reales

Se intentó ejecutar `npm ci`, pero el acceso al registro npm agotó el tiempo disponible en este entorno y dejó una instalación incompleta. Por ello no se declara un `npm run build` real como exitoso aquí.

En un entorno con acceso normal a npm, validar con:

```bash
npm ci
npm run build
```

Configuración de Vercel incluida:

```text
Framework: Vite
Build Command: npm run build
Output Directory: dist
```
