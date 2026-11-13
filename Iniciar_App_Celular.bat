@echo off
title Servidor GlowUp - Acesso pelo Celular
echo ===================================================
echo Iniciando o GlowUp App para acesso no Celular...
echo ===================================================
cd backend
if not exist "node_modules" (
    echo Instalando dependencias pela primeira vez...
    call npm install
)
node server.js
pause
