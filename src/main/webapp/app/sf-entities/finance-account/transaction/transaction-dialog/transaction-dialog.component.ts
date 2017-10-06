import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TransactionPopupService} from '../transaction-popup.service';
import {AccountTransaction} from '../../../account-transaction/account-transaction.model';
import {User} from '../../../../shared/user/user.model';
import {TranCategory} from '../../../tran-category/tran-category.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import {AccountTransactionService} from '../../../account-transaction/account-transaction.service';
import {FinanceAccountService} from '../../finance-account.service';
import {TranCategoryService} from '../../../tran-category/tran-category.service';
import {LoggerService} from '../../../../shared/logger/logger.service';
import {ResponseWrapper} from '../../../../shared/model/response-wrapper.model';
import {Observable} from 'rxjs/Observable';
import {TranType} from '../../../../sf-entities/account-transaction/account-transaction.model';
import {FinanceAccount} from '../../finance-account.model';

@Component({
    selector: 'jhi-transaction-dialog',
    templateUrl: './transaction-dialog.component.html'
})
export class TransactionDialogComponent implements OnInit {

    accountId: number;
    currentAccount: FinanceAccount;
    transaction: AccountTransaction;

    isSaving: boolean;
    categories: TranCategory[] = [];
    postDateDp: any;

    isDetailsCollapsed = true;

    constructor(public activeModal: NgbActiveModal,
                private alertService: JhiAlertService,
                private tranService: AccountTransactionService,
                private accountService: FinanceAccountService,
                private tranCategoryService: TranCategoryService,
                private eventManager: JhiEventManager,
                private logger: LoggerService) {
    }

    ngOnInit() {
        this.load();
    }

    load() {
        this.isSaving = false;
        this.accountService.find(this.accountId)
            .subscribe((account) => {
                this.currentAccount = account;
                this.transaction.financeAccount = account;
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.tranCategoryService.query()
            .subscribe((res: ResponseWrapper) => {
                this.categories = res.json;
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.transaction.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tranService.update(this.transaction));
        } else {
            this.subscribeToSaveResponse(
                this.tranService.create(this.transaction));
        }
    }

    private subscribeToSaveResponse(result: Observable<AccountTransaction>) {
        result.subscribe((res: AccountTransaction) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: AccountTransaction) {
        this.eventManager.broadcast({name: 'transactionListModification', content: 'OK'});
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

    trackTranCategoryById(index: number, item: TranCategory) {
        return item.id;
    }

    getDetailsCollapseClass() {
        return {
            'form-row': !this.isDetailsCollapsed,
            'collapse': this.isDetailsCollapsed
        };
    }

    getTranIncomeClass() {
        return {
            'btn': true,
            'btn-secondary': this.transaction.tranType == <TranType><any>'EXPENSE',
            'btn-success': this.transaction.tranType == <TranType><any>'INCOME'
        };
    }

    getTranExpenseClass() {
        return {
            'btn': true,
            'btn-danger': this.transaction.tranType == <TranType><any>'EXPENSE',
            'btn-secondary': this.transaction.tranType == <TranType><any>'INCOME'
        };
    }
}

@Component({
    selector: 'jhi-transaction-popup',
    template: ''
})
export class TransactionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(private route: ActivatedRoute,
                private accountTransactionPopupService: TransactionPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.accountTransactionPopupService
                    .open(TransactionDialogComponent as Component, params['id']);
            } else {
                this.accountTransactionPopupService
                    .open(TransactionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
