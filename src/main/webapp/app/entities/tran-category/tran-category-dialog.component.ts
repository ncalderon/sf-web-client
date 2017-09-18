import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TranCategory } from './tran-category.model';
import { TranCategoryPopupService } from './tran-category-popup.service';
import { TranCategoryService } from './tran-category.service';
import { User, UserService } from '../../shared';
import { TranCategoryRegex, TranCategoryRegexService } from '../tran-category-regex';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tran-category-dialog',
    templateUrl: './tran-category-dialog.component.html'
})
export class TranCategoryDialogComponent implements OnInit {

    tranCategory: TranCategory;
    isSaving: boolean;

    users: User[];

    trancategoryregexes: TranCategoryRegex[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private tranCategoryService: TranCategoryService,
        private userService: UserService,
        private tranCategoryRegexService: TranCategoryRegexService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tranCategoryRegexService.query()
            .subscribe((res: ResponseWrapper) => { this.trancategoryregexes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tranCategory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tranCategoryService.update(this.tranCategory));
        } else {
            this.subscribeToSaveResponse(
                this.tranCategoryService.create(this.tranCategory));
        }
    }

    private subscribeToSaveResponse(result: Observable<TranCategory>) {
        result.subscribe((res: TranCategory) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TranCategory) {
        this.eventManager.broadcast({ name: 'tranCategoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackTranCategoryRegexById(index: number, item: TranCategoryRegex) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-tran-category-popup',
    template: ''
})
export class TranCategoryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tranCategoryPopupService: TranCategoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tranCategoryPopupService
                    .open(TranCategoryDialogComponent as Component, params['id']);
            } else {
                this.tranCategoryPopupService
                    .open(TranCategoryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
