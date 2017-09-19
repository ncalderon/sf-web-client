import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TranCategoryRegex } from './tran-category-regex.model';
import { TranCategoryRegexPopupService } from './tran-category-regex-popup.service';
import { TranCategoryRegexService } from './tran-category-regex.service';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tran-category-regex-dialog',
    templateUrl: './tran-category-regex-dialog.component.html'
})
export class TranCategoryRegexDialogComponent implements OnInit {

    tranCategoryRegex: TranCategoryRegex;
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private tranCategoryRegexService: TranCategoryRegexService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tranCategoryRegex.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tranCategoryRegexService.update(this.tranCategoryRegex));
        } else {
            this.subscribeToSaveResponse(
                this.tranCategoryRegexService.create(this.tranCategoryRegex));
        }
    }

    private subscribeToSaveResponse(result: Observable<TranCategoryRegex>) {
        result.subscribe((res: TranCategoryRegex) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TranCategoryRegex) {
        this.eventManager.broadcast({ name: 'tranCategoryRegexListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-tran-category-regex-popup',
    template: ''
})
export class TranCategoryRegexPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tranCategoryRegexPopupService: TranCategoryRegexPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tranCategoryRegexPopupService
                    .open(TranCategoryRegexDialogComponent as Component, params['id']);
            } else {
                this.tranCategoryRegexPopupService
                    .open(TranCategoryRegexDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
