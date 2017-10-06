package com.calderon.sf.service;

import com.calderon.sf.domain.TranCategory;
import com.calderon.sf.domain.User;
import com.calderon.sf.repository.FinanceAccountRepository;
import com.calderon.sf.repository.TranCategoryRegexRepository;
import com.calderon.sf.repository.TranCategoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserSetupService {
    private final Logger log = LoggerFactory.getLogger(UserSetupService.class);

    private final TranCategoryRepository categoryRepository;
    private final TranCategoryRegexRepository categoryRegexRepository;
    private final FinanceAccountRepository accountRepository;

    public UserSetupService(TranCategoryRepository categoryRepository, TranCategoryRegexRepository categoryRegexRepository, FinanceAccountRepository accountRepository) {
        this.categoryRepository = categoryRepository;
        this.categoryRegexRepository = categoryRegexRepository;
        this.accountRepository = accountRepository;
    }

    public void createDefaultsForUser(User user){

    }

    private List<TranCategory> defaultCategories(User user){
        List<TranCategory> tranCategories = new ArrayList<>();
        return tranCategories;
    }
}
