import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager, JhiPaginationUtil, JhiParseLinks} from 'ng-jhipster';

import {FinanceAccount} from './finance-account.model';
import {FinanceAccountService} from './finance-account.service';
import {ITEMS_PER_PAGE, Principal, ResponseWrapper} from '../../shared';
import {PaginationConfig} from '../../blocks/config/uib-pagination.config';
import {Arrays} from '../../shared/arrays/arrays';

@Component({
    selector: 'jhi-finance-account',
    templateUrl: './finance-account.component.html'
})
export class FinanceAccountComponent implements OnInit, OnDestroy {

    currentAccount: any;
    financeAccounts: FinanceAccount[];
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

    rowsAccount: RowAccount[] = [];

    constructor(private financeAccountService: FinanceAccountService,
                private parseLinks: JhiParseLinks,
                private alertService: JhiAlertService,
                private principal: Principal,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private eventManager: JhiEventManager,
                private paginationUtil: JhiPaginationUtil,
                private paginationConfig: PaginationConfig,
                private arrays: Arrays) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
    }

    getAccountClass(account: FinanceAccount) {
        return {
            'card': true,
            'bg-light': account.isCreditCard == false,
            'text-white': account.isCreditCard === true,
            'bg-info': account.isCreditCard === true
        };
    }

    loadAll() {
        this.financeAccountService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
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
        this.router.navigate(['/finance-account'], {
            queryParams:
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
        this.router.navigate(['/finance-account', {
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFinanceAccounts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: FinanceAccount) {
        return item.id;
    }

    registerChangeInFinanceAccounts() {
        this.eventSubscriber = this.eventManager.subscribe('financeAccountListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private refreshRowsModel() {
        this.rowsAccount = this.arrays.mapToDimArray(this.financeAccounts, 'accounts', 4);
        /*let currentRow;
        currentRow = new RowAccount();
        currentRow.accounts = [];
        for(let i = 0; i < this.financeAccounts.length; i++){
            currentRow.accounts.push(this.financeAccounts[i]);
            if ((i+1) % 4 == 0){
                this.rowsAccount.push(currentRow);
                currentRow = new RowAccount();
                currentRow.accounts = [];
            }
        }
        if (currentRow.accounts.length>0)
            this.rowsAccount.push(currentRow);*/
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.financeAccounts = data;
        this.refreshRowsModel();

    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

class RowAccount {
    accounts: FinanceAccount[];
}
