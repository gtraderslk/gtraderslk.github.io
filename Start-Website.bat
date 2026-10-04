@echo off
title G TRADERS - local test server
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
