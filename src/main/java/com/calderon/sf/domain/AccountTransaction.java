package com.calderon.sf.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;

import com.calderon.sf.domain.enumeration.TranType;

import com.calderon.sf.domain.enumeration.PaymentMethod;

/**
 * A AccountTransaction.
 */
@Entity
@Table(name = "account_transaction")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AccountTransaction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "tran_type", nullable = false)
    private TranType tranType;

    @NotNull
    @Size(min = 1, max = 128)
    @Column(name = "tran_number", length = 128, nullable = false)
    private String tranNumber;

    @Column(name = "reference_number")
    private String referenceNumber;

    @NotNull
    @Column(name = "post_date", nullable = false)
    private Instant postDate;

    @Size(max = 512)
    @Column(name = "description", length = 512)
    private String description;

    @NotNull
    @Column(name = "amount", precision=10, scale=2, nullable = false)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method")
    private PaymentMethod paymentMethod;

    @ManyToOne
    private User user;

    @ManyToOne(optional = false)
    @NotNull
    private BankAccount bankAccount;

    @ManyToOne(optional = false)
    @NotNull
    private TranCategory tranCategory;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TranType getTranType() {
        return tranType;
    }

    public AccountTransaction tranType(TranType tranType) {
        this.tranType = tranType;
        return this;
    }

    public void setTranType(TranType tranType) {
        this.tranType = tranType;
    }

    public String getTranNumber() {
        return tranNumber;
    }

    public AccountTransaction tranNumber(String tranNumber) {
        this.tranNumber = tranNumber;
        return this;
    }

    public void setTranNumber(String tranNumber) {
        this.tranNumber = tranNumber;
    }

    public String getReferenceNumber() {
        return referenceNumber;
    }

    public AccountTransaction referenceNumber(String referenceNumber) {
        this.referenceNumber = referenceNumber;
        return this;
    }

    public void setReferenceNumber(String referenceNumber) {
        this.referenceNumber = referenceNumber;
    }

    public Instant getPostDate() {
        return postDate;
    }

    public AccountTransaction postDate(Instant postDate) {
        this.postDate = postDate;
        return this;
    }

    public void setPostDate(Instant postDate) {
        this.postDate = postDate;
    }

    public String getDescription() {
        return description;
    }

    public AccountTransaction description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public AccountTransaction amount(BigDecimal amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public AccountTransaction paymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
        return this;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public User getUser() {
        return user;
    }

    public AccountTransaction user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public BankAccount getBankAccount() {
        return bankAccount;
    }

    public AccountTransaction bankAccount(BankAccount bankAccount) {
        this.bankAccount = bankAccount;
        return this;
    }

    public void setBankAccount(BankAccount bankAccount) {
        this.bankAccount = bankAccount;
    }

    public TranCategory getTranCategory() {
        return tranCategory;
    }

    public AccountTransaction tranCategory(TranCategory tranCategory) {
        this.tranCategory = tranCategory;
        return this;
    }

    public void setTranCategory(TranCategory tranCategory) {
        this.tranCategory = tranCategory;
    }
    // jhipster-needle-entity-add-getters-setters - Jhipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AccountTransaction accountTransaction = (AccountTransaction) o;
        if (accountTransaction.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), accountTransaction.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AccountTransaction{" +
            "id=" + getId() +
            ", tranType='" + getTranType() + "'" +
            ", tranNumber='" + getTranNumber() + "'" +
            ", referenceNumber='" + getReferenceNumber() + "'" +
            ", postDate='" + getPostDate() + "'" +
            ", description='" + getDescription() + "'" +
            ", amount='" + getAmount() + "'" +
            ", paymentMethod='" + getPaymentMethod() + "'" +
            "}";
    }
}
