# JWT-DEMO Spring Boot Project

## Project Overview
This JWT-DEMO project showcases how to implement JSON Web Tokens (JWT) in a Spring Boot application. The main aim is to provide authentication and authorization mechanisms using JWT.

### Screenshot (Conduct / Output)
![Experiment 9 Screenshot](https://github.com/Nischaya008/Full_Stack_II_CU/blob/main/Conduct%20Screenshots/9.1.png?raw=true)

## Features
- Secure your APIs using JWT
- User authentication and role-based access control
- Complete CRUD operations
- Example of protecting endpoints with roles

## Prerequisites
- Java 11 or higher
- Spring Boot 2.5.x or higher
- Maven for dependency management
- Postman or any API testing tool

## Project Structure
```
JWT-DEMO/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── example/
│   │   │           └── jwt_demo/
│   │   │               ├── config/
│   │   │               ├── controller/
│   │   │               ├── model/
│   │   │               ├── repository/
│   │   │               └── service/
│   │   └── resources/
│   │       ├── application.properties
│   │       └── static/
│   └── test/
├── pom.xml
└── README.md
```

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Nischaya008/Full_Stack_II_CU.git
   cd Full_Stack_II_CU/Exp-9/JWT-DEMO
   ```
2. Install dependencies:
   ```bash
   mvn install
   ```

## Configuration
- Update the `application.properties` with your database configurations.
- Ensure to have JWT secret key set for signing the token.

## API Endpoints
- **POST** `/api/auth/login` - Authenticate user and return JWT token.
- **GET** `/api/users` - Get a list of users (requires `ADMIN` role).
- **GET** `/api/users/{id}` - Get user by ID (requires `USER` role).

## Usage Instructions
1. Start the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
2. Use Postman to test the API endpoints. For login, use:
   - URL: `http://localhost:8080/api/auth/login`
   - Method: `POST`
   - Body:  
     ```json
     {"username": "your_username", "password": "your_password"}
     ```
3. Include the received JWT token in the header for protected routes:
   - Key: `Authorization`
   - Value: `Bearer YOUR_JWT_TOKEN`

---

## License
This project is licensed under the MIT License. 
