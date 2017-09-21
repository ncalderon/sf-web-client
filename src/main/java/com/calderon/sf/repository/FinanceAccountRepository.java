package com.calderon.sf.repository;

import com.calderon.sf.domain.FinanceAccount;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the FinanceAccount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FinanceAccountRepository extends JpaRepository<FinanceAccount, Long> {

    @Query("select finance_account from FinanceAccount finance_account where finance_account.user.login = ?#{principal.username}")
    List<FinanceAccount> findByUserIsCurrentUser();

}
