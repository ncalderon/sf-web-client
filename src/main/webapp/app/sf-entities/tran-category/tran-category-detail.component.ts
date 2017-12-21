import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { TranCategory } from '../../shared/sf-model/tran-category.model';
import { TranCategoryService } from '../../shared/sf-services/tran-category/tran-category.service';

@Component({
    selector: 'jhi-tran-category-detail',
    templateUrl: './tran-category-detail.component.html'
})
export class TranCategoryDetailComponent implements OnInit, OnDestroy {

    tranCategory: TranCategory;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tranCategoryService: TranCategoryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTranCategories();
    }

    load(id) {
        this.tranCategoryService.find(id).subscribe((tranCategory) => {
            this.tranCategory = tranCategory;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTranCategories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tranCategoryListModification',
            (response) => this.load(this.tranCategory.id)
        );
    }
}
