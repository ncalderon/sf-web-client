
import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountTransaction} from '../../account-transaction/account-transaction.model';
import {Subscription} from 'rxjs/Subscription';
import {AccountTransactionService} from '../../account-transaction/account-transaction.service';
import {JhiAlertService, JhiEventManager, JhiPaginationUtil, JhiParseLinks} from 'ng-jhipster';
import {ActivatedRoute, Router} from '@angular/router';
import {PaginationConfig} from '../../../blocks/config/uib-pagination.config';
import {ITEMS_PER_PAGE} from '../../../shared/constants/pagination.constants';
import {ResponseWrapper} from '../../../shared/model/response-wrapper.model';
import {FinanceAccount} from '../finance-account.model';
import {FinanceAccountService} from '../finance-account.service';

@Component({
    selector: 'jhi-transaction',
    templateUrl: './transaction.component.html'
})
export class TransactionComponent implements OnInit, OnDestroy {

    accountId: number;
    currentAccount: FinanceAccount;
    transactions: AccountTransaction[];

    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        private accountService: FinanceAccountService,
        private parseLinks: JhiParseLinks,
        private alertService: JhiAlertService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private paginationUtil: JhiPaginationUtil,
        private paginationConfig: PaginationConfig
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
    }

    loadAll() {
        this.accountService.find(this.accountId)
            .subscribe((account) => {
                this.currentAccount = account;
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.accountService.queryTransactions({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()}).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }
    transition() {
        this.router.navigate(['./'], {queryParams:
            {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate(['./', {
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.registerChangeInAccountTransactions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AccountTransaction) {
        return item.id;
    }
    registerChangeInAccountTransactions() {
        this.eventSubscriber = this.eventManager.subscribe('transactionListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.transactions = data;
    }
    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
