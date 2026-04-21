package com.nimbus.repository;

import com.nimbus.model.GeneratedQuiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GeneratedQuizRepository extends JpaRepository<GeneratedQuiz, Long> {
    List<GeneratedQuiz> findByTopicAndStatus(String topic, String status);
}
