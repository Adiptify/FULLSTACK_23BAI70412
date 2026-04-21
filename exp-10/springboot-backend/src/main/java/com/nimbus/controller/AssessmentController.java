package com.nimbus.controller;

import com.nimbus.model.AssessmentSession;
import com.nimbus.model.Attempt;
import com.nimbus.model.Item;
import com.nimbus.model.User;
import com.nimbus.repository.AssessmentSessionRepository;
import com.nimbus.repository.AttemptRepository;
import com.nimbus.repository.ItemRepository;
import com.nimbus.repository.UserRepository;
import com.nimbus.service.AssessmentService;
import com.nimbus.service.GradingService;
import com.nimbus.service.RulesEngineService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/assessment")
@RequiredArgsConstructor
public class AssessmentController {

    private final AssessmentSessionRepository sessionRepository;
    private final ItemRepository itemRepository;
    private final UserRepository userRepository;
    private final AttemptRepository attemptRepository;
    private final RulesEngineService rulesEngineService;
    private final GradingService gradingService;
    private final AssessmentService assessmentService;
    private final ObjectMapper objectMapper;

    @PostMapping("/generate")
    public ResponseEntity<?> generateAssessment(@RequestBody Map<String, Object> body, Authentication auth) {
        try {
            User user = userRepository.findByEmail(auth.getName()).orElseThrow();
            if (!"instructor".equals(user.getRole().name().toLowerCase()) && !"admin".equals(user.getRole().name().toLowerCase())) {
                return ResponseEntity.status(403).body(Map.of("error", "Only instructors and admins can generate assessments"));
            }

            String topic = (String) body.get("topic");
            int questionCount = body.containsKey("questionCount") ? (Integer) body.get("questionCount") : 6;

            if (topic == null || topic.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Topic is required"));
            }

            return ResponseEntity.ok(assessmentService.generateAssessment(topic, questionCount, user));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/start")
    public ResponseEntity<?> startAssessment(@RequestBody StartRequest request, Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
        
        AssessmentSession session = new AssessmentSession();
        session.setUser(user);
        session.setMode(request.getMode() != null ? request.getMode() : "formative");
        
        RulesEngineService.SelectionResult selection = rulesEngineService.selectItems(
                user.getId(), 
                session.getMode(), 
                request.getTopics(), 
                6
        );

        if (selection.itemIds.isEmpty()) {
             return ResponseEntity.status(202).body(Map.of("queued", true, "message", "Preparing questions"));
        }

        session.setItemIds(selection.itemIds);
        session.setCurrentIndex(0);
        session.setStatus("active");
        
        sessionRepository.save(session);
        
        Map<String, Object> response = new HashMap<>();
        response.put("sessionId", session.getId());
        response.put("status", session.getStatus());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/current")
    public ResponseEntity<?> getCurrentItem(@RequestParam Long sessionId, Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
        AssessmentSession session = sessionRepository.findById(sessionId).orElseThrow();
        
        if (!session.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body(Map.of("error", "Access denied"));
        }
        
        if (session.getCurrentIndex() >= session.getItemIds().size()) {
            return ResponseEntity.ok(Map.of("sessionId", session.getId(), "currentIndex", session.getCurrentIndex(), "total", session.getItemIds().size()));
        }
        
        Long itemId = session.getItemIds().get(session.getCurrentIndex());
        Item item = itemRepository.findById(itemId).orElse(null);
        
        Map<String, Object> response = new HashMap<>();
        response.put("sessionId", session.getId());
        response.put("currentIndex", session.getCurrentIndex());
        response.put("total", session.getItemIds().size());
        response.put("item", item);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/sessions")
    public ResponseEntity<?> getSessions(@RequestParam(required = false) String status, @RequestParam(required = false) Integer limit, Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
        List<AssessmentSession> sessions = sessionRepository.findByUser(user);
        
        // Filter and limit in memory for simplicity in migration
        if (status != null) {
            sessions = sessions.stream().filter(s -> status.equals(s.getStatus())).toList();
        }
        if (limit != null && limit > 0 && sessions.size() > limit) {
            sessions = sessions.subList(0, limit);
        }
        
        return ResponseEntity.ok(sessions);
    }

    @PostMapping("/answer")
    public ResponseEntity<?> submitAnswer(@RequestBody AnswerRequest request, Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
        AssessmentSession session = sessionRepository.findById(request.getSessionId()).orElseThrow();
        
        Long currentItemId = session.getItemIds().get(session.getCurrentIndex());
        Item item = itemRepository.findById(currentItemId).orElseThrow();

        Object submittedAnswer = request.getAnswer();
        if (item.getType().equals("mcq") && submittedAnswer == null && request.getAnswerIndex() != null) {
            submittedAnswer = item.getChoices().get(request.getAnswerIndex());
        }

        GradingService.GradingResult result = gradingService.gradeItem(item, submittedAnswer);

        Attempt attempt = new Attempt();
        attempt.setUser(user);
        attempt.setSession(session);
        attempt.setItem(item);
        attempt.setIsCorrect(result.isCorrect);
        attempt.setScore(result.score);
        attempt.setUserAnswer(submittedAnswer != null ? submittedAnswer.toString() : "");
        try {
            attempt.setGradingDetails(objectMapper.writeValueAsString(result.gradingDetails));
        } catch(Exception ignored) {}
        attempt.setExplanation(result.explanation);
        
        attemptRepository.save(attempt);

        session.setCurrentIndex(session.getCurrentIndex() + 1);
        sessionRepository.save(session);
        
        boolean hasMore = session.getCurrentIndex() < session.getItemIds().size();
        
        Map<String, Object> response = new HashMap<>();
        response.put("isCorrect", result.isCorrect);
        response.put("hasMore", hasMore);
        response.put("currentIndex", session.getCurrentIndex());
        response.put("score", result.score);
        response.put("explanation", result.explanation);
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/finish")
    public ResponseEntity<?> finishAssessment(@RequestBody FinishRequest request, Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
        AssessmentSession session = sessionRepository.findById(request.getSessionId()).orElseThrow();
        
        if (!session.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body(Map.of("error", "Access denied"));
        }
        
        List<Attempt> attempts = attemptRepository.findBySession(session);
        long correctCount = attempts.stream().filter(Attempt::getIsCorrect).count();
        double score = session.getItemIds().isEmpty() ? 0 : (double) correctCount / session.getItemIds().size() * 100;

        session.setStatus("completed");
        session.setScore(score);
        session.setCompletedAt(LocalDateTime.now());
        
        sessionRepository.save(session);
        
        return ResponseEntity.ok(Map.of(
                "sessionId", session.getId(), 
                "status", "completed",
                "score", score,
                "correct", correctCount,
                "total", session.getItemIds().size()
        ));
    }

    @Data
    public static class StartRequest {
        private String mode;
        private List<String> topics;
    }

    @Data
    public static class AnswerRequest {
        private Long sessionId;
        private Long itemId;
        private Integer answerIndex;
        private Object answer;
    }

    @Data
    public static class FinishRequest {
        private Long sessionId;
    }
}
