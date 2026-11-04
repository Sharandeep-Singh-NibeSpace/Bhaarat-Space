# Build a tar of this project for the VPS. node_modules and .next are omitted;
# the server script installs and builds them there.
$ErrorActionPreference = "Stop"
$project = Split-Path -Parent $PSScriptRoot
$out = Join-Path $env:USERPROFILE "Desktop\bharat-space-deploy.tar.gz"
if (Test-Path $out) { Remove-Item -Force $out }

Push-Location $project
try {
  tar --exclude=node_modules --exclude=.next --exclude=.git -czf $out .
} finally {
  Pop-Location
}

Write-Host "Created $out"
Write-Host "Upload it with:"
Write-Host "  scp `"$out`" root@200.97.168.12:/root/bharat-space-deploy.tar.gz"
Write-Host "Then on the server:"
Write-Host "  mkdir -p /tmp/bharat-src"
Write-Host "  tar -xzf /root/bharat-space-deploy.tar.gz -C /tmp/bharat-src"
Write-Host "  bash /tmp/bharat-src/deploy/deploy-bharat.sh"
