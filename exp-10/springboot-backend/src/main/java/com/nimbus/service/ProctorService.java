package com.nimbus.service;

import com.nimbus.model.AssessmentSession;
import com.nimbus.model.ProctorSummary;
import com.nimbus.repository.AssessmentSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ProctorService {

    private final AssessmentSessionRepository sessionRepository;

    public Map<String, Object> logViolation(Long sessionId, String violationType, String details) {
        AssessmentSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        if (session.getProctorSummary() == null) {
            session.setProctorSummary(new ProctorSummary());
        }

        ProctorSummary summary = session.getProctorSummary();
        summary.setTotalViolations(summary.getTotalViolations() + 1);

        int riskScoreIncrement;
        switch (violationType) {
            case "tab_switch":
                riskScoreIncrement = 25;
                break;
            case "copy_paste":
                riskScoreIncrement = 50;
                break;
            case "right_click":
                riskScoreIncrement = 10;
                break;
            case "multiple_faces":
            case "no_face":
                riskScoreIncrement = 40;
                break;
            default:
                riskScoreIncrement = 15;
        }

        summary.setRiskScore(summary.getRiskScore() + riskScoreIncrement);

        if (summary.getRiskScore() >= 100) {
            session.setInvalidated(true);
            session.setStatus("invalidated");
        }

        sessionRepository.save(session);

        Map<String, Object> result = new HashMap<>();
        result.put("proctorSummary", summary);
        result.put("invalidated", session.getInvalidated());
        result.put("status", session.getStatus());
        
        return result;
    }
    
    public AssessmentSession overrideSession(Long sessionId, String action, String reason, Long adminId) {
        AssessmentSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));
                
        if ("invalidate".equals(action)) {
            session.setInvalidated(true);
            session.setStatus("invalidated");
        } else if ("restore".equals(action)) {
            session.setInvalidated(false);
            session.setStatus("active");
            if (session.getProctorSummary() != null) {
                // reset or reduce risk score here if necessary
                session.getProctorSummary().setRiskScore(0.0); 
            }
        }
        
        return sessionRepository.save(session);
    }
}
