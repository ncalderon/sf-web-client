package com.calderon.sf.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.calderon.sf.domain.FinAcc;
import com.calderon.sf.repository.FinAccRepository;
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
 * REST controller for managing FinAcc.
 */
@RestController
@RequestMapping("/api")
public class FinAccResource {

    private final Logger log = LoggerFactory.getLogger(FinAccResource.class);

    private static final String ENTITY_NAME = "finAcc";

    private final FinAccRepository finAccRepository;

    public FinAccResource(FinAccRepository finAccRepository) {
        this.finAccRepository = finAccRepository;
    }

    /**
     * POST  /fin-accs : Create a new finAcc.
     *
     * @param finAcc the finAcc to create
     * @return the ResponseEntity with status 201 (Created) and with body the new finAcc, or with status 400 (Bad Request) if the finAcc has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/fin-accs")
    @Timed
    public ResponseEntity<FinAcc> createFinAcc(@Valid @RequestBody FinAcc finAcc) throws URISyntaxException {
        log.debug("REST request to save FinAcc : {}", finAcc);
        if (finAcc.getId() != null) {
            throw new BadRequestAlertException("A new finAcc cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FinAcc result = finAccRepository.save(finAcc);
        return ResponseEntity.created(new URI("/api/fin-accs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /fin-accs : Updates an existing finAcc.
     *
     * @param finAcc the finAcc to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated finAcc,
     * or with status 400 (Bad Request) if the finAcc is not valid,
     * or with status 500 (Internal Server Error) if the finAcc couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/fin-accs")
    @Timed
    public ResponseEntity<FinAcc> updateFinAcc(@Valid @RequestBody FinAcc finAcc) throws URISyntaxException {
        log.debug("REST request to update FinAcc : {}", finAcc);
        if (finAcc.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FinAcc result = finAccRepository.save(finAcc);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, finAcc.getId().toString()))
            .body(result);
    }

    /**
     * GET  /fin-accs : get all the finAccs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of finAccs in body
     */
    @GetMapping("/fin-accs")
    @Timed
    public ResponseEntity<List<FinAcc>> getAllFinAccs(Pageable pageable) {
        log.debug("REST request to get a page of FinAccs");
        Page<FinAcc> page = finAccRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/fin-accs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /fin-accs/:id : get the "id" finAcc.
     *
     * @param id the id of the finAcc to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the finAcc, or with status 404 (Not Found)
     */
    @GetMapping("/fin-accs/{id}")
    @Timed
    public ResponseEntity<FinAcc> getFinAcc(@PathVariable Long id) {
        log.debug("REST request to get FinAcc : {}", id);
        Optional<FinAcc> finAcc = finAccRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(finAcc);
    }

    /**
     * DELETE  /fin-accs/:id : delete the "id" finAcc.
     *
     * @param id the id of the finAcc to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/fin-accs/{id}")
    @Timed
    public ResponseEntity<Void> deleteFinAcc(@PathVariable Long id) {
        log.debug("REST request to delete FinAcc : {}", id);

        finAccRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
