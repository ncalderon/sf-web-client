package com.calderon.sf.service;

import com.calderon.sf.domain.AccountTransaction;
import com.calderon.sf.domain.FinanceAccount;
import com.calderon.sf.domain.enumeration.PaymentMethod;
import com.calderon.sf.domain.enumeration.TranType;
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
import java.util.List;

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

    /*public Page<AccountTransaction> findTransactionBy(Long accountId, Pageable page, Predicate predicate){
        return tranRepository.findByUserIsCurrentUserAndFinanceAccount_Id(accountId, page, predicate);
    }*/

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
        account.setBalance(calcNewBalance(account.getBalance(), tran.getAmount(), tran.getTranType()== TranType.INCOME));
        AccountTransaction transaction = tranRepository.save(tran);
        accountRepository.save(account);
        return transaction;
    }

    private BigDecimal calcNewBalance(BigDecimal currentBalance, BigDecimal tranValue, boolean isIncomeType){
        if (isIncomeType)
            return currentBalance.add(tranValue);
        else
            return currentBalance.subtract(tranValue);
    }

    @Transactional
    public List<AccountTransaction> saveTransactions(List<AccountTransaction> transactions) {
        FinanceAccount account = transactions.get(0).getFinanceAccount();
        transactions.stream().forEach(tran -> {
            account.setBalance(calcNewBalance(account.getBalance(), tran.getAmount(), tran.getTranType()== TranType.INCOME));
        });
        List<AccountTransaction> transactionPersited = tranRepository.save(transactions);
        accountRepository.save(account);
        return transactionPersited;
    }

    @Transactional
    public void deleteTransaction(Long id) {
        AccountTransaction tran = tranRepository.getOne(id);
        FinanceAccount account = tran.getFinanceAccount();
        account.setBalance(calcNewBalance(account.getBalance(), tran.getAmount(), tran.getTranType()== TranType.INCOME));
        tranRepository.delete(id);
        accountRepository.save(account);
    }

    public FinanceAccount saveAccount(FinanceAccount account) {
        return saveAccount(account, true);
    }

    public FinanceAccount saveAccount(FinanceAccount account, boolean createDefaultTrans){
        FinanceAccount persistedAccount = accountRepository.save(account);
        if(createDefaultTrans)
            saveTransactions(createDefaultTransactions(persistedAccount));
        return persistedAccount;
    }

    public List<FinanceAccount> saveAccounts(List<FinanceAccount> accounts){
        return saveAccounts(accounts, true);
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
        transactions.add(new AccountTransaction().amount(new BigDecimal(0)).description("Initial Balance").paymentMethod(PaymentMethod.UNSPECIFIED).postDate(LocalDate.now()).tranType(TranType.INCOME).user(account.getUser()).financeAccount(account));
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
}
