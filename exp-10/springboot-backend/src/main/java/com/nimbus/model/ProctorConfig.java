package com.nimbus.model;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class ProctorConfig {
    private Boolean blockTabSwitch = true;
    private Boolean blockCopyPaste = true;
    private Boolean blockRightClick = true;
    private Integer allowTabSwitchCount = 2;
    private Boolean requireSnapshots = false;
    private Integer snapshotIntervalSec = 0;
}
