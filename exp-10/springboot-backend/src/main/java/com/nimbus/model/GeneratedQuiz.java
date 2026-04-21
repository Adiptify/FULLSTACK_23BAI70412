package com.nimbus.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "generated_quizzes")
@Data
public class GeneratedQuiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String topic;

    @Column(columnDefinition = "TEXT")
    private String prompt;

    private String sourceModel;

    private String seedId;

    @Column(columnDefinition = "JSON")
    private String parsedItems; // Raw response parsed JSON array

    @ElementCollection
    @CollectionTable(name = "generated_quiz_linked_items", joinColumns = @JoinColumn(name = "quiz_id"))
    @Column(name = "item_id")
    private List<Long> linkedItemIds = new ArrayList<>();

    private String status = "draft"; // draft, published

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_id")
    private User createdBy;

    @Column(columnDefinition = "TEXT")
    private String notes; // Topic summary notes in markdown

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
