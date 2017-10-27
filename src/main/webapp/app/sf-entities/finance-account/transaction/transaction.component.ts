import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AccountTransaction} from '../../account-transaction/account-transaction.model';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiPaginationUtil, JhiParseLinks} from 'ng-jhipster';
import {ActivatedRoute, Router} from '@angular/router';
import {PaginationConfig} from '../../../blocks/config/uib-pagination.config';
import {ITEMS_PER_PAGE} from '../../../shared/constants/pagination.constants';
import {ResponseWrapper} from '../../../shared/model/response-wrapper.model';
import {FinanceAccount} from '../finance-account.model';
import {FinanceAccountService} from '../finance-account.service';
import {LoggerService} from '../../../shared/logger/logger.service';
import {ENTER_LEAVE_ANIMATION} from '../../../shared/animation/enter-leave-animation';

@Component({
    selector: 'jhi-transaction',
    templateUrl: './transaction.component.html',
    animations: ENTER_LEAVE_ANIMATION
})
export class TransactionComponent implements OnInit, OnDestroy {

    accountId: number;
    @Input()
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
    private subscription: Subscription;

    hidePagingDiv = false;
    /****** filter ******/

    dateRange: Date[];
    filterObj = {
        description: '',
        amount: 0,
        operator: 1
    };

    constructor(private accountService: FinanceAccountService,
                private parseLinks: JhiParseLinks,
                private alertService: JhiAlertService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private eventManager: JhiEventManager,
                private paginationUtil: JhiPaginationUtil,
                private paginationConfig: PaginationConfig,
                private logger: LoggerService) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
    }

    loadAll() {
        if (!this.currentAccount) {
            this.accountService.find(this.accountId)
                .subscribe((account) => {
                    this.currentAccount = account;
                }, (res: ResponseWrapper) => this.onError(res.json));
        }
        this.accountService.queryTransactions(this.accountId, {
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
        this.router.navigate(['./finance-account', this.accountId], {
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
        this.router.navigate(['./finance-account/' + this.accountId, {
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }

    ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe((params) => {
            this.accountId = params['id'];
        });
        this.predicate = 'createdDate';
        this.reverse = false;
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
        this.eventSubscriber = this.eventManager.subscribe('transactionListModification', (response) => {

            if(!response.data)
                this.loadAll();

            if(response.data.action === "transactionDeleted"){
                this.transactions = this.transactions.filter(value => {
                    return value.id != response.data.item.id;
                });
            }
        });
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

    onFilterClick() {
        this.logger.info("****** On Filter click *****");
        this.accountService.queryTransactionsBy(this.accountId, {
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }, this.mapToTranCriteria(this.filterObj)).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    mapToTranCriteria(filterObj: any): any{
        let tranCriteria = {};
        this.filterObj["dateRange"] = this.dateRange;
        if (filterObj.dateRange && filterObj.dateRange.length>0){
            tranCriteria["startDate"]=filterObj.dateRange[0];
            tranCriteria["endDate"]=filterObj.dateRange[1];
        }
        if (filterObj.description.length>0){
            tranCriteria["desc"]=filterObj.description;
        }
        if (filterObj.amount != null){
            if(filterObj.operator>0){
                tranCriteria["startAmount"]=filterObj.amount;
            }
            else {
                tranCriteria["endAmount"]=filterObj.amount;
            }
        }
        return tranCriteria;
    }

    onDateRangeShown(): any{
        this.hidePagingDiv = true;
    }

    onDateRangeHidden(): any{
        this.hidePagingDiv = false;
    }


}
