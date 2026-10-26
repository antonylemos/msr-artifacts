# Aplicación Host - Rick and Morty Browser

Una aplicación moderna de React construida con TypeScript, Vite y Tailwind CSS, que implementa arquitectura de micro-frontends mediante Module Federation. Esta aplicación actúa como el **host principal** que integra módulos remotos y proporciona un explorador completo de personajes de Rick and Morty.

## 📋 Tabla de Contenidos

- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#️-instalación)
- [Ejecución](#️-ejecución)
- [Arquitectura](#-arquitectura)
- [Dependencias](#-dependencias)
- [Testing](#-testing)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Características](#-características)
- [Tecnologías](#-tecnologías)

## 🔧 Requisitos Previos

- **Node.js** v16 o superior
- **npm** v7 o superior (o yarn)
- **Aplicación Remote** corriendo en el puerto configurado (requerido para Module Federation)

## 🛠️ Instalación

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>

# 2. Navegar al directorio del proyecto
cd host

# 3. Instalar dependencias
npm install
```

## 🚀 Ejecución

### Modo Desarrollo

**IMPORTANTE:** Esta aplicación requiere que el micro-frontend remoto esté corriendo primero.

```bash
# 1. Primero, iniciar la aplicación remota (en otra terminal)
cd ../remote
npm run dev

# 2. Luego, iniciar la aplicación host
cd ../host
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

### Compilar para Producción

```bash
# Compilar el proyecto
npm run build

# Previsualizar la compilación de producción
npm run preview
```

### Verificar Código

```bash
# Ejecutar ESLint
npm run lint
```

## 🏗️ Arquitectura

### Arquitectura de Micro-Frontends

Este proyecto implementa una arquitectura de **Module Federation** utilizando `@originjs/vite-plugin-federation`:

```
┌─────────────────────────────────────────┐
│          HOST APPLICATION               │
│         (Este Proyecto)                 │
│                                         │
│  ┌────────────────────────────────┐   │
│  │    React Router (BrowserRouter) │   │
│  │                                  │   │
│  │  ┌──────────┐   ┌────────────┐ │   │
│  │  │  Home    │   │  Episodes  │ │   │
│  │  │  Page    │   │  List      │ │   │
│  │  └──────────┘   └────────────┘ │   │
│  │                                  │   │
│  │  ┌──────────────────────────┐  │   │
│  │  │   Module Federation       │  │   │
│  │  │   Carga módulos remotos   │  │   │
│  │  └──────────────────────────┘  │   │
│  └────────────────────────────────┘   │
│                                         │
│  ┌────────────────────────────────┐   │
│  │   Zustand Store (Favoritos)    │   │
│  └────────────────────────────────┘   │
└─────────────────────────────────────────┘
                    ↓
         ┌──────────────────────┐
         │   REMOTE MODULE      │
         │   (Micro-frontend)   │
         └──────────────────────┘
```

### Estructura de Capas

```
┌──────────────────────────────────────┐
│     Presentation Layer               │
│  (Components, Pages, Routing)        │
├──────────────────────────────────────┤
│     Business Logic Layer             │
│  (Hooks, Utils, Filters)             │
├──────────────────────────────────────┤
│     State Management Layer           │
│  (Zustand Store)                     │
├──────────────────────────────────────┤
│     Data Layer                       │
│  (API Calls, External Services)      │
└──────────────────────────────────────┘
```

### Flujo de Datos

```
Usuario Interactúa
      ↓
Componentes React
      ↓
Custom Hooks (useCharacters)
      ↓
Funciones de Utilidad (filterCharacters)
      ↓
Zustand Store (Gestión de Estado)
      ↓
Actualización de UI
```

## 📦 Dependencias

### Dependencias de Producción

```json
{
  "react": "^18.3.1",              // Biblioteca UI principal
  "react-dom": "^18.3.1",          // Renderizado de React para web
  "react-router": "^7.1.1",        // Enrutamiento del lado del cliente
  "zustand": "^5.0.2"              // Gestión de estado ligera
}
```

### Dependencias de Desarrollo

```json
{
  "@vitejs/plugin-react": "^4.3.4",              // Plugin React para Vite
  "vite": "^6.0.1",                              // Herramienta de build
  "typescript": "~5.6.2",                        // Superset tipado de JavaScript
  "@originjs/vite-plugin-federation": "^1.3.6",  // Module Federation
  "tailwindcss": "^3.4.17",                      // Framework CSS
  "postcss": "^8.4.49",                          // Procesador CSS
  "autoprefixer": "^10.4.20",                    // Prefijos CSS automáticos
  "eslint": "^9.15.0",                           // Linter de JavaScript
  "@eslint/js": "^9.15.0",                       // Configuración base ESLint
  "typescript-eslint": "^8.15.0",                // ESLint para TypeScript
  "eslint-plugin-react-hooks": "^5.0.0",         // Reglas ESLint para hooks
  "eslint-plugin-react-refresh": "^0.4.14"       // Reglas ESLint para Fast Refresh
}
```

### APIs Externas

- **Rick and Morty API**: `https://rickandmortyapi.com/api`
  - Endpoint de personajes: `/character`
  - Filtros soportados: status, species, gender

## 🧪 Testing

### Configurar Tests (Pendiente)

Este proyecto actualmente no tiene tests configurados. Para agregar testing, se recomienda:

```bash
# Instalar dependencias de testing
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom

# Crear script en package.json
# "test": "vitest"
# "test:ui": "vitest --ui"
# "test:coverage": "vitest --coverage"
```

### Estructura de Tests Recomendada

```
src/
├── __tests__/
│   ├── components/
│   │   ├── CharacterGrid.test.tsx
│   │   └── FilterModal.test.tsx
│   ├── hooks/
│   │   └── useCharacters.test.ts
│   └── utils/
│       └── filterCharacters.test.ts
└── features/
    └── episodes_list/
        └── __tests__/
            └── ListEpisodes.test.tsx
```

### Ejecutar Tests (Una vez configurado)

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm test -- --watch

# Ejecutar tests con cobertura
npm run test:coverage
```

## 📁 Estructura del Proyecto

```
host/
├── public/                          # Archivos estáticos
├── src/
│   ├── assets/                      # Recursos (imágenes, fuentes)
│   ├── features/                    # Módulos por característica
│   │   ├── episodes_list/          # Feature: Listado de episodios
│   │   │   ├── components/         # Componentes específicos
│   │   │   │   ├── AppliedFilters.tsx      # Muestra filtros aplicados
│   │   │   │   ├── CharacterCount.tsx      # Contador de personajes
│   │   │   │   ├── CharacterGrid.tsx       # Grid de personajes
│   │   │   │   ├── ClearFiltersButton.tsx  # Botón limpiar filtros
│   │   │   │   ├── CustomTabs.tsx          # Sistema de pestañas
│   │   │   │   ├── EmptyState.tsx          # Estado vacío
│   │   │   │   ├── FilterModal.tsx         # Modal de filtros
│   │   │   │   └── TabPanel.tsx            # Panel de pestaña
│   │   │   ├── hooks/              # Hooks personalizados
│   │   │   │   └── useCharacters.ts        # Hook para gestión de personajes
│   │   │   ├── utils/              # Utilidades
│   │   │   │   └── filterCharacters.ts     # Lógica de filtrado
│   │   │   └── ListEpisodes.tsx    # Componente principal
│   │   └── home/                   # Feature: Página de inicio
│   │       └── Home.tsx            # Componente de inicio
│   ├── shared/                     # Código compartido
│   │   ├── components/             # Componentes reutilizables
│   │   │   ├── Footer.tsx          # Pie de página
│   │   │   ├── Header.tsx          # Encabezado
│   │   │   └── Layout.tsx          # Layout principal
│   │   └── types/                  # Definiciones de tipos TypeScript
│   ├── store/                      # Gestión de estado global
│   │   ├── favoritesStore.ts       # Store de favoritos (Zustand)
│   │   └── index.ts                # Exportaciones del store
│   ├── App.css                     # Estilos del componente App
│   ├── App.tsx                     # Componente raíz
│   ├── declare.d.ts                # Declaraciones de tipos globales
│   ├── index.css                   # Estilos globales + Tailwind
│   └── main.tsx                    # Punto de entrada
├── .gitignore                      # Archivos ignorados por Git
├── eslint.config.js                # Configuración ESLint
├── index.html                      # HTML principal
├── package.json                    # Dependencias y scripts
├── postcss.config.cjs              # Configuración PostCSS
├── README.md                       # Este archivo
├── tailwind.config.js              # Configuración Tailwind CSS
├── tsconfig.json                   # Configuración TypeScript base
├── tsconfig.app.json               # Config TypeScript para app
├── tsconfig.node.json              # Config TypeScript para Vite
└── vite.config.ts                  # Configuración Vite + Module Federation
```

## 🎯 Características

### 1. Explorador de Personajes
- **Visualización en Grid**: Muestra personajes en una cuadrícula responsive
- **Búsqueda**: Buscar personajes por nombre
- **Filtrado Avanzado**: Filtrar por:
  - Estado (Vivo, Muerto, Desconocido)
  - Especie (Humano, Alien, etc.)
  - Género (Masculino, Femenino, Sin género, Desconocido)
- **Contador**: Visualiza el total de personajes encontrados
- **Sistema de Favoritos**: Guardar personajes favoritos

### 2. Navegación por Pestañas
- Navegación fluida entre secciones
- Interfaz de pestañas personalizable

### 3. Gestión de Estado
- **Zustand Store**: Estado global ligero para favoritos
- **Persistencia**: Los favoritos se mantienen entre sesiones

### 4. Module Federation
- Carga dinámica de módulos remotos
- Arquitectura escalable de micro-frontends

## 💻 Tecnologías

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| React | 18.3.1 | Framework UI |
| TypeScript | 5.6.2 | Tipado estático |
| Vite | 6.0.1 | Build tool y dev server |
| Tailwind CSS | 3.4.17 | Framework de estilos |
| React Router | 7.1.1 | Enrutamiento |
| Zustand | 5.0.2 | Gestión de estado |
| ESLint | 9.15.0 | Linter de código |

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo (puerto 5173)

# Producción
npm run build        # Compila para producción
npm run preview      # Previsualiza build de producción

# Calidad de código
npm run lint         # Ejecuta ESLint
```

## 🔗 Module Federation

### Configuración

La configuración de Module Federation se encuentra en `vite.config.ts`:

```typescript
federation({
  name: 'host',
  remotes: {
    remote_root: 'http://localhost:5174/assets/remoteEntry.js'
  },
  shared: ['react', 'react-dom']
})
```

### Módulos Remotos

Esta aplicación consume módulos desde:
- **remote_root**: Micro-frontend remoto (puerto 5174)

## 🐛 Resolución de Problemas

### Error: Remote module no cargado
```bash
# Asegúrate de que la aplicación remota esté corriendo
cd ../remote
npm run dev
```

### Error: Puerto en uso
```bash
# Cambia el puerto en vite.config.ts
server: {
  port: 5173  // Cambiar a otro puerto disponible
}
```


Desarrollado con ❤️ usando React, TypeScript, Vite y Tailwind CSS