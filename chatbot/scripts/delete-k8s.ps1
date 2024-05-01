$k8sDir="C:\Java\Spring\micro-services\java-oracle-chatbot\chatbot\k8s\components"
Set-Location $k8sDir

Write-Host "Deleting minikube"
minikube delete