package com.calderon.sf.domain;

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
 * A AccountTransaction.
 */
@Entity
@Table(name = "account_transaction")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AccountTransaction extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "tran_type", nullable = false)
    private TranType tranType;

    @Column(name = "tran_number")
    private String tranNumber;

    @Column(name = "reference_number")
    private String referenceNumber;

    @NotNull
    @Column(name = "post_date", nullable = false)
    private LocalDate postDate;

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
    private FinanceAccount financeAccount;

    @ManyToOne
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

    public LocalDate getPostDate() {
        return postDate;
    }

    public AccountTransaction postDate(LocalDate postDate) {
        this.postDate = postDate;
        return this;
    }

    public void setPostDate(LocalDate postDate) {
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

    public FinanceAccount getFinanceAccount() {
        return financeAccount;
    }

    public AccountTransaction financeAccount(FinanceAccount financeAccount) {
        this.financeAccount = financeAccount;
        return this;
    }

    public void setFinanceAccount(FinanceAccount financeAccount) {
        this.financeAccount = financeAccount;
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
