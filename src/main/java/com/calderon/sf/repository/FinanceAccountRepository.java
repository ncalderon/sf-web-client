package com.calderon.sf.repository;

import com.calderon.sf.domain.FinanceAccount;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA repository for the FinanceAccount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FinanceAccountRepository extends JpaRepository<FinanceAccount, Long> {

    @Query("select finance_account from FinanceAccount finance_account where finance_account.user.login = ?#{principal.username}")
    List<FinanceAccount> findByUserIsCurrentUser();

    @Query("select finance_account from FinanceAccount finance_account where finance_account.user.login = ?#{principal.username} and finance_account.accountStatus = 'ACTIVE'")
    Page<FinanceAccount> findByUserIsCurrentUserAndAccountStatusIsActive(Pageable pageable);

    @Query("select finance_account from FinanceAccount finance_account where finance_account.user.login = ?#{principal.username} and finance_account.id = ?1")
    FinanceAccount findOneByIdAndUserIsCurrentUser(Long id);
}
