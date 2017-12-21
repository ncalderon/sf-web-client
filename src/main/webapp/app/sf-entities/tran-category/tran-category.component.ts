import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager, JhiPaginationUtil, JhiParseLinks} from 'ng-jhipster';

import {TranCategory} from '../../shared/sf-model/tran-category.model';
import {TranCategoryService} from '../../shared/sf-services/tran-category/tran-category.service';
import {ITEMS_PER_PAGE, Principal, ResponseWrapper} from '../../shared';
import {PaginationConfig} from '../../blocks/config/uib-pagination.config';
import {Searcher} from '../../shared/search/searcher';
import {Observable} from 'rxjs/Observable';
import {LoggerService} from '../../shared/logger/logger.service';
import {ENTER_LEAVE_ANIMATION} from '../../shared/animation/enter-leave-animation';

@Component({
    selector: 'jhi-tran-category',
    templateUrl: './tran-category.component.html',
    animations: ENTER_LEAVE_ANIMATION
})
export class TranCategoryComponent implements OnInit, OnDestroy {

    currentAccount: any;
    tranCategories: TranCategory[];
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

    // components
    searcher: Searcher;
    categoriesObservable: Observable<TranCategory[]> = Observable.of([]);

    constructor(private tranCategoryService: TranCategoryService,
                private parseLinks: JhiParseLinks,
                private alertService: JhiAlertService,
                private principal: Principal,
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
        this.tranCategoryService.query({
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
        this.router.navigate(['/tran-category'], {
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
        this.router.navigate(['/tran-category', {
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
        this.registerChangeInTranCategories();
        this.searcher = new Searcher();
        this.searcher.onSearch = (term: string) => {
            return this.OnSearch(term.toLocaleLowerCase());
        }
    }

    private OnSearch(term: string): Observable<any[]> {
        this.logger.info('***** OnSearch ******');
        this.logger.info(term);
        this.categoriesObservable = Observable.of(this.tranCategories);
        if (term.length <= 0) {
            return this.categoriesObservable;
        }
        this.categoriesObservable = this.categoriesObservable.map((trans) =>
            trans.filter((category) =>
                (<TranCategory>category).description.toLocaleLowerCase().match(term) ||
                ((<TranCategory>category).name + '').toLocaleLowerCase().match(term)
            )
        );
        return this.categoriesObservable;
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TranCategory) {
        return item.id;
    }

    registerChangeInTranCategories() {
        this.eventSubscriber = this.eventManager.subscribe('tranCategoryListModification', (response) => this.loadAll());
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
        this.tranCategories = data;
        this.categoriesObservable = Observable.of(this.tranCategories);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
