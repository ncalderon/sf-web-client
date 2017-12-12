package com.calderon.sf.service.dto;

import java.util.Objects;

public class UserDetailDTO {
    private Long currencyId;

    public Long getCurrencyId() {
        return currencyId;
    }

    public UserDetailDTO currencyId(Long currencyId) {
        this.currencyId = currencyId;
        return this;
    }

    public void setCurrencyId(Long currencyId) {
        this.currencyId = currencyId;
    }

    @Override
    public String toString() {
        return "UserDetailDTO{" +
            "currencyId=" + currencyId +
            '}';
    }
}
