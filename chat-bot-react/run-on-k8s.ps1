$workspace_dir=(Get-Location).Path
Set-Location $workspace_dir
Write-Host "Working on "+ $workspace_dir

Write-Host "Build docker file" -ForeGroundColor Blue
docker build -t ui-service .
if($LastExitCode -ne 0){
    Write-Error "Error during docker build. Exiting..."
    exit
}

# Install microservices with Helm
$k8s_dir = "$workspace_dir/k8s/components"
Set-Location $k8s_dir
Write-Host "Installing UI-service..." -ForegroundColor Green
helm install ui-service ui