package com.calderon.sf.web.rest;

import com.calderon.sf.security.SecurityUtils;
import com.calderon.sf.web.rest.errors.InternalServerErrorException;
import com.codahale.metrics.annotation.Timed;
import com.calderon.sf.domain.TranEntry;
import com.calderon.sf.repository.TranEntryRepository;
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
 * REST controller for managing TranEntry.
 */
@RestController
@RequestMapping("/api")
public class TranEntryResource {

    private final Logger log = LoggerFactory.getLogger(TranEntryResource.class);

    private static final String ENTITY_NAME = "tranEntry";

    private final TranEntryRepository tranEntryRepository;

    public TranEntryResource(TranEntryRepository tranEntryRepository) {
        this.tranEntryRepository = tranEntryRepository;
    }

    /**
     * POST  /tran-entries : Create a new tranEntry.
     *
     * @param tranEntry the tranEntry to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tranEntry, or with status 400 (Bad Request) if the tranEntry has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tran-entries")
    @Timed
    public ResponseEntity<TranEntry> createTranEntry(@Valid @RequestBody TranEntry tranEntry) throws URISyntaxException {
        log.debug("REST request to save TranEntry : {}", tranEntry);
        if (tranEntry.getId() != null) {
            throw new BadRequestAlertException("A new tranEntry cannot already have an ID", ENTITY_NAME, "idexists");
        }

        if (!SecurityUtils.canSave(tranEntry)) {
            throw new InternalServerErrorException(String.format("Cannot create or update this entity of this user: %s", tranEntry.getUser().getLogin()));
        }

        TranEntry result = tranEntryRepository.save(tranEntry);

        return ResponseEntity.created(new URI("/api/tran-entries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tran-entries : Updates an existing tranEntry.
     *
     * @param tranEntry the tranEntry to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tranEntry,
     * or with status 400 (Bad Request) if the tranEntry is not valid,
     * or with status 500 (Internal Server Error) if the tranEntry couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tran-entries")
    @Timed
    public ResponseEntity<TranEntry> updateTranEntry(@Valid @RequestBody TranEntry tranEntry) throws URISyntaxException {
        log.debug("REST request to update TranEntry : {}", tranEntry);
        if (tranEntry.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }

        if (!SecurityUtils.canSave(tranEntry)) {
            throw new InternalServerErrorException(String.format("Cannot create or update this entity of this user: %s", tranEntry.getUser().getLogin()));
        }

        TranEntry result = tranEntryRepository.save(tranEntry);

        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tranEntry.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tran-entries : get all the tranEntries.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of tranEntries in body
     */
    @GetMapping("/tran-entries")
    @Timed
    public ResponseEntity<List<TranEntry>> getAllTranEntries(Pageable pageable) {
        log.debug("REST request to get a page of TranEntries");
        Page<TranEntry> page = tranEntryRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/tran-entries");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /tran-entries/:id : get the "id" tranEntry.
     *
     * @param id the id of the tranEntry to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tranEntry, or with status 404 (Not Found)
     */
    @GetMapping("/tran-entries/{id}")
    @Timed
    public ResponseEntity<TranEntry> getTranEntry(@PathVariable Long id) {
        log.debug("REST request to get TranEntry : {}", id);
        Optional<TranEntry> tranEntry = tranEntryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tranEntry);
    }

    /**
     * DELETE  /tran-entries/:id : delete the "id" tranEntry.
     *
     * @param id the id of the tranEntry to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tran-entries/{id}")
    @Timed
    public ResponseEntity<Void> deleteTranEntry(@PathVariable Long id) {
        log.debug("REST request to delete TranEntry : {}", id);
        if (!SecurityUtils.canSave(tranEntryRepository.getOne(id))) {
            throw new InternalServerErrorException(String.format("Cannot delete this entity of this user."));
        }
        tranEntryRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
