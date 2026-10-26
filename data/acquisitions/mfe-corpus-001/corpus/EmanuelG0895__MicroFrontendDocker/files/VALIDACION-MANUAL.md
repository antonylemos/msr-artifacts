# 🧪 Guía de Validación Manual del Proyecto

Esta guía te ayudará a validar que tu proyecto de Module Federation funcione correctamente paso a paso.

## 📋 Checklist de Validación

### ✅ 1. Verificar que Docker esté corriendo

```powershell
# Verificar Docker
docker --version
docker-compose --version
```

**Resultado esperado**: Versiones de Docker y Docker Compose mostradas.

### ✅ 2. Desplegar el proyecto

```powershell
# Desde la raíz del proyecto
docker-compose up --build
```

**Resultado esperado**: 
- Los 4 contenedores se construyen y levantan
- No hay errores de build
- Todos los servicios muestran "Up" en el estado

### ✅ 3. Verificar contenedores corriendo

```powershell
docker-compose ps
```

**Resultado esperado**:
```
Name                    Command               State           Ports
--------------------------------------------------------------------------------
mf-character-detail     ./start.sh                           Up      3002/tcp
mf-characters           ./start.sh                           Up      3001/tcp
mf-shell                ./start.sh                           Up      3000/tcp
nginx                   /docker-entrypoint.sh nginx -g ...   Up      0.0.0.0:80->80/tcp
```

### ✅ 4. Verificar health checks

```powershell
# Health check de nginx
Invoke-WebRequest -Uri "http://localhost/health" -UseBasicParsing
```

**Resultado esperado**: Status 200 OK con mensaje "OK"

### ✅ 5. Verificar endpoints principales

#### 5.1 Aplicación Principal
```powershell
Invoke-WebRequest -Uri "http://localhost" -UseBasicParsing
```

**Resultado esperado**: Status 200 OK, página HTML cargada

#### 5.2 MF-Characters
```powershell
Invoke-WebRequest -Uri "http://localhost/characters" -UseBasicParsing
```

**Resultado esperado**: Status 200 OK, página HTML cargada

#### 5.3 MF-CharacterDetail
```powershell
Invoke-WebRequest -Uri "http://localhost/character-detail" -UseBasicParsing
```

**Resultado esperado**: Status 200 OK, página HTML cargada

### ✅ 6. Verificar logs sin errores

```powershell
# Ver logs de todos los servicios
docker-compose logs

# Ver logs específicos
docker-compose logs nginx
docker-compose logs mf-shell
docker-compose logs mf-characters
docker-compose logs mf-character-detail
```

**Resultado esperado**: 
- ✅ Sin errores críticos
- ✅ Servicios iniciados correctamente
- ✅ Health checks pasando

### ✅ 7. Verificar conectividad entre servicios

```powershell
# Verificar que MF-Shell pueda acceder a otros servicios
$shell_container = docker-compose ps -q mf-shell
docker exec $shell_container curl -f http://mf-characters:3001/health
docker exec $shell_container curl -f http://mf-character-detail:3002/health
```

**Resultado esperado**: Respuestas exitosas de ambos servicios

### ✅ 8. Verificar uso de recursos

```powershell
docker stats --no-stream
```

**Resultado esperado**: 
- ✅ CPU y memoria dentro de límites razonables
- ✅ Sin contenedores con uso excesivo de recursos

## 🌐 Pruebas en el Navegador

### 8.1 Abrir la aplicación principal
1. Abre tu navegador
2. Ve a `http://localhost`
3. **Verifica**: La página carga correctamente

### 8.2 Probar navegación
1. Desde la página principal, navega a la sección de personajes
2. **Verifica**: Los personajes se cargan correctamente
3. Haz clic en un personaje para ver detalles
4. **Verifica**: Los detalles del personaje se muestran

### 8.3 Probar URLs directas
1. Ve directamente a `http://localhost/characters`
2. **Verifica**: La página de personajes carga
3. Ve directamente a `http://localhost/character-detail`
4. **Verifica**: La página de detalles carga

## 🔧 Troubleshooting

### Si hay errores de puerto ocupado:
```powershell
# Ver qué está usando el puerto 80
netstat -ano | findstr :80

# Cambiar puerto en docker-compose.yml
# Cambiar "80:80" por "8080:80"
```

### Si los contenedores no inician:
```powershell
# Ver logs detallados
docker-compose logs --tail=50

# Reconstruir sin cache
docker-compose build --no-cache
docker-compose up
```

### Si hay problemas de red:
```powershell
# Limpiar todo
docker-compose down -v
docker system prune -a
docker-compose up --build
```

### Si health checks fallan:
```powershell
# Verificar que los servicios estén listos
docker-compose ps

# Esperar más tiempo y verificar
Start-Sleep -Seconds 30
docker-compose ps
```

## 📊 Comandos de Monitoreo

### Ver logs en tiempo real:
```powershell
docker-compose logs -f
```

### Ver logs de un servicio específico:
```powershell
docker-compose logs -f mf-shell
```

### Ver estadísticas de recursos:
```powershell
docker stats
```

### Ver información de red:
```powershell
docker network ls
docker network inspect pruebatecnica_mf-network
```

## 🎯 Criterios de Éxito

Tu proyecto está funcionando correctamente si:

1. ✅ **Todos los contenedores están corriendo** (`docker-compose ps` muestra "Up")
2. ✅ **Health checks pasan** (`http://localhost/health` responde OK)
3. ✅ **Todos los endpoints son accesibles** (200 OK en todas las URLs)
4. ✅ **No hay errores críticos en los logs**
5. ✅ **La aplicación funciona en el navegador**
6. ✅ **Module Federation funciona** (los microfrontends se cargan correctamente)
7. ✅ **Los recursos están dentro de límites razonables**

## 🚀 Script de Validación Automática

Para validación automática, ejecuta:

```powershell
# En PowerShell (Windows)
.\validate-project.ps1

# En Bash (Linux/Mac)
./validate-project.sh
```

¡Si todos los puntos están marcados con ✅, tu proyecto está funcionando perfectamente! 🎉 