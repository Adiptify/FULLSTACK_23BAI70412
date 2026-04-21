# Launch Instructions

To bring the application stack online perfectly:

## Prerequisites

1. **MySQL Daemon**: Open your pre-existing MySQL service on your local system locally.
   *Ensure standard credentials: `root` and `secret123` on `localhost:3306`. (Or update `application.properties` to match your PC's active database login).*
   *Ensure the database is named `adiptify` (The application automatically handles adding tables).*
2. **Ollama**: To power the Assessment Generative services locally.

## Startup (Backend)

We mapped the Maven structure and pulled a standard maven-wrapper package allowing compilation dynamically. Run your Spring Container globally via Powershell:

```powershell
cd springboot-backend
.\mvnw clean spring-boot:run
```

*Watch the terminal map out your `@Entities` dynamically directly querying the database without needing schema files!*

## Startup (Frontend)

Move to the corresponding folder containing the Vite configuration:

```powershell
cd frontend
npm install
npm run dev
```

Your React interface will be fully operational across `http://localhost:5173` mapping queries over completely towards your Java configuration handling all routing endpoints securely utilizing JWT. 
