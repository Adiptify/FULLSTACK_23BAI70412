package com.nimbus.repository;

import com.nimbus.model.LearnerTopicProfile;
import com.nimbus.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LearnerTopicProfileRepository extends JpaRepository<LearnerTopicProfile, Long> {
    List<LearnerTopicProfile> findByUser(User user);
    Optional<LearnerTopicProfile> findByUserAndTopic(User user, String topic);
}
