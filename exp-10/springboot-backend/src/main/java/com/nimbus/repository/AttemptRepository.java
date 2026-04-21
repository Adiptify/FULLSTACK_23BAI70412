package com.nimbus.repository;

import com.nimbus.model.AssessmentSession;
import com.nimbus.model.Attempt;
import com.nimbus.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttemptRepository extends JpaRepository<Attempt, Long> {
    List<Attempt> findByUser(User user);
    List<Attempt> findBySession(AssessmentSession session);
}
