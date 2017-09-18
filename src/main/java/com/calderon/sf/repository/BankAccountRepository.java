package com.calderon.sf.repository;

import com.calderon.sf.domain.BankAccount;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the BankAccount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BankAccountRepository extends JpaRepository<BankAccount, Long> {

    @Query("select bank_account from BankAccount bank_account where bank_account.user.login = ?#{principal.username}")
    List<BankAccount> findByUserIsCurrentUser();

    @Query("select bank_account from BankAccount bank_account where bank_account.user.login = ?#{principal.username}")
    Page<BankAccount> findByUserIsCurrentUser(Pageable pageable);


}
