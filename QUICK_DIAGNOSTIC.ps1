# Quick Diagnostic Script for Website Load Issues

Write-Host "🔍 Running Quick Diagnostic..." -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
Write-Host "1. Checking .env file..." -ForegroundColor Yellow
if (Test-Path .env) {
    Write-Host "   ✅ .env file exists" -ForegroundColor Green
    $envContent = Get-Content .env
    $hasDb = $envContent | Select-String -Pattern "DATABASE_URL"
    $hasAuth = $envContent | Select-String -Pattern "NEXTAUTH"
    if ($hasDb) { Write-Host "   ✅ DATABASE_URL found" -ForegroundColor Green } else { Write-Host "   ❌ DATABASE_URL missing" -ForegroundColor Red }
    if ($hasAuth) { Write-Host "   ✅ NEXTAUTH config found" -ForegroundColor Green } else { Write-Host "   ❌ NEXTAUTH config missing" -ForegroundColor Red }
} else {
    Write-Host "   ❌ .env file missing!" -ForegroundColor Red
}
Write-Host ""

# Check node_modules
Write-Host "2. Checking dependencies..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "   ✅ node_modules exists" -ForegroundColor Green
    if (Test-Path "node_modules/.bin/next") {
        Write-Host "   ✅ Next.js installed" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Next.js not found - run: npm install" -ForegroundColor Red
    }
} else {
    Write-Host "   ❌ node_modules missing - run: npm install" -ForegroundColor Red
}
Write-Host ""

# Check .next folder
Write-Host "3. Checking build cache..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Write-Host "   ✅ .next folder exists" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  .next folder missing (will be created on first build)" -ForegroundColor Yellow
}
Write-Host ""

# Check running Node processes
Write-Host "4. Checking running Node processes..." -ForegroundColor Yellow
$nodeProcesses = Get-Process -Name node -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    Write-Host "   ✅ Node processes running:" -ForegroundColor Green
    $nodeProcesses | ForEach-Object {
        Write-Host "      - PID: $($_.Id) | Memory: $([math]::Round($_.WS/1MB,2)) MB" -ForegroundColor Cyan
    }
} else {
    Write-Host "   ⚠️  No Node processes running" -ForegroundColor Yellow
    Write-Host "   💡 Start server with: npm run dev" -ForegroundColor Cyan
}
Write-Host ""

# Check port 3000
Write-Host "5. Checking port 3000..." -ForegroundColor Yellow
$port3000 = netstat -ano | findstr ":3000"
if ($port3000) {
    Write-Host "   ✅ Port 3000 is in use" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  Port 3000 is not in use" -ForegroundColor Yellow
    Write-Host "   💡 Server might not be running" -ForegroundColor Cyan
}
Write-Host ""

Write-Host "📋 Summary:" -ForegroundColor Cyan
Write-Host "   If everything shows ✅, the server should be working." -ForegroundColor Green
Write-Host "   If you see ❌, fix those issues first." -ForegroundColor Red
Write-Host "   If website still doesn't load, check browser console (F12)" -ForegroundColor Yellow
Write-Host ""


