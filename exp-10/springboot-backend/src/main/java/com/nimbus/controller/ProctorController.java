package com.nimbus.controller;

import com.nimbus.model.AssessmentSession;
import com.nimbus.model.User;
import com.nimbus.repository.AssessmentSessionRepository;
import com.nimbus.repository.UserRepository;
import com.nimbus.service.ProctorService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/proctor")
@RequiredArgsConstructor
public class ProctorController {

    private final ProctorService proctorService;
    private final AssessmentSessionRepository sessionRepository;
    private final UserRepository userRepository;

    @PostMapping("/event")
    public ResponseEntity<?> logEvent(@RequestBody ProctorEventRequest request, Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
        AssessmentSession session = sessionRepository.findById(request.getSessionId()).orElseThrow();

        if (!session.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body(Map.of("error", "Access denied"));
        }

        Map<String, Object> result = proctorService.logViolation(
                request.getSessionId(), 
                request.getViolationType(), 
                request.getDetails()
        );

        result.put("ok", true);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/session/{sessionId}/summary")
    public ResponseEntity<?> getSummary(@PathVariable Long sessionId, Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
        AssessmentSession session = sessionRepository.findById(sessionId).orElseThrow();

        boolean isOwner = session.getUser().getId().equals(user.getId());
        boolean isAdminOrInstructor = "admin".equalsIgnoreCase(user.getRole().name()) || "instructor".equalsIgnoreCase(user.getRole().name());

        if (!isOwner && !isAdminOrInstructor) {
            return ResponseEntity.status(403).body(Map.of("error", "Forbidden"));
        }

        Map<String, Object> response = new HashMap<>();
        response.put("sessionId", sessionId);
        response.put("proctorSummary", session.getProctorSummary() != null ? session.getProctorSummary() : new HashMap<>());
        response.put("proctorConfig", session.getProctorConfig() != null ? session.getProctorConfig() : new HashMap<>());
        response.put("invalidated", session.getInvalidated());
        response.put("status", session.getStatus());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/session/{sessionId}/override")
    public ResponseEntity<?> overrideSession(@PathVariable Long sessionId, @RequestBody OverrideRequest request, Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
        boolean isAdminOrInstructor = "admin".equalsIgnoreCase(user.getRole().name()) || "instructor".equalsIgnoreCase(user.getRole().name());

        if (!isAdminOrInstructor) {
            return ResponseEntity.status(403).body(Map.of("error", "Only instructors and admins can override sessions"));
        }

        AssessmentSession session = proctorService.overrideSession(
                sessionId, 
                request.getAction(), 
                request.getReason(), 
                user.getId()
        );

        return ResponseEntity.ok(Map.of(
                "ok", true,
                "session", Map.of(
                        "status", session.getStatus(),
                        "invalidated", session.getInvalidated(),
                        "proctorSummary", session.getProctorSummary() != null ? session.getProctorSummary() : new HashMap<>()
                )
        ));
    }

    @Data
    public static class ProctorEventRequest {
        private Long sessionId;
        private String violationType;
        private String details;
    }
    
    @Data
    public static class OverrideRequest {
        private String action;
        private String reason;
    }
}
