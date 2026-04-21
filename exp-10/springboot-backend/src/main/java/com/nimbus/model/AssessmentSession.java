package com.nimbus.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "assessment_sessions")
@Data
public class AssessmentSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String mode = "formative";

    @ElementCollection
    @CollectionTable(name = "assessment_session_items", joinColumns = @JoinColumn(name = "session_id"))
    @Column(name = "item_id")
    private List<Long> itemIds = new ArrayList<>();

    private Integer currentIndex = 0;

    private LocalDateTime startedAt = LocalDateTime.now();

    private LocalDateTime completedAt;

    private Double score = 0.0;

    @Column(columnDefinition = "JSON")
    private String metadata; // Storing as JSON string

    private Integer timeLimit;

    private String status = "active";

    private Boolean proctored = false;

    @Embedded
    private ProctorConfig proctorConfig;

    @Embedded
    private ProctorSummary proctorSummary;

    private Boolean invalidated = false;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
