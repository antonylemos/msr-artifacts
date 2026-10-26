# Prueba Técnica - Microfrontends con Module Federation

Este proyecto implementa una arquitectura de microfrontends utilizando Module Federation con React, TypeScript y Docker.

## 🏗️ Arquitectura del Proyecto

El proyecto está compuesto por los siguientes microfrontends:

- **MF-Shell**: Aplicación principal (puerto 3000)
- **MF-Characters**: Lista de personajes (puerto 3001)
- **MF-CharacterDetail**: Detalles de personajes (puerto 3002)
- **Nginx**: Proxy reverso (puerto 80)

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- [Docker](https://www.docker.com/products/docker-desktop/) (versión 20.10 o superior)
- [Docker Compose](https://docs.docker.com/compose/install/) (incluido con Docker Desktop)
- [Git](https://git-scm.com/) (para clonar el repositorio)

## 🚀 Inicio Rápido

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd PruebaTecnica
```

### 2. Construir las imágenes Docker
```bash
docker-compose build
```

### 3. Iniciar el proyecto
```bash
docker-compose up -d
```

### 4. Acceder a la aplicación
Abre tu navegador y ve a: **http://localhost**

## 📖 Comandos Útiles

### Gestión de Contenedores

```bash
# Iniciar todos los servicios en segundo plano
docker-compose up -d

# Iniciar servicios específicos
docker-compose up -d mf-shell mf-characters

# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f mf-shell

# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v

# Ver estado de los contenedores
docker-compose ps
```

### Construcción de Imágenes

```bash
# Construir todas las imágenes
docker-compose build

# Construir sin caché
docker-compose build --no-cache

# Construir un servicio específico
docker-compose build --no-cache mf-shell

# Reconstruir y reiniciar
docker-compose build --no-cache && docker-compose up -d
```

### Desarrollo

```bash
# Ver logs de desarrollo
docker-compose logs -f

# Reiniciar un servicio específico
docker-compose restart mf-shell

# Ejecutar comandos dentro de un contenedor
docker-compose exec mf-shell sh
```

## 🌐 Puertos y URLs

| Servicio | Puerto | URL | Descripción |
|----------|--------|-----|-------------|
| Nginx | 80 | http://localhost | Proxy reverso principal |
| MF-Shell | 3000 | http://localhost:3000 | Aplicación principal |
| MF-Characters | 3001 | http://localhost:3001 | Lista de personajes |
| MF-CharacterDetail | 3002 | http://localhost:3002 | Detalles de personajes |

## 🔧 Configuración de Module Federation

### MF-Shell (Host)
```typescript
// MF-Shell/module-federation.config.ts
export const mfConfig = {
  name: "MF_Shell",
  remotes: {
    MF_CharacterDetail: "MF_CharacterDetail@http://localhost:3002/remoteEntry.js",
    MF_Characters: "MF_Characters@http://localhost:3001/remoteEntry.js",
  },
  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true },
  },
};
```

### MF-Characters (Remote)
```typescript
// MF-Characters/module-federation.config.ts
export const mfConfig = {
  name: "MF_Characters",
  filename: "remoteEntry.js",
  exposes: {
    "./Vista": "./src/components/vista.tsx",
  },
  shared: ["react", "react-dom"],
};
```

### MF-CharacterDetail (Remote)
```typescript
// MF-CharacterDetail/module-federation.config.ts
export const mfConfig = {
  name: "MF_CharacterDetail",
  filename: "remoteEntry.js",
  exposes: {
    "./CharacterInfo": "./src/components/view.tsx",
    "./View": "./src/components/view.tsx",
  },
  shared: ["react", "react-dom"],
};
```

## 🐛 Solución de Problemas

### Error: "remoteEntryExports is undefined"

**Causa**: Los puertos de Module Federation no coinciden con los puertos reales de los servicios.

**Solución**:
1. Verifica que `MF-Shell/module-federation.config.ts` tenga los puertos correctos
2. Reconstruye el servicio: `docker-compose build --no-cache mf-shell`
3. Reinicia: `docker-compose up -d`

### Error: "Connection refused" en puertos

**Causa**: Los servicios no están iniciados o hay conflictos de puertos.

**Solución**:
1. Verifica que no haya otros servicios usando los puertos 3000, 3001, 3002
2. Detén todos los contenedores: `docker-compose down`
3. Reinicia: `docker-compose up -d`

### Página en blanco

**Causa**: Errores de JavaScript o problemas de carga de módulos.

**Solución**:
1. Abre las herramientas de desarrollador (F12)
2. Revisa la consola para errores
3. Verifica que los archivos `remoteEntry.js` se carguen correctamente:
   - http://localhost:3001/remoteEntry.js
   - http://localhost:3002/remoteEntry.js

### Problemas de permisos en Windows

**Causa**: Problemas con archivos `node_modules` en Docker.

**Solución**:
1. Los archivos `.dockerignore` ya están configurados
2. Si persiste, ejecuta: `docker-compose build --no-cache`

## 📁 Estructura del Proyecto

```
PruebaTecnica/
├── MF-Shell/                 # Aplicación principal
│   ├── src/
│   ├── module-federation.config.ts
│   ├── package.json
│   └── Dockerfile
├── MF-Characters/            # Microfrontend de personajes
│   ├── src/
│   ├── module-federation.config.ts
│   ├── package.json
│   └── Dockerfile
├── MF-CharacterDetail/       # Microfrontend de detalles
│   ├── src/
│   ├── module-federation.config.ts
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml        # Configuración de servicios
├── Dockerfile               # Dockerfile principal
├── nginx.conf               # Configuración de Nginx
├── start.sh                 # Script de inicio
└── README.md               # Este archivo
```

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Rspack
- **Module Federation**: @module-federation/enhanced
- **Package Manager**: pnpm
- **Containerización**: Docker, Docker Compose
- **Proxy Reverso**: Nginx
- **Desarrollo**: Hot reload, TypeScript compilation

## 🔄 Flujo de Desarrollo

1. **Modificar código**: Edita los archivos en los directorios correspondientes
2. **Reconstruir**: `docker-compose build --no-cache <servicio>`
3. **Reiniciar**: `docker-compose up -d`
4. **Probar**: Accede a http://localhost

## 📝 Notas Importantes

- Los servicios están configurados con health checks
- El MF-Shell espera a que los otros microfrontends estén listos antes de iniciar
- Los archivos `.dockerignore` están configurados para optimizar el build
- El proxy Nginx maneja el enrutamiento entre microfrontends

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si encuentras algún problema:

1. Revisa la sección de "Solución de Problemas"
2. Verifica los logs: `docker-compose logs -f`
3. Asegúrate de que todos los prerrequisitos estén instalados
4. Intenta reconstruir las imágenes sin caché

---

**¡Disfruta desarrollando con microfrontends! 🚀** 