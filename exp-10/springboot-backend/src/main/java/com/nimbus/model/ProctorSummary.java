package com.nimbus.model;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class ProctorSummary {
    private Integer minorViolations = 0;
    private Integer majorViolations = 0;
    private Integer totalViolations = 0;
    private Double riskScore = 0.0;
    private Integer tabSwitchCount = 0;
}
