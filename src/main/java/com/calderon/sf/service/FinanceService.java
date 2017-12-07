package com.calderon.sf.service;

import com.calderon.sf.domain.AccountTransaction;
import com.calderon.sf.domain.FinanceAccount;
import com.calderon.sf.domain.enumeration.PaymentMethod;
import com.calderon.sf.domain.enumeration.TranType;
import com.calderon.sf.domain.projections.Transaction;
import com.calderon.sf.repository.AccountTransactionRepository;
import com.calderon.sf.repository.FinanceAccountRepository;
import com.querydsl.core.types.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

@Service
public class FinanceService {
    private AccountTransactionRepository tranRepository;
    private FinanceAccountRepository accountRepository;

    public FinanceService(AccountTransactionRepository tranRepository, FinanceAccountRepository accountRepository) {
        this.tranRepository = tranRepository;
        this.accountRepository = accountRepository;
    }

    public List<AccountTransaction> findTransactionBy(Long accountId){
        return tranRepository.findByUserIsCurrentUserAndFinanceAccount_Id(accountId);
    }

    public Page<AccountTransaction> findTransactionBy(Long accountId, Pageable page){
        return tranRepository.findByUserIsCurrentUserAndFinanceAccount_Id(accountId, page);
    }

    public Page<AccountTransaction> findTransactionBy(Predicate predicate, Pageable page){
        return tranRepository.findAll(predicate, page);
    }

    public Page<AccountTransaction> findTransactionBy(FinanceAccount account, Pageable pageable){
        return tranRepository.findByUserIsCurrentUserAndFinanceAccount_Id(account.getId(), pageable);
    }

    public List<AccountTransaction> findTransactionBy(Long accountId, LocalDate start, LocalDate end) {
        return tranRepository.findByUserIsCurrentUserAndFinanceAccount_IdAndPostDateGreaterThanEqualAndPostDateLessThanEqual(accountId, start, end);
    }

    public List<AccountTransaction> findTransactionBy(LocalDate start, LocalDate end) {
        return tranRepository.findByUserIsCurrentUserAndPostDateGreaterThanEqualAndPostDateLessThanEqual(start, end);
    }

    public List<AccountTransaction> findTransactionBy(long[] accountId, LocalDate start, LocalDate end) {
        return tranRepository.findByUserIsCurrentUserAndFinanceAccount_IdIsInAndPostDateGreaterThanEqualAndPostDateLessThanEqual(accountId, start, end);
    }

    @Transactional
    public AccountTransaction saveTransaction(AccountTransaction tran){
        FinanceAccount account = tran.getFinanceAccount();
        if(tran.getId() != null) {
            BigDecimal oldAmount = new BigDecimal(0);
            AccountTransaction currentTran = this.tranRepository.findOne(tran.getId());
            if(currentTran.getTranType() == TranType.INCOME)
                oldAmount = currentTran.getAmount().negate();
            else
                oldAmount = currentTran.getAmount();
            account.setBalance(account.getBalance().add(oldAmount));
        }
        AccountTransaction transaction = tranRepository.save(tran);
        updateBalanceAccount(account, Stream.of(transaction));
        return transaction;
    }

    private void updateBalanceAccount(FinanceAccount account, AccountTransaction transaction){
        updateBalanceAccount(account, Stream.of(transaction));
    }

    private void updateBalanceAccount(FinanceAccount account, List<AccountTransaction> transactions){
        updateBalanceAccount(account, transactions.stream());
    }

    private void updateBalanceAccount(FinanceAccount account, Stream<AccountTransaction> transactions){
        BigDecimal currentBalance = account.getBalance();
        account.setBalance(transactions.map((t) -> {
            if(t.getTranType()== TranType.INCOME)
                return t.getAmount();
            else
                return t.getAmount().negate();
        }).reduce(currentBalance, BigDecimal::add));
        saveAccount(account);
    }

    @Transactional
    public List<AccountTransaction> saveTransactions(List<AccountTransaction> transactions) {
        List<AccountTransaction> transactionSaved = tranRepository.save(transactions);
        updateBalanceAccount(transactions.get(0).getFinanceAccount(), transactions);
        return transactionSaved;
    }

    @Transactional
    public void deleteTransaction(Long id) {
        AccountTransaction tran = tranRepository.getOne(id);
        tranRepository.delete(id);
        tran.setAmount(tran.getAmount().negate());
        updateBalanceAccount(tran.getFinanceAccount(), tran);
    }

    public FinanceAccount saveAccount(FinanceAccount account) {
        return saveAccount(account, false);
    }

    public FinanceAccount saveAccount(FinanceAccount account, boolean createDefaultTrans){
        return saveAccounts(Arrays.asList(account), createDefaultTrans).get(0);
    }

    public List<FinanceAccount> saveAccounts(List<FinanceAccount> accounts){
        return saveAccounts(accounts);
    }

    public List<FinanceAccount> saveAccounts(List<FinanceAccount> accounts, boolean createDefaultTrans){
        List<FinanceAccount> persistedAccounts = accountRepository.save(accounts);
        persistedAccounts.forEach(account -> {
            if(createDefaultTrans)
                saveTransactions(createDefaultTransactions(account));
        });
        return persistedAccounts;
    }

    private List<AccountTransaction> createDefaultTransactions(FinanceAccount account){
        List<AccountTransaction> transactions = new ArrayList<>();
        transactions.add(
            new AccountTransaction()
                .amount(account.getBalance())
                .description("Initial Balance")
                .paymentMethod(PaymentMethod.UNSPECIFIED)
                .postDate(LocalDate.now())
                .tranType(TranType.INCOME)
                .user(account.getUser())
                .financeAccount(account));
        account.setBalance(new BigDecimal(0));
        return transactions;
    }

    public Page<FinanceAccount> findAccounts(Pageable pageable) {
        return accountRepository.findAll(pageable);
    }

    public FinanceAccount findAccount(Long id) {
        return accountRepository.findOne(id);
    }


    public void deleteAccount(Long id) {
        accountRepository.delete(id);
    }

    public Page<FinanceAccount> findAccountsByCurrentUserAndActive(Pageable pageable) {
        return accountRepository.findByUserIsCurrentUserAndAccountStatusIsActive(pageable);
    }
}
