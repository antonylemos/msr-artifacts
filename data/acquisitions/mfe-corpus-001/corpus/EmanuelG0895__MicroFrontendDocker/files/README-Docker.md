# Docker Deployment Guide

Este proyecto está configurado para ser desplegado usando Docker y Docker Compose con **inicio automático de todos los servicios**.

## 🚀 Nueva Configuración

**¡Ahora cuando accedas a cualquier URL, se levantan automáticamente TODOS los servicios!**

## Prerrequisitos

- Docker Desktop instalado
- Docker Compose instalado

## Estructura del Proyecto

El proyecto consiste en tres microfrontends con un **reverse proxy nginx**:

- **Nginx**: Reverse proxy (puerto 80)
- **MF-Shell**: Aplicación principal (puerto interno 3000)
- **MF-Characters**: Microfrontend de lista de personajes (puerto interno 3001)
- **MF-CharacterDetail**: Microfrontend de detalles de personajes (puerto interno 3002)

## 🎯 Comandos de Despliegue

### 1. Construir y ejecutar todos los servicios

```bash
docker-compose up --build
```

### 2. Ejecutar en segundo plano

```bash
docker-compose up -d --build
```

### 3. Detener todos los servicios

```bash
docker-compose down
```

## 🌐 URLs de Acceso

**Todas las URLs ahora acceden a través del puerto 80:**

- **Aplicación Principal**: http://localhost
- **MF-Characters**: http://localhost/characters
- **MF-CharacterDetail**: http://localhost/character-detail
- **Health Check**: http://localhost/health

## ✨ Características Nuevas

### 🔄 Inicio Automático
- Al acceder a **cualquier URL**, se levantan **todos los servicios**
- **Health checks** aseguran que los servicios estén listos
- **Script de inicio** espera a que todos los microfrontends estén disponibles

### 🛡️ Health Checks
- Cada servicio tiene health checks automáticos
- Nginx espera a que todos los servicios estén listos
- Reinicio automático si un servicio falla

### 🔗 Reverse Proxy
- **Nginx** maneja el enrutamiento
- **Una sola URL** para acceder a todo
- **Load balancing** automático

## 📊 Monitoreo

### Ver logs de todos los servicios:
```bash
docker-compose logs -f
```

### Ver logs de un servicio específico:
```bash
docker-compose logs -f nginx
docker-compose logs -f mf-shell
docker-compose logs -f mf-characters
docker-compose logs -f mf-character-detail
```

### Ver estado de los contenedores:
```bash
docker-compose ps
```

## 🔧 Troubleshooting

### Si los puertos están ocupados:
```bash
# Cambiar puerto en docker-compose.yml
ports:
  - "8080:80"  # Cambia 80 por otro puerto
```

### Si hay problemas de red:
```bash
# Limpiar y reconstruir
docker-compose down -v
docker system prune -a
docker-compose up --build
```

### Verificar health checks:
```bash
# Verificar que todos los servicios estén saludables
docker-compose ps
```

## 🚀 Desarrollo

### Modo desarrollo:
```bash
# Con logs en tiempo real
docker-compose up --build

# En segundo plano
docker-compose up -d --build
```

### Reconstruir un servicio específico:
```bash
docker-compose up --build mf-shell
```

## 📈 Ventajas de la Nueva Configuración

1. **✅ Inicio automático**: Un solo comando levanta todo
2. **✅ Health checks**: Servicios se reinician automáticamente
3. **✅ Una URL**: Acceso centralizado a través de nginx
4. **✅ Load balancing**: Distribución automática de carga
5. **✅ Monitoreo**: Logs centralizados y health checks
6. **✅ Escalabilidad**: Fácil agregar más microfrontends

¡Ahora tu aplicación es mucho más robusta y fácil de desplegar! 🎉 