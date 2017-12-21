import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { TranCategoryRegex } from '../../shared/sf-model/tran-category-regex.model';
import { TranCategoryRegexService } from '../../shared/sf-services/tran-category-regex/tran-category-regex.service';

@Component({
    selector: 'jhi-tran-category-regex-detail',
    templateUrl: './tran-category-regex-detail.component.html'
})
export class TranCategoryRegexDetailComponent implements OnInit, OnDestroy {

    tranCategoryRegex: TranCategoryRegex;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tranCategoryRegexService: TranCategoryRegexService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTranCategoryRegexes();
    }

    load(id) {
        this.tranCategoryRegexService.find(id).subscribe((tranCategoryRegex) => {
            this.tranCategoryRegex = tranCategoryRegex;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTranCategoryRegexes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tranCategoryRegexListModification',
            (response) => this.load(this.tranCategoryRegex.id)
        );
    }
}
