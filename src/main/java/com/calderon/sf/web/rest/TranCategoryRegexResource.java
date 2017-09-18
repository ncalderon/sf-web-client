package com.calderon.sf.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.calderon.sf.domain.TranCategoryRegex;

import com.calderon.sf.repository.TranCategoryRegexRepository;
import com.calderon.sf.web.rest.util.HeaderUtil;
import com.calderon.sf.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
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
 * REST controller for managing TranCategoryRegex.
 */
@RestController
@RequestMapping("/api")
public class TranCategoryRegexResource {

    private final Logger log = LoggerFactory.getLogger(TranCategoryRegexResource.class);

    private static final String ENTITY_NAME = "tranCategoryRegex";

    private final TranCategoryRegexRepository tranCategoryRegexRepository;

    public TranCategoryRegexResource(TranCategoryRegexRepository tranCategoryRegexRepository) {
        this.tranCategoryRegexRepository = tranCategoryRegexRepository;
    }

    /**
     * POST  /tran-category-regexes : Create a new tranCategoryRegex.
     *
     * @param tranCategoryRegex the tranCategoryRegex to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tranCategoryRegex, or with status 400 (Bad Request) if the tranCategoryRegex has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tran-category-regexes")
    @Timed
    public ResponseEntity<TranCategoryRegex> createTranCategoryRegex(@Valid @RequestBody TranCategoryRegex tranCategoryRegex) throws URISyntaxException {
        log.debug("REST request to save TranCategoryRegex : {}", tranCategoryRegex);
        if (tranCategoryRegex.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new tranCategoryRegex cannot already have an ID")).body(null);
        }
        TranCategoryRegex result = tranCategoryRegexRepository.save(tranCategoryRegex);
        return ResponseEntity.created(new URI("/api/tran-category-regexes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tran-category-regexes : Updates an existing tranCategoryRegex.
     *
     * @param tranCategoryRegex the tranCategoryRegex to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tranCategoryRegex,
     * or with status 400 (Bad Request) if the tranCategoryRegex is not valid,
     * or with status 500 (Internal Server Error) if the tranCategoryRegex couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tran-category-regexes")
    @Timed
    public ResponseEntity<TranCategoryRegex> updateTranCategoryRegex(@Valid @RequestBody TranCategoryRegex tranCategoryRegex) throws URISyntaxException {
        log.debug("REST request to update TranCategoryRegex : {}", tranCategoryRegex);
        if (tranCategoryRegex.getId() == null) {
            return createTranCategoryRegex(tranCategoryRegex);
        }
        TranCategoryRegex result = tranCategoryRegexRepository.save(tranCategoryRegex);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tranCategoryRegex.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tran-category-regexes : get all the tranCategoryRegexes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of tranCategoryRegexes in body
     */
    @GetMapping("/tran-category-regexes")
    @Timed
    public ResponseEntity<List<TranCategoryRegex>> getAllTranCategoryRegexes(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of TranCategoryRegexes");
        /*Page<TranCategoryRegex> page = tranCategoryRegexRepository.findAll(pageable);*/
        Page<TranCategoryRegex> page = tranCategoryRegexRepository.findByUserIsCurrentUser(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/tran-category-regexes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /tran-category-regexes/:id : get the "id" tranCategoryRegex.
     *
     * @param id the id of the tranCategoryRegex to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tranCategoryRegex, or with status 404 (Not Found)
     */
    @GetMapping("/tran-category-regexes/{id}")
    @Timed
    public ResponseEntity<TranCategoryRegex> getTranCategoryRegex(@PathVariable Long id) {
        log.debug("REST request to get TranCategoryRegex : {}", id);
        TranCategoryRegex tranCategoryRegex = tranCategoryRegexRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tranCategoryRegex));
    }

    /**
     * DELETE  /tran-category-regexes/:id : delete the "id" tranCategoryRegex.
     *
     * @param id the id of the tranCategoryRegex to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tran-category-regexes/{id}")
    @Timed
    public ResponseEntity<Void> deleteTranCategoryRegex(@PathVariable Long id) {
        log.debug("REST request to delete TranCategoryRegex : {}", id);
        tranCategoryRegexRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
