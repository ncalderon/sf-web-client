package com.calderon.sf.service;

import com.calderon.sf.domain.AccountTransaction;
import com.calderon.sf.domain.FinanceAccount;
import com.calderon.sf.domain.TranCategory;
import com.calderon.sf.domain.User;
import com.calderon.sf.domain.enumeration.AccountStatus;
import com.calderon.sf.domain.enumeration.PaymentMethod;
import com.calderon.sf.domain.enumeration.TranType;
import com.calderon.sf.repository.AccountTransactionRepository;
import com.calderon.sf.repository.FinanceAccountRepository;
import com.calderon.sf.repository.TranCategoryRegexRepository;
import com.calderon.sf.repository.TranCategoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserSetupService {
    private final Logger log = LoggerFactory.getLogger(UserSetupService.class);

    private final TranCategoryRepository categoryRepository;
    private final FinanceAccountRepository accountRepository;
    private final AccountTransactionRepository transactionRepository;

    public UserSetupService(TranCategoryRepository categoryRepository, FinanceAccountRepository accountRepository, AccountTransactionRepository transactionRepository) {
        this.categoryRepository = categoryRepository;
        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
    }

    public void createDefaultsForUser(User user){
        categoryRepository.save(defaultCategories(user));
        List<FinanceAccount> accounts = accountRepository.save(defaultAccounts(user));
        accounts.forEach(financeAccount -> {
            transactionRepository.save(defaultTransactions(financeAccount, user));
        });
    }

    private List<TranCategory> defaultCategories(User user){
        List<TranCategory> tranCategories = new ArrayList<>();
        tranCategories.add(new TranCategory().description("Others").name("Others").user(user));
        return tranCategories;
    }

    private List<FinanceAccount> defaultAccounts(User user){
        List<FinanceAccount> accounts = new ArrayList<>();
        accounts.add(new FinanceAccount().accountNumber("0000001").accountStatus(AccountStatus.ACTIVE).name("Wallet").isCreditCard(false).user(user));
        accounts.add(new FinanceAccount().accountNumber("0000002").accountStatus(AccountStatus.ACTIVE).name("Saving Account").isCreditCard(false).user(user));
        accounts.add(new FinanceAccount().accountNumber("0000003").accountStatus(AccountStatus.ACTIVE).name("Credit Card").isCreditCard(true).user(user));
        return accounts;
    }

    private List<AccountTransaction> defaultTransactions(FinanceAccount account, User user){
        List<AccountTransaction> transactions = new ArrayList<>();
        transactions.add(new AccountTransaction().amount(new BigDecimal(0)).description("Initial Balance").paymentMethod(PaymentMethod.UNSPECIFIED).postDate(LocalDate.now()).tranType(TranType.INCOME).user(user).financeAccount(account));
        return transactions;
    }
}
