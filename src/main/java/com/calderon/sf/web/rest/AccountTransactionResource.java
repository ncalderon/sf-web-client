package com.calderon.sf.web.rest;

import com.calderon.sf.security.SecurityUtils;
import com.calderon.sf.service.io.StorageService;
import com.codahale.metrics.annotation.Timed;
import com.calderon.sf.domain.AccountTransaction;

import com.calderon.sf.repository.AccountTransactionRepository;
import com.calderon.sf.web.rest.util.HeaderUtil;
import com.calderon.sf.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.InputStreamReader;
import java.net.URI;
import java.net.URISyntaxException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing AccountTransaction.
 */
@RestController
@RequestMapping("/api")
public class AccountTransactionResource {

    private final Logger log = LoggerFactory.getLogger(AccountTransactionResource.class);

    private static final String ENTITY_NAME = "accountTransaction";


    private StorageService storageService;

    @Autowired
    public void setStorageService (StorageService storageService){
        this.storageService = storageService;
    }
    private final AccountTransactionRepository accountTransactionRepository;

    public AccountTransactionResource(AccountTransactionRepository accountTransactionRepository) {
        this.accountTransactionRepository = accountTransactionRepository;
    }

    /**
     * POST  /account-transactions : Create a new accountTransaction.
     *
     * @param accountTransaction the accountTransaction to create
     * @return the ResponseEntity with status 201 (Created) and with body the new accountTransaction, or with status 400 (Bad Request) if the accountTransaction has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/account-transactions")
    @Timed
    public ResponseEntity<AccountTransaction> createAccountTransaction(@Valid @RequestBody AccountTransaction accountTransaction) throws URISyntaxException {
        log.debug("REST request to save AccountTransaction : {}", accountTransaction);
        if (accountTransaction.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new accountTransaction cannot already have an ID")).body(null);
        }
        AccountTransaction result = accountTransactionRepository.save(accountTransaction);
        return ResponseEntity.created(new URI("/api/account-transactions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @PostMapping("/account-transactions/bulk")
    @Timed
    public ResponseEntity<List<AccountTransaction>> createAccountTransactions(@Valid @RequestBody List<AccountTransaction> transactions) throws URISyntaxException {
        log.debug("REST request to save bulk transactions : {}", transactions);
        List<AccountTransaction> result = accountTransactionRepository.save(transactions);
        return ResponseEntity.created(new URI("/api/account-transactions/bulk"))
            .body(result);
    }

    /**
     * PUT  /account-transactions : Updates an existing accountTransaction.
     *
     * @param accountTransaction the accountTransaction to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated accountTransaction,
     * or with status 400 (Bad Request) if the accountTransaction is not valid,
     * or with status 500 (Internal Server Error) if the accountTransaction couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/account-transactions")
    @Timed
    public ResponseEntity<AccountTransaction> updateAccountTransaction(@Valid @RequestBody AccountTransaction accountTransaction) throws URISyntaxException {
        log.debug("REST request to update AccountTransaction : {}", accountTransaction);
        if (accountTransaction.getId() == null) {
            return createAccountTransaction(accountTransaction);
        }
        AccountTransaction result = accountTransactionRepository.save(accountTransaction);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, accountTransaction.getId().toString()))
            .body(result);
    }

    /**
     * GET  /account-transactions : get all the accountTransactions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of accountTransactions in body
     */
    @GetMapping("/account-transactions")
    @Timed
    public ResponseEntity<List<AccountTransaction>> getAllAccountTransactions(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of AccountTransactions");
        /*Page<AccountTransaction> page = accountTransactionRepository.findAll(pageable);*/
        Page<AccountTransaction> page = accountTransactionRepository.findByUserIsCurrentUser(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/account-transactions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /account-transactions/:id : get the "id" accountTransaction.
     *
     * @param id the id of the accountTransaction to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the accountTransaction, or with status 404 (Not Found)
     */
    @GetMapping("/account-transactions/{id}")
    @Timed
    public ResponseEntity<AccountTransaction> getAccountTransaction(@PathVariable Long id) {
        log.debug("REST request to get AccountTransaction : {}", id);
        AccountTransaction accountTransaction = accountTransactionRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(accountTransaction));
    }

    /**
     * DELETE  /account-transactions/:id : delete the "id" accountTransaction.
     *
     * @param id the id of the accountTransaction to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/account-transactions/{id}")
    @Timed
    public ResponseEntity<Void> deleteAccountTransaction(@PathVariable Long id) {
        log.debug("REST request to delete AccountTransaction : {}", id);
        accountTransactionRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @PostMapping("/account-transactions/upload")
    @Timed
    public ResponseEntity<List<AccountTransaction>> getAccountTransactionsFromFile(@RequestParam("file") MultipartFile file) {
        String curretUserLogin = SecurityUtils.getCurrentUserLogin();
        storageService.store(file, SecurityUtils.getCurrentUserLogin() + ".csv");
        Path transactionFile = storageService.load(curretUserLogin);

        List<AccountTransaction> list = accountTransactionRepository.findByUserIsCurrentUser();
        /*HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/account-transactions/upload");*/
        return ResponseEntity.ok(list);
    }

}
