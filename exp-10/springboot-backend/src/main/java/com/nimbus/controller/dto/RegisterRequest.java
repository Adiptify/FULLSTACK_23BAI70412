package com.nimbus.controller.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private String role; // student, instructor, admin
    private String studentId;
}
