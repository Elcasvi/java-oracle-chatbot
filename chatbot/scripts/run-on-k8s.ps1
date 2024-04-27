$microserviceDir = "C:\Java\Spring\micro-services\java-oracle-chatbot\chatbot"
Set-Location $microserviceDir

Write-Host "Runing mvn clean"
mvn clean
if($LASTEXITCODE -ne 0){
    Write-Error "Error during mvn clean. Exiting..."
    exit
}

Write-Host "Runing mvn verify"
mvn verify
if($LASTEXITCODE -ne 0){
    Write-Error "Error during mvn verify. Exiting..."
    exit
}


$k8sDir="C:\Java\Spring\micro-services\java-oracle-chatbot\chatbot\k8s\components"
Set-Location $k8sDir

Write-Host "context defined as default"
docker context use default

Write-Host "Starting Minikube..."
minikube start --driver=docker
if ($LastExitCode -ne 0) {
    Write-Error "Error starting Minikube. Exiting..."
    exit
}

Write-Host "Setting Docker environment from Minikube..."
minikube -p minikube docker-env | Invoke-Expression

Write-Host "Running docker-compose build"
docker-compose build
if($LASTEXITCODE -ne 0){
    Write-Error "Error during docker-compose build. Exiting..."
    exit
}

# Install microservices with Helm
Write-Host "Installing security-service..."
helm install security-service security

Write-Host "Installing users-service..."
helm install users-service users

Write-Host "Installing tasks-service..."
helm install tasks-service tasks