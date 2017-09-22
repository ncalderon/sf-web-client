import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import {AccountTransaction, TranType} from './account-transaction.model';
import { AccountTransactionPopupService } from './account-transaction-popup.service';
import { AccountTransactionService } from './account-transaction.service';
import { User, UserService } from '../../shared';
import { FinanceAccount, FinanceAccountService } from '../finance-account';
import { TranCategory, TranCategoryService } from '../tran-category';
import { ResponseWrapper } from '../../shared';
import {Principal} from '../../shared/auth/principal.service';
import {LoggerService} from '../../shared/logger/logger.service';

@Component({
    selector: 'jhi-account-transaction-dialog',
    templateUrl: './account-transaction-dialog.component.html'
})
export class AccountTransactionDialogComponent implements OnInit {

    accountTransaction: AccountTransaction;
    tranTypes: TranType[] = [TranType.EXPENSE, TranType.INCOME];
    isSaving: boolean;

    currentUser: User;
    users: User[];

    financeaccounts: FinanceAccount[] = [];

    trancategories: TranCategory[] = [];
    postDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private accountTransactionService: AccountTransactionService,
        private userService: UserService,
        private financeAccountService: FinanceAccountService,
        private tranCategoryService: TranCategoryService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private logger: LoggerService
    ) {
    }

    ngOnInit() {
        this.load();
    }

    load() {
        this.isSaving = false;
        this.userService.query().subscribe((res: ResponseWrapper) =>
            {
                this.users = res.json;
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.financeAccountService.query()
            .subscribe((res: ResponseWrapper) => {
                this.financeaccounts = res.json;
                this.accountTransaction.financeAccount = this.financeaccounts.length > 0? this.financeaccounts[0]:this.accountTransaction.financeAccount;
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.tranCategoryService.query()
            .subscribe((res: ResponseWrapper) =>
            {
                this.trancategories = res.json;
               this.accountTransaction.tranCategory = this.trancategories.length > 0? this.trancategories[0]:this.accountTransaction.tranCategory;
            }, (res: ResponseWrapper) => this.onError(res.json));

        this.loadDefaults();

    }

    loadDefaults() {

        /*this.accountTransaction.tranType = TranType.EXPENSE;*/
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        /*this.accountTransaction.user = this.currentUser;*/
        if (this.accountTransaction.id !== undefined) {
            this.subscribeToSaveResponse(
                this.accountTransactionService.update(this.accountTransaction));
        } else {
            this.subscribeToSaveResponse(
                this.accountTransactionService.create(this.accountTransaction));
        }
    }

    private subscribeToSaveResponse(result: Observable<AccountTransaction>) {
        result.subscribe((res: AccountTransaction) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: AccountTransaction) {
        this.eventManager.broadcast({ name: 'accountTransactionListModification', content: 'OK'});
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

    trackFinanceAccountById(index: number, item: FinanceAccount) {
        return item.id;
    }

    trackTranCategoryById(index: number, item: TranCategory) {
        return item.id;
    }

    getTranIncomeClass() {
        return {
                'btn': true,
                'btn-secondary': this.accountTransaction.tranType == <TranType><any>'EXPENSE',
                'btn-success': this.accountTransaction.tranType == <TranType><any>'INCOME'
            };
    }

    getTranExpenseClass() {
        return {
            'btn': true,
            'btn-danger': this.accountTransaction.tranType == <TranType><any>'EXPENSE',
            'btn-secondary': this.accountTransaction.tranType == <TranType><any>'INCOME'
        };
    }
}

@Component({
    selector: 'jhi-account-transaction-popup',
    template: ''
})
export class AccountTransactionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private accountTransactionPopupService: AccountTransactionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.accountTransactionPopupService
                    .open(AccountTransactionDialogComponent as Component, params['id']);
            } else {
                this.accountTransactionPopupService
                    .open(AccountTransactionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

}
