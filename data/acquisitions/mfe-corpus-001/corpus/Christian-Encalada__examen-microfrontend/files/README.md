# Sistema de Alertas Académicas - Arquitectura Microfrontend

Este proyecto implementa un sistema de alertas académicas utilizando una arquitectura de microfrontends con Module Federation.

## Estructura del Proyecto

- **Host (appclases)**: Aplicación contenedora que carga los microfrontends
  - Puerto: 3000
- **AlertSender**: Microfrontend para enviar alertas académicas
  - Puerto: 3001
- **AlertDashboard**: Microfrontend para mostrar las alertas activas
  - Puerto: 3002

## Características

- ✅ Arquitectura microfrontend con Module Federation
- ✅ Estilos encapsulados con styled-components
- ✅ Comunicación desacoplada mediante CustomEvent del DOM
- ✅ Cada microfrontend funciona de forma independiente

## Instalación

### 1. Instalar dependencias del Host

```bash
npm install
```

### 2. Instalar dependencias de AlertSender

```bash
cd alert-sender
npm install
cd ..
```

### 3. Instalar dependencias de AlertDashboard

```bash
cd alert-dashboard
npm install
cd ..
```

## Ejecución

Para ejecutar el sistema completo, necesitas iniciar los tres servicios en terminales separadas:

### Terminal 1 - Host (Puerto 3000)
```bash
npm start
```

### Terminal 2 - AlertSender (Puerto 3001)
```bash
cd alert-sender
npm start
```

### Terminal 3 - AlertDashboard (Puerto 3002)
```bash
cd alert-dashboard
npm start
```

Luego, abre tu navegador en `http://localhost:3000` para ver la aplicación completa.

## Funcionalidad

### AlertSender
- Permite enviar tres tipos de alertas:
  - **Examen**: Alerta sobre exámenes programados (color azul)
  - **Tarea**: Alerta sobre nuevas tareas (color verde)
  - **Clase Cancelada**: Alerta sobre cancelaciones (color rojo)

### AlertDashboard
- Escucha las alertas enviadas desde AlertSender
- Muestra la alerta activa con el estilo correspondiente según el tipo
- Actualización en tiempo real mediante eventos del DOM

## Comunicación Desacoplada

La comunicación entre microfrontends se realiza mediante `CustomEvent` del DOM:

- **AlertSender** emite eventos `academic-alert` con los detalles de la alerta
- **AlertDashboard** escucha estos eventos y actualiza su estado
- No hay dependencias directas entre los microfrontends

## Tecnologías Utilizadas

- React 19
- TypeScript
- Rspack
- Module Federation Enhanced
- Styled Components
- CustomEvent API (para comunicación)

## Notas

- Asegúrate de que todos los servicios estén ejecutándose antes de usar la aplicación
- Los microfrontends deben compilarse correctamente para que Module Federation funcione
- Los estilos están completamente encapsulados usando styled-components
