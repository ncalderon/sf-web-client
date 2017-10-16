package com.calderon.sf.domain.predicates;

public class SearchCriteria {
    private String key;
    private String operation;
    private Object value;

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public Object getValue() {
        return value;
    }

    public void setValue(Object value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SearchCriteria)) return false;

        SearchCriteria that = (SearchCriteria) o;

        if (key != null ? !key.equals(that.key) : that.key != null) return false;
        if (operation != null ? !operation.equals(that.operation) : that.operation != null) return false;
        return value.equals(that.value);
    }

    @Override
    public int hashCode() {
        int result = key != null ? key.hashCode() : 0;
        result = 31 * result + (operation != null ? operation.hashCode() : 0);
        result = 31 * result + value.hashCode();
        return result;
    }
}
