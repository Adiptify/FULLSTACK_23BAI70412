-- SQL Script to set up database for Exp-9 (JWT-DEMO)

-- 1. Create the database
CREATE DATABASE IF NOT EXISTS jwt_demo;
USE jwt_demo;

-- 2. Create the 'users' table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255)
);

-- 3. Insert a single test value
INSERT INTO users (username, password) VALUES ('admin', 'admin123');
