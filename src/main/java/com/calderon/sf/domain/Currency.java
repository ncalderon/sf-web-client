package com.calderon.sf.domain;

import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "currency")
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Currency extends AbstractAuditingEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "is_default")
    private Boolean isDefault;
    @NotNull
    @Size(min = 4, max = 64)
    @Column(name = "code", length = 64, nullable = false)
    private String code;
    @NotNull
    @Size(min = 4, max = 64)
    @Column(name = "name", length = 64, nullable = false)
    private String name;
    @NotNull
    @Column(name = "jsonval", nullable = false)
    private String jsonVal;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isDefault() {
        return isDefault;
    }

    public void setDefault(boolean aDefault) {
        isDefault = aDefault;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getJsonVal() {
        return jsonVal;
    }

    public void setJsonVal(String jsonVal) {
        this.jsonVal = jsonVal;
    }

    public Currency id(Long id) {
        this.id = id;
        return this;
    }

    public Currency isDefault(boolean isDefault) {
        isDefault = isDefault;
        return this;
    }

    public Currency code(String code) {
        this.code = code;
        return this;
    }

    public Currency name(String name) {
        this.name = name;
        return this;
    }

    public Currency jsonVal(String jsonVal) {
        this.jsonVal = jsonVal;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Currency)) return false;
        Currency currency = (Currency) o;
        return Objects.equals(getId(), currency.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Currency{" +
            "id=" + getId() +
            ", isDefault=" + isDefault() +
            ", code='" + getCode() + '\'' +
            ", name='" + getName() + '\'' +
            ", jsonVal='" + getJsonVal() + '\'' +
            '}';
    }
}
