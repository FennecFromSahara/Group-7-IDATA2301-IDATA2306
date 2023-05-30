# IDATA2306 coffeeshop-backend

The backend is a Spring Boot application and contains the code for interacting with the MySQL database and contains API endpoints for communication with the frontend website.

### Requirements

- Java 17 JDK (or newer versions)
- Maven

### Before you run the application

1. Connect to a local MySQL server on port 3306 and create a database called `coffeeshop`. (If you want to connect to a remote MySQL server or another database you need to change the spring.datasource.url in the application.properties file).
2. Go to application.properties and change `YOUR_USERNAME` and `YOUR_PASSWORD` to connect to the MySQL server.
3. Also in application.properties, change the `JWT_SECRET_KEY` to something different, the jwt_secret_key is used to sign JSON Web Tokens (JWTs) for authentication and should not be shared.

### How to run the application

Go to the coffeeshop-backend directory, open the command prompt and run the command: `mvn spring-boot:run`
