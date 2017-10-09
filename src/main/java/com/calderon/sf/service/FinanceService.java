package com.calderon.sf.service;

import com.calderon.sf.domain.AccountTransaction;
import com.calderon.sf.domain.FinanceAccount;
import com.calderon.sf.domain.enumeration.PaymentMethod;
import com.calderon.sf.domain.enumeration.TranType;
import com.calderon.sf.repository.AccountTransactionRepository;
import com.calderon.sf.repository.FinanceAccountRepository;
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

    @Transactional
    public AccountTransaction save(AccountTransaction tran){
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
    public List<AccountTransaction> save(List<AccountTransaction> transactions) {
        FinanceAccount account = transactions.get(0).getFinanceAccount();
        transactions.stream().forEach(tran -> {
            account.setBalance(calcNewBalance(account.getBalance(), tran.getAmount(), tran.getTranType()== TranType.INCOME));
        });
        List<AccountTransaction> transactionPersited = tranRepository.save(transactions);
        accountRepository.save(account);
        return transactionPersited;
    }

    @Transactional
    public void delete(Long id) {
        AccountTransaction tran = tranRepository.getOne(id);
        FinanceAccount account = tran.getFinanceAccount();
        account.setBalance(calcNewBalance(account.getBalance(), tran.getAmount(), tran.getTranType()== TranType.INCOME));
        tranRepository.delete(id);
        accountRepository.save(account);
    }

    public FinanceAccount save(FinanceAccount account) {
        return save(account, true);
    }

    public FinanceAccount save(FinanceAccount account, boolean createDefaultTrans){
        FinanceAccount persistedAccount = accountRepository.save(account);
        if(createDefaultTrans)
            save(createDefaultTransactiions(persistedAccount));
        return persistedAccount;
    }

    public List<FinanceAccount> save(List<FinanceAccount> accounts){
        save(accounts, true);
    }

    public List<FinanceAccount> save(List<FinanceAccount> accounts, boolean createDefaultTrans){
        List<FinanceAccount> persistedAccounts = accountRepository.save(accounts);
        persistedAccounts.forEach(account -> {
            if(createDefaultTrans)
                save(createDefaultTransactiions(account));
        });
        return persistedAccounts;
    }

    private List<AccountTransaction> createDefaultTransactiions(FinanceAccount account){
        List<AccountTransaction> transactions = new ArrayList<>();
        transactions.add(new AccountTransaction().amount(new BigDecimal(0)).description("Initial Balance").paymentMethod(PaymentMethod.UNSPECIFIED).postDate(LocalDate.now()).tranType(TranType.INCOME).user(account.getUser()).financeAccount(account));
        return transactions;
    }
}
