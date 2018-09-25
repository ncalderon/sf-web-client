package com.calderon.sf.web.rest;

import com.calderon.sf.SfwebApp;

import com.calderon.sf.domain.TranEntry;
import com.calderon.sf.domain.User;
import com.calderon.sf.domain.FinAcc;
import com.calderon.sf.repository.TranEntryRepository;
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

import com.calderon.sf.domain.enumeration.TranType;
import com.calderon.sf.domain.enumeration.PaymentMethod;
/**
 * Test class for the TranEntryResource REST controller.
 *
 * @see TranEntryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SfwebApp.class)
public class TranEntryResourceIntTest {

    private static final TranType DEFAULT_TRAN_TYPE = TranType.EXPENSE;
    private static final TranType UPDATED_TRAN_TYPE = TranType.INCOME;

    private static final String DEFAULT_TRAN_NUM = "AAAAAAAAAA";
    private static final String UPDATED_TRAN_NUM = "BBBBBBBBBB";

    private static final String DEFAULT_REF_NUM = "AAAAAAAAAA";
    private static final String UPDATED_REF_NUM = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_POST_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_POST_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_AMOUNT = new BigDecimal(1);
    private static final BigDecimal UPDATED_AMOUNT = new BigDecimal(2);

    private static final BigDecimal DEFAULT_CCY_VAL = new BigDecimal(1);
    private static final BigDecimal UPDATED_CCY_VAL = new BigDecimal(2);

    private static final String DEFAULT_CCY_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CCY_CODE = "BBBBBBBBBB";

    private static final PaymentMethod DEFAULT_PAYMENT_METHOD = PaymentMethod.UNSPECIFIED;
    private static final PaymentMethod UPDATED_PAYMENT_METHOD = PaymentMethod.CASH;

    @Autowired
    private TranEntryRepository tranEntryRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTranEntryMockMvc;

    private TranEntry tranEntry;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TranEntryResource tranEntryResource = new TranEntryResource(tranEntryRepository);
        this.restTranEntryMockMvc = MockMvcBuilders.standaloneSetup(tranEntryResource)
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
    public static TranEntry createEntity(EntityManager em) {
        TranEntry tranEntry = new TranEntry()
            .tranType(DEFAULT_TRAN_TYPE)
            .tranNum(DEFAULT_TRAN_NUM)
            .refNum(DEFAULT_REF_NUM)
            .postDate(DEFAULT_POST_DATE)
            .description(DEFAULT_DESCRIPTION)
            .amount(DEFAULT_AMOUNT)
            .ccyVal(DEFAULT_CCY_VAL)
            .ccyCode(DEFAULT_CCY_CODE)
            .paymentMethod(DEFAULT_PAYMENT_METHOD);
        // Add required entity
        User user = UserResourceIntTest.createEntity(em);
        em.persist(user);
        em.flush();
        tranEntry.setUser(user);
        // Add required entity
        FinAcc finAcc = FinAccResourceIntTest.createEntity(em);
        em.persist(finAcc);
        em.flush();
        tranEntry.setFinAcc(finAcc);
        return tranEntry;
    }

    @Before
    public void initTest() {
        tranEntry = createEntity(em);
    }

    @Test
    @Transactional
    public void createTranEntry() throws Exception {
        int databaseSizeBeforeCreate = tranEntryRepository.findAll().size();

        // Create the TranEntry
        restTranEntryMockMvc.perform(post("/api/tran-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tranEntry)))
            .andExpect(status().isCreated());

        // Validate the TranEntry in the database
        List<TranEntry> tranEntryList = tranEntryRepository.findAll();
        assertThat(tranEntryList).hasSize(databaseSizeBeforeCreate + 1);
        TranEntry testTranEntry = tranEntryList.get(tranEntryList.size() - 1);
        assertThat(testTranEntry.getTranType()).isEqualTo(DEFAULT_TRAN_TYPE);
        assertThat(testTranEntry.getTranNum()).isEqualTo(DEFAULT_TRAN_NUM);
        assertThat(testTranEntry.getRefNum()).isEqualTo(DEFAULT_REF_NUM);
        assertThat(testTranEntry.getPostDate()).isEqualTo(DEFAULT_POST_DATE);
        assertThat(testTranEntry.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testTranEntry.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testTranEntry.getCcyVal()).isEqualTo(DEFAULT_CCY_VAL);
        assertThat(testTranEntry.getCcyCode()).isEqualTo(DEFAULT_CCY_CODE);
        assertThat(testTranEntry.getPaymentMethod()).isEqualTo(DEFAULT_PAYMENT_METHOD);
    }

    @Test
    @Transactional
    public void createTranEntryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tranEntryRepository.findAll().size();

        // Create the TranEntry with an existing ID
        tranEntry.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTranEntryMockMvc.perform(post("/api/tran-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tranEntry)))
            .andExpect(status().isBadRequest());

        // Validate the TranEntry in the database
        List<TranEntry> tranEntryList = tranEntryRepository.findAll();
        assertThat(tranEntryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTranTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = tranEntryRepository.findAll().size();
        // set the field null
        tranEntry.setTranType(null);

        // Create the TranEntry, which fails.

        restTranEntryMockMvc.perform(post("/api/tran-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tranEntry)))
            .andExpect(status().isBadRequest());

        List<TranEntry> tranEntryList = tranEntryRepository.findAll();
        assertThat(tranEntryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPostDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = tranEntryRepository.findAll().size();
        // set the field null
        tranEntry.setPostDate(null);

        // Create the TranEntry, which fails.

        restTranEntryMockMvc.perform(post("/api/tran-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tranEntry)))
            .andExpect(status().isBadRequest());

        List<TranEntry> tranEntryList = tranEntryRepository.findAll();
        assertThat(tranEntryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = tranEntryRepository.findAll().size();
        // set the field null
        tranEntry.setAmount(null);

        // Create the TranEntry, which fails.

        restTranEntryMockMvc.perform(post("/api/tran-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tranEntry)))
            .andExpect(status().isBadRequest());

        List<TranEntry> tranEntryList = tranEntryRepository.findAll();
        assertThat(tranEntryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCcyValIsRequired() throws Exception {
        int databaseSizeBeforeTest = tranEntryRepository.findAll().size();
        // set the field null
        tranEntry.setCcyVal(null);

        // Create the TranEntry, which fails.

        restTranEntryMockMvc.perform(post("/api/tran-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tranEntry)))
            .andExpect(status().isBadRequest());

        List<TranEntry> tranEntryList = tranEntryRepository.findAll();
        assertThat(tranEntryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCcyCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = tranEntryRepository.findAll().size();
        // set the field null
        tranEntry.setCcyCode(null);

        // Create the TranEntry, which fails.

        restTranEntryMockMvc.perform(post("/api/tran-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tranEntry)))
            .andExpect(status().isBadRequest());

        List<TranEntry> tranEntryList = tranEntryRepository.findAll();
        assertThat(tranEntryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTranEntries() throws Exception {
        // Initialize the database
        tranEntryRepository.saveAndFlush(tranEntry);

        // Get all the tranEntryList
        restTranEntryMockMvc.perform(get("/api/tran-entries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tranEntry.getId().intValue())))
            .andExpect(jsonPath("$.[*].tranType").value(hasItem(DEFAULT_TRAN_TYPE.toString())))
            .andExpect(jsonPath("$.[*].tranNum").value(hasItem(DEFAULT_TRAN_NUM.toString())))
            .andExpect(jsonPath("$.[*].refNum").value(hasItem(DEFAULT_REF_NUM.toString())))
            .andExpect(jsonPath("$.[*].postDate").value(hasItem(DEFAULT_POST_DATE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].ccyVal").value(hasItem(DEFAULT_CCY_VAL.intValue())))
            .andExpect(jsonPath("$.[*].ccyCode").value(hasItem(DEFAULT_CCY_CODE.toString())))
            .andExpect(jsonPath("$.[*].paymentMethod").value(hasItem(DEFAULT_PAYMENT_METHOD.toString())));
    }
    
    @Test
    @Transactional
    public void getTranEntry() throws Exception {
        // Initialize the database
        tranEntryRepository.saveAndFlush(tranEntry);

        // Get the tranEntry
        restTranEntryMockMvc.perform(get("/api/tran-entries/{id}", tranEntry.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tranEntry.getId().intValue()))
            .andExpect(jsonPath("$.tranType").value(DEFAULT_TRAN_TYPE.toString()))
            .andExpect(jsonPath("$.tranNum").value(DEFAULT_TRAN_NUM.toString()))
            .andExpect(jsonPath("$.refNum").value(DEFAULT_REF_NUM.toString()))
            .andExpect(jsonPath("$.postDate").value(DEFAULT_POST_DATE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()))
            .andExpect(jsonPath("$.ccyVal").value(DEFAULT_CCY_VAL.intValue()))
            .andExpect(jsonPath("$.ccyCode").value(DEFAULT_CCY_CODE.toString()))
            .andExpect(jsonPath("$.paymentMethod").value(DEFAULT_PAYMENT_METHOD.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTranEntry() throws Exception {
        // Get the tranEntry
        restTranEntryMockMvc.perform(get("/api/tran-entries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTranEntry() throws Exception {
        // Initialize the database
        tranEntryRepository.saveAndFlush(tranEntry);

        int databaseSizeBeforeUpdate = tranEntryRepository.findAll().size();

        // Update the tranEntry
        TranEntry updatedTranEntry = tranEntryRepository.findById(tranEntry.getId()).get();
        // Disconnect from session so that the updates on updatedTranEntry are not directly saved in db
        em.detach(updatedTranEntry);
        updatedTranEntry
            .tranType(UPDATED_TRAN_TYPE)
            .tranNum(UPDATED_TRAN_NUM)
            .refNum(UPDATED_REF_NUM)
            .postDate(UPDATED_POST_DATE)
            .description(UPDATED_DESCRIPTION)
            .amount(UPDATED_AMOUNT)
            .ccyVal(UPDATED_CCY_VAL)
            .ccyCode(UPDATED_CCY_CODE)
            .paymentMethod(UPDATED_PAYMENT_METHOD);

        restTranEntryMockMvc.perform(put("/api/tran-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTranEntry)))
            .andExpect(status().isOk());

        // Validate the TranEntry in the database
        List<TranEntry> tranEntryList = tranEntryRepository.findAll();
        assertThat(tranEntryList).hasSize(databaseSizeBeforeUpdate);
        TranEntry testTranEntry = tranEntryList.get(tranEntryList.size() - 1);
        assertThat(testTranEntry.getTranType()).isEqualTo(UPDATED_TRAN_TYPE);
        assertThat(testTranEntry.getTranNum()).isEqualTo(UPDATED_TRAN_NUM);
        assertThat(testTranEntry.getRefNum()).isEqualTo(UPDATED_REF_NUM);
        assertThat(testTranEntry.getPostDate()).isEqualTo(UPDATED_POST_DATE);
        assertThat(testTranEntry.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testTranEntry.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testTranEntry.getCcyVal()).isEqualTo(UPDATED_CCY_VAL);
        assertThat(testTranEntry.getCcyCode()).isEqualTo(UPDATED_CCY_CODE);
        assertThat(testTranEntry.getPaymentMethod()).isEqualTo(UPDATED_PAYMENT_METHOD);
    }

    @Test
    @Transactional
    public void updateNonExistingTranEntry() throws Exception {
        int databaseSizeBeforeUpdate = tranEntryRepository.findAll().size();

        // Create the TranEntry

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTranEntryMockMvc.perform(put("/api/tran-entries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tranEntry)))
            .andExpect(status().isBadRequest());

        // Validate the TranEntry in the database
        List<TranEntry> tranEntryList = tranEntryRepository.findAll();
        assertThat(tranEntryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTranEntry() throws Exception {
        // Initialize the database
        tranEntryRepository.saveAndFlush(tranEntry);

        int databaseSizeBeforeDelete = tranEntryRepository.findAll().size();

        // Get the tranEntry
        restTranEntryMockMvc.perform(delete("/api/tran-entries/{id}", tranEntry.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TranEntry> tranEntryList = tranEntryRepository.findAll();
        assertThat(tranEntryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TranEntry.class);
        TranEntry tranEntry1 = new TranEntry();
        tranEntry1.setId(1L);
        TranEntry tranEntry2 = new TranEntry();
        tranEntry2.setId(tranEntry1.getId());
        assertThat(tranEntry1).isEqualTo(tranEntry2);
        tranEntry2.setId(2L);
        assertThat(tranEntry1).isNotEqualTo(tranEntry2);
        tranEntry1.setId(null);
        assertThat(tranEntry1).isNotEqualTo(tranEntry2);
    }
}
