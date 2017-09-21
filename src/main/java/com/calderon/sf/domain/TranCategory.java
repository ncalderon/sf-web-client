package com.calderon.sf.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TranCategory.
 */
@Entity
@Table(name = "tran_category")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TranCategory extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 4, max = 64)
    @Column(name = "name", length = 64, nullable = false)
    private String name;

    @Size(max = 512)
    @Column(name = "description", length = 512)
    private String description;

    @OneToMany(mappedBy = "tranCategory")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AccountTransaction> transactions = new HashSet<>();

    @ManyToOne
    private User user;

    @ManyToOne
    private TranCategoryRegex tranCategoryRegex;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public TranCategory name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public TranCategory description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<AccountTransaction> getTransactions() {
        return transactions;
    }

    public TranCategory transactions(Set<AccountTransaction> accountTransactions) {
        this.transactions = accountTransactions;
        return this;
    }

    public TranCategory addTransaction(AccountTransaction accountTransaction) {
        this.transactions.add(accountTransaction);
        accountTransaction.setTranCategory(this);
        return this;
    }

    public TranCategory removeTransaction(AccountTransaction accountTransaction) {
        this.transactions.remove(accountTransaction);
        accountTransaction.setTranCategory(null);
        return this;
    }

    public void setTransactions(Set<AccountTransaction> accountTransactions) {
        this.transactions = accountTransactions;
    }

    public User getUser() {
        return user;
    }

    public TranCategory user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public TranCategoryRegex getTranCategoryRegex() {
        return tranCategoryRegex;
    }

    public TranCategory tranCategoryRegex(TranCategoryRegex tranCategoryRegex) {
        this.tranCategoryRegex = tranCategoryRegex;
        return this;
    }

    public void setTranCategoryRegex(TranCategoryRegex tranCategoryRegex) {
        this.tranCategoryRegex = tranCategoryRegex;
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
        TranCategory tranCategory = (TranCategory) o;
        if (tranCategory.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tranCategory.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TranCategory{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
