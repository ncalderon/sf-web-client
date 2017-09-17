package com.calderon.sf.repository;

import com.calderon.sf.domain.AccountTransaction;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the AccountTransaction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccountTransactionRepository extends JpaRepository<AccountTransaction, Long> {

    @Query("select account_transaction from AccountTransaction account_transaction where account_transaction.user.login = ?#{principal.username}")
    List<AccountTransaction> findByUserIsCurrentUser();

}
