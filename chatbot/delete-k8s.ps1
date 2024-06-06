#$k8sDir="C:\Java\Spring\micro-services\java-oracle-chatbot\chatbot\k8s\components"
$workingDir = (Get-Location).Path
$K8sDir = (Get-Location).Path + '\k8s\components'
Set-Location $k8sDir

Write-Host "Deleting minikube" -ForegroundColor Blue
minikube delete
Set-Location $workingDir