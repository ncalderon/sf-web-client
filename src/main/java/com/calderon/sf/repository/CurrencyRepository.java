package com.calderon.sf.repository;

import com.calderon.sf.domain.Currency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@SuppressWarnings("unused")
@Repository
public interface CurrencyRepository  extends JpaRepository<Currency, Long> {
    Currency findOneByIsDefaultIsTrue();
}
