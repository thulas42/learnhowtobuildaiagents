# OAuth Setup Script for AI Agent Academy
# Run this script to configure Google and GitHub OAuth credentials

Write-Host "=== AI Agent Academy OAuth Setup ===" -ForegroundColor Cyan
Write-Host ""

$envFile = Join-Path $PSScriptRoot "../.env"
$envContent = Get-Content $envFile -Raw

# GitHub OAuth
Write-Host "--- GitHub OAuth ---" -ForegroundColor Green
Write-Host "If you haven't created a GitHub OAuth App yet, visit:"
Write-Host "  https://github.com/settings/applications/new" -ForegroundColor Yellow
Write-Host ""
Write-Host "Use these settings:"
Write-Host "  Application name: AI Agent Academy"
Write-Host "  Homepage URL: http://localhost:3000"
Write-Host "  Authorization callback URL: http://localhost:3000/api/auth/callback/github"
Write-Host ""

$ghClientId = Read-Host "Enter GitHub Client ID (or press Enter to skip)"
$ghClientSecret = Read-Host "Enter GitHub Client Secret (or press Enter to skip)"

if ($ghClientId -and $ghClientSecret) {
    $envContent = $envContent -replace "GITHUB_CLIENT_ID=.*", "GITHUB_CLIENT_ID=$ghClientId"
    $envContent = $envContent -replace "GITHUB_CLIENT_SECRET=.*", "GITHUB_CLIENT_SECRET=$ghClientSecret"
    if ($envContent -notmatch "GITHUB_CLIENT_ID") {
        $envContent += "`nGITHUB_CLIENT_ID=$ghClientId`nGITHUB_CLIENT_SECRET=$ghClientSecret"
    }
    Write-Host "GitHub OAuth configured!" -ForegroundColor Green
}

Write-Host ""

# Google OAuth
Write-Host "--- Google OAuth ---" -ForegroundColor Green
Write-Host "If you haven't created Google OAuth credentials yet, visit:"
Write-Host "  https://console.cloud.google.com/apis/credentials" -ForegroundColor Yellow
Write-Host ""
Write-Host "Create an OAuth 2.0 Client ID with:"
Write-Host "  Application type: Web application"
Write-Host "  Authorized redirect URIs: http://localhost:3000/api/auth/callback/google"
Write-Host ""

$googleClientId = Read-Host "Enter Google Client ID (or press Enter to skip)"
$googleClientSecret = Read-Host "Enter Google Client Secret (or press Enter to skip)"

if ($googleClientId -and $googleClientSecret) {
    $envContent = $envContent -replace "GOOGLE_CLIENT_ID=.*", "GOOGLE_CLIENT_ID=$googleClientId"
    $envContent = $envContent -replace "GOOGLE_CLIENT_SECRET=.*", "GOOGLE_CLIENT_SECRET=$googleClientSecret"
    if ($envContent -notmatch "GOOGLE_CLIENT_ID") {
        $envContent += "`nGOOGLE_CLIENT_ID=$googleClientId`nGOOGLE_CLIENT_SECRET=$googleClientSecret"
    }
    Write-Host "Google OAuth configured!" -ForegroundColor Green
}

# Save
Set-Content $envFile $envContent -NoNewline
Write-Host ""
Write-Host "=== .env file updated! Restart the dev server to apply. ===" -ForegroundColor Cyan
