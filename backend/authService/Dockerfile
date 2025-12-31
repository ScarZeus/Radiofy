FROM ubuntu:latest
LABEL authors="K KEVIN GLADSON"
RUN apt-get update && \
    apt-get install -y openjdk && \
    apt-get clean

WORKDIR /app

COPY /build/libs/authService-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java","-jar","app.jar"]