package com.calderon.sf.repository;

import com.calderon.sf.domain.AccountTransaction;
import com.calderon.sf.domain.projections.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.time.LocalDate;
import java.util.List;

/**
 * Spring Data JPA repository for the AccountTransaction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccountTransactionRepository extends JpaRepository<AccountTransaction, Long> {

    @Query("select account_transaction from AccountTransaction account_transaction where account_transaction.user.login = ?#{principal.username}")
    List<AccountTransaction> findByUserIsCurrentUser();

    @Query("select account_transaction from AccountTransaction account_transaction where account_transaction.user.login = ?#{principal.username}")
    Page<AccountTransaction> findByUserIsCurrentUser(Pageable pageable);

    @Query("select account_transaction from AccountTransaction account_transaction where account_transaction.user.login = ?#{principal.username} and account_transaction.financeAccount.id = ?1")
    List<AccountTransaction> findByUserIsCurrentUserAndFinanceAccount_Id(Long accountId);

    @Query("select account_transaction from AccountTransaction account_transaction where account_transaction.user.login = ?#{principal.username} and account_transaction.financeAccount.id = ?1")
    Page<AccountTransaction> findByUserIsCurrentUserAndFinanceAccount_Id(Long accountId, Pageable pageable);

    @Query("select account_transaction from AccountTransaction account_transaction where account_transaction.user.login = ?#{principal.username} and account_transaction.financeAccount.id = ?1 and account_transaction.postDate >= ?2 and account_transaction.postDate <= ?3")
    List<AccountTransaction> findByUserIsCurrentUserAndFinanceAccount_IdAndPostDateGreaterThanEqualAndPostDateLessThanEqual(Long accountId, LocalDate startDate, LocalDate endDate);

    @Query("select account_transaction from AccountTransaction account_transaction where account_transaction.user.login = ?#{principal.username} and account_transaction.financeAccount.id in (?1) and account_transaction.postDate >= ?2 and account_transaction.postDate <= ?3")
    List<AccountTransaction> findByUserIsCurrentUserAndFinanceAccount_IdIsInAndPostDateGreaterThanEqualAndPostDateLessThanEqual(long[] accountsId, LocalDate startDate, LocalDate endDate);

    @Query("select account_transaction from AccountTransaction account_transaction where account_transaction.user.login = ?#{principal.username} and account_transaction.postDate >= ?1 and account_transaction.postDate <= ?2")
    List<AccountTransaction> findByUserIsCurrentUserAndPostDateGreaterThanEqualAndPostDateLessThanEqual(LocalDate startDate, LocalDate endDate);

}
