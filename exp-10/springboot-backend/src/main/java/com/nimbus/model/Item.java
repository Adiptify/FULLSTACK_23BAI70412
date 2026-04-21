package com.nimbus.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "items")
@Data
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String type; // "mcq", "fill_blank", "short_answer", "match", "reorder"

    private String questionType;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String question;

    @ElementCollection
    @CollectionTable(name = "item_choices", joinColumns = @JoinColumn(name = "item_id"))
    @Column(columnDefinition = "TEXT")
    private List<String> choices = new ArrayList<>();

    @Column(columnDefinition = "JSON", nullable = false)
    private String answer; // Mapping Mixed types to JSON string

    private String gradingMethod = "exact";

    @Column(nullable = false)
    private Integer difficulty;

    @Column(nullable = false)
    private String bloom;

    private String cognitiveLevel;

    @ElementCollection
    @CollectionTable(name = "item_topics", joinColumns = @JoinColumn(name = "item_id"))
    private List<String> topics = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "item_skills", joinColumns = @JoinColumn(name = "item_id"))
    private List<String> skills = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "item_tags", joinColumns = @JoinColumn(name = "item_id"))
    private List<String> tags = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "item_hints", joinColumns = @JoinColumn(name = "item_id"))
    private List<String> hints = new ArrayList<>();

    @Column(columnDefinition = "TEXT")
    private String explanation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_id")
    private User createdBy;

    private String seedId;

    private Boolean aiGenerated = false;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
