# Clean Restart Script - Fix Website Load Issues

Write-Host "🔄 Starting Clean Restart..." -ForegroundColor Cyan
Write-Host ""

# Step 1: Stop all Node processes
Write-Host "1. Stopping all Node processes..." -ForegroundColor Yellow
$nodeProcesses = Get-Process -Name node -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    $nodeProcesses | Stop-Process -Force
    Write-Host "   ✅ Stopped $($nodeProcesses.Count) Node process(es)" -ForegroundColor Green
} else {
    Write-Host "   ℹ️  No Node processes running" -ForegroundColor Cyan
}
Write-Host ""

# Step 2: Clear Next.js cache
Write-Host "2. Clearing Next.js cache..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Recurse -Force .next
    Write-Host "   ✅ Cleared .next cache" -ForegroundColor Green
} else {
    Write-Host "   ℹ️  No cache to clear" -ForegroundColor Cyan
}
Write-Host ""

# Step 3: Wait a moment
Write-Host "3. Waiting 2 seconds..." -ForegroundColor Yellow
Start-Sleep -Seconds 2
Write-Host ""

# Step 4: Start server
Write-Host "4. Starting development server..." -ForegroundColor Yellow
Write-Host "   💡 Server will start in background" -ForegroundColor Cyan
Write-Host "   💡 Wait 30-60 seconds for compilation" -ForegroundColor Cyan
Write-Host "   💡 Then visit: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev"

Write-Host "✅ Clean restart complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "   1. Wait 30-60 seconds for server to compile" -ForegroundColor White
Write-Host "   2. Open http://localhost:3000 in browser" -ForegroundColor White
Write-Host "   3. Press Ctrl+Shift+R for hard refresh" -ForegroundColor White
Write-Host ""


