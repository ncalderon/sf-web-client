package com.calderon.sf.web.rest;

import com.calderon.sf.SfWebClientApp;

import com.calderon.sf.domain.TranCategoryRegex;
import com.calderon.sf.repository.TranCategoryRegexRepository;
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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TranCategoryRegexResource REST controller.
 *
 * @see TranCategoryRegexResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SfWebClientApp.class)
public class TranCategoryRegexResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_REGEX = "AAAAAAAAAA";
    private static final String UPDATED_REGEX = "BBBBBBBBBB";

    @Autowired
    private TranCategoryRegexRepository tranCategoryRegexRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTranCategoryRegexMockMvc;

    private TranCategoryRegex tranCategoryRegex;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TranCategoryRegexResource tranCategoryRegexResource = new TranCategoryRegexResource(tranCategoryRegexRepository);
        this.restTranCategoryRegexMockMvc = MockMvcBuilders.standaloneSetup(tranCategoryRegexResource)
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
    public static TranCategoryRegex createEntity(EntityManager em) {
        TranCategoryRegex tranCategoryRegex = new TranCategoryRegex()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .regex(DEFAULT_REGEX);
        return tranCategoryRegex;
    }

    @Before
    public void initTest() {
        tranCategoryRegex = createEntity(em);
    }

    @Test
    @Transactional
    public void createTranCategoryRegex() throws Exception {
        int databaseSizeBeforeCreate = tranCategoryRegexRepository.findAll().size();

        // Create the TranCategoryRegex
        restTranCategoryRegexMockMvc.perform(post("/api/tran-category-regexes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tranCategoryRegex)))
            .andExpect(status().isCreated());

        // Validate the TranCategoryRegex in the database
        List<TranCategoryRegex> tranCategoryRegexList = tranCategoryRegexRepository.findAll();
        assertThat(tranCategoryRegexList).hasSize(databaseSizeBeforeCreate + 1);
        TranCategoryRegex testTranCategoryRegex = tranCategoryRegexList.get(tranCategoryRegexList.size() - 1);
        assertThat(testTranCategoryRegex.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTranCategoryRegex.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testTranCategoryRegex.getRegex()).isEqualTo(DEFAULT_REGEX);
    }

    @Test
    @Transactional
    public void createTranCategoryRegexWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tranCategoryRegexRepository.findAll().size();

        // Create the TranCategoryRegex with an existing ID
        tranCategoryRegex.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTranCategoryRegexMockMvc.perform(post("/api/tran-category-regexes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tranCategoryRegex)))
            .andExpect(status().isBadRequest());

        // Validate the TranCategoryRegex in the database
        List<TranCategoryRegex> tranCategoryRegexList = tranCategoryRegexRepository.findAll();
        assertThat(tranCategoryRegexList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = tranCategoryRegexRepository.findAll().size();
        // set the field null
        tranCategoryRegex.setName(null);

        // Create the TranCategoryRegex, which fails.

        restTranCategoryRegexMockMvc.perform(post("/api/tran-category-regexes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tranCategoryRegex)))
            .andExpect(status().isBadRequest());

        List<TranCategoryRegex> tranCategoryRegexList = tranCategoryRegexRepository.findAll();
        assertThat(tranCategoryRegexList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRegexIsRequired() throws Exception {
        int databaseSizeBeforeTest = tranCategoryRegexRepository.findAll().size();
        // set the field null
        tranCategoryRegex.setRegex(null);

        // Create the TranCategoryRegex, which fails.

        restTranCategoryRegexMockMvc.perform(post("/api/tran-category-regexes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tranCategoryRegex)))
            .andExpect(status().isBadRequest());

        List<TranCategoryRegex> tranCategoryRegexList = tranCategoryRegexRepository.findAll();
        assertThat(tranCategoryRegexList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTranCategoryRegexes() throws Exception {
        // Initialize the database
        tranCategoryRegexRepository.saveAndFlush(tranCategoryRegex);

        // Get all the tranCategoryRegexList
        restTranCategoryRegexMockMvc.perform(get("/api/tran-category-regexes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tranCategoryRegex.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].regex").value(hasItem(DEFAULT_REGEX.toString())));
    }

    @Test
    @Transactional
    public void getTranCategoryRegex() throws Exception {
        // Initialize the database
        tranCategoryRegexRepository.saveAndFlush(tranCategoryRegex);

        // Get the tranCategoryRegex
        restTranCategoryRegexMockMvc.perform(get("/api/tran-category-regexes/{id}", tranCategoryRegex.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tranCategoryRegex.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.regex").value(DEFAULT_REGEX.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTranCategoryRegex() throws Exception {
        // Get the tranCategoryRegex
        restTranCategoryRegexMockMvc.perform(get("/api/tran-category-regexes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTranCategoryRegex() throws Exception {
        // Initialize the database
        tranCategoryRegexRepository.saveAndFlush(tranCategoryRegex);
        int databaseSizeBeforeUpdate = tranCategoryRegexRepository.findAll().size();

        // Update the tranCategoryRegex
        TranCategoryRegex updatedTranCategoryRegex = tranCategoryRegexRepository.findOne(tranCategoryRegex.getId());
        updatedTranCategoryRegex
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .regex(UPDATED_REGEX);

        restTranCategoryRegexMockMvc.perform(put("/api/tran-category-regexes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTranCategoryRegex)))
            .andExpect(status().isOk());

        // Validate the TranCategoryRegex in the database
        List<TranCategoryRegex> tranCategoryRegexList = tranCategoryRegexRepository.findAll();
        assertThat(tranCategoryRegexList).hasSize(databaseSizeBeforeUpdate);
        TranCategoryRegex testTranCategoryRegex = tranCategoryRegexList.get(tranCategoryRegexList.size() - 1);
        assertThat(testTranCategoryRegex.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTranCategoryRegex.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testTranCategoryRegex.getRegex()).isEqualTo(UPDATED_REGEX);
    }

    @Test
    @Transactional
    public void updateNonExistingTranCategoryRegex() throws Exception {
        int databaseSizeBeforeUpdate = tranCategoryRegexRepository.findAll().size();

        // Create the TranCategoryRegex

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTranCategoryRegexMockMvc.perform(put("/api/tran-category-regexes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tranCategoryRegex)))
            .andExpect(status().isCreated());

        // Validate the TranCategoryRegex in the database
        List<TranCategoryRegex> tranCategoryRegexList = tranCategoryRegexRepository.findAll();
        assertThat(tranCategoryRegexList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTranCategoryRegex() throws Exception {
        // Initialize the database
        tranCategoryRegexRepository.saveAndFlush(tranCategoryRegex);
        int databaseSizeBeforeDelete = tranCategoryRegexRepository.findAll().size();

        // Get the tranCategoryRegex
        restTranCategoryRegexMockMvc.perform(delete("/api/tran-category-regexes/{id}", tranCategoryRegex.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TranCategoryRegex> tranCategoryRegexList = tranCategoryRegexRepository.findAll();
        assertThat(tranCategoryRegexList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TranCategoryRegex.class);
        TranCategoryRegex tranCategoryRegex1 = new TranCategoryRegex();
        tranCategoryRegex1.setId(1L);
        TranCategoryRegex tranCategoryRegex2 = new TranCategoryRegex();
        tranCategoryRegex2.setId(tranCategoryRegex1.getId());
        assertThat(tranCategoryRegex1).isEqualTo(tranCategoryRegex2);
        tranCategoryRegex2.setId(2L);
        assertThat(tranCategoryRegex1).isNotEqualTo(tranCategoryRegex2);
        tranCategoryRegex1.setId(null);
        assertThat(tranCategoryRegex1).isNotEqualTo(tranCategoryRegex2);
    }
}
