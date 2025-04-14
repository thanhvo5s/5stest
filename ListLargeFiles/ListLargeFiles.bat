@echo off
set /p MinSizeMB="Input min file size to list (MB): "
PowerShell -NoProfile -ExecutionPolicy Bypass -File "%~dp0ListLargeFiles.ps1" -MinSizeMB %MinSizeMB%
pause