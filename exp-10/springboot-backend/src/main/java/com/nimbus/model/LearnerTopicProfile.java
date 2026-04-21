package com.nimbus.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "learner_topic_profiles")
@Data
public class LearnerTopicProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String topic;

    private Double mastery = 0.0;
    
    private Integer attempts = 0;
    
    private Integer streak = 0;
    
    private Long timeOnTask = 0L;
}
