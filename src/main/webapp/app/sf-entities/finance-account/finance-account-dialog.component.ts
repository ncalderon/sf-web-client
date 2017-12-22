import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Response} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {AccountStatus, FinanceAccount} from '../../shared/sf-model/finance-account.model';
import {FinanceAccountPopupService} from './finance-account-popup.service';
import {Principal, ResponseWrapper, User, UserService} from '../../shared';
import {FinanceAccountService} from '../../shared/sf-services/finance-account';

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
    isDetailsCollapsed = true;

    rate: any;
    rates: any;

    constructor(public activeModal: NgbActiveModal,
                private alertService: JhiAlertService,
                private financeAccountService: FinanceAccountService,
                private userService: UserService,
                private eventManager: JhiEventManager,
                private principal: Principal) {
    }

    ngOnInit() {
        this.isSaving = false;
        if (this.principal.hasAuthority('ADMIN')) {
            this.userService.query().subscribe((res: ResponseWrapper) => {
                this.users = res.json;
            }, (res: ResponseWrapper) => this.onError(res.json));
        }
        this.loadRates();
    }

    loadRates() {
        this.rate = JSON.parse(this.financeAccount.user.currency.jsonVal);
        this.rates = Object.keys(this.rate.rates);
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
        this.eventManager.broadcast({name: 'financeAccountListModification', content: 'OK'});
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

    getInactiveStatusClass() {
        return {
            'btn': true,
            'btn-secondary': this.financeAccount.accountStatus == <AccountStatus><any>'ACTIVE',
            'btn-danger': this.financeAccount.accountStatus == <AccountStatus><any>'INACTIVE'
        };
    }

    getActiveStatusClass() {
        return {
            'btn': true,
            'btn-secondary': this.financeAccount.accountStatus == <AccountStatus><any>'INACTIVE',
            'btn-success': this.financeAccount.accountStatus == <AccountStatus><any>'ACTIVE'
        };
    }

    getDetailsCollapseClass() {
        return {
            'form-row': !this.isDetailsCollapsed,
            'collapse': this.isDetailsCollapsed
        };
    }
}

@Component({
    selector: 'jhi-finance-account-popup',
    template: ''
})
export class FinanceAccountPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private financeAccountPopupService: FinanceAccountPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
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
