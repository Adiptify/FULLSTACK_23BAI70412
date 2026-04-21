package com.nimbus.service;

import com.nimbus.model.Item;
import com.nimbus.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RulesEngineService {

    private final ItemRepository itemRepository;

    public SelectionResult selectItems(Long userId, String mode, List<String> requestedTopics, int limit) {
        // Simplified stub of Adaptive Selection mapping to old rulesEngine.js
        List<Item> allItems = itemRepository.findAll();
        
        if (requestedTopics != null && !requestedTopics.isEmpty()) {
            allItems = allItems.stream()
                .filter(item -> item.getTopics() != null && !Collections.disjoint(item.getTopics(), requestedTopics))
                .collect(Collectors.toList());
        }
        
        Collections.shuffle(allItems);
        
        List<Long> selectedIds = allItems.stream()
            .limit(limit)
            .map(Item::getId)
            .collect(Collectors.toList());
            
        return new SelectionResult(selectedIds, "Basic Random Selection (Stub)");
    }

    public static class SelectionResult {
        public List<Long> itemIds;
        public String metadata;

        public SelectionResult(List<Long> itemIds, String metadata) {
            this.itemIds = itemIds;
            this.metadata = metadata;
        }
    }
}
