# Validación del proyecto de Module Federation
Write-Host "🚀 Validando el proyecto de Module Federation..." -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

# Función para imprimir con colores
function Write-Status {
    param(
        [bool]$Success,
        [string]$Message
    )
    if ($Success) {
        Write-Host "✅ $Message" -ForegroundColor Green
    } else {
        Write-Host "❌ $Message" -ForegroundColor Red
    }
}

function Write-Info {
    param([string]$Message)
    Write-Host "ℹ️  $Message" -ForegroundColor Blue
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
}

# 1. Verificar que Docker esté corriendo
Write-Host ""
Write-Info "1. Verificando Docker..."
try {
    docker info | Out-Null
    Write-Status $true "Docker está corriendo"
} catch {
    Write-Status $false "Docker no está corriendo"
    exit 1
}

# 2. Verificar que los contenedores estén corriendo
Write-Host ""
Write-Info "2. Verificando contenedores..."
Start-Sleep -Seconds 10  # Esperar a que los contenedores se inicien

$containers = docker-compose ps
if ($containers -match "Up") {
    Write-Status $true "Contenedores están corriendo"
    Write-Host $containers
} else {
    Write-Status $false "Contenedores no están corriendo"
    Write-Host $containers
}

# 3. Verificar health checks
Write-Host ""
Write-Info "3. Verificando health checks..."
Start-Sleep -Seconds 5

# Verificar nginx
try {
    Invoke-WebRequest -Uri "http://localhost/health" -UseBasicParsing | Out-Null
    Write-Status $true "Nginx health check OK"
} catch {
    Write-Status $false "Nginx health check FAILED"
}

# 4. Verificar endpoints principales
Write-Host ""
Write-Info "4. Verificando endpoints principales..."

# Verificar aplicación principal
try {
    Invoke-WebRequest -Uri "http://localhost" -UseBasicParsing | Out-Null
    Write-Status $true "Aplicación principal (/) accesible"
} catch {
    Write-Status $false "Aplicación principal (/) NO accesible"
}

# Verificar MF-Characters
try {
    Invoke-WebRequest -Uri "http://localhost/characters" -UseBasicParsing | Out-Null
    Write-Status $true "MF-Characters (/characters) accesible"
} catch {
    Write-Status $false "MF-Characters (/characters) NO accesible"
}

# Verificar MF-CharacterDetail
try {
    Invoke-WebRequest -Uri "http://localhost/character-detail" -UseBasicParsing | Out-Null
    Write-Status $true "MF-CharacterDetail (/character-detail) accesible"
} catch {
    Write-Status $false "MF-CharacterDetail (/character-detail) NO accesible"
}

# 5. Verificar logs de errores
Write-Host ""
Write-Info "5. Verificando logs de errores..."

# Verificar logs de nginx
$nginx_logs = docker-compose logs nginx 2>&1
$nginx_errors = ($nginx_logs | Select-String -Pattern "error" -CaseSensitive:$false).Count
if ($nginx_errors -eq 0) {
    Write-Status $true "Nginx sin errores"
} else {
    Write-Warning "Nginx tiene $nginx_errors errores"
    $nginx_logs | Select-String -Pattern "error" -CaseSensitive:$false | Select-Object -Last 5
}

# Verificar logs de MF-Shell
$shell_logs = docker-compose logs mf-shell 2>&1
$shell_errors = ($shell_logs | Select-String -Pattern "error" -CaseSensitive:$false).Count
if ($shell_errors -eq 0) {
    Write-Status $true "MF-Shell sin errores"
} else {
    Write-Warning "MF-Shell tiene $shell_errors errores"
    $shell_logs | Select-String -Pattern "error" -CaseSensitive:$false | Select-Object -Last 5
}

# Verificar logs de MF-Characters
$characters_logs = docker-compose logs mf-characters 2>&1
$characters_errors = ($characters_logs | Select-String -Pattern "error" -CaseSensitive:$false).Count
if ($characters_errors -eq 0) {
    Write-Status $true "MF-Characters sin errores"
} else {
    Write-Warning "MF-Characters tiene $characters_errors errores"
    $characters_logs | Select-String -Pattern "error" -CaseSensitive:$false | Select-Object -Last 5
}

# Verificar logs de MF-CharacterDetail
$detail_logs = docker-compose logs mf-character-detail 2>&1
$detail_errors = ($detail_logs | Select-String -Pattern "error" -CaseSensitive:$false).Count
if ($detail_errors -eq 0) {
    Write-Status $true "MF-CharacterDetail sin errores"
} else {
    Write-Warning "MF-CharacterDetail tiene $detail_errors errores"
    $detail_logs | Select-String -Pattern "error" -CaseSensitive:$false | Select-Object -Last 5
}

# 6. Verificar conectividad entre servicios
Write-Host ""
Write-Info "6. Verificando conectividad entre servicios..."

# Verificar que MF-Shell pueda acceder a MF-Characters
try {
    $shell_container = docker-compose ps -q mf-shell
    docker exec $shell_container curl -f http://mf-characters:3001/health | Out-Null
    Write-Status $true "MF-Shell puede acceder a MF-Characters"
} catch {
    Write-Status $false "MF-Shell NO puede acceder a MF-Characters"
}

# Verificar que MF-Shell pueda acceder a MF-CharacterDetail
try {
    $shell_container = docker-compose ps -q mf-shell
    docker exec $shell_container curl -f http://mf-character-detail:3002/health | Out-Null
    Write-Status $true "MF-Shell puede acceder a MF-CharacterDetail"
} catch {
    Write-Status $false "MF-Shell NO puede acceder a MF-CharacterDetail"
}

# 7. Verificar uso de recursos
Write-Host ""
Write-Info "7. Verificando uso de recursos..."
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}"

# 8. Resumen final
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Info "RESUMEN DE VALIDACION"
Write-Host "================================================" -ForegroundColor Cyan

Write-Host ""
Write-Info "URLs de acceso:"
Write-Host "  🌐 Aplicación Principal: http://localhost" -ForegroundColor White
Write-Host "  👥 MF-Characters: http://localhost/characters" -ForegroundColor White
Write-Host "  👤 MF-CharacterDetail: http://localhost/character-detail" -ForegroundColor White
Write-Host "  ❤️  Health Check: http://localhost/health" -ForegroundColor White

Write-Host ""
Write-Info "Comandos útiles:"
Write-Host "  📊 Ver logs: docker-compose logs -f" -ForegroundColor White
Write-Host "  🛑 Detener: docker-compose down" -ForegroundColor White
Write-Host "  🔄 Reiniciar: docker-compose restart" -ForegroundColor White
Write-Host "  📈 Estadísticas: docker stats" -ForegroundColor White

Write-Host ""
Write-Info "Validación completada! 🎉" 