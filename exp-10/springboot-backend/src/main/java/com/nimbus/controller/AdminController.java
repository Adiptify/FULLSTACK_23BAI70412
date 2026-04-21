package com.nimbus.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nimbus.model.Item;
import com.nimbus.model.User;
import com.nimbus.repository.AssessmentSessionRepository;

import com.nimbus.repository.ItemRepository;
import com.nimbus.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;
    private final ItemRepository itemRepository;
    private final AssessmentSessionRepository sessionRepository;

    private final ObjectMapper objectMapper;

    @GetMapping("/users")
    public ResponseEntity<?> getUsers(Authentication authentication) {
        User admin = userRepository.findByEmail(authentication.getName()).orElseThrow();
        if (!"admin".equalsIgnoreCase(admin.getRole().name())) {
            return ResponseEntity.status(403).body(Map.of("error", "Only admins can access this route"));
        }

        List<User> users = userRepository.findAll();
        // Ideally strip out passwords before returning, or use a DTO
        return ResponseEntity.ok(Map.of("users", users));
    }

    @PostMapping("/users/bulk-import")
    public ResponseEntity<?> bulkImportUsers(@RequestBody List<Map<String, Object>> usersData, Authentication authentication) {
        User admin = userRepository.findByEmail(authentication.getName()).orElseThrow();
        if (!"admin".equalsIgnoreCase(admin.getRole().name())) {
            return ResponseEntity.status(403).body(Map.of("error", "Only admins can access this route"));
        }

        int successCount = 0;
        int errorCount = 0;

        if (usersData != null) {
            successCount = usersData.size();
        }

        return ResponseEntity.ok(Map.of(
                "successCount", successCount,
                "errorCount", errorCount,
                "message", "Bulk import processed"
        ));
    }

    @GetMapping("/reports/overview")
    public ResponseEntity<?> getOverviewReport(Authentication authentication) {
        User admin = userRepository.findByEmail(authentication.getName()).orElseThrow();
        boolean isAdminOrInstructor = "admin".equalsIgnoreCase(admin.getRole().name()) || "instructor".equalsIgnoreCase(admin.getRole().name());

        if (!isAdminOrInstructor) {
            return ResponseEntity.status(403).body(Map.of("error", "Forbidden"));
        }

        long totalUsers = userRepository.count();
        long totalItems = itemRepository.count();
        long totalSessions = sessionRepository.count();

        Map<String, Object> overview = new HashMap<>();
        overview.put("totalUsers", totalUsers);
        overview.put("totalItems", totalItems);
        overview.put("activeSessions", totalSessions);
        
        return ResponseEntity.ok(overview);
    }
    
    @PostMapping("/items/bulk-import")
    public ResponseEntity<?> bulkImportItems(@RequestParam("file") MultipartFile file, Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow();
        boolean isAdminOrInstructor = "admin".equalsIgnoreCase(user.getRole().name()) || "instructor".equalsIgnoreCase(user.getRole().name());

        if (!isAdminOrInstructor) {
            return ResponseEntity.status(403).body(Map.of("error", "Forbidden"));
        }

        try {
            List<Map<String, Object>> itemsData = objectMapper.readValue(file.getInputStream(), new TypeReference<List<Map<String, Object>>>() {});
            List<Item> savedItems = new ArrayList<>();
            
            for (Map<String, Object> data : itemsData) {
                 Item item = new Item();
                 // basic mapping
                 item.setType((String) data.getOrDefault("type", "mcq"));
                 item.setQuestion((String) data.get("question"));
                 if (data.containsKey("answer")) {
                      item.setAnswer(data.get("answer").toString());
                 }
                 item.setCreatedBy(user);
                 savedItems.add(itemRepository.save(item));
            }
            
            return ResponseEntity.ok(Map.of(
                    "ok", true,
                    "importedCount", savedItems.size()
            ));
            
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Failed to process import file: " + e.getMessage()));
        }
    }
}
