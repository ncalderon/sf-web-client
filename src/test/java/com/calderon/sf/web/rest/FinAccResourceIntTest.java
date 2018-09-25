package com.calderon.sf.web.rest;

import com.calderon.sf.SfwebApp;

import com.calderon.sf.domain.FinAcc;
import com.calderon.sf.domain.User;
import com.calderon.sf.repository.FinAccRepository;
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


import static com.calderon.sf.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.calderon.sf.domain.enumeration.FinAccStatus;
/**
 * Test class for the FinAccResource REST controller.
 *
 * @see FinAccResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SfwebApp.class)
public class FinAccResourceIntTest {

    private static final FinAccStatus DEFAULT_STATUS = FinAccStatus.INACTIVE;
    private static final FinAccStatus UPDATED_STATUS = FinAccStatus.ACTIVE;

    private static final String DEFAULT_ACC_NUM = "AAAAAAAAAA";
    private static final String UPDATED_ACC_NUM = "BBBBBBBBBB";

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
    private FinAccRepository finAccRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFinAccMockMvc;

    private FinAcc finAcc;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FinAccResource finAccResource = new FinAccResource(finAccRepository);
        this.restFinAccMockMvc = MockMvcBuilders.standaloneSetup(finAccResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FinAcc createEntity(EntityManager em) {
        FinAcc finAcc = new FinAcc()
            .status(DEFAULT_STATUS)
            .accNum(DEFAULT_ACC_NUM)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .balance(DEFAULT_BALANCE)
            .isCreditCard(DEFAULT_IS_CREDIT_CARD)
            .dueDate(DEFAULT_DUE_DATE)
            .closingDate(DEFAULT_CLOSING_DATE);
        // Add required entity
        User user = UserResourceIntTest.createEntity(em);
        em.persist(user);
        em.flush();
        finAcc.setUser(user);
        return finAcc;
    }

    @Before
    public void initTest() {
        finAcc = createEntity(em);
    }

    @Test
    @Transactional
    public void createFinAcc() throws Exception {
        int databaseSizeBeforeCreate = finAccRepository.findAll().size();

        // Create the FinAcc
        restFinAccMockMvc.perform(post("/api/fin-accs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(finAcc)))
            .andExpect(status().isCreated());

        // Validate the FinAcc in the database
        List<FinAcc> finAccList = finAccRepository.findAll();
        assertThat(finAccList).hasSize(databaseSizeBeforeCreate + 1);
        FinAcc testFinAcc = finAccList.get(finAccList.size() - 1);
        assertThat(testFinAcc.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testFinAcc.getAccNum()).isEqualTo(DEFAULT_ACC_NUM);
        assertThat(testFinAcc.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testFinAcc.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testFinAcc.getBalance()).isEqualTo(DEFAULT_BALANCE);
        assertThat(testFinAcc.isIsCreditCard()).isEqualTo(DEFAULT_IS_CREDIT_CARD);
        assertThat(testFinAcc.getDueDate()).isEqualTo(DEFAULT_DUE_DATE);
        assertThat(testFinAcc.getClosingDate()).isEqualTo(DEFAULT_CLOSING_DATE);
    }

    @Test
    @Transactional
    public void createFinAccWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = finAccRepository.findAll().size();

        // Create the FinAcc with an existing ID
        finAcc.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFinAccMockMvc.perform(post("/api/fin-accs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(finAcc)))
            .andExpect(status().isBadRequest());

        // Validate the FinAcc in the database
        List<FinAcc> finAccList = finAccRepository.findAll();
        assertThat(finAccList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = finAccRepository.findAll().size();
        // set the field null
        finAcc.setStatus(null);

        // Create the FinAcc, which fails.

        restFinAccMockMvc.perform(post("/api/fin-accs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(finAcc)))
            .andExpect(status().isBadRequest());

        List<FinAcc> finAccList = finAccRepository.findAll();
        assertThat(finAccList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = finAccRepository.findAll().size();
        // set the field null
        finAcc.setName(null);

        // Create the FinAcc, which fails.

        restFinAccMockMvc.perform(post("/api/fin-accs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(finAcc)))
            .andExpect(status().isBadRequest());

        List<FinAcc> finAccList = finAccRepository.findAll();
        assertThat(finAccList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkBalanceIsRequired() throws Exception {
        int databaseSizeBeforeTest = finAccRepository.findAll().size();
        // set the field null
        finAcc.setBalance(null);

        // Create the FinAcc, which fails.

        restFinAccMockMvc.perform(post("/api/fin-accs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(finAcc)))
            .andExpect(status().isBadRequest());

        List<FinAcc> finAccList = finAccRepository.findAll();
        assertThat(finAccList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFinAccs() throws Exception {
        // Initialize the database
        finAccRepository.saveAndFlush(finAcc);

        // Get all the finAccList
        restFinAccMockMvc.perform(get("/api/fin-accs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(finAcc.getId().intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].accNum").value(hasItem(DEFAULT_ACC_NUM.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].balance").value(hasItem(DEFAULT_BALANCE.intValue())))
            .andExpect(jsonPath("$.[*].isCreditCard").value(hasItem(DEFAULT_IS_CREDIT_CARD.booleanValue())))
            .andExpect(jsonPath("$.[*].dueDate").value(hasItem(DEFAULT_DUE_DATE.toString())))
            .andExpect(jsonPath("$.[*].closingDate").value(hasItem(DEFAULT_CLOSING_DATE.toString())));
    }
    

    @Test
    @Transactional
    public void getFinAcc() throws Exception {
        // Initialize the database
        finAccRepository.saveAndFlush(finAcc);

        // Get the finAcc
        restFinAccMockMvc.perform(get("/api/fin-accs/{id}", finAcc.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(finAcc.getId().intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.accNum").value(DEFAULT_ACC_NUM.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.balance").value(DEFAULT_BALANCE.intValue()))
            .andExpect(jsonPath("$.isCreditCard").value(DEFAULT_IS_CREDIT_CARD.booleanValue()))
            .andExpect(jsonPath("$.dueDate").value(DEFAULT_DUE_DATE.toString()))
            .andExpect(jsonPath("$.closingDate").value(DEFAULT_CLOSING_DATE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingFinAcc() throws Exception {
        // Get the finAcc
        restFinAccMockMvc.perform(get("/api/fin-accs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFinAcc() throws Exception {
        // Initialize the database
        finAccRepository.saveAndFlush(finAcc);

        int databaseSizeBeforeUpdate = finAccRepository.findAll().size();

        // Update the finAcc
        FinAcc updatedFinAcc = finAccRepository.findById(finAcc.getId()).get();
        // Disconnect from session so that the updates on updatedFinAcc are not directly saved in db
        em.detach(updatedFinAcc);
        updatedFinAcc
            .status(UPDATED_STATUS)
            .accNum(UPDATED_ACC_NUM)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .balance(UPDATED_BALANCE)
            .isCreditCard(UPDATED_IS_CREDIT_CARD)
            .dueDate(UPDATED_DUE_DATE)
            .closingDate(UPDATED_CLOSING_DATE);

        restFinAccMockMvc.perform(put("/api/fin-accs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFinAcc)))
            .andExpect(status().isOk());

        // Validate the FinAcc in the database
        List<FinAcc> finAccList = finAccRepository.findAll();
        assertThat(finAccList).hasSize(databaseSizeBeforeUpdate);
        FinAcc testFinAcc = finAccList.get(finAccList.size() - 1);
        assertThat(testFinAcc.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testFinAcc.getAccNum()).isEqualTo(UPDATED_ACC_NUM);
        assertThat(testFinAcc.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testFinAcc.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testFinAcc.getBalance()).isEqualTo(UPDATED_BALANCE);
        assertThat(testFinAcc.isIsCreditCard()).isEqualTo(UPDATED_IS_CREDIT_CARD);
        assertThat(testFinAcc.getDueDate()).isEqualTo(UPDATED_DUE_DATE);
        assertThat(testFinAcc.getClosingDate()).isEqualTo(UPDATED_CLOSING_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingFinAcc() throws Exception {
        int databaseSizeBeforeUpdate = finAccRepository.findAll().size();

        // Create the FinAcc

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restFinAccMockMvc.perform(put("/api/fin-accs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(finAcc)))
            .andExpect(status().isBadRequest());

        // Validate the FinAcc in the database
        List<FinAcc> finAccList = finAccRepository.findAll();
        assertThat(finAccList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFinAcc() throws Exception {
        // Initialize the database
        finAccRepository.saveAndFlush(finAcc);

        int databaseSizeBeforeDelete = finAccRepository.findAll().size();

        // Get the finAcc
        restFinAccMockMvc.perform(delete("/api/fin-accs/{id}", finAcc.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FinAcc> finAccList = finAccRepository.findAll();
        assertThat(finAccList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FinAcc.class);
        FinAcc finAcc1 = new FinAcc();
        finAcc1.setId(1L);
        FinAcc finAcc2 = new FinAcc();
        finAcc2.setId(finAcc1.getId());
        assertThat(finAcc1).isEqualTo(finAcc2);
        finAcc2.setId(2L);
        assertThat(finAcc1).isNotEqualTo(finAcc2);
        finAcc1.setId(null);
        assertThat(finAcc1).isNotEqualTo(finAcc2);
    }
}
