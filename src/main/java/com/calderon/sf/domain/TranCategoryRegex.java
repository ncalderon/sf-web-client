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
 * A TranCategoryRegex.
 */
@Entity
@Table(name = "tran_category_regex")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TranCategoryRegex implements Serializable {

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

    @NotNull
    @Column(name = "regex", nullable = false)
    private String regex;

    @OneToMany(mappedBy = "tranCategoryRegex")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TranCategory> tranCategories = new HashSet<>();

    @ManyToOne
    private User user;

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

    public TranCategoryRegex name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public TranCategoryRegex description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRegex() {
        return regex;
    }

    public TranCategoryRegex regex(String regex) {
        this.regex = regex;
        return this;
    }

    public void setRegex(String regex) {
        this.regex = regex;
    }

    public Set<TranCategory> getTranCategories() {
        return tranCategories;
    }

    public TranCategoryRegex tranCategories(Set<TranCategory> tranCategories) {
        this.tranCategories = tranCategories;
        return this;
    }

    public TranCategoryRegex addTranCategory(TranCategory tranCategory) {
        this.tranCategories.add(tranCategory);
        tranCategory.setTranCategoryRegex(this);
        return this;
    }

    public TranCategoryRegex removeTranCategory(TranCategory tranCategory) {
        this.tranCategories.remove(tranCategory);
        tranCategory.setTranCategoryRegex(null);
        return this;
    }

    public void setTranCategories(Set<TranCategory> tranCategories) {
        this.tranCategories = tranCategories;
    }

    public User getUser() {
        return user;
    }

    public TranCategoryRegex user(User user) {
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
        TranCategoryRegex tranCategoryRegex = (TranCategoryRegex) o;
        if (tranCategoryRegex.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tranCategoryRegex.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TranCategoryRegex{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", regex='" + getRegex() + "'" +
            "}";
    }
}
