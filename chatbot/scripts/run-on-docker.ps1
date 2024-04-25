$microserviceDir = "C:\Java\Spring\micro-services\java-oracle-chatbot\chatbot"
Set-Location $microserviceDir

# Run mvn clean
Write-Host "Running mvn clean..."
mvn clean

# Check for errors (optional)
if ($LastExitCode -ne 0) {
  Write-Error "Error during mvn clean. Exiting..."
  exit
}

# Run mvn verify
Write-Host "Running mvn verify..."
mvn verify

# Check for errors (optional)
if ($LastExitCode -ne 0) {
  Write-Error "Error during mvn verify. Exiting..."
  exit
}

# Run docker-compose build
Write-Host "Running docker-compose build..."
docker-compose build

# Check for errors (optional)
if ($LastExitCode -ne 0) {
  Write-Error "Error during docker-compose build. Exiting..."
  exit
}

# Run docker-compose up
Write-Host "Starting microservices with docker-compose up..."
docker-compose up

# Keep the console open (optional)
# While (!$host.EOF) {
#   Start-Sleep -Seconds 1
# }
