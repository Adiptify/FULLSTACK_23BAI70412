package com.nimbus.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nimbus.model.GeneratedQuiz;
import com.nimbus.model.Item;
import com.nimbus.model.User;
import com.nimbus.repository.GeneratedQuizRepository;
import com.nimbus.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class AssessmentService {

    private final AiService aiService;
    private final GeneratedQuizRepository generatedQuizRepository;
    private final ItemRepository itemRepository;
    private final ObjectMapper objectMapper;

    // Track ongoing generations to prevent duplicates
    private final ConcurrentHashMap<String, Long> ongoingGenerations = new ConcurrentHashMap<>();

    @SuppressWarnings("unchecked")
    public Map<String, Object> generateAssessment(String topic, int questionCount, User user) throws Exception {
        String generationKey = topic.toLowerCase().trim() + "_" + questionCount;
        long now = System.currentTimeMillis();

        Long lastGeneration = ongoingGenerations.get(generationKey);
        if (lastGeneration != null && (now - lastGeneration < 120000)) { // 2 minutes
            throw new RuntimeException("Assessment generation already in progress for this topic. Please wait.");
        }

        ongoingGenerations.put(generationKey, now);

        String userPrompt = "Generate an assessment for topic: \"" + topic + "\" with " + questionCount + " questions. \n" +
                "Include variety: at least 1 MCQ, 1 fill_blank, 1 short_answer, 1 match, and 1 reorder question.\n" +
                "Distribute the remaining questions across these types.\n" +
                "Output ONLY valid JSON following the exact schema.";

        try {
            // Simplified prompt for demonstration, normally would use a robust system prompt
            String rawResponse = aiService.generateChatResponse(userPrompt, null);
            
            // Cleanup response markdown codeblocks
            rawResponse = rawResponse.replaceAll("```json\\n?", "").replaceAll("```\\n?", "").trim();

            Map<String, Object> parsed = objectMapper.readValue(rawResponse, Map.class);
            List<Map<String, Object>> questions = (List<Map<String, Object>>) parsed.get("questions");

            if (questions == null || questions.isEmpty()) {
                throw new RuntimeException("No valid questions generated.");
            }

            // Create GeneratedQuiz record
            GeneratedQuiz assessment = new GeneratedQuiz();
            assessment.setTopic(topic);
            assessment.setParsedItems(rawResponse);
            assessment.setCreatedBy(user);
            assessment.setStatus("draft");

            // Save Items
            List<Long> itemIds = new ArrayList<>();
            for (Map<String, Object> q : questions) {
                Item item = new Item();
                item.setType((String) q.get("type"));
                item.setQuestion((String) q.get("question"));
                
                Object answer = q.get("answer");
                if (answer instanceof String) {
                    item.setAnswer((String) answer);
                } else {
                    item.setAnswer(objectMapper.writeValueAsString(answer));
                }
                
                if (q.containsKey("choices")) {
                    item.setChoices((List<String>) q.get("choices"));
                }
                
                item.setDifficulty(q.containsKey("difficulty") ? ((Number) q.get("difficulty")).intValue() : 3);
                item.setBloom((String) q.get("bloom"));
                
                List<String> topics = new ArrayList<>();
                topics.add(topic);
                item.setTopics(topics);
                
                item.setAiGenerated(true);
                item.setCreatedBy(user);

                itemRepository.save(item);
                itemIds.add(item.getId());
            }

            assessment.setLinkedItemIds(itemIds);
            generatedQuizRepository.save(assessment);

            ongoingGenerations.remove(generationKey);

            return Map.of(
                    "assessment", assessment,
                    "items", itemIds,
                    "message", "Assessment generated successfully!"
            );
        } catch (Exception e) {
            ongoingGenerations.remove(generationKey);
            throw new RuntimeException("Failed to generate assessment: " + e.getMessage(), e);
        }
    }
}
