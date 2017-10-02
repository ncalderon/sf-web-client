package com.calderon.sf.domain.projections;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface Transaction {
    String getDescription();
    BigDecimal getAmount();
    LocalDate getPostDate();
}
