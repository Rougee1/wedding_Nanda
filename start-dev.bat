@echo off
title Wedding Nanda - Next.js
cd /d "%~dp0"

REM Sur Windows, le surveillant de fichiers peut parfois faire planter le dev server.
REM Si "npm run dev" s'arrete tout seul, essayez: npm run dev:poll

echo Demarrage de Next.js...
call npm run dev

echo.
echo Le serveur s'est arrete (code %ERRORLEVEL%).
pause
