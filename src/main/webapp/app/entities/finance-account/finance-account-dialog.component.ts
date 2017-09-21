import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FinanceAccount } from './finance-account.model';
import { FinanceAccountPopupService } from './finance-account-popup.service';
import { FinanceAccountService } from './finance-account.service';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-finance-account-dialog',
    templateUrl: './finance-account-dialog.component.html'
})
export class FinanceAccountDialogComponent implements OnInit {

    financeAccount: FinanceAccount;
    isSaving: boolean;

    users: User[];
    dueDateDp: any;
    closingDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private financeAccountService: FinanceAccountService,
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
        if (this.financeAccount.id !== undefined) {
            this.subscribeToSaveResponse(
                this.financeAccountService.update(this.financeAccount));
        } else {
            this.subscribeToSaveResponse(
                this.financeAccountService.create(this.financeAccount));
        }
    }

    private subscribeToSaveResponse(result: Observable<FinanceAccount>) {
        result.subscribe((res: FinanceAccount) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: FinanceAccount) {
        this.eventManager.broadcast({ name: 'financeAccountListModification', content: 'OK'});
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
    selector: 'jhi-finance-account-popup',
    template: ''
})
export class FinanceAccountPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private financeAccountPopupService: FinanceAccountPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.financeAccountPopupService
                    .open(FinanceAccountDialogComponent as Component, params['id']);
            } else {
                this.financeAccountPopupService
                    .open(FinanceAccountDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
