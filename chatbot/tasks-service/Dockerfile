FROM eclipse-temurin:17.0.5_8-jre-focal AS builder
WORKDIR extracted
ADD ./target/*.jar app.jar
RUN java -Djarmode=layertools -jar app.jar extract

FROM eclipse-temurin:17.0.5_8-jre-focal
WORKDIR application
COPY Wallet_db ./Wallet_db
RUN true
COPY --from=builder extracted/dependencies/ ./
RUN true
COPY --from=builder extracted/spring-boot-loader/ ./
RUN true
COPY --from=builder extracted/snapshot-dependencies/ ./
RUN true
COPY --from=builder extracted/application/ ./

EXPOSE 80
ENTRYPOINT ["java", "org.springframework.boot.loader.launch.JarLauncher"]
