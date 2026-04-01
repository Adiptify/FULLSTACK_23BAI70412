# Experiment 8: Building a REST API with Spring Boot

## Overview
This project demonstrates the creation of a comprehensive RESTful API using **Spring Boot** and **MySQL**, enabling robust CRUD (Create, Read, Update, Delete) operations. The API allows management of `Student` records with details such as `id`, `name`, and `course`.

## Technologies Used
- **Java 17+**
- **Spring Boot** (Spring Web, Spring Data JPA)
- **MySQL Database**
- **Postman** (for API testing)

## Database Setup
A MySQL database needs to be configured before running the application. The project contains a SQL script (`setup_db.sql`) that defines the database and creates the required tables.

**setup_db.sql:**
```sql
CREATE DATABASE IF NOT EXISTS chandigarh_university;
USE chandigarh_university;

CREATE TABLE IF NOT EXISTS student (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    course VARCHAR(255)
);

INSERT INTO student (id, name, course) VALUES (1, 'Test Student', 'Computer Science');
```

## REST Endpoints Overview
The API is exposed under the root path `/api/students` and provides the following CRUD operations:

### 1. Get All Students (GET)
**Endpoint:** `GET /api/students`  
**Description:** Retrieves a list of all students present in the database.

**Response Example:**
```json
[
  {
    "id": 1,
    "name": "Test Student",
    "course": "Computer Science"
  }
]
```
#### Output Screenshot
![GET All Students Output](https://github.com/Nischaya008/Full_Stack_II_CU/blob/main/Conduct%20Screenshots/8.1.png?raw=true)

---

### 2. Get Student by ID (GET)
**Endpoint:** `GET /api/students/{id}`  
**Description:** Retrieves the details of a specific student by their `id`.

**Response Example (ID: 1):**
```json
{
  "id": 1,
  "name": "Test Student",
  "course": "Computer Science"
}
```
#### Output Screenshot
![GET Student by ID Output](https://github.com/Nischaya008/Full_Stack_II_CU/blob/main/Conduct%20Screenshots/8.2.png?raw=true)

---

### 3. Add a New Student (POST)
**Endpoint:** `POST /api/students`  
**Description:** Creates a new student record in the database.

**Request Payload:**
```json
{
  "id": 2,
  "name": "Alice Smith",
  "course": "Information Technology"
}
```
#### Output Screenshot
![POST Add Student Output](https://github.com/Nischaya008/Full_Stack_II_CU/blob/main/Conduct%20Screenshots/8.3.png?raw=true)

---

### 4. Update an Existing Student (PUT)
**Endpoint:** `PUT /api/students/{id}`  
**Description:** Updates the information of an existing student.

**Request Payload (Update ID: 2):**
```json
{
  "id": 2,
  "name": "Alice Smith",
  "course": "Software Engineering"
}
```
#### Output Screenshot
![PUT Update Student Output](https://github.com/Nischaya008/Full_Stack_II_CU/blob/main/Conduct%20Screenshots/8.4.png?raw=true)

---

### 5. Delete a Student (DELETE)
**Endpoint:** `DELETE /api/students/{id}`  
**Description:** Removes a student record from the database by `id`.

**Response Example (DELETE ID: 2):**
*(Returns a success string or HTTP 200 OK depending on the service implementation)*

#### Output Screenshot
![DELETE Student Output](https://github.com/Nischaya008/Full_Stack_II_CU/blob/main/Conduct%20Screenshots/8.5.png?raw=true)

## How to Run the Project
1. Open MySQL Command Line Client or MySQL Workbench and run the commands found in `setup_db.sql` to initialize the database `chandigarh_university`.
2. Configure your MySQL username and password in `RestAPI/src/main/resources/application.properties` if they differ from the defaults.
3. Open a terminal and navigate to the `RestAPI` folder.
4. Run the project using the Maven Wrapper:
```bash
./mvnw spring-boot:run
```
*(On Windows, you can also use `mvnw.cmd spring-boot:run`)*
5. The application will start locally on port `8080`.
6. Open **Postman** (or another REST client) to test the API endpoints at `http://localhost:8080/api/students`.
