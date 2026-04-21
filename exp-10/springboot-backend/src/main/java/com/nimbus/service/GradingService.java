package com.nimbus.service;

import com.nimbus.model.Item;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class GradingService {

    public GradingResult gradeItem(Item item, Object userAnswer) {
        String answerStr = userAnswer != null ? userAnswer.toString().trim() : "";
        String correctAnswer = item.getAnswer() != null ? item.getAnswer().trim() : "";

        boolean isCorrect = false;
        double score = 0.0;
        String gradingMethod = item.getGradingMethod() != null ? item.getGradingMethod() : "exact";

        switch (gradingMethod) {
            case "exact":
                isCorrect = answerStr.equalsIgnoreCase(correctAnswer);
                score = isCorrect ? 100.0 : 0.0;
                break;
            case "levenshtein":
                // simple approximation for now
                isCorrect = answerStr.equalsIgnoreCase(correctAnswer);
                score = isCorrect ? 100.0 : 0.0;
                break;
            case "semantic":
            case "sequence_check":
            case "pair_match":
                // stub for advanced matching
                isCorrect = answerStr.equalsIgnoreCase(correctAnswer);
                score = isCorrect ? 100.0 : 0.0;
                break;
            default:
                isCorrect = answerStr.equalsIgnoreCase(correctAnswer);
                score = isCorrect ? 100.0 : 0.0;
        }

        Map<String, Object> gradingDetails = new HashMap<>();
        gradingDetails.put("method", gradingMethod);

        return new GradingResult(isCorrect, score, gradingDetails, item.getExplanation());
    }

    public static class GradingResult {
        public boolean isCorrect;
        public double score;
        public Map<String, Object> gradingDetails;
        public String explanation;

        public GradingResult(boolean isCorrect, double score, Map<String, Object> gradingDetails, String explanation) {
            this.isCorrect = isCorrect;
            this.score = score;
            this.gradingDetails = gradingDetails;
            this.explanation = explanation;
        }
    }
}
