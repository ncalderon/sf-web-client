package com.calderon.sf.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.calderon.sf.domain.TranCategory;
import com.calderon.sf.repository.TranCategoryRepository;
import com.calderon.sf.web.rest.errors.BadRequestAlertException;
import com.calderon.sf.web.rest.util.HeaderUtil;
import com.calderon.sf.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TranCategory.
 */
@RestController
@RequestMapping("/api")
public class TranCategoryResource {

    private final Logger log = LoggerFactory.getLogger(TranCategoryResource.class);

    private static final String ENTITY_NAME = "tranCategory";

    private final TranCategoryRepository tranCategoryRepository;

    public TranCategoryResource(TranCategoryRepository tranCategoryRepository) {
        this.tranCategoryRepository = tranCategoryRepository;
    }

    /**
     * POST  /tran-categories : Create a new tranCategory.
     *
     * @param tranCategory the tranCategory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tranCategory, or with status 400 (Bad Request) if the tranCategory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tran-categories")
    @Timed
    public ResponseEntity<TranCategory> createTranCategory(@Valid @RequestBody TranCategory tranCategory) throws URISyntaxException {
        log.debug("REST request to save TranCategory : {}", tranCategory);
        if (tranCategory.getId() != null) {
            throw new BadRequestAlertException("A new tranCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TranCategory result = tranCategoryRepository.save(tranCategory);
        return ResponseEntity.created(new URI("/api/tran-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tran-categories : Updates an existing tranCategory.
     *
     * @param tranCategory the tranCategory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tranCategory,
     * or with status 400 (Bad Request) if the tranCategory is not valid,
     * or with status 500 (Internal Server Error) if the tranCategory couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tran-categories")
    @Timed
    public ResponseEntity<TranCategory> updateTranCategory(@Valid @RequestBody TranCategory tranCategory) throws URISyntaxException {
        log.debug("REST request to update TranCategory : {}", tranCategory);
        if (tranCategory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TranCategory result = tranCategoryRepository.save(tranCategory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tranCategory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tran-categories : get all the tranCategories.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of tranCategories in body
     */
    @GetMapping("/tran-categories")
    @Timed
    public ResponseEntity<List<TranCategory>> getAllTranCategories(Pageable pageable) {
        log.debug("REST request to get a page of TranCategories");
        Page<TranCategory> page = tranCategoryRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/tran-categories");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /tran-categories/:id : get the "id" tranCategory.
     *
     * @param id the id of the tranCategory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tranCategory, or with status 404 (Not Found)
     */
    @GetMapping("/tran-categories/{id}")
    @Timed
    public ResponseEntity<TranCategory> getTranCategory(@PathVariable Long id) {
        log.debug("REST request to get TranCategory : {}", id);
        Optional<TranCategory> tranCategory = tranCategoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tranCategory);
    }

    /**
     * DELETE  /tran-categories/:id : delete the "id" tranCategory.
     *
     * @param id the id of the tranCategory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tran-categories/{id}")
    @Timed
    public ResponseEntity<Void> deleteTranCategory(@PathVariable Long id) {
        log.debug("REST request to delete TranCategory : {}", id);

        tranCategoryRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
