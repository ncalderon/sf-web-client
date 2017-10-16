package com.calderon.sf.web.rest;

import com.calderon.sf.SfWebClientApp;

import com.calderon.sf.domain.FinanceAccount;
import com.calderon.sf.repository.AccountTransactionRepository;
import com.calderon.sf.repository.FinanceAccountRepository;
import com.calderon.sf.service.FinanceService;
import com.calderon.sf.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.calderon.sf.domain.enumeration.AccountStatus;
/**
 * Test class for the FinanceAccountResource REST controller.
 *
 * @see FinanceAccountResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SfWebClientApp.class)
public class FinanceAccountResourceIntTest {

    private static final AccountStatus DEFAULT_ACCOUNT_STATUS = AccountStatus.INACTIVE;
    private static final AccountStatus UPDATED_ACCOUNT_STATUS = AccountStatus.ACTIVE;

    private static final String DEFAULT_ACCOUNT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_ACCOUNT_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_BALANCE = new BigDecimal(1);
    private static final BigDecimal UPDATED_BALANCE = new BigDecimal(2);

    private static final Boolean DEFAULT_IS_CREDIT_CARD = false;
    private static final Boolean UPDATED_IS_CREDIT_CARD = true;

    private static final LocalDate DEFAULT_DUE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DUE_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_CLOSING_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CLOSING_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private FinanceAccountRepository financeAccountRepository;

    @Autowired
    private FinanceService financeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFinanceAccountMockMvc;

    private FinanceAccount financeAccount;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FinanceAccountResource financeAccountResource = new FinanceAccountResource(financeService);
        this.restFinanceAccountMockMvc = MockMvcBuilders.standaloneSetup(financeAccountResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FinanceAccount createEntity(EntityManager em) {
        FinanceAccount financeAccount = new FinanceAccount()
            .accountStatus(DEFAULT_ACCOUNT_STATUS)
            .accountNumber(DEFAULT_ACCOUNT_NUMBER)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .balance(DEFAULT_BALANCE)
            .isCreditCard(DEFAULT_IS_CREDIT_CARD)
            .dueDate(DEFAULT_DUE_DATE)
            .closingDate(DEFAULT_CLOSING_DATE);
        return financeAccount;
    }

    @Before
    public void initTest() {
        financeAccount = createEntity(em);
    }

    @Test
    @Transactional
    public void createFinanceAccount() throws Exception {
        int databaseSizeBeforeCreate = financeAccountRepository.findAll().size();

        // Create the FinanceAccount
        restFinanceAccountMockMvc.perform(post("/api/finance-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(financeAccount)))
            .andExpect(status().isCreated());

        // Validate the FinanceAccount in the database
        List<FinanceAccount> financeAccountList = financeAccountRepository.findAll();
        assertThat(financeAccountList).hasSize(databaseSizeBeforeCreate + 1);
        FinanceAccount testFinanceAccount = financeAccountList.get(financeAccountList.size() - 1);
        assertThat(testFinanceAccount.getAccountStatus()).isEqualTo(DEFAULT_ACCOUNT_STATUS);
        assertThat(testFinanceAccount.getAccountNumber()).isEqualTo(DEFAULT_ACCOUNT_NUMBER);
        assertThat(testFinanceAccount.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testFinanceAccount.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testFinanceAccount.getBalance()).isEqualTo(DEFAULT_BALANCE);
        assertThat(testFinanceAccount.isIsCreditCard()).isEqualTo(DEFAULT_IS_CREDIT_CARD);
        assertThat(testFinanceAccount.getDueDate()).isEqualTo(DEFAULT_DUE_DATE);
        assertThat(testFinanceAccount.getClosingDate()).isEqualTo(DEFAULT_CLOSING_DATE);
    }

    @Test
    @Transactional
    public void createFinanceAccountWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = financeAccountRepository.findAll().size();

        // Create the FinanceAccount with an existing ID
        financeAccount.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFinanceAccountMockMvc.perform(post("/api/finance-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(financeAccount)))
            .andExpect(status().isBadRequest());

        // Validate the FinanceAccount in the database
        List<FinanceAccount> financeAccountList = financeAccountRepository.findAll();
        assertThat(financeAccountList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkAccountStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = financeAccountRepository.findAll().size();
        // set the field null
        financeAccount.setAccountStatus(null);

        // Create the FinanceAccount, which fails.

        restFinanceAccountMockMvc.perform(post("/api/finance-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(financeAccount)))
            .andExpect(status().isBadRequest());

        List<FinanceAccount> financeAccountList = financeAccountRepository.findAll();
        assertThat(financeAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = financeAccountRepository.findAll().size();
        // set the field null
        financeAccount.setName(null);

        // Create the FinanceAccount, which fails.

        restFinanceAccountMockMvc.perform(post("/api/finance-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(financeAccount)))
            .andExpect(status().isBadRequest());

        List<FinanceAccount> financeAccountList = financeAccountRepository.findAll();
        assertThat(financeAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFinanceAccounts() throws Exception {
        // Initialize the database
        financeAccountRepository.saveAndFlush(financeAccount);

        // Get all the financeAccountList
        restFinanceAccountMockMvc.perform(get("/api/finance-accounts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(financeAccount.getId().intValue())))
            .andExpect(jsonPath("$.[*].accountStatus").value(hasItem(DEFAULT_ACCOUNT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].accountNumber").value(hasItem(DEFAULT_ACCOUNT_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].balance").value(hasItem(DEFAULT_BALANCE.intValue())))
            .andExpect(jsonPath("$.[*].isCreditCard").value(hasItem(DEFAULT_IS_CREDIT_CARD.booleanValue())))
            .andExpect(jsonPath("$.[*].dueDate").value(hasItem(DEFAULT_DUE_DATE.toString())))
            .andExpect(jsonPath("$.[*].closingDate").value(hasItem(DEFAULT_CLOSING_DATE.toString())));
    }

    @Test
    @Transactional
    public void getFinanceAccount() throws Exception {
        // Initialize the database
        financeAccountRepository.saveAndFlush(financeAccount);

        // Get the financeAccount
        restFinanceAccountMockMvc.perform(get("/api/finance-accounts/{id}", financeAccount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(financeAccount.getId().intValue()))
            .andExpect(jsonPath("$.accountStatus").value(DEFAULT_ACCOUNT_STATUS.toString()))
            .andExpect(jsonPath("$.accountNumber").value(DEFAULT_ACCOUNT_NUMBER.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.balance").value(DEFAULT_BALANCE.intValue()))
            .andExpect(jsonPath("$.isCreditCard").value(DEFAULT_IS_CREDIT_CARD.booleanValue()))
            .andExpect(jsonPath("$.dueDate").value(DEFAULT_DUE_DATE.toString()))
            .andExpect(jsonPath("$.closingDate").value(DEFAULT_CLOSING_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFinanceAccount() throws Exception {
        // Get the financeAccount
        restFinanceAccountMockMvc.perform(get("/api/finance-accounts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFinanceAccount() throws Exception {
        // Initialize the database
        financeAccountRepository.saveAndFlush(financeAccount);
        int databaseSizeBeforeUpdate = financeAccountRepository.findAll().size();

        // Update the financeAccount
        FinanceAccount updatedFinanceAccount = financeAccountRepository.findOne(financeAccount.getId());
        updatedFinanceAccount
            .accountStatus(UPDATED_ACCOUNT_STATUS)
            .accountNumber(UPDATED_ACCOUNT_NUMBER)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .balance(UPDATED_BALANCE)
            .isCreditCard(UPDATED_IS_CREDIT_CARD)
            .dueDate(UPDATED_DUE_DATE)
            .closingDate(UPDATED_CLOSING_DATE);

        restFinanceAccountMockMvc.perform(put("/api/finance-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFinanceAccount)))
            .andExpect(status().isOk());

        // Validate the FinanceAccount in the database
        List<FinanceAccount> financeAccountList = financeAccountRepository.findAll();
        assertThat(financeAccountList).hasSize(databaseSizeBeforeUpdate);
        FinanceAccount testFinanceAccount = financeAccountList.get(financeAccountList.size() - 1);
        assertThat(testFinanceAccount.getAccountStatus()).isEqualTo(UPDATED_ACCOUNT_STATUS);
        assertThat(testFinanceAccount.getAccountNumber()).isEqualTo(UPDATED_ACCOUNT_NUMBER);
        assertThat(testFinanceAccount.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testFinanceAccount.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testFinanceAccount.getBalance()).isEqualTo(UPDATED_BALANCE);
        assertThat(testFinanceAccount.isIsCreditCard()).isEqualTo(UPDATED_IS_CREDIT_CARD);
        assertThat(testFinanceAccount.getDueDate()).isEqualTo(UPDATED_DUE_DATE);
        assertThat(testFinanceAccount.getClosingDate()).isEqualTo(UPDATED_CLOSING_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingFinanceAccount() throws Exception {
        int databaseSizeBeforeUpdate = financeAccountRepository.findAll().size();

        // Create the FinanceAccount

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFinanceAccountMockMvc.perform(put("/api/finance-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(financeAccount)))
            .andExpect(status().isCreated());

        // Validate the FinanceAccount in the database
        List<FinanceAccount> financeAccountList = financeAccountRepository.findAll();
        assertThat(financeAccountList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFinanceAccount() throws Exception {
        // Initialize the database
        financeAccountRepository.saveAndFlush(financeAccount);
        int databaseSizeBeforeDelete = financeAccountRepository.findAll().size();

        // Get the financeAccount
        restFinanceAccountMockMvc.perform(delete("/api/finance-accounts/{id}", financeAccount.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FinanceAccount> financeAccountList = financeAccountRepository.findAll();
        assertThat(financeAccountList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FinanceAccount.class);
        FinanceAccount financeAccount1 = new FinanceAccount();
        financeAccount1.setId(1L);
        FinanceAccount financeAccount2 = new FinanceAccount();
        financeAccount2.setId(financeAccount1.getId());
        assertThat(financeAccount1).isEqualTo(financeAccount2);
        financeAccount2.setId(2L);
        assertThat(financeAccount1).isNotEqualTo(financeAccount2);
        financeAccount1.setId(null);
        assertThat(financeAccount1).isNotEqualTo(financeAccount2);
    }
}
