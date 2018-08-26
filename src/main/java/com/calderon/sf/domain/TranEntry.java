package com.calderon.sf.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

import com.calderon.sf.domain.enumeration.TranType;

import com.calderon.sf.domain.enumeration.PaymentMethod;

/**
 * A TranEntry.
 */
@Entity
@Table(name = "tran_entry")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TranEntry extends AbstractAuditingEntity implements BaseUserEntity, Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "tran_type", nullable = false)
    private TranType tranType;

    @Column(name = "tran_num")
    private String tranNum;

    @Column(name = "ref_num")
    private String refNum;

    @NotNull
    @Column(name = "post_date", nullable = false)
    private LocalDate postDate;

    @Size(max = 256)
    @Column(name = "description", length = 256)
    private String description;

    @NotNull
    @Column(name = "amount", precision = 10, scale = 2, nullable = false)
    private BigDecimal amount;

    @NotNull
    @Column(name = "ccy_val", precision = 10, scale = 2, nullable = false)
    private BigDecimal ccyVal;

    @NotNull
    @Size(min = 4, max = 64)
    @Column(name = "ccy_code", length = 64, nullable = false)
    private String ccyCode;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method")
    private PaymentMethod paymentMethod;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private User user;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("tranEntries")
    private FinAcc finAcc;

    @ManyToOne
    @JsonIgnoreProperties("tranEntries")
    private TranCategory tranCategory;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TranType getTranType() {
        return tranType;
    }

    public TranEntry tranType(TranType tranType) {
        this.tranType = tranType;
        return this;
    }

    public void setTranType(TranType tranType) {
        this.tranType = tranType;
    }

    public String getTranNum() {
        return tranNum;
    }

    public TranEntry tranNum(String tranNum) {
        this.tranNum = tranNum;
        return this;
    }

    public void setTranNum(String tranNum) {
        this.tranNum = tranNum;
    }

    public String getRefNum() {
        return refNum;
    }

    public TranEntry refNum(String refNum) {
        this.refNum = refNum;
        return this;
    }

    public void setRefNum(String refNum) {
        this.refNum = refNum;
    }

    public LocalDate getPostDate() {
        return postDate;
    }

    public TranEntry postDate(LocalDate postDate) {
        this.postDate = postDate;
        return this;
    }

    public void setPostDate(LocalDate postDate) {
        this.postDate = postDate;
    }

    public String getDescription() {
        return description;
    }

    public TranEntry description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public TranEntry amount(BigDecimal amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public BigDecimal getCcyVal() {
        return ccyVal;
    }

    public TranEntry ccyVal(BigDecimal ccyVal) {
        this.ccyVal = ccyVal;
        return this;
    }

    public void setCcyVal(BigDecimal ccyVal) {
        this.ccyVal = ccyVal;
    }

    public String getCcyCode() {
        return ccyCode;
    }

    public TranEntry ccyCode(String ccyCode) {
        this.ccyCode = ccyCode;
        return this;
    }

    public void setCcyCode(String ccyCode) {
        this.ccyCode = ccyCode;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public TranEntry paymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
        return this;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public User getUser() {
        return user;
    }

    public TranEntry user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public FinAcc getFinAcc() {
        return finAcc;
    }

    public TranEntry finAcc(FinAcc finAcc) {
        this.finAcc = finAcc;
        return this;
    }

    public void setFinAcc(FinAcc finAcc) {
        this.finAcc = finAcc;
    }

    public TranCategory getTranCategory() {
        return tranCategory;
    }

    public TranEntry tranCategory(TranCategory tranCategory) {
        this.tranCategory = tranCategory;
        return this;
    }

    public void setTranCategory(TranCategory tranCategory) {
        this.tranCategory = tranCategory;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TranEntry tranEntry = (TranEntry) o;
        if (tranEntry.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tranEntry.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TranEntry{" +
            "id=" + getId() +
            ", tranType='" + getTranType() + "'" +
            ", tranNum='" + getTranNum() + "'" +
            ", refNum='" + getRefNum() + "'" +
            ", postDate='" + getPostDate() + "'" +
            ", description='" + getDescription() + "'" +
            ", amount=" + getAmount() +
            ", ccyVal=" + getCcyVal() +
            ", ccyCode='" + getCcyCode() + "'" +
            ", paymentMethod='" + getPaymentMethod() + "'" +
            "}";
    }
}
