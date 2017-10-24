package com.calderon.sf.domain.predicates;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.json.JSONObject;

import java.math.BigDecimal;
import java.time.LocalDate;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class TransactionCriteria {
    private boolean active;
    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal startAmount;
    private BigDecimal endAmount;
    private String desc;

    public TransactionCriteria(JSONObject json) {
        this.active = json.optBoolean("active", false);
        this.desc = json.optString("desc", "");
        String startDate = json.optString("startDate", "");
        if (!startDate.isEmpty()){
            this.startDate = LocalDate.parse(startDate);
        }
        String endDate = json.optString("endDate", "");
        if (!endDate.isEmpty()){
            this.endDate = LocalDate.parse(endDate);
        }

        String startAmount = json.optString("startAmount", "");
        if (!startAmount.isEmpty()){
            this.startAmount = new BigDecimal(startAmount);
        }

        String endAmount = json.optString("endAmount", "");
        if (!endAmount.isEmpty()){
            this.endAmount = new BigDecimal(endAmount);
        }
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public BigDecimal getStartAmount() {
        return startAmount;
    }

    public void setStartAmount(BigDecimal startAmount) {
        this.startAmount = startAmount;
    }

    public BigDecimal getEndAmount() {
        return endAmount;
    }

    public void setEndAmount(BigDecimal endAmount) {
        this.endAmount = endAmount;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    /*private String desc;

        public boolean isActive() {
            return active;
        }

        public void setActive(boolean active) {
            this.active = active;
        }

        public LocalDate getStartDate() {
            return startDate;
        }

        public void setStartDate(LocalDate startDate) {
            this.startDate = startDate;
        }

        public LocalDate getEndDate() {
            return endDate;
        }

        public void setEndDate(LocalDate endDate) {
            this.endDate = endDate;
        }

        public BigDecimal getStartAmount() {
            return startAmount;
        }

        public void setStartAmount(BigDecimal startAmount) {
            this.startAmount = startAmount;
        }

        public BigDecimal getEndAmount() {
            return endAmount;
        }

        public void setEndAmount(BigDecimal endAmount) {
            this.endAmount = endAmount;
        }

        public String getDesc() {
            return desc;
        }

        public void setDesc(String desc) {
            this.desc = desc;
        }

        public TransactionCriteria active(boolean active) {
            this.active = active;
            return this;
        }

        public TransactionCriteria startDate(LocalDate startDate) {
            this.startDate = startDate;
            return this;
        }

        public TransactionCriteria endDate(LocalDate endDate) {
            this.endDate = endDate;
            return this;
        }

        public TransactionCriteria startAmount(BigDecimal startAmount) {
            this.startAmount = startAmount;
            return this;
        }

        public TransactionCriteria endAmount(BigDecimal endAmount) {
            this.endAmount = endAmount;
            return this;
        }

        public TransactionCriteria desc(String desc) {
            this.desc = desc;
            return this;
        }*/
}
