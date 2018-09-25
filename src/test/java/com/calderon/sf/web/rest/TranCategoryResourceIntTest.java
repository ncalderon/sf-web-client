package com.calderon.sf.web.rest;

import com.calderon.sf.SfwebApp;

import com.calderon.sf.domain.TranCategory;
import com.calderon.sf.domain.User;
import com.calderon.sf.repository.TranCategoryRepository;
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


import static com.calderon.sf.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TranCategoryResource REST controller.
 *
 * @see TranCategoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SfwebApp.class)
public class TranCategoryResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private TranCategoryRepository tranCategoryRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTranCategoryMockMvc;

    private TranCategory tranCategory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TranCategoryResource tranCategoryResource = new TranCategoryResource(tranCategoryRepository);
        this.restTranCategoryMockMvc = MockMvcBuilders.standaloneSetup(tranCategoryResource)
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
    public static TranCategory createEntity(EntityManager em) {
        TranCategory tranCategory = new TranCategory()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        // Add required entity
        User user = UserResourceIntTest.createEntity(em);
        em.persist(user);
        em.flush();
        tranCategory.setUser(user);
        return tranCategory;
    }

    @Before
    public void initTest() {
        tranCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createTranCategory() throws Exception {
        int databaseSizeBeforeCreate = tranCategoryRepository.findAll().size();

        // Create the TranCategory
        restTranCategoryMockMvc.perform(post("/api/tran-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tranCategory)))
            .andExpect(status().isCreated());

        // Validate the TranCategory in the database
        List<TranCategory> tranCategoryList = tranCategoryRepository.findAll();
        assertThat(tranCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        TranCategory testTranCategory = tranCategoryList.get(tranCategoryList.size() - 1);
        assertThat(testTranCategory.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTranCategory.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createTranCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tranCategoryRepository.findAll().size();

        // Create the TranCategory with an existing ID
        tranCategory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTranCategoryMockMvc.perform(post("/api/tran-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tranCategory)))
            .andExpect(status().isBadRequest());

        // Validate the TranCategory in the database
        List<TranCategory> tranCategoryList = tranCategoryRepository.findAll();
        assertThat(tranCategoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = tranCategoryRepository.findAll().size();
        // set the field null
        tranCategory.setName(null);

        // Create the TranCategory, which fails.

        restTranCategoryMockMvc.perform(post("/api/tran-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tranCategory)))
            .andExpect(status().isBadRequest());

        List<TranCategory> tranCategoryList = tranCategoryRepository.findAll();
        assertThat(tranCategoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTranCategories() throws Exception {
        // Initialize the database
        tranCategoryRepository.saveAndFlush(tranCategory);

        // Get all the tranCategoryList
        restTranCategoryMockMvc.perform(get("/api/tran-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tranCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getTranCategory() throws Exception {
        // Initialize the database
        tranCategoryRepository.saveAndFlush(tranCategory);

        // Get the tranCategory
        restTranCategoryMockMvc.perform(get("/api/tran-categories/{id}", tranCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tranCategory.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTranCategory() throws Exception {
        // Get the tranCategory
        restTranCategoryMockMvc.perform(get("/api/tran-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTranCategory() throws Exception {
        // Initialize the database
        tranCategoryRepository.saveAndFlush(tranCategory);

        int databaseSizeBeforeUpdate = tranCategoryRepository.findAll().size();

        // Update the tranCategory
        TranCategory updatedTranCategory = tranCategoryRepository.findById(tranCategory.getId()).get();
        // Disconnect from session so that the updates on updatedTranCategory are not directly saved in db
        em.detach(updatedTranCategory);
        updatedTranCategory
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);

        restTranCategoryMockMvc.perform(put("/api/tran-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTranCategory)))
            .andExpect(status().isOk());

        // Validate the TranCategory in the database
        List<TranCategory> tranCategoryList = tranCategoryRepository.findAll();
        assertThat(tranCategoryList).hasSize(databaseSizeBeforeUpdate);
        TranCategory testTranCategory = tranCategoryList.get(tranCategoryList.size() - 1);
        assertThat(testTranCategory.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTranCategory.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingTranCategory() throws Exception {
        int databaseSizeBeforeUpdate = tranCategoryRepository.findAll().size();

        // Create the TranCategory

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTranCategoryMockMvc.perform(put("/api/tran-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tranCategory)))
            .andExpect(status().isBadRequest());

        // Validate the TranCategory in the database
        List<TranCategory> tranCategoryList = tranCategoryRepository.findAll();
        assertThat(tranCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTranCategory() throws Exception {
        // Initialize the database
        tranCategoryRepository.saveAndFlush(tranCategory);

        int databaseSizeBeforeDelete = tranCategoryRepository.findAll().size();

        // Get the tranCategory
        restTranCategoryMockMvc.perform(delete("/api/tran-categories/{id}", tranCategory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TranCategory> tranCategoryList = tranCategoryRepository.findAll();
        assertThat(tranCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TranCategory.class);
        TranCategory tranCategory1 = new TranCategory();
        tranCategory1.setId(1L);
        TranCategory tranCategory2 = new TranCategory();
        tranCategory2.setId(tranCategory1.getId());
        assertThat(tranCategory1).isEqualTo(tranCategory2);
        tranCategory2.setId(2L);
        assertThat(tranCategory1).isNotEqualTo(tranCategory2);
        tranCategory1.setId(null);
        assertThat(tranCategory1).isNotEqualTo(tranCategory2);
    }
}
