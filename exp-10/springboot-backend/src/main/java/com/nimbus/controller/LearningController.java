package com.nimbus.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/learning")
@RequiredArgsConstructor
public class LearningController {

    @GetMapping("/subjects")
    public ResponseEntity<?> getSubjects() {
        return ResponseEntity.ok(List.of());
    }

    @PostMapping("/subject")
    public ResponseEntity<?> addSubject(@RequestBody Map<String, String> body) {
        return ResponseEntity.ok(Map.of("message", "Subject added"));
    }

    @GetMapping("/module/{topicName}")
    public ResponseEntity<?> getModule(@PathVariable String topicName) {
        // Return a dummy outline so the frontend doesn't crash on the Learning page
        return ResponseEntity.ok(Map.of(
            "topic", topicName,
            "outline", "1. Introduction\n2. Fundamentals\n3. Advanced Concepts"
        ));
    }
}
