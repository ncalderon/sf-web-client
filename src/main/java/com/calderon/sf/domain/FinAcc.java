package com.calderon.sf.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.calderon.sf.domain.enumeration.FinAccStatus;

/**
 * A FinAcc.
 */
@Entity
@Table(name = "fin_acc")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FinAcc extends AbstractAuditingEntity implements BaseUserEntity, Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private FinAccStatus status;

    @Size(min = 4, max = 64)
    @Column(name = "acc_num", length = 64)
    private String accNum;

    @NotNull
    @Size(min = 4, max = 64)
    @Column(name = "name", length = 64, nullable = false)
    private String name;

    @Size(max = 256)
    @Column(name = "description", length = 256)
    private String description;

    @NotNull
    @Column(name = "balance", precision = 10, scale = 2, nullable = false)
    private BigDecimal balance;

    @Column(name = "is_credit_card")
    private Boolean isCreditCard;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "closing_date")
    private LocalDate closingDate;

    @OneToMany(mappedBy = "finAcc")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TranEntry> tranEntries = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public FinAccStatus getStatus() {
        return status;
    }

    public FinAcc status(FinAccStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(FinAccStatus status) {
        this.status = status;
    }

    public String getAccNum() {
        return accNum;
    }

    public FinAcc accNum(String accNum) {
        this.accNum = accNum;
        return this;
    }

    public void setAccNum(String accNum) {
        this.accNum = accNum;
    }

    public String getName() {
        return name;
    }

    public FinAcc name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public FinAcc description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public FinAcc balance(BigDecimal balance) {
        this.balance = balance;
        return this;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public Boolean isIsCreditCard() {
        return isCreditCard;
    }

    public FinAcc isCreditCard(Boolean isCreditCard) {
        this.isCreditCard = isCreditCard;
        return this;
    }

    public void setIsCreditCard(Boolean isCreditCard) {
        this.isCreditCard = isCreditCard;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public FinAcc dueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
        return this;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public LocalDate getClosingDate() {
        return closingDate;
    }

    public FinAcc closingDate(LocalDate closingDate) {
        this.closingDate = closingDate;
        return this;
    }

    public void setClosingDate(LocalDate closingDate) {
        this.closingDate = closingDate;
    }

    public Set<TranEntry> getTranEntries() {
        return tranEntries;
    }

    public FinAcc tranEntries(Set<TranEntry> tranEntries) {
        this.tranEntries = tranEntries;
        return this;
    }

    public FinAcc addTranEntry(TranEntry tranEntry) {
        this.tranEntries.add(tranEntry);
        tranEntry.setFinAcc(this);
        return this;
    }

    public FinAcc removeTranEntry(TranEntry tranEntry) {
        this.tranEntries.remove(tranEntry);
        tranEntry.setFinAcc(null);
        return this;
    }

    public void setTranEntries(Set<TranEntry> tranEntries) {
        this.tranEntries = tranEntries;
    }

    public User getUser() {
        return user;
    }

    public FinAcc user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
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
        FinAcc finAcc = (FinAcc) o;
        if (finAcc.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), finAcc.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FinAcc{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            ", accNum='" + getAccNum() + "'" +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", balance=" + getBalance() +
            ", isCreditCard='" + isIsCreditCard() + "'" +
            ", dueDate='" + getDueDate() + "'" +
            ", closingDate='" + getClosingDate() + "'" +
            "}";
    }
}
