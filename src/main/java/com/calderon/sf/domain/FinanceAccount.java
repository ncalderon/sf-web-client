package com.calderon.sf.domain;

import com.calderon.sf.domain.enumeration.AccountStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A FinanceAccount.
 */
@Entity
@Table(name = "finance_account")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FinanceAccount extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "account_status", nullable = false)
    private AccountStatus accountStatus;

    @NotNull
    @Size(max = 32)
    @Column(name = "account_number", length = 32, nullable = true)
    private String accountNumber;

    @NotNull
    @Size(min = 4, max = 64)
    @Column(name = "name", length = 64, nullable = false)
    private String name;

    @Size(max = 256)
    @Column(name = "description", length = 256)
    private String description;

    @Column(name = "balance", precision=10, scale=2)
    private BigDecimal balance;

    @Column(name = "is_credit_card")
    private Boolean isCreditCard;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "closing_date")
    private LocalDate closingDate;

    @OneToMany(mappedBy = "financeAccount")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AccountTransaction> accountTransactions = new HashSet<>();

    @ManyToOne
    private User user;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AccountStatus getAccountStatus() {
        return accountStatus;
    }

    public FinanceAccount accountStatus(AccountStatus accountStatus) {
        this.accountStatus = accountStatus;
        return this;
    }

    public void setAccountStatus(AccountStatus accountStatus) {
        this.accountStatus = accountStatus;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public FinanceAccount accountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
        return this;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getName() {
        return name;
    }

    public FinanceAccount name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public FinanceAccount description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public FinanceAccount balance(BigDecimal balance) {
        this.balance = balance;
        return this;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public Boolean isIsCreditCard() {
        return isCreditCard;
    }

    public FinanceAccount isCreditCard(Boolean isCreditCard) {
        this.isCreditCard = isCreditCard;
        return this;
    }

    public void setIsCreditCard(Boolean isCreditCard) {
        this.isCreditCard = isCreditCard;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public FinanceAccount dueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
        return this;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public LocalDate getClosingDate() {
        return closingDate;
    }

    public FinanceAccount closingDate(LocalDate closingDate) {
        this.closingDate = closingDate;
        return this;
    }

    public void setClosingDate(LocalDate closingDate) {
        this.closingDate = closingDate;
    }

    public Set<AccountTransaction> getAccountTransactions() {
        return accountTransactions;
    }

    public FinanceAccount accountTransactions(Set<AccountTransaction> accountTransactions) {
        this.accountTransactions = accountTransactions;
        return this;
    }

    public FinanceAccount addAccountTransaction(AccountTransaction accountTransaction) {
        this.accountTransactions.add(accountTransaction);
        accountTransaction.setFinanceAccount(this);
        return this;
    }

    public FinanceAccount removeAccountTransaction(AccountTransaction accountTransaction) {
        this.accountTransactions.remove(accountTransaction);
        accountTransaction.setFinanceAccount(null);
        return this;
    }

    public void setAccountTransactions(Set<AccountTransaction> accountTransactions) {
        this.accountTransactions = accountTransactions;
    }

    public User getUser() {
        return user;
    }

    public FinanceAccount user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
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
        FinanceAccount financeAccount = (FinanceAccount) o;
        if (financeAccount.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), financeAccount.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FinanceAccount{" +
            "id=" + getId() +
            ", accountStatus='" + getAccountStatus() + "'" +
            ", accountNumber='" + getAccountNumber() + "'" +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", balance='" + getBalance() + "'" +
            ", isCreditCard='" + isIsCreditCard() + "'" +
            ", dueDate='" + getDueDate() + "'" +
            ", closingDate='" + getClosingDate() + "'" +
            "}";
    }
}
