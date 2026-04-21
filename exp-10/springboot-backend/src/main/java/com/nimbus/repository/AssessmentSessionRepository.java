package com.nimbus.repository;

import com.nimbus.model.AssessmentSession;
import com.nimbus.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssessmentSessionRepository extends JpaRepository<AssessmentSession, Long> {
    List<AssessmentSession> findByUser(User user);
    List<AssessmentSession> findByUserAndStatus(User user, String status);
}
