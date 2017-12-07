package com.calderon.sf.service;

import com.calderon.sf.domain.FinanceAccount;
import com.calderon.sf.domain.TranCategory;
import com.calderon.sf.domain.User;
import com.calderon.sf.domain.enumeration.AccountStatus;
import com.calderon.sf.repository.TranCategoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserSetupService {
    private final Logger log = LoggerFactory.getLogger(UserSetupService.class);

    private final TranCategoryRepository categoryRepository;
    private final FinanceService financeService;

    public UserSetupService(TranCategoryRepository categoryRepository, FinanceService financeService) {
        this.categoryRepository = categoryRepository;
        this.financeService = financeService;
    }

    public void createDefaultsForUser(User user){
        categoryRepository.save(defaultCategories(user));
        financeService.saveAccounts(defaultAccounts(user), true);
    }

    private List<TranCategory> defaultCategories(User user){
        List<TranCategory> tranCategories = new ArrayList<>();
        tranCategories.add(new TranCategory().description("Others").name("Others").user(user));
        tranCategories.add(new TranCategory().description("Automobile").name("Automobile").user(user));
        tranCategories.add(new TranCategory().description("Fuel").name("Fuel").user(user));
        tranCategories.add(new TranCategory().description("Insurance").name("Insurance").user(user));
        tranCategories.add(new TranCategory().description("Maintenance").name("Maintenance").user(user));
        tranCategories.add(new TranCategory().description("Mileage").name("Mileage").user(user));
        tranCategories.add(new TranCategory().description("Registration").name("Registration").user(user));
        tranCategories.add(new TranCategory().description("AAA or Road Services").name("AAA or Road Services").user(user));

        tranCategories.add(new TranCategory().description("Entertainment").name("Entertainment").user(user));
        tranCategories.add(new TranCategory().description("Concert").name("Concert").user(user));
        tranCategories.add(new TranCategory().description("Movies").name("Movies").user(user));
        tranCategories.add(new TranCategory().description("Party").name("Party").user(user));
        tranCategories.add(new TranCategory().description("Sports").name("Sports").user(user));

        tranCategories.add(new TranCategory().description("Family").name("Family").user(user));
        tranCategories.add(new TranCategory().description("Child Care").name("Child Care").user(user));
        tranCategories.add(new TranCategory().description("Child Education").name("Child Education").user(user));

        tranCategories.add(new TranCategory().description("Food").name("Food").user(user));
        tranCategories.add(new TranCategory().description("Restaurant").name("Restaurant").user(user));
        tranCategories.add(new TranCategory().description("Groceries").name("Groceries").user(user));
        tranCategories.add(new TranCategory().description("Snack").name("Snack").user(user));


        tranCategories.add(new TranCategory().description("Health Care").name("Health Care").user(user));
        tranCategories.add(new TranCategory().description("Dental").name("Dental").user(user));
        tranCategories.add(new TranCategory().description("Eye Care").name("Eye Care").user(user));
        tranCategories.add(new TranCategory().description("Health Insurance").name("Health Insurance").user(user));
        tranCategories.add(new TranCategory().description("Medical Preescription").name("Medical Preescription").user(user));
        tranCategories.add(new TranCategory().description("Nutrition").name("Nutrition").user(user));

        tranCategories.add(new TranCategory().description("Home Office").name("Home Office").user(user));
        tranCategories.add(new TranCategory().description("Computer").name("Computer").user(user));
        tranCategories.add(new TranCategory().description("Electronics").name("Electronics").user(user));
        tranCategories.add(new TranCategory().description("Stationery").name("Stationery").user(user));
        tranCategories.add(new TranCategory().description("Office Furniture").name("Office Furniture").user(user));
        tranCategories.add(new TranCategory().description("Office Supply").name("Office Supply").user(user));

        tranCategories.add(new TranCategory().description("Household").name("Household").user(user));
        tranCategories.add(new TranCategory().description("Appliance").name("Appliance").user(user));
        tranCategories.add(new TranCategory().description("Consumables").name("Consumables").user(user));
        tranCategories.add(new TranCategory().description("Home Maintenance").name("Home Maintenance").user(user));
        tranCategories.add(new TranCategory().description("Homeowner Fees").name("Homeowner Fees").user(user));
        tranCategories.add(new TranCategory().description("Household Tools").name("Household Tools").user(user));
        tranCategories.add(new TranCategory().description("Postage").name("Postage").user(user));
        tranCategories.add(new TranCategory().description("Rent").name("Rent").user(user));
        tranCategories.add(new TranCategory().description("Miscellaneous Household Items").name("Miscellaneous Household Items").user(user));

        tranCategories.add(new TranCategory().description("Insurance Fees").name("Insurance Fees").user(user));
        tranCategories.add(new TranCategory().description("Auto").name("Auto").user(user));
        tranCategories.add(new TranCategory().description("Health").name("Health").user(user));
        tranCategories.add(new TranCategory().description("Home").name("Home").user(user));
        tranCategories.add(new TranCategory().description("Life").name("Life").user(user));

        tranCategories.add(new TranCategory().description("Loans").name("Loans").user(user));
        tranCategories.add(new TranCategory().description("Auto").name("Auto").user(user));
        tranCategories.add(new TranCategory().description("Home Equity").name("Home Equity").user(user));
        tranCategories.add(new TranCategory().description("Mortgage").name("Mortgage").user(user));
        tranCategories.add(new TranCategory().description("Student").name("Student").user(user));

        tranCategories.add(new TranCategory().description("Personal").name("Personal").user(user));
        tranCategories.add(new TranCategory().description("Clothing").name("Clothing").user(user));
        tranCategories.add(new TranCategory().description("Donation").name("Donation").user(user));
        tranCategories.add(new TranCategory().description("Gift").name("Gift").user(user));
        tranCategories.add(new TranCategory().description("Personal Care").name("Personal Care").user(user));
        tranCategories.add(new TranCategory().description("Others").name("Others").user(user));

        tranCategories.add(new TranCategory().description("Tax").name("Tax").user(user));
        tranCategories.add(new TranCategory().description("Property Tax").name("Property Tax").user(user));

        tranCategories.add(new TranCategory().description("Utilities").name("Utilities").user(user));
        tranCategories.add(new TranCategory().description("Cable TV").name("Cable TV").user(user));
        tranCategories.add(new TranCategory().description("Garbage").name("Garbage").user(user));
        tranCategories.add(new TranCategory().description("Electric").name("Electric").user(user));
        tranCategories.add(new TranCategory().description("Gas").name("Gas").user(user));
        tranCategories.add(new TranCategory().description("Internet").name("Internet").user(user));
        tranCategories.add(new TranCategory().description("Telephone").name("Telephone").user(user));
        tranCategories.add(new TranCategory().description("Water").name("Water").user(user));
        return tranCategories;
    }

    private List<FinanceAccount> defaultAccounts(User user){
        List<FinanceAccount> accounts = new ArrayList<>();
        BigDecimal startBalance = new BigDecimal(0);
        accounts.add(new FinanceAccount().accountNumber("1").accountStatus(AccountStatus.ACTIVE).name("Wallet").description("Wallet").isCreditCard(false).user(user).balance(startBalance));
        accounts.add(new FinanceAccount().accountNumber("0000002").accountStatus(AccountStatus.ACTIVE).name("Saving Account").description("Saving Account").isCreditCard(false).user(user).balance(startBalance));
        accounts.add(new FinanceAccount().accountNumber("************0003").accountStatus(AccountStatus.ACTIVE).name("Credit Card").description("Credit Card").isCreditCard(true).user(user).balance(startBalance));
        return accounts;
    }


}
