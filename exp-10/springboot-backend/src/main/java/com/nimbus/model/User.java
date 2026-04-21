package com.nimbus.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Data
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String passwordHash;

    private String studentId;

    @Enumerated(EnumType.STRING)
    private Role role = Role.STUDENT;

    @ElementCollection
    @CollectionTable(name = "user_locked_subjects", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "subject")
    private List<String> lockedSubjects = new ArrayList<>();

    private String preferredMode = "mixed";
    
    private LocalDateTime lastActiveAt;
    
    private Boolean proctorConsent = false;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
