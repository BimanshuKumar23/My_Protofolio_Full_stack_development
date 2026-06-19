FROM openjdk:17
WORKDIR /app
COPY NQueensServer.java .
RUN javac NQueensServer.java
EXPOSE 8080
CMD ["java", "backend.NQueensServer"]
