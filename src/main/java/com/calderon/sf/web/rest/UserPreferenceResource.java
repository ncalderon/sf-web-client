package com.calderon.sf.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.calderon.sf.domain.UserPreference;
import com.calderon.sf.repository.UserPreferenceRepository;
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
 * REST controller for managing UserPreference.
 */
@RestController
@RequestMapping("/api")
public class UserPreferenceResource {

    private final Logger log = LoggerFactory.getLogger(UserPreferenceResource.class);

    private static final String ENTITY_NAME = "userPreference";

    private final UserPreferenceRepository userPreferenceRepository;

    public UserPreferenceResource(UserPreferenceRepository userPreferenceRepository) {
        this.userPreferenceRepository = userPreferenceRepository;
    }

    /**
     * POST  /user-preferences : Create a new userPreference.
     *
     * @param userPreference the userPreference to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userPreference, or with status 400 (Bad Request) if the userPreference has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-preferences")
    @Timed
    public ResponseEntity<UserPreference> createUserPreference(@Valid @RequestBody UserPreference userPreference) throws URISyntaxException {
        log.debug("REST request to save UserPreference : {}", userPreference);
        if (userPreference.getId() != null) {
            throw new BadRequestAlertException("A new userPreference cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserPreference result = userPreferenceRepository.save(userPreference);
        return ResponseEntity.created(new URI("/api/user-preferences/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-preferences : Updates an existing userPreference.
     *
     * @param userPreference the userPreference to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userPreference,
     * or with status 400 (Bad Request) if the userPreference is not valid,
     * or with status 500 (Internal Server Error) if the userPreference couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-preferences")
    @Timed
    public ResponseEntity<UserPreference> updateUserPreference(@Valid @RequestBody UserPreference userPreference) throws URISyntaxException {
        log.debug("REST request to update UserPreference : {}", userPreference);
        if (userPreference.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserPreference result = userPreferenceRepository.save(userPreference);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userPreference.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-preferences : get all the userPreferences.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of userPreferences in body
     */
    @GetMapping("/user-preferences")
    @Timed
    public ResponseEntity<List<UserPreference>> getAllUserPreferences(Pageable pageable) {
        log.debug("REST request to get a page of UserPreferences");
        Page<UserPreference> page = userPreferenceRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/user-preferences");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /user-preferences/:id : get the "id" userPreference.
     *
     * @param id the id of the userPreference to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userPreference, or with status 404 (Not Found)
     */
    @GetMapping("/user-preferences/{id}")
    @Timed
    public ResponseEntity<UserPreference> getUserPreference(@PathVariable Long id) {
        log.debug("REST request to get UserPreference : {}", id);
        Optional<UserPreference> userPreference = userPreferenceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(userPreference);
    }

    /**
     * DELETE  /user-preferences/:id : delete the "id" userPreference.
     *
     * @param id the id of the userPreference to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-preferences/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserPreference(@PathVariable Long id) {
        log.debug("REST request to delete UserPreference : {}", id);

        userPreferenceRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
