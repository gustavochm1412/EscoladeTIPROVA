@echo off
echo 🚀 Iniciando Projeto Completo...

echo 📦 Iniciando Backend...
start "Backend" cmd /k "cd /d C:\Users\gusta\OneDrive\Área de Trabalho\PROVA FINAL\backend && npm run start:dev"

timeout /t 5

echo 🌐 Iniciando Frontend...
start "Frontend" cmd /k "cd /d C:\Users\gusta\OneDrive\Área de Trabalho\PROVA FINAL\frontend && npm run dev"

echo ✅ Projeto iniciado!
echo 🌐 Frontend: http://localhost:5173
echo 🔧 Backend: http://localhost:3000
echo 🗄️ MongoDB: localhost:27017 (já rodando)

pause
