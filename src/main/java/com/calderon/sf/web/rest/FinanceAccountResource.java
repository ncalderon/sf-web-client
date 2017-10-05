package com.calderon.sf.web.rest;

import com.calderon.sf.domain.AccountTransaction;
import com.calderon.sf.domain.projections.Transaction;
import com.calderon.sf.repository.AccountTransactionRepository;
import com.codahale.metrics.annotation.Timed;
import com.calderon.sf.domain.FinanceAccount;

import com.calderon.sf.repository.FinanceAccountRepository;
import com.calderon.sf.web.rest.util.HeaderUtil;
import com.calderon.sf.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.hibernate.Hibernate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.time.LocalDate;
import java.time.Month;
import java.time.MonthDay;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing FinanceAccount.
 */
@RestController
@RequestMapping("/api")
public class FinanceAccountResource {

    private final Logger log = LoggerFactory.getLogger(FinanceAccountResource.class);

    private static final String ENTITY_NAME = "financeAccount";

    private final FinanceAccountRepository financeAccountRepository;
    private final AccountTransactionRepository accountTransactionRepository;

    public FinanceAccountResource(FinanceAccountRepository financeAccountRepository, AccountTransactionRepository accountTransactionRepository) {
        this.financeAccountRepository = financeAccountRepository;
        this.accountTransactionRepository = accountTransactionRepository;
    }

    /**
     * POST  /finance-accounts : Create a new financeAccount.
     *
     * @param financeAccount the financeAccount to create
     * @return the ResponseEntity with status 201 (Created) and with body the new financeAccount, or with status 400 (Bad Request) if the financeAccount has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/finance-accounts")
    @Timed
    public ResponseEntity<FinanceAccount> createFinanceAccount(@Valid @RequestBody FinanceAccount financeAccount) throws URISyntaxException {
        log.debug("REST request to save FinanceAccount : {}", financeAccount);
        if (financeAccount.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new financeAccount cannot already have an ID")).body(null);
        }
        FinanceAccount result = financeAccountRepository.save(financeAccount);
        return ResponseEntity.created(new URI("/api/finance-accounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /finance-accounts : Updates an existing financeAccount.
     *
     * @param financeAccount the financeAccount to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated financeAccount,
     * or with status 400 (Bad Request) if the financeAccount is not valid,
     * or with status 500 (Internal Server Error) if the financeAccount couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/finance-accounts")
    @Timed
    public ResponseEntity<FinanceAccount> updateFinanceAccount(@Valid @RequestBody FinanceAccount financeAccount) throws URISyntaxException {
        log.debug("REST request to update FinanceAccount : {}", financeAccount);
        if (financeAccount.getId() == null) {
            return createFinanceAccount(financeAccount);
        }
        FinanceAccount result = financeAccountRepository.save(financeAccount);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, financeAccount.getId().toString()))
            .body(result);
    }

    /**
     * GET  /finance-accounts : get all the financeAccounts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of financeAccounts in body
     */
    @GetMapping("/finance-accounts")
    @Timed
    public ResponseEntity<List<FinanceAccount>> getAllFinanceAccounts(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of FinanceAccounts");
        Page<FinanceAccount> page = financeAccountRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/finance-accounts");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /finance-accounts/:id : get the "id" financeAccount.
     *
     * @param id the id of the financeAccount to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the financeAccount, or with status 404 (Not Found)
     */
    @GetMapping("/finance-accounts/{id}")
    @Timed
    public ResponseEntity<FinanceAccount> getFinanceAccount(@PathVariable Long id) {
        log.debug("REST request to get FinanceAccount : {}", id);
        FinanceAccount financeAccount = financeAccountRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(financeAccount));
    }

    //@Transactional
    @GetMapping("/finance-accounts/{id}/account-transactions")
    @Timed
    public ResponseEntity<List<AccountTransaction>> getAllAccountTransactions(@PathVariable Long id, @RequestParam int year) {
        log.debug("REST request to get Transactions by Account : {}", id);
        List<AccountTransaction> transactions;

        int currentYear = LocalDate.now().getYear();
        LocalDate startDate = LocalDate.of(year <= 0? currentYear: year, Month.JANUARY, 1);
        LocalDate endDate = LocalDate.of(year <= 0? currentYear: year, Month.DECEMBER, 31);

        if(year <= 0)
            transactions = accountTransactionRepository.findByUserIsCurrentUserAndPostDateGreaterThanEqualAndPostDateLessThanEqual
                (startDate, endDate);
        else {
            transactions = accountTransactionRepository.findByUserIsCurrentUserAndFinanceAccount_IdAndPostDateGreaterThanEqualAndPostDateLessThanEqual
                (id, startDate, endDate);
        }
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    /**
     * DELETE  /finance-accounts/:id : delete the "id" financeAccount.
     *
     * @param id the id of the financeAccount to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/finance-accounts/{id}")
    @Timed
    public ResponseEntity<Void> deleteFinanceAccount(@PathVariable Long id) {
        log.debug("REST request to delete FinanceAccount : {}", id);
        financeAccountRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
