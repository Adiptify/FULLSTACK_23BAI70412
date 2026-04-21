package com.nimbus.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "attempts")
@Data
public class Attempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id", nullable = false)
    private AssessmentSession session;

    @Column(nullable = false)
    private Boolean isCorrect;

    @Column(columnDefinition = "JSON")
    private String userAnswer;

    private Double score = 0.0;

    @Column(columnDefinition = "JSON")
    private String gradingDetails;

    private Long timeTakenMs = 0L;

    @Column(columnDefinition = "TEXT")
    private String explanation;

    @ElementCollection
    @CollectionTable(name = "attempt_proctor_log_refs", joinColumns = @JoinColumn(name = "attempt_id"))
    @Column(name = "log_ref_id")
    private List<Long> proctorLogRefs = new ArrayList<>();

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
