#!/bin/bash

echo "🚀 Validando el proyecto de Module Federation..."
echo "================================================"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir con colores
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
    fi
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# 1. Verificar que Docker esté corriendo
echo ""
print_info "1. Verificando Docker..."
if docker info > /dev/null 2>&1; then
    print_status 0 "Docker está corriendo"
else
    print_status 1 "Docker no está corriendo"
    exit 1
fi

# 2. Verificar que los contenedores estén corriendo
echo ""
print_info "2. Verificando contenedores..."
sleep 10  # Esperar a que los contenedores se inicien

if docker-compose ps | grep -q "Up"; then
    print_status 0 "Contenedores están corriendo"
    docker-compose ps
else
    print_status 1 "Contenedores no están corriendo"
    docker-compose ps
fi

# 3. Verificar health checks
echo ""
print_info "3. Verificando health checks..."
sleep 5

# Verificar nginx
if curl -f http://localhost/health > /dev/null 2>&1; then
    print_status 0 "Nginx health check OK"
else
    print_status 1 "Nginx health check FAILED"
fi

# 4. Verificar endpoints principales
echo ""
print_info "4. Verificando endpoints principales..."

# Verificar aplicación principal
if curl -f http://localhost > /dev/null 2>&1; then
    print_status 0 "Aplicación principal (/) accesible"
else
    print_status 1 "Aplicación principal (/) NO accesible"
fi

# Verificar MF-Characters
if curl -f http://localhost/characters > /dev/null 2>&1; then
    print_status 0 "MF-Characters (/characters) accesible"
else
    print_status 1 "MF-Characters (/characters) NO accesible"
fi

# Verificar MF-CharacterDetail
if curl -f http://localhost/character-detail > /dev/null 2>&1; then
    print_status 0 "MF-CharacterDetail (/character-detail) accesible"
else
    print_status 1 "MF-CharacterDetail (/character-detail) NO accesible"
fi

# 5. Verificar logs de errores
echo ""
print_info "5. Verificando logs de errores..."

# Verificar logs de nginx
nginx_errors=$(docker-compose logs nginx 2>&1 | grep -i "error" | wc -l)
if [ $nginx_errors -eq 0 ]; then
    print_status 0 "Nginx sin errores"
else
    print_warning "Nginx tiene $nginx_errors errores"
    docker-compose logs nginx | grep -i "error" | tail -5
fi

# Verificar logs de MF-Shell
shell_errors=$(docker-compose logs mf-shell 2>&1 | grep -i "error" | wc -l)
if [ $shell_errors -eq 0 ]; then
    print_status 0 "MF-Shell sin errores"
else
    print_warning "MF-Shell tiene $shell_errors errores"
    docker-compose logs mf-shell | grep -i "error" | tail -5
fi

# Verificar logs de MF-Characters
characters_errors=$(docker-compose logs mf-characters 2>&1 | grep -i "error" | wc -l)
if [ $characters_errors -eq 0 ]; then
    print_status 0 "MF-Characters sin errores"
else
    print_warning "MF-Characters tiene $characters_errors errores"
    docker-compose logs mf-characters | grep -i "error" | tail -5
fi

# Verificar logs de MF-CharacterDetail
detail_errors=$(docker-compose logs mf-character-detail 2>&1 | grep -i "error" | wc -l)
if [ $detail_errors -eq 0 ]; then
    print_status 0 "MF-CharacterDetail sin errores"
else
    print_warning "MF-CharacterDetail tiene $detail_errors errores"
    docker-compose logs mf-character-detail | grep -i "error" | tail -5
fi

# 6. Verificar conectividad entre servicios
echo ""
print_info "6. Verificando conectividad entre servicios..."

# Verificar que MF-Shell pueda acceder a MF-Characters
if docker exec $(docker-compose ps -q mf-shell) curl -f http://mf-characters:3001/health > /dev/null 2>&1; then
    print_status 0 "MF-Shell puede acceder a MF-Characters"
else
    print_status 1 "MF-Shell NO puede acceder a MF-Characters"
fi

# Verificar que MF-Shell pueda acceder a MF-CharacterDetail
if docker exec $(docker-compose ps -q mf-shell) curl -f http://mf-character-detail:3002/health > /dev/null 2>&1; then
    print_status 0 "MF-Shell puede acceder a MF-CharacterDetail"
else
    print_status 1 "MF-Shell NO puede acceder a MF-CharacterDetail"
fi

# 7. Verificar uso de recursos
echo ""
print_info "7. Verificando uso de recursos..."
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}"

# 8. Resumen final
echo ""
echo "================================================"
print_info "RESUMEN DE VALIDACIÓN"
echo "================================================"

echo ""
print_info "URLs de acceso:"
echo "  🌐 Aplicación Principal: http://localhost"
echo "  👥 MF-Characters: http://localhost/characters"
echo "  👤 MF-CharacterDetail: http://localhost/character-detail"
echo "  ❤️  Health Check: http://localhost/health"

echo ""
print_info "Comandos útiles:"
echo "  📊 Ver logs: docker-compose logs -f"
echo "  🛑 Detener: docker-compose down"
echo "  🔄 Reiniciar: docker-compose restart"
echo "  📈 Estadísticas: docker stats"

echo ""
print_info "Validación completada! 🎉" 