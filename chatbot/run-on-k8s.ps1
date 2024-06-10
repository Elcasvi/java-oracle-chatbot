#$microserviceDir = "C:\Java\Spring\micro-services\java-oracle-chatbot\chatbot"
$workingDir=(Get-Location).Path
$microserviceDir = (Get-Location).Path
Set-Location $microserviceDir

Write-Host "Runing mvn clean" -ForegroundColor Blue
mvn clean
if($LastExitCode -ne 0){
    Write-Error "Error during mvn clean. Exiting..."
    exit
}

Write-Host "Runing mvn verify" -ForegroundColor Blue
mvn verify
if($LastExitCode -ne 0){
    Write-Error "Error during mvn verify. Exiting..."
    exit
}


#$k8sDir="C:\Java\Spring\micro-services\java-oracle-chatbot\chatbot\k8s\components"
$K8sDir = (Get-Location).Path + '\k8s\components'
Set-Location $k8sDir

Write-Host "context defined as default" -ForegroundColor Blue
docker context use default

Write-Host "Starting Minikube..." -ForegroundColor Blue
minikube start --driver=docker
if ($LastExitCode -ne 0) {
    Write-Error "Error starting Minikube. Exiting..." -ForegroundColor Blue
    exit
}

Write-Host "Setting Docker environment from Minikube..." -ForegroundColor Blue
minikube -p minikube docker-env | Invoke-Expression

Write-Host "Running docker-compose build"
docker-compose build
if($LastExitCode -ne 0){
    Write-Error "Error during docker-compose build. Exiting..."
    exit
}

# Install microservices with Helm
Write-Host "Installing security-service..." -ForegroundColor Green
helm install security-service security

Write-Host "Installing users-service..." -ForegroundColor Green
helm install users-service users

Write-Host "Installing tasks-service..." -ForegroundColor Green
helm install tasks-service tasks
Set-Location $workingDir