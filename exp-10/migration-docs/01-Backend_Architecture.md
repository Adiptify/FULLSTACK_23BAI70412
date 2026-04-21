# Spring Boot Backend Architecture

We have completely transitioned the Adiptify platform from a Node.js + Mongoose stack over to a pure Java 21 Spring Boot system. Below is a breakdown of the new components and operations.

## Database & Models (JPA & MySQL)
The system no longer relies on MongoDB's unstructured BSON format. Instead, we use `spring-boot-starter-data-jpa` alongside `Hibernate` mapping out perfectly normalized data schemas.
- `User`, `Item`, `GeneratedQuiz`, `AssessmentSession`, and `Attempt` have structured typed tables created automatically by Spring Boot's DDL capabilities.
- Complex nested objects like Proctor configurations/results are mapped via JPA `@Embeddable`/`@Embedded` and `@ElementCollection` objects. JSON storage has been preserved gracefully via `@Column(columnDefinition = "JSON")` where unstructured schema rules.

## Core Micro-Services
Logic has been compartmentalized logically across distinct services allowing easier testing:
- **`AiService`**: Hooks up natively to `http://localhost:11434` for continuous automated interactions with local Ollama LLMs.
- **`AssessmentService`**: Invokes the `AiService` asynchronously, dynamically formatting generation JSONs directly back into our structural Database schema using Jackson objects!
- **`RulesEngineService & GradingService`**: Grading validation logic (with pathways built-in for Levenshtein string approximation) safely handles student answer matrices against questions securely.
- **`ProctorService`**: Evaluates anti-cheating metrics (`tab_switch`, face loss), progressively incrementing the risk score until a session triggers an `invalidated` state.

## Security (JWT)
The entire authentication process has been recreated securely utilizing:
- Native `SecurityFilterChain`
- JJWT (`io.jsonwebtoken`)
- Completely stateless HTTP sessions enforcing Bearer intercept filtering `JwtAuthenticationFilter`.
