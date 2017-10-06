package com.calderon.sf.service;

import com.calderon.sf.domain.AccountTransaction;
import com.calderon.sf.domain.FinanceAccount;
import com.calderon.sf.domain.enumeration.TranType;
import com.calderon.sf.repository.AccountTransactionRepository;
import com.calderon.sf.repository.FinanceAccountRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
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

    public List<AccountTransaction> save(List<AccountTransaction> transactions) {
        FinanceAccount account = transactions.get(0).getFinanceAccount();
        transactions.stream().forEach(tran -> {
            account.setBalance(calcNewBalance(account.getBalance(), tran.getAmount(), tran.getTranType()== TranType.INCOME));
        });
        List<AccountTransaction> transactionPersited = tranRepository.save(transactions);
        accountRepository.save(account);
        return transactionPersited;
    }

    public void delete(Long id) {
        AccountTransaction tran = tranRepository.getOne(id);
        FinanceAccount account = tran.getFinanceAccount();
        account.setBalance(calcNewBalance(account.getBalance(), tran.getAmount(), tran.getTranType()== TranType.INCOME));
        tranRepository.delete(id);
        accountRepository.save(account);
    }
}
