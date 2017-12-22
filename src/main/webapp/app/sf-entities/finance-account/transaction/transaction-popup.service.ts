import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../../shared/user/user.model';
import {AccountTransactionService} from '../../../shared/sf-services/account-transaction/account-transaction.service';
import {Principal} from '../../../shared/auth/principal.service';
import {LoggerService} from '../../../shared/logger/logger.service';
import {DatetimeService} from '../../../shared/datetime/datetime.service';
import {AccountTransaction, PaymentMethod, TranType} from '../../../shared/sf-model/account-transaction.model';
import {FinanceAccount} from '../../../shared/sf-model/finance-account.model';
import {ResponseWrapper} from '../../../shared/model/response-wrapper.model';
import {FinanceAccountService} from '../../../shared/sf-services/finance-account/finance-account.service';
import {JhiAlertService} from 'ng-jhipster';
import {CurrencyUtilService} from '../../../shared/sf-services/currency/currency-util.service';

@Injectable()
export class TransactionPopupService {
    private ngbModalRef: NgbModalRef;
    private currentUser: User;
    private currentAccount: FinanceAccount;
    private currentAccountId: number;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private accountTransactionService: AccountTransactionService,
        private principal: Principal,
        private logger: LoggerService,
        private dateTimeService: DatetimeService,
        private accountService: FinanceAccountService,
        private alertService: JhiAlertService,
        private currencyUtilService: CurrencyUtilService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, currentAccountId?: number, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            this.currentAccountId = currentAccountId;
            if (id) {
                this.accountTransactionService.find(id).subscribe((accountTransaction) => {
                    if (accountTransaction.postDate) {
                        accountTransaction.postDate = {
                            year: accountTransaction.postDate.getFullYear(),
                            month: accountTransaction.postDate.getMonth() + 1,
                            day: accountTransaction.postDate.getDate()
                        };
                    }
                    this.logger.info(accountTransaction);
                    this.ngbModalRef = this.accountTransactionModalRef(component, accountTransaction);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.accountTransactionModalRef(component, this.newAccountTransaction());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    newAccountTransaction() {
        const tran: AccountTransaction = new AccountTransaction();
        tran.tranType = <TranType><any>'EXPENSE';
        tran.paymentMethod = <PaymentMethod><any>'UNSPECIFIED';
        tran.postDate = this.dateTimeService.nowLocalDate();
        this.accountService.find(this.currentAccountId)
            .subscribe((account) => {
                this.currentAccount = account;
                tran.financeAccount = this.currentAccount;
                tran.currencyValue = this.currencyUtilService.getCurrencyValue(this.currentAccount.currencyCode);
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.principal.identity().then((user) => {
            this.currentUser = user;
            tran.user = user;
        });
        this.logger.info(tran);
        return tran;
    }

    accountTransactionModalRef(component: Component, accountTransaction: AccountTransaction): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.transaction = accountTransaction;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }

    private onError(error: any) {
        this.alertService.error(error.message, null, null);
    }
}
