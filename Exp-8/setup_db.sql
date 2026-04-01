-- SQL Script to set up database for CaseStudy-1/Exp-8 (RestAPI)

-- 1. Create the database
CREATE DATABASE IF NOT EXISTS chandigarh_university;
USE chandigarh_university;

-- 2. Create the 'student' table
CREATE TABLE IF NOT EXISTS student (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    course VARCHAR(255)
);

-- 3. Insert a single test value
INSERT INTO student (id, name, course) VALUES (1, 'Test Student', 'Computer Science');
